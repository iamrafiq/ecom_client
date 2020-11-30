import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { useSelector } from "react-redux";

import { selectUser, selectToken } from "../redux/authSlice";
import { Link } from "react-router-dom";
import { createCategory, getCategories } from "./apiAdmin";
import MultiSelect from "react-multi-select-component";

const AddCategorytemp = () => {
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const [values, setValues] = useState({
    name: "",
    order: "",
    childs: [],
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

  const {
    name,
    order,
    childs,
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


  const [selected, setSelected] = useState([]);

  //setSelected(pre);
  // load childs and set form data
  const init = () => {
    //setSelected(pre);
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, childs: data.map((c, i)=>({ label: c.name, value: c._id})), formData: new FormData() });
      }
    });
  };
  useEffect(() => {
    console.log("use effect");
    init();
  }, []);
  const handleChange = (name) => (event) => {
    const value =
      name === "icon" || name === "thumbnail"
        ? event.target.files[0]
        : event.target.value;
        console.log(name)

        if (name == "child"){
          event.target.val([]).multiselect('refresh')
          console.log(event.target)
        }
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };
  const clickSubmit = (event) => {
    event.preventDefault();
    const c = selected.map(item => item.value).join(',');
    console.log("ssssss",c);
    // formData.append(
    //   "childs",
    //   "5f81acdad2a3209965a5b987,5f81acded2a3209965a5b988"
    // );

    formData.append(
      "childs",
      c
    );
    formData.append("trash", false);
    setValues({ ...values, error: "", loading: true });
    console.log("from data:", formData);
    createCategory(user._id, token, formData).then((data) => {
      console.log("err...", data.error);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          order: "",
          childs: [],
          icon: "",
          thumbnail: "",
          trash: false,
          loading: false,
          createdProduct: data.name,
        });
      }
    });
  };

  const selectChilds=(childs)=>{
    console.log(childs)
    return (<div>
      <h1>Select Fruits</h1>
      <pre>{JSON.stringify(selected)}</pre>
      <MultiSelect
        options={childs}
        value={selected}
        onChange={setSelected}
        labelledBy={"Select"}
      />
    </div>)
  //   return(<select onChange={handleChange("child")} class="custom-select" multiple>
  //   <option selected>Select child</option>
  //   {
  //     childs.map((c, i)=>(<option key={i}  value={c._id}>{c.name}</option>))
  //   }
  // </select>)
  };
  const newPostFrom = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
      <h4>Post Icon</h4>
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
      <h4>Post Thumbnail</h4>
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
       {selectChilds(childs)}
      {/* <div className="form-group">
        <label htmlFor="" className="text-muted">
          Parent
        </label>
        <select onChange={handleChange("category")} className="form-control">
          <option>Select a parent</option>
          <option value="0">Parentless</option>
          {categories &&
            categories.map((cat, index) => (
              <option key={index} value={cat._id}>
                {cat.name}
              </option>
            ))}
        </select>
      </div> */}
      {/* <div className="form-group">
        <label htmlFor="" className="text-muted">
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
      </div> */}

      <button className="btn btn-outline-primary">Create a new product</button>
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

export default AddCategorytemp;
