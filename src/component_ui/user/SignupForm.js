import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  signin,
  signup,
} from "../../auth/index";
import {
  selectLanguageSelection,
  setAuthenticate,
} from "../../redux/settingsSlice";
import {
  setToken,
  setUser
} from "../../redux/authSlice";
import { setUserId, setPassword } from "../../redux/globalSlice";
import "./user-forms.css";
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
    user: "",
    redirectToReferrer: false,
  });

  const {
    name,
    userId,
    password,
    success,
    error,
    redirectToReferrer,
    user,
  } = values;

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
          error: "",
          userId: "",
          password: "",
          success: true,
          redirectToReferrer: false,
        });
        signin({ userId, password }).then((data) => {
          if (data.error) {
            setValues({ ...values, error: data.error, loading: false });
          } else {
            // dispatch(setUserId({ userId: userId }));
            // dispatch(setPassword({ password: password }));
            // dispatch(setAuthenticate({ authenticate: data }));
            dispatch(setToken({token:data.token}));
            dispatch(setUser({user:data.user, encrypt:true}));

            // authenticate(data, () => {
            //   setValues({
            //     ...values,
            //     userId: "",
            //     password: "",
            //     error: "",
            //     loading: false,
            //     redirectToReferrer: true,
            //     user: data,
            //   });
            // });
          }
        });
      }
    });
  };
  const signUpFrom = () => (
    <div className="form__box">
      <div className="soc">
        <div className="soc--btn facebook">
          <img src={facebookImg} alt="facebook" />
          {language === "en" ? (
            <span>Sign up with Facebook</span>
          ) : (
            <span>ফেসবুক দিয়ে সাইন-আপ করুন </span>
          )}
        </div>
        <div className="soc--btn google">
          <img src={googleImg} alt="google" />
          {language === "en" ? (
            <span>Sign up with google</span>
          ) : (
            <span>গুগুল দিয়ে সাইন-আপ করুন</span>
          )}
        </div>
      </div>
      <div className="or__text">
        <hr />
        {language === "en" ? <span>OR</span> : <span>অথবা</span>}

        <hr />
      </div>
      {language === "en" ? (
        <h3 className="form__box--h3">Sign up using phone number</h3>
      ) : (
        <h3 className="form__box--h3">ফোন নাম্বার দিয়ে সাইন-আপ করুন</h3>
      )}

      <form className="user__form" onSubmit={clickSubmit}>
        <input
          placeholder={language === "en" ? "name (optional)" : "নাম (অপসনাল)"}
          onChange={handleChange("name")}
          type="text"
          className="form--input"
          value={name}
        />
        <input
          placeholder={language === "en" ? "Phone number" : "ফোন নাম্বার"}
          onChange={handleChange("userId")}
          type="text"
          className="form--input"
          value={userId}
          required
        />
        <input
          type="text"
          placeholder={language === "en" ? "password" : "পাসওয়ার্ড"}
          className="form--input"
          onChange={handleChange("password")}
          type="password"
          value={password}
          required
        />
        <input
          className="submit__btn margin__bottom20px"
          type="submit"
          value={language === "en" ? "Sign Up" : "সাইন-আপ"}
        />
      </form>
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

  const showSuccess = () => (
    <div
      className="alert__box alert--success"
      style={{ display: success ? "" : "none" }}
    >
      One Time Password is on process ...Please wait.
    </div>
  );
  const redirectUser = () => {
    if (redirectToReferrer) {
      // if (user && user.role === 1) {
      //   return <Redirect to="/admin/dashboard" />;
      // } else {
      //   return <Redirect to="/" />;
      // }
      console.log("user id signup:", userId);
      return <Redirect to={`/user/otp-v`} />;
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
