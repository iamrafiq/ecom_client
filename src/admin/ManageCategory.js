import React, { Fragment, useEffect, useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getCategories, deleteCategory } from "./apiAdmin";
const ManageCategory = () => {
  const [cagegories, setCategories] = useState([]);
  const { user, token } = isAuthenticated();
  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const destroy = (categoryId) => {
    deleteCategory(categoryId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadCategories();
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);
  return (
    <Layout
      title="Manage Categories"
      description="Perform CRUD on categories"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-12">
          <h2 className="text-center">Totla {cagegories.length} products</h2>
          <hr />
          <ul className="list-group">
            {cagegories.map((c, i) => (
              <li
                key={i}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <strong>{c.name}</strong>
                {c.name !== "root" && (
                  <Fragment>
                    <Link to={`/admin/category/update/${c._id}`}>
                      <span className="badge badge-warning badge-pill">
                        Update
                      </span>
                    </Link>
                    <span
                      onClick={() => destroy(c._id)}
                      className="badge badge-danger badge-pill"
                    >
                      DELETE
                    </span>
                  </Fragment>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default ManageCategory;