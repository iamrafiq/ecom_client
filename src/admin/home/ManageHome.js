import React, { Fragment, useEffect, useState } from "react";
import Layout from "../../core/Layout";
import { useSelector } from "react-redux";

import { selectUser, selectToken } from "../../redux/authSlice";
import { Link } from "react-router-dom";
import { deleteHome } from "../apiAdmin";
import { getHome } from "./apiHome";

const ManageHome = () => {
  const [home, setHome] = useState(undefined);
  const [error, setError] = useState("");
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  const destroy = (homeId) => {
    setError("");
    deleteHome(homeId, user._id, token).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        getHome().then((data) => {
          console.log("data home", data);
          if (data && data.error) {
            setError(data.error);
          } else {
            console.log("home data", data);
            setHome(data);
          }
        });
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
    console.log("data home use effect");
    getHome().then((data) => {
      console.log("data home", data);
      if (data && data.error) {
        setError(data.error);
      } else {
        console.log("home data", data);
        setHome(data);
      }
    });
  }, []);
  return (
    <Layout
      title="Manage Categories"
      description="Perform CRUD on Home"
      className="container-fluid"
    >
      {home && (
        <div className="row">
          <div className="col-12">
            <h2 className="text-center">Home </h2>
            <hr />
            {showError()}
            <ul className="list-group">
              <li
                key={home._id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <strong>Home</strong>
                <Fragment>
                  <span
                    onClick={() => destroy(home._id)}
                    className="badge badge-danger badge-pill"
                  >
                    DELETE
                  </span>
                </Fragment>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ManageHome;
