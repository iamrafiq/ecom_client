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
import { selectUser } from "../../redux/authSlice";
import { setUser, setToken } from "../../redux/authSlice";
import "./user-forms.css";

import Footer from "../footer/Footer";
import { useEffect } from "react";
import { englishToBangla } from "../../util/utils";
import { setOtpDialog } from "../../redux/globalSlice";
import LoadingBar from "../../util/LoadingBar";

const OtpVerificationForm = () => {
  let resendTime = 30;
  const dispatch = useDispatch();
  const language = useSelector(selectLanguageSelection);
  const user = useSelector(selectUser);
  const [timeLeft, setTimeLeft] = useState(resendTime);
  const [values, setValues] = useState({
    otp: "",
    error: "",
    success: false,
    redirectToReferrer: false,
    loading: false,
    otpSendingMessage: "",
    otpSendingMessageBengali: "",
  });

  const {
    otp,
    success,
    error,
    redirectToReferrer,
    loading,
    otpSendingMessage,
    otpSendingMessageBengali,
  } = values;
  console.log("ussssser", user);
  const { phoneNumber, aiId } = user;
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
      loading: true,
      otpSendingMessage: "New OTP is on the way ...Please wait",
      otpSendingMessageBengali:
        "নতুন OTP পাঠানো হইয়াছে... অনুগ্রহ করে অপেক্ষা করুন",
    });
    resendOtp({ phoneNumber }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          loading: false,
        });
      }
    });
  };
  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({
      ...values,
      error: false,
      loading: true,
      otpSendingMessage: "Verifying your phone number... please wait.",
      otpSendingMessageBengali:
        "আপনার ফোন নাম্বার ভেরিফাই করা হচ্ছে ... অনুগ্রহ করে অপেক্ষা করুন",
    });
    otp.trim();
    verifyOtp({ aiId, phoneNumber, otp }).then((data) => {
      console.log("otp verify data:", data);
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        if (data.user) {
          dispatch(setUser({ user: data.user, encrypt: true }));
        }
        if (data.token) {
          dispatch(setToken({ token: data.token, encrypt: true }));
        }

        dispatch(setOtpDialog({ otpDialog: false }));

        setValues({
          ...values,
          otp: "",
          error: "",
          success: true,
          redirectToReferrer: true,
          loading: false,
        });
      }
    });
  };
  const otpForm = () => (
    <div className="form__box">
      {loading ? (
        <React.Fragment>
          <LoadingBar
            loading={loading}
            message={
              language === "en" ? otpSendingMessage : otpSendingMessageBengali
            }
          ></LoadingBar>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {language === "en" ? (
            <h3 className="form__box--h3">
              A One Time Password has been sent to {phoneNumber} <br /> Please
              enter the OTP bellow to verify your account
            </h3>
          ) : (
            <h3 className="form__box--h3">
              আমরা {phoneNumber} নাম্বারে ৪ সংখ্যার পিন পাঠিয়েছি, অনুগ্রহ করে
              পিন ব্যাবহার করে আপনার একাউন্ট ভেরিফাই করে নিন।
            </h3>
          )}

          <form className="user__form" onSubmit={clickSubmit}>
            <input
              placeholder={
                language === "en"
                  ? "Enter 4 digit pin"
                  : "৪ সংখ্যার পিন এখানে দিন"
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
      {language === "en" ? (
        <span>{otpSendingMessage}</span>
      ) : (
        <span>{otpSendingMessageBengali}</span>
      )}
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
      {/* <Footer></Footer> */}
    </div>
  );
};

export default OtpVerificationForm;
