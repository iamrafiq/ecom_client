import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { signin, signup } from "../../auth/index";
import {
  selectLanguageSelection,
  setAuthenticate,
} from "../../redux/settingsSlice";
import { selectUser, setUser } from "../../redux/authSlice";
import {
  setSignupDialog,
  setOtpDialog,
  setSigninDialog,
  setCustomDialog,
  selectCustomDialog,
} from "../../redux/globalSlice";

import "./user-forms.css";
import googleImg from "../../images/google_icon.svg";
import facebookImg from "../../images/facebook.svg";
import Footer from "../footer/Footer";
import LoadingBar from "../../util/LoadingBar";

const SignupForm = () => {
  const dispatch = useDispatch();
  const language = useSelector(selectLanguageSelection);
  const user = useSelector(selectUser);
  const customDialog = useSelector(selectCustomDialog);

  const [values, setValues] = useState({
    // name: "",
    phoneNumber: "",
    password: "",
    error: "",
    success: false,
    loading: false,
    redirectToReferrer: false,
  });

  const {
    // name,
    phoneNumber,
    // password,
    success,
    error,
    redirectToReferrer,
    loading,
  } = values;

  const handleChange = (field) => {
    return (event) => {
      setValues({ ...values, error: false, [field]: event.target.value });
    };
  };
  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    // name.trim();
    phoneNumber.trim();
    // let sendOtp =true;
    let aiId = user.aiId;
    console.log("user.........aid", user);
    let status = 1;
    // let address = {
    //   area:"Uttara",
    //   contactNumber:"1211211232",
    //   contactName:"Abul",
    //   contactAddress:"address uttara"
    // }
    dispatch(
      setCustomDialog({
        customDialog: {
          open: true,
          englishMsg: "Sending verification sms... please wait",
          banglaMsg:
            "ভেরিফিকেশন এসএমএস পাঠানো হচ্ছে ... অনুগ্রহ করে অপেক্ষা করুন ",
        },
      })
    );

    signup({ aiId, phoneNumber, status }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
        dispatch(
          setCustomDialog({
            customDialog: {
              open: false,
              englishMsg: "",
              banglaMsg: "",
            },
          })
        );
      } else {
        // setValues({
        //   ...values,
        //   error: "",
        //   phoneNumber: "",
        //   success: true,
        //   redirectToReferrer: true,
        // });
        dispatch(setUser({ user: data.user, encrypt: true }));
        signin({ aiId, phoneNumber }).then((data) => {
          dispatch(
            setCustomDialog({
              customDialog: {
                open: false,
                englishMsg: "",
                banglaMsg: "",
              },
            })
          );
          if (data.error) {
            setValues({ ...values, error: data.error, loading: false });
          } else {
            // dispatch(setToken({token:data.token}));
            // dispatch(setUser({user:data.user, encrypt:true}));
            dispatch(setSignupDialog({ signinDialog: false }));
            if (data.otpSent) {
              // setOtpSent(true);
              dispatch(setOtpDialog({ otpDialog: true }));
            }
            setValues({
              ...values,
              error: "",
              phoneNumber: "",
              success: true,
              redirectToReferrer: false,
              loading: false,
            });
          }
        });
      }
    });
  };
  const signUpFrom = () => (
    <div className="form__box">
      {false ? (
        <React.Fragment>
          <React.Fragment>
            <LoadingBar
              loading={loading}
              message={
                language === "en"
                  ? "Sending verification sms... please wait"
                  : "ভেরিফিকেশন এসএমএস পাঠানো হচ্ছে ... অনুগ্রহ করে অপেক্ষা করুন "
              }
            ></LoadingBar>
          </React.Fragment>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {/* <div className="soc">
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
          </div> */}
          {/* <div className="or__text">
            <hr />
            {language === "en" ? <span>OR</span> : <span>অথবা</span>}

            <hr />
          </div> */}
          {language === "en" ? (
            <h3 className="form__box--h3">Sign up using phone number</h3>
          ) : (
            <h3 className="form__box--h3">ফোন নাম্বার দিয়ে সাইন-আপ করুন</h3>
          )}

          <form className="user__form" onSubmit={clickSubmit}>
            {/* <input
          placeholder={language === "en" ? "name (optional)" : "নাম (অপসনাল)"}
          onChange={handleChange("name")}
          type="text"
          className="form--input"
          value={name}
        /> */}
            <input
              placeholder={language === "en" ? "Phone number" : "ফোন নাম্বার"}
              onChange={handleChange("phoneNumber")}
              type="number"
              className="form--input"
              value={phoneNumber}
              required
            />
            {/* <input
          type="text"
          placeholder={language === "en" ? "password" : "পাসওয়ার্ড"}
          className="form--input"
          onChange={handleChange("password")}
          type="password"
          value={password}
          required
        /> */}
            <input
              className="submit__btn margin__bottom20px"
              type="submit"
              value={language === "en" ? "Sign Up" : "সাইন-আপ"}
            />
          </form>

          <div
            class="signup"
            onClick={() => {
              dispatch(setSigninDialog({ signinDialog: true }));
              dispatch(setSignupDialog({ signupDialog: false }));
            }}
            style={{ cursor: "pointer" }}
          >
            <div className="signup__form">
              {language === "en" ? (
                <span> Already a member ?</span>
              ) : (
                <span> আপনি কি আমাদের মেম্বার?</span>
              )}
              <div>
                {language === "en" ? (
                  <span className="signup--link"> Sign In</span>
                ) : (
                  <span className="signup--link"> সাইন-ইন</span>
                )}
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
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
      return <Redirect to={`/user/otp-v`} />;
    }
  };
  return (
    <div className="">
      {showSuccess()}
      {showError()}
      {signUpFrom()}
      {redirectUser()}
      {/* <Footer></Footer> */}
    </div>
  );
};

export default SignupForm;
