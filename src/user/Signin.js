import React, { useState } from "react";
import Layout from "../core/Layout";
import {Redirect} from "react-router-dom";
import { signin, authenticate } from "../auth/index";
import { useSelector } from "react-redux";

import { selectUser, selectToken } from "../redux/authSlice";

const Signin = () => {
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferrer: false
  });

  const { email, password, loading, error, redirectToReferrer } = values;
 
  const handleChange = (field) => {
    return (event) => {
      setValues({ ...values, error: false, [field]: event.target.value });
    };
  };
  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({...values, error:false, loading:true})
    signin({email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data,
          ()=>{
            setValues({ ...values,  email: "", password:"", error: "", loading: false, redirectToReferrer: true });
          })
      }
    });
  };
  const signInFrom = () => (
    <form action="">
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        />
      </div>
      <button onClick={clickSubmit} className="btn btn-primary">
        Submit
      </button>
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

  const showLoading = () => (
    loading && (<div className="alert alert-info">
      <h2>Loading...</h2>
    </div>)
  );

  const redirectUser=()=>{
    if (redirectToReferrer){
      if (user&&user.role===1){
        return <Redirect to ="/admin/dashboard"/>
      }else{
        return <Redirect to ="/user/dashboard"/>
      }
    }
  }
  return (
    <Layout
      title="Signin page"
      description="Signin to Node React App"
      className="container col-md-8 offset-md-2"
    >
      {showLoading()}
      {showError()}
      {signInFrom()}
      {redirectUser()}
    </Layout>
  );
};

export default Signin;

