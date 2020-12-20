import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Layout from "../core/Layout";
import { useSelector } from "react-redux";

import { selectUser, selectToken } from "../redux/authSlice";
import { Link, Redirect } from "react-router-dom";
import { createCategory, getCategories } from "./apiAdmin";
import Select from "react-select";

var slugify = require("slugify");

const AddCategory = () => {
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const [iconMenu, setIconMenu] = useState(null);
  const [icon, setIcon] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [values, setValues] = useState({
    name: "",
    bengaliName: "",
    nameFull: "",
    bengaliNameFull: "",
    showHome: "",
    slug: "",
    order: "",
    parents: [],
    parent: "",
    trash: false,
    loading: false,
    error: "",
    createdCategory: "",
    redirectToProfile: false,
    formData: "",
  });

  const {
    name,
    bengaliName,
    nameFull,
    bengaliNameFull,
    showHome,
    slug,
    order,
    parents,
    parent,
    category,
    shipping,
    trash,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values;

  const init = () => {
    //setSelected(pre);
    getCategories().then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        console.log("ad cat", data);
        setValues({
          ...values,
          name: "",
          bengaliName: "",
          nameFull: "",
          bengaliNameFull: "",
          showHome: "",
          slug: "",
          order: "",
          trash: false,
          loading: false,
          parents: data,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    console.log("use effect");
    init();
  }, [createdProduct]);
  const handleImageChange = (name) => (event) => {
    if (name == "icon") {
      setIcon(event.target.files[0]);
    } else if (name == "iconMenu") {
      setIconMenu(event.target.files[0]);
    } else if (name == "thumbnail") {
      setThumbnail(event.target.files[0]);
    }
  };
  const handleChange = (field) => (event) => {
    let value = event.target.value;
    formData.set(field, value);
    if (field === "name") {
      const nameClean = value.replace(/[^a-zA-Z0-9]/g, '-');

      const slugStr = slugify(nameClean, {
        replacement: "-", // replace spaces with replacement character, defaults to `-`
        remove: undefined, // remove characters that match regex, defaults to `undefined`
        lower: true, // convert to lower case, defaults to `false`
        strict: false, // strip special characters except replacement, defaults to `false`
        locale: "vi", // language code of the locale to use
      });
      // if (field === 'slug'){
      //   value = slugStr;
      // }else{
      //   setValues({ ...values, slug: slugStr, error: false, createdProduct:false });
      // }
      setValues({
        ...values,
        slug: slugStr,
        error: false,
        createdProduct: false,
      });

      formData.set("slug", slugStr);
    }

    if (field === "parent") {
      const parentCat = JSON.parse(event.target.value);
      formData.set(field, parentCat._id);
      let rc = [];
      if (parent.name !== "root") {
        rc.push(parentCat._id);
      }
      if (parentCat.recursiveCategories) {
        console.log("rc..", parentCat.name, parentCat.recursiveCategories);
        rc = rc.concat(parentCat.recursiveCategories);
      }
      console.log("rc", rc);
      formData.append("recursiveCats", rc);
    }
    //console.log(field, value)
    setValues({
      ...values,
      [field]: value,
      error: false,
      createdProduct: false,
    });
  };
  const handleOptionChange = (option) => {
    formData.set(option.field, option.value);
    setValues({ ...values, [option.field]: option.value, formData: formData });
  };
  const clickSubmit = (event) => {
    event.preventDefault();
    formData.append("trash", false);
    if (thumbnail !== null) {
      formData.append("thumbnail", thumbnail);
    }
    if (icon !== null) {
      formData.append("icon", icon);
    }
    if (iconMenu !== null) {
      formData.append("iconMenu", iconMenu);
    }

    if (parents.length !== 0 && parent == "") {
      setValues({ ...values, error: "Select a parent" });
      return;
    }

    setValues({ ...values, error: "", loading: true });
    createCategory(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          slug: "",
          order: "",
          parents: [],
          trash: false,
          loading: false,
          createdProduct: data.name,
        });

        //init();
      }
    });
  };

  const newPostFrom = () => (
    <form className="mb-3" onSubmit={clickSubmit} id="form1">
      <h4>Upload Menu Icon</h4>
      <div className="form-group">
        <label htmlFor="" className="btn btn-secondary">
          <input
            onChange={handleImageChange("iconMenu")}
            type="file"
            name="iconMenu"
            accept="image/webp"
          />
        </label>
      </div>
      <h4>Upload Icon</h4>
      <div className="form-group">
        <label htmlFor="" className="btn btn-secondary">
          <input
            onChange={handleImageChange("icon")}
            type="file"
            name="icon"
            accept="image/webp"
          />
        </label>
      </div>
      <h4>Upload Thumbnail</h4>
      <div className="form-group">
        <label htmlFor="" className="btn btn-secondary">
          <input
            onChange={handleImageChange("thumbnail")}
            type="file"
            name="thumbnail"
            accept="image/webp"
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
          Bengali Name
        </label>
        <input
          onChange={handleChange("bengaliName")}
          type="text"
          className="form-control"
          value={bengaliName}
        />
      </div>
      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Name Full
        </label>
        <input
          onChange={handleChange("nameFull")}
          type="text"
          className="form-control"
          value={nameFull}
        />
      </div>
      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Bengali Name Full
        </label>
        <input
          onChange={handleChange("bengaliNameFull")}
          type="text"
          className="form-control"
          value={bengaliNameFull}
        />
      </div>
      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Slug
        </label>
        <input
          onChange={handleChange("slug")}
          type="text"
          className="form-control"
          value={slug}
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
          {parents &&
            parents.map((cat, index) => (
              <option key={index} value={JSON.stringify(cat)}>
                {cat.name}
              </option>
            ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Show In Home Screen
        </label>
        <Select
          onChange={handleOptionChange}
          options={[
            { value: 0, label: "No", field: "" },
            { value: 1, label: "Yes", field: "" },
          ].map((op, index) => {
            op.field = "showHome";
            return op;
          })}
        />
      </div>
      <button
        type="submit"
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

// const AddCategory = () => {
//   const [name, setName] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);

//   // destructure user and info from localstorage

//   const { user, token } = isAuthenticated();

//   const handleChange = (e)=>{
//     setError('');
//     setName(e.target.value);
//   }
//   const clickSubmit = (e) =>  {
//     e.preventDefault();
//     setError('');
//     setSuccess(false);
//     //make request to api to create category
//     createCategory(user._id, token, {name})
//     .then(data=>{
//         if(data.error){
//             setError(data.error);
//         }else{
//             setError("");
//             setSuccess(true);
//         }
//     })
//   }

//   const showSuccess = () => {
//       if (success){
//           return(
//           <h3 className="text-success">Category {name} is created successfully</h3>
//           )
//       }
//   }
//   const showError = () => {
//       if (error !== ""){
//          return <h3 className="text-danger">{error}</h3>
//       }
//   }
//   const goBack = () => (
//     <div className="mt-5">
//         <Link to="/admin/dashboard" className="text-warning">Back to Dashboard</Link>
//     </div>
// )
//   const newCategoryForm = () => (
//     <form onSubmit={clickSubmit}>
//       <div className="form-group">
//         <label htmlFor="" className="text-muted">
//           Name
//         </label>
//         <input type="text" className="form-control" onChange={handleChange} value={name} autoFocus required/>
//       </div>
//       <button className="btn btn-outline-primary">
//             Create Category
//         </button>
//     </form>
//   );

//   return (
//     <Layout
//       title=" Add a new category"
//       description={`G'day ${user.name}, ready to add a new category?`}
//     >
//      <div className="row">
//          <div className="col-md-8 offset-md-2">
//              {showSuccess()}
//              {showError()}
//             {newCategoryForm()}
//             {goBack()}
//          </div>
//      </div>

//     </Layout>
//   );
// };

export default AddCategory;
