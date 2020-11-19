import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { signin, authenticate, isAuthenticated } from "../../auth/index";
import {
  selectLanguageSelection,
  setAuthenticate,
} from "../../redux/settingsSlice";
import "./sing.css";
import googleImg from "../../images/google_icon.svg";
import facebookImg from "../../images/facebook.svg";
import Footer from "../footer/Footer";
const SigninForm = () => {
  const dispatch = useDispatch();
  const language = useSelector(selectLanguageSelection);

  const [values, setValues] = useState({
    userId: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  const { userId, password, loading, error, redirectToReferrer } = values;
  const { user } = isAuthenticated();

  const handleChange = (field) => {
    return (event) => {
      setValues({ ...values, error: false, [field]: event.target.value });
    };
  };
  const clickSubmit = (event) => {
    event.preventDefault();
    console.log("submit....");
    setValues({ ...values, error: false, loading: true });
    userId.trim();
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
          });
        });
      }
    });
  };
  const signInFrom = () => (
    <div id="box">
      <div className="soc">
        <div className="soc--btn facebook">
          <img src={facebookImg} alt="facebook" />
          <span>Sign in with Facebook</span>
        </div>
        <div className="soc--btn google">
          <img src={googleImg} alt="google" />
          <span>Sign in with google</span>
        </div>
      </div>

      <h3>or sign in using phone number</h3>
      <form onSubmit={clickSubmit}>
        <input
          placeholder="phone number"
          onChange={handleChange("userId")}
          type="tex"
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
        <input className="submit__btn" type="submit" value="Sign In" />
      </form>
      <a href="#">forgot ?</a>

      <div class="signup">
        <p>
          not a member ?{" "}
          <Link to="/user/signup">
            <span className="signup--link"> Sign Up</span>
          </Link>
        </p>
      </div>
    </div>
  );

  const showError = () => (
    <div
      className="alert__box alert--failure"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert-box warning">
        <h2>Loading...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
  };
  return (
    <div className="">
      {showLoading()}
      {showError()}
      {signInFrom()}
      {redirectUser()}
      <Footer></Footer>
    </div>
  );
};

export default SigninForm;
