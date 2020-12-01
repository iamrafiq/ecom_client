import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  signin,
  authenticate,
  verifyOtp,
  isAuthenticated,
  resendOtp,
} from "../../auth/index";
import {
  selectLanguageSelection,
  setAuthenticate,
} from "../../redux/settingsSlice";
import {
  selectUser
} from "../../redux/authSlice";
import {
  setUser
} from "../../redux/authSlice";
import "./user-forms.css";

import Footer from "../footer/Footer";
import { useEffect } from "react";
import { englishToBangla } from "../../util/utils";
const OtpVerificationForm = () => {
  let resendTime = 5;
  const dispatch = useDispatch();
  const language = useSelector(selectLanguageSelection);
  const userUnverified = useSelector(selectUser);
  const [timeLeft, setTimeLeft] = useState(resendTime);
  const [values, setValues] = useState({
    otp: "",
    error: "",
    success: false,
    user: "",
    redirectToReferrer: false,
  });

  const { otp, success, error, redirectToReferrer, user } = values;
  const {phoneNumber} = userUnverified;
  useEffect(() => {
    if (!timeLeft) return;
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);
  // setValues({ ...values, phoneNumber: 1238, password:123 });

  const handleChange = (field) => {
    return (event) => {
      setValues({ ...values, error: false, [field]: event.target.value });
    };
  };
  const onClickResend = () => {
    setTimeLeft(resendTime);
    setValues({
      ...values,
      otp: "",
      error: "",
      success: true,
    });
    resendOtp({ phoneNumber }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      }
    });
  };
  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    otp.trim();
    verifyOtp({ phoneNumber, otp }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
            dispatch(setUser({user:data.user, encrypt:true}));
        setValues({
          ...values,
          otp: "",
          error: "",
          success: true,
          redirectToReferrer: true,
        });
      }
    });
  };
  const otpForm = () => (
    <div className="form__box">
      {language === "en" ? (
        <h3 className="form__box--h3">
          A One Time Password has been sent to {phoneNumber}{" "}
          <br/> Please enter the OTP bellow to verify your account
        </h3>
      ) : (
        <h3 className="form__box--h3">
          আমরা {phoneNumber} নাম্বারে ৪ সংখ্যার পিন পাঠিয়েছি, অনুগ্রহ করে পিন
          ব্যাবহার করে আপনার একাউন্ট ভেরিফাই করে নিন।
        </h3>
      )}

      <form className="user__form" onSubmit={clickSubmit}>
        <input
          placeholder={
            language === "en" ? "Enter 4 digit pin" : "৪ সংখ্যার পিন এখানে দিন"
          }
          onChange={handleChange("otp")}
          type="text"
          className="form--input"
          value={otp}
          required
        />
        <div className="otp__btns">
          <input
            className="submit__btn margin__bottom20px"
            type="submit"
            value={language === "en" ? "Verify" : "ভেরিফাই"}
          />
          {timeLeft ? (
            <div className="submit__btn resend--inactive">
              <span>
                {language == "en" ? (
                  <span>{timeLeft}</span>
                ) : (
                  <span>{englishToBangla(timeLeft)}</span>
                )}
              </span>
              <span>&nbsp; {language === "en" ? "" : "আবার পাঠান"}</span>
            </div>
          ) : (
            <div
              className="submit__btn resend--active"
              onClick={() => onClickResend()}
            >
              <span>
                &nbsp; {language === "en" ? "Send Again" : "আবার পাঠান"}
              </span>
            </div>
          )}
        </div>
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
      New account is created. Signing ...Please wait
    </div>
  );
  const noPhoneNumberGoToHome = () => {
    if (!phoneNumber) {
      return <Redirect to="/" />;
    }
  };
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
      {otpForm()}
      {redirectUser()}
      {noPhoneNumberGoToHome()}
      <Footer></Footer>
    </div>
  );
};

export default OtpVerificationForm;
