import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { signin } from "../../auth/index";
import { selectLanguageSelection } from "../../redux/settingsSlice";
import { setToken, setUser, selectUser } from "../../redux/authSlice";
import "./user-forms.css";
import googleImg from "../../images/google_icon.svg";
import facebookImg from "../../images/facebook.svg";
import Footer from "../footer/Footer";
const SigninForm = () => {
  const dispatch = useDispatch();
  const language = useSelector(selectLanguageSelection);
  const user = useSelector(selectUser);

  const [values, setValues] = useState({
    phoneNumber: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  const { phoneNumber, password, loading, error, redirectToReferrer } = values;

  const handleChange = (field) => {
    return (event) => {
      setValues({ ...values, error: false, [field]: event.target.value });
    };
  };
  const clickSubmit = (event) => {
    event.preventDefault();
    console.log("submit....");
    setValues({ ...values, error: false, loading: true });
    phoneNumber.trim();
    signin({ phoneNumber, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        console.log("sign in data:", data);
        // dispatch(setAuthenticate({ authenticate: data }));
        dispatch(setToken({ token: data.token }));
        dispatch(setUser({ user: data.user, encrypt: true }));
          setValues({
            ...values,
            phoneNumber: "",
            password: "",
            error: "",
            loading: false,
            redirectToReferrer: true,
          });
        // authenticate(data, () => {
        //   setValues({
        //     ...values,
        //     phoneNumber: "",
        //     password: "",
        //     error: "",
        //     loading: false,
        //     redirectToReferrer: true,
        //   });
        // });
      }
    });
  };
  const signInFrom = () => (
    <div className="form__box">
      <div className="soc">
        <div className="soc--btn facebook">
          <img src={facebookImg} alt="facebook" />
          {language === "en" ? (
            <span>Sign in with Facebook</span>
          ) : (
            <span>ফেসবুক দিয়ে সাইন-ইন করুন </span>
          )}
        </div>
        <div className="soc--btn google">
          <img src={googleImg} alt="google" />
          {language === "en" ? (
            <span>Sign in with google</span>
          ) : (
            <span>গুগুল দিয়ে সাইন-ইন করুন</span>
          )}
        </div>
      </div>
      <div className="or__text">
        <hr />
        {language === "en" ? <span>OR</span> : <span>অথবা</span>}

        <hr />
      </div>
      {language === "en" ? (
        <h3 className="form__box--h3">Sign in using phone number</h3>
      ) : (
        <h3 className="form__box--h3">ফোন নাম্বার দিয়ে সাইন-ইন করুন</h3>
      )}

      <form className="user__form" onSubmit={clickSubmit}>
        <input
          placeholder={language === "en" ? "Phone number" : "ফোন নাম্বার"}
          onChange={handleChange("phoneNumber")}
          type="tex"
          className="form--input"
          value={phoneNumber}
          required
        />
        <input
          className="form--input"
          type="text"
          placeholder={language === "en" ? "password" : "পাসওয়ার্ড"}
          onChange={handleChange("password")}
          type="password"
          value={password}
          required
        />
        <input
          className="submit__btn"
          type="submit"
          value={language === "en" ? "Sign In" : "সাইন-ইন "}
        />
      </form>
      <Link
        className="forgot"
        to="/user/forgot"
        style={{ textDecoration: "none" }}
      >
        {language === "en" ? (
          <span> Forgot ?</span>
        ) : (
          <span> পাসওয়ার্ড ভুলে গেছেন ?</span>
        )}
      </Link>

      <div class="signup">
        <div className="signup__form">
          {language === "en" ? (
            <span> Not a member ?</span>
          ) : (
            <span> আপনি কি মেম্বার নন ?</span>
          )}
          <Link to="/user/signup" style={{ textDecoration: "none" }}>
            {language === "en" ? (
              <span className="signup--link"> Sign Up</span>
            ) : (
              <span className="signup--link"> সাইন-আপ</span>
            )}
          </Link>
        </div>
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
      if (user.verified === 1) {
        if (user && user.role === 1) {
          return <Redirect to="/admin/dashboard" />;
        } else {
          return <Redirect to="/user/dashboard" />;
        }
      }else{
        return <Redirect to={`/user/otp-v`} />;
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
