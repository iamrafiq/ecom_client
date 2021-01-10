import React, { Fragment, useEffect, useState } from "react";
import Layout from "../../core/Layout";
import { useSelector } from "react-redux";

import { selectUser, selectToken } from "../../redux/authSlice";

import { Link } from "react-router-dom";
import { getGroupList, remove } from "./apiGroup";
const ManageGroup = () => {
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState("");
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const loadGroups = () => {
    getGroupList().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setGroups(data);
      }
    });
  };

  const destroy = (id) => {
    setError("");
    remove(id, user._id, token).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        loadGroups();
      }
    });
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );
  useEffect(() => {
    loadGroups();
  }, []);
  return (
    <Layout
      title="Manage Categories"
      description="Perform CRUD on categories"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-12">
          <h2 className="text-center">
            Totla {groups.length} Groups
          </h2>
          <hr />
          {showError()}
          <ul className="list-group">
            {groups&&groups.map((c, i) => (
              <li
                key={i}
                className="list-group-item "
              >
                <ul className="list-group">
                 
                  <li className="list-group-item d-flex justify-content-between align-items-center ">
                    <strong>{c.name}</strong>

                    {
                      <Fragment>
                        <Link to={`/admin/group/update/${c._id}`}>
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
                    }
                  </li>
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default ManageGroup;
