import React, { Fragment, useEffect, useState } from "react";
import Layout from "../../core/Layout";
import { useSelector } from "react-redux";

import { selectUser, selectToken } from "../../redux/authSlice";

import { Link } from "react-router-dom";
import { getAdvertisements, deleteAdvertisement } from "./apiAdvertisement";
const ManageAdvertisement = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [error, setError] = useState("");
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const loadAdvertisements = () => {
    getAdvertisements().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setAdvertisements(data);
        console.log("adverts", data);
      }
    });
  };

  const destroy = (id) => {
    setError("");
    deleteAdvertisement(id, user._id, token).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        loadAdvertisements();
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
    loadAdvertisements();
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
            Totla {advertisements.length} Advertisements
          </h2>
          <hr />
          {showError()}
          <ul className="list-group">
            {advertisements.map((c, i) => (
              <li
                key={i}
                className="list-group-item "
              >
                <ul className="list-group">
                  <li className="list-group-item ">
                    <p>[{c.slugPages.toString()}]</p>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center ">
                    <strong>{c.name}</strong>

                    {
                      <Fragment>
                        <Link to={`/admin/advertisement/update/${c._id}`}>
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

export default ManageAdvertisement;
