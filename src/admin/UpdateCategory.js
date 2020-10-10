import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link, Redirect } from "react-router-dom";
import { getCategory, getCategories, updateCategory } from "./apiAdmin";

const UpdateCategory = ({ match }) => {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    name: "",
    order: "",
    //parents: [],
    parent: "",
    trash: false,
    icon: "",
    thumbnail: "",
    loading: false,
    error: "",
    createdCategory: "",
    redirectToProfile: false,
    formData: "",
  });
  const [categories, setCategories] = useState([]);
  const {
    name,
    order,
   // parents,
    parent,
    category,
    shipping,
    trash,
    icon,
    thumbnail,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values;

  const init = (categoryId) => {
    getCategory(categoryId).then((data) => {
      console.log(JSON.stringify(data))
      //const d = JSON.parse(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        console.log(data[0]);
        //populate states and load category
        setValues({
          ...values,
          name: data.name,
          order: data.order,
          parent: data.parent,
          formData: new FormData(),
        });
        initCategory();
      }
    });
  };
  // load categories and set form data
  const initCategory = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    console.log("use effect");
    init(match.params.categoryId);
  }, []);
  const handleChange = (name) => (event) => {
    const value =
      name === "icon" || name === "thumbnail"
        ? event.target.files[0]
        : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };
  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    console.log(formData);
    updateCategory(match.params.categoryId, user._id, token, formData).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: data.name,
            order: data.order,
            loading: false,
            parent:data.parent,
            redirectToProfile: true,
            createdProduct: data.name,
          });
        }
      }
    );
  };
  const newPostFrom = () => (
    <form className="mb-3" onSubmit={clickSubmit} id="form1">
      <h4>Upload Icon</h4>
      <div className="form-group">
        <label htmlFor="" className="btn btn-secondary">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image/*"
          />
        </label>
      </div>
      <h4>Upload Thumbnail</h4>
      <div className="form-group">
        <label htmlFor="" className="btn btn-secondary">
          <input
            onChange={handleChange("thumbnail")}
            type="file"
            name="thumbnail"
            accept="image/*"
          />
        </label>
      </div>
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
          Order
        </label>
        <input
          onChange={handleChange("order")}
          type="number"
          className="form-control"
          value={order}
        />
      </div>
      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Parent
        </label>
        <select onChange={handleChange("parent")} className="form-control">
          <option>Select a parent</option>
          {/* {setSpinner(categories)} */}
           {categories &&
            categories.map((cat, index) => (
             cat._id !== match.params.categoryId ? parent === cat._id? <option key={index} value={cat._id} selected="true">
                {cat.name}
              </option>:<option key={index} value={cat._id}>
                {cat.name}
              </option>:''
            ))} 
        </select>
      </div>

      <button
        type="submit"
        form="form1"
        value="Submit"
        className="btn btn-outline-primary mr-5"
      >
        Update
      </button>
      {goBack()}
    </form>
  );

  const goBack = () => (
    <Link to="/admin/categories" className="text-warning btn btn-outline-primary">
        Back to manage category
      </Link>
  );
  /*const newPostFrom = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
      <h4>Post Photo</h4>
      <div className="form-group">
        <label htmlFor="" className="btn btn-secondary">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image/*"
          />
        </label>
      </div>
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
          Description
        </label>
        <textarea
          onChange={handleChange("description")}
          className="form-control"
          value={description}
        />
      </div>
      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Price
        </label>
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          value={price}
        />
      </div>

      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Category
        </label>
        <select onChange={handleChange("category")} className="form-control">
          <option>Select a category</option>
          {categories &&
            categories.map((cat, index) => (
              <option key={index} value={cat._id}>
                {cat.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="" AddProductclassName="text-muted">
          Quantity
        </label>
        <input
          onChange={handleChange("quantity")}
          type="number"
          className="form-control"
          value={quantity}
        />
      </div>
      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Shiping
        </label>
        <select onChange={handleChange("shipping")} className="form-control">
          <option>Please select a Shiping</option>
          <option value="0">No</option>
          <option value="1">yes</option>
        </select>
      </div>

      <button className="btn btn-outline-primary">Update product</button>
    </form>
  );*/

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
      <h2>{`${createdProduct}`} is updated</h2>
    </div>
  );

  const redirectUser = () => {
    if (redirectToProfile) {
      if (!error) {
        return <Redirect to="/"></Redirect>;
      }
    }
  };

  const showLoading = () =>
    loading && (
      <div className="alert alert-success">
        <h2>Loading...</h2>
      </div>
    );
  return (
    <Layout
      title={`Update Category`}
      description={`G'day ${user.name}, ready to add a new product?`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showLoading()}
          {showSuccess()}
          {showError()}
          {newPostFrom()}
          {/* {redirectUser()} */}
        </div>
      </div>
    </Layout>
  );
};

export default UpdateCategory;
