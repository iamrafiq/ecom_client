import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link, Redirect } from "react-router-dom";
import { createCategory, getCategories } from "./apiAdmin";
import MultiSelect from "react-multi-select-component";

const AddCategory = () => {
  const { user, token } = isAuthenticated();
  const [icon, setIcon] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [values, setValues] = useState({
    name: "",
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
        setValues({
          ...values,
          name: "",
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
     if (name == "icon"){
       setIcon(event.target.files[0])
     }
     else if (name == "thumbnail"){
       setThumbnail(event.target.files[0])
     }
      
  };
  const handleChange = (name) => (event) => {
    formData.set(name, event.target.value);
    setValues({ ...values, [name]: event.target.value, error: false, createdProduct:false });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    formData.append("trash", false);
    if (thumbnail !== null){
      formData.append("thumbnail", thumbnail);
    }
    if (icon !== null){
      formData.append("icon", icon);
    }

    if (parents.length !== 0 && parent==''){
      setValues({ ...values, error: "Select a parent" });
      return;
    }
    setValues({ ...values, error: "", loading: true });
    createCategory(user._id, token, formData).then((data) => {
      console.log("err...", data.error);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
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
      <h4>Upload Icon</h4>
      <div className="form-group">
        <label htmlFor="" className="btn btn-secondary">
          <input
            onChange={handleImageChange("icon")}
            type="file"
            name="icon"
            accept="image/*"
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
          {parents &&
            parents.map((cat, index) => (
              <option key={index} value={cat._id}>
                {cat.name}
              </option>
            ))}
        </select>
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
    <Link to="/admin/dashboard" className="text-warning btn btn-outline-primary">
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
