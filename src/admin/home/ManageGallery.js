import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Layout from "../../core/Layout";
import { isAuthenticated } from "../../auth";
import { Link, Redirect } from "react-router-dom";
import { createOrUpdateHome, getHome } from "./apiHome";
import Select from "react-select";

var slugify = require("slugify");

const ManageGallery = () => {
  const { user, token } = isAuthenticated();
  const [photoG, setPhotoG] = useState(null);
  const [values, setValues] = useState({
    titleG: "",
    shortDescriptionG: "",
    titleBanglaG: "",
    shortDescriptionBanglaG: "",
    home: "",
    loading: false,
    error: "",
    createdCategory: "",
    redirectToProfile: false,
    formData: new FormData(),
  });

  const {
    titleG,
    shortDescriptionG,
    titleBanglaG,
    shortDescriptionBanglaG,
    home,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values;

  const init = () => {
    //setSelected(pre);
    getHome().then((data) => {
      if (data && data.error) {
        setValues({ ...values, create: true, error: data.error });
      } else {
        console.log("home data", data);
        if (data !== undefined) {
          setValues({
            ...values,
            home: data,
            loading: false,
            formData: new FormData(),
          });
        }
      }
    });
  };

  useEffect(() => {
    init();
  }, [createdProduct]);
  const handleImageChange = (name) => (event) => {
    if (name == "photoG") {
      setPhotoG(event.target.files[0]);
    }
  };
  const handleChange = (field) => (event) => {
    let value = event.target.value;
    formData.set(field, value);
    setValues({
      ...values,
      [field]: value,
      error: false,
      createdProduct: false,
    });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    if (photoG !== null) {
      formData.append("photoG", photoG);
    }
    setValues({ ...values, error: "", loading: true });

    formData.append("actionG", false);

    createOrUpdateHome(home._id, user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          home: data,
          loading: false,
        });
      }
    });
  };
  const destroy = (id) => {
    formData.append("actionG", true);
    formData.append("gId", id);

    createOrUpdateHome(home._id, user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          home: data,
          loading: false,
        });
      }
    });
  };
  const newPostFrom = () => (
    <div className="">
      <form className="mb-3" onSubmit={clickSubmit} id="form1">
        <h4>Upload Gallery Image</h4>
        <div className="form-group">
          <label htmlFor="" className="btn btn-secondary">
            <input
              onChange={handleImageChange("photoG")}
              type="file"
              name="photoG"
              accept="image/*"
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="" className="text-muted">
            Title
          </label>
          <input
            onChange={handleChange("titleG")}
            type="text"
            className="form-control"
            value={titleG}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="" className="text-muted">
            Title Bangla
          </label>
          <input
            onChange={handleChange("titleBanglaG")}
            type="text"
            className="form-control"
            value={titleBanglaG}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="" className="text-muted">
            Short Description
          </label>
          <input
            onChange={handleChange("shortDescriptionG")}
            type="text"
            className="form-control"
            value={shortDescriptionG}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="" className="text-muted">
            Short Description Bangla
          </label>
          <input
            onChange={handleChange("shortDescriptionBanglaG")}
            type="text"
            className="form-control"
            value={shortDescriptionBanglaG}
            required
          />
        </div>
        <button
          type="submit"
          form="form1"
          value="Submit"
          className="btn btn-outline-primary mr-5"
        >
          Save
        </button>
        {/* <button type="button" className="btn btn-outline-primary">
        Back to dashboard
      </button> */}
        {goBack()}
      </form>
      {home.gallery && (
        <div className="row">
          <div className="col-12">
            <h2 className="text-center">
              Totla {home.gallery.length} Gallery Item
            </h2>
            <hr />
            {showError()}
            <ul className="list-group">
              {home.gallery.map((c, i) => (
                <li key={i} className="list-group-item ">
                  <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between align-items-center ">
                      <strong>{c.titleG}</strong>

                      {
                        <React.Fragment>
                          {/* <Link to={`/admin/advertisement/update/${c._id}`}>
                            <span className="badge badge-warning badge-pill">
                              Update
                            </span>
                          </Link> */}
                          <span
                            onClick={() => destroy(c._id)}
                            className="badge badge-danger badge-pill"
                          >
                            DELETE
                          </span>
                        </React.Fragment>
                      }
                    </li>
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );
  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h2>{`${createdProduct}`} is created</h2>
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-success">
        <h2>Loading...</h2>
      </div>
    );

  const goBack = () => (
    <Link
      to="/admin/dashboard"
      className="text-warning btn btn-outline-primary"
    >
      Back to Dashboard
    </Link>
  );

  return (
    <Layout
      title=" Add a new product"
      description={`G'day ${user.name}, ready to add a new product?`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showLoading()}
          {showSuccess()}
          {showError()}
          {newPostFrom()}
        </div>
      </div>
    </Layout>
  );
};

export default ManageGallery;
