import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  signin,
  signup,
  authenticate,
  isAuthenticated,
} from "../../auth/index";
import {selectLanguageSelection, setAuthenticate } from "../../redux/settingsSlice";
import "./sing.css";
import googleImg from "../../images/google_icon.svg";
import facebookImg from "../../images/facebook.svg";
import Footer from "../footer/Footer";
const SignupForm = () => {
  const dispatch = useDispatch();
  const language = useSelector(selectLanguageSelection);

  const [values, setValues] = useState({
    name: "",
    userId: "",
    password: "",
    error: "",
    success: false,
    user:"",
    redirectToReferrer:false,
  });

  const { name, userId, password, success, error, redirectToReferrer, user } = values;

  const handleChange = (field) => {
    return (event) => {
      setValues({ ...values, error: false, [field]: event.target.value });
    };
  };
  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    name.trim();
    userId.trim();
    signup({ name, userId, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          userId: "",
          password: "",
          error: "",
          success: true,
        });
        signin({ userId, password }).then((data) => {
          if (data.error) {
            setValues({ ...values, error: data.error, loading: false });
          } else {
            dispatch(setAuthenticate({ authenticate: data }));
            authenticate(data, () => {
              setValues({
                ...values,
                userId: "",
                password: "",
                error: "",
                loading: false,
                redirectToReferrer: true,
                user:data,
              });
            });
          }
        });
      }
    });
  };
  const signUpFrom = () => (
    <div id="box">
      <div className="soc">
        <div className="soc--btn facebook">
          <img src={facebookImg} alt="facebook" />
          <span>Sign up with Facebook</span>
        </div>
        <div className="soc--btn google">
          <img src={googleImg} alt="google" />
          <span>Sign up with google</span>
        </div>
      </div>

      <h3>or sign up using phone number</h3>
      <form onSubmit={clickSubmit}>
        <input
          placeholder="name (optional)"
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        />
        <input
          placeholder="phone number"
          onChange={handleChange("userId")}
          type="text"
          className="form-control"
          value={userId}
          required
        />
        <input
          type="text"
          placeholder="PASSWORD"
          onChange={handleChange("password")}
          type="password"
          value={password}
          required
        />
        <input className="submit__btn" type="submit" value="Sign Up" />
      </form>

      {/* <div class="signup">
        <p>
          not a member ?{" "}
          <Link to="/user/signup">
            <span className="signup--link"> Sign Up</span>
          </Link>
        </p>
      </div> */}
    </div>
    // <form action="">
    //   <div className="form-group">
    //     <label className="text-muted">Name</label>
    //     <input
    //       onChange={handleChange("name")}
    //       type="text"
    //       className="form-control"
    //       value={name}
    //     />
    //   </div>
    //   <div className="form-group">
    //     <label className="text-muted">Email</label>
    //     <input
    //       onChange={handleChange("email")}
    //       type="email"
    //       className="form-control"
    //       value={email}
    //     />
    //   </div>
    //   <div className="form-group">
    //     <label className="text-muted">Password</label>
    //     <input
    //       onChange={handleChange("password")}
    //       type="password"
    //       className="form-control"
    //       value={password}
    //     />
    //   </div>
    //   <button onClick={clickSubmit} className="btn btn-primary">
    //     Submit
    //   </button>
    // </form>
  );

  const showError = () => (
    <div
      className="alert__box alert--failure"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert__box alert--success"
      style={{ display: success ? "" : "none" }}
    >
      New account is created. Signing ...Please wait
    </div>
  );
  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/" />;
      }
    }
  };
  return (
    <div className="">
      {showSuccess()}
      {showError()}
      {signUpFrom()}
      {redirectUser()}
      <Footer></Footer>
    </div>
  );
};

export default SignupForm;
