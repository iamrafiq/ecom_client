import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Layout from "../../core/Layout";
import { isAuthenticated } from "../../auth";
import { Link, Redirect } from "react-router-dom";
import {getCategories } from "../apiAdmin";
import { createAdvertisement } from "./apiAdvertisement";
import Select from "react-select";

const UpdateAvertisement = () => {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    name: "",
    slugPages: "",
    photoUrl: "",
    categories:"",
    products:"",
    customSlug:"",
    categorySlugs:"",
    productSlugs:"",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: "",
  });

  const {
    name,
    slugPages,
    photoUrl,
    categories,
    products,
    customSlug,
    categorySlugs,
    productSlugs,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values;


  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        console.log("cats...", data);

        const rootless = data.filter(e => e.name !== 'root')
        setValues({
          ...values,
          name: "",
          slugPages:"",
          photoUrl: "",
          categories:rootless,
          products: "",
          customSlug: "",
          categorySlugs:"",
          productSlugs:"",
          loading: false,
          formData: new FormData(),
        });
      }
    });
  };
  useEffect(() => {
    console.log("use effect");
    init();
  }, []);


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

    // if (parents.length !== 0 && parent == "") {
    //   setValues({ ...values, error: "Select a parent" });
    //   return;
    // }

    setValues({ ...values, error: "", loading: true });
    createAdvertisement(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          slugPages:"",
          photoUrl: "",
          products: "",
          customSlug: "",
          trash: false,
          loading: false,
          createdProduct: data.name,
        });

        //init();
      }
    });
  };

  const handleChangeCategoris = (selectedOption) => {
    console.log(`Option selected:`, selectedOption);

    if (selectedOption != null) {
      const catsSlug = selectedOption.map((cat, index) => {
        return cat.value.slug;
      });


      setValues({
        ...values,
        categorySlugs: catsSlug.toString(),
      });
    } else {
      setValues({ ...values, categorySlugs: ""});
    }
  };
  const newPostFrom = () => (
    <form className="mb-3" onSubmit={clickSubmit} id="form1">

      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Name
        </label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        />
      </div>
      <div className="form-group">
        <label htmlFor="" className="text-muted">
        Photo Url
        </label>
        <input
          onChange={handleChange("photoUrl")}
          type="text"
          className="form-control"
          value={photoUrl}
        />
      </div>
  
      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Categories
        </label>
        <Select
          onChange={handleChangeCategoris}
          closeMenuOnSelect={false}
          // defaultValue={[colourOptions[0], colourOptions[1]]}
          isMulti
          options={categories.map((cat, index) => {
            return {
              value: cat,
              label: cat.name,
            };
          })}
        />
      </div>

      <button
        type="submit"getCategories
        form="form1"
        value="Submit"
        className="btn btn-outline-primary mr-5"
      >
        Create a new Category
      </button>
      {/* <button type="button" className="btn btn-outline-primary">
        Back to dashboard
      </button> */}
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

export default UpdateAvertisement;
