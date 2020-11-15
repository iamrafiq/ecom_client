import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Layout from "../../core/Layout";
import { isAuthenticated } from "../../auth";
import { Link, Redirect } from "react-router-dom";
import { createOrUpdateHome, getHome } from "./apiHome";
import Select from "react-select";

var slugify = require("slugify");

const CreateOrUpdateHome = () => {
  const { user, token } = isAuthenticated();
  const [photoLanding, setPhotoLanding] = useState(null);
  const [logo, setLogo] = useState(null);

  const [photoTutorial, setPhotoTutorial] = useState(null);
  const [photoTutorialBengali, setPhotoTutorialBengali] = useState(null);

  const [values, setValues] = useState({
    title: "",
    bengaliTitle: "",
    home: false,
    loading: false,
    error: "",
    createdCategory: "",
    redirectToProfile: false,
    formData: new FormData(),
  });

  const {
    title,
    bengaliTitle,
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
            title: data.title,
            bengaliTitle: data.bengaliTitle,
            home: data,
            loading: false,
            parents: data,
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
    if (name == "photoLanding") {
      setPhotoLanding(event.target.files[0]);
    } else if (name == "photoTutorial") {
      setPhotoTutorial(event.target.files);
    }else if (name == "photoTutorialBengali") {
      setPhotoTutorialBengali(event.target.files);
    }else if (name == "logo") {
      setLogo(event.target.files[0]);
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
    if (photoLanding !== null) {
      formData.append("photoLanding", photoLanding);
    }
    if (logo !== null) {
      formData.append("logo", logo);
    }
    if (photoTutorial !== null) {
      for (let x = 0; x < photoTutorial.length; x++) {
        formData.append("photoTutorial", photoTutorial[x]);
      }
    }
    if (photoTutorialBengali !== null) {
      for (let x = 0; x < photoTutorialBengali.length; x++) {
        formData.append("photoTutorialBengali", photoTutorialBengali[x]);
      }
    }
    setValues({ ...values, error: "", loading: true });

    let id = null;
    if (home) {
      id = home._id;
    }
    console.log("home id:", id);
    createOrUpdateHome(id, user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: data.title,
          bengaliTitle: data.bengaliTitle,
          home: data,
          loading: false,
          createdProduct: data.name,
        });
      }
    });
  };

  const newPostFrom = () => (
    <form className="mb-3" onSubmit={clickSubmit} id="form1">
       <h4>Logo</h4>
      <div className="form-group">
        <label htmlFor="" className="btn btn-secondary">
          <input
            onChange={handleImageChange("logo")}
            type="file"
            name="logo"
            accept="image/*"
            // required
          />
        </label>
      </div>
      <h4>Upload Landing Image</h4>
      <div className="form-group">
        <label htmlFor="" className="btn btn-secondary">
          <input
            onChange={handleImageChange("photoLanding")}
            type="file"
            name="photoLanding"
            accept="image/*"
            // required
          />
        </label>
      </div>
      <h4>Upload Tutorial Images</h4>
      <div className="form-group">
        <label htmlFor="" className="btn btn-secondary">
          <input
            onChange={handleImageChange("photoTutorial")}
            type="file"
            name="photoTutorial"
            accept="image/*"
            multiple
            // required
          />
        </label>
      </div>
      <h4>Upload Tutorial Bengali Images</h4>
      <div className="form-group">
        <label htmlFor="" className="btn btn-secondary">
          <input
            onChange={handleImageChange("photoTutorialBengali")}
            type="file"
            name="photoTutorialBengali"
            accept="image/*"
            multiple
            // required
          />
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Title
        </label>
        <input
          onChange={handleChange("title")}
          type="text"
          className="form-control"
          value={title}
          // required
        />
      </div>
      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Bengali Title
        </label>
        <input
          onChange={handleChange("bengaliTitle")}
          type="text"
          className="form-control"
          value={bengaliTitle}
          // required
        />
      </div>
      <button
        type="submit"
        form="form1"
        value="Submit"
        className="btn btn-outline-primary mr-5"
      >
        Create or Update Home
      </button>
      {/* <button type="button" className="btn btn-outline-primary">
        Back to dashboard
      </button> */}
            {home&&(manageGallery())}

      {goBack()}
    </form>
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
    const manageGallery = () => (
      <Link
        to="/admin/managegallery"
        className="text-warning btn btn-outline-primary"
      >
        Manage Gallery
      </Link>
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

export default CreateOrUpdateHome;
