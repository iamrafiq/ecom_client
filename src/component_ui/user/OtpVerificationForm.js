import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
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
import {
  setOtpDialog,
  setCustomDialog,
  selectCustomDialog,
  selectOtpDialog,
} from "../../redux/globalSlice";
import { notifyWarn, notifySuccess } from "../dialog/Toast";

import LoadingBar from "../../util/LoadingBar";

const OtpVerificationForm = () => {
  const history = useHistory();
  let resendTime = 30;
  const dispatch = useDispatch();
  const language = useSelector(selectLanguageSelection);
  const user = useSelector(selectUser);
  const customDialog = useSelector(selectCustomDialog);
  const otpDialog = useSelector(selectOtpDialog);
  const [timeLeft, setTimeLeft] = useState(resendTime);

  const [values, setValues] = useState({
    otp: "",
    error: "",
    success: false,
    redirectToReferrer: false,
    loading: false,
    msgWrongOtp: false,
  });

  const {
    otp,
    success,
    error,
    redirectToReferrer,
    loading,
    msgWrongOtp,
  } = values;
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
      msgWrongOtp: false,
    });
    dispatch(setOtpDialog({ otpDialog: { open: false, redirectTo: "" } }));
    dispatch(
      setCustomDialog({
        customDialog: {
          open: true,
          englishMsg: "New OTP is on the way ...Please wait",
          banglaMsg: "নতুন OTP পাঠানো হচ্ছে... অনুগ্রহ করে অপেক্ষা করুন",
        },
      })
    );
    resendOtp({ phoneNumber }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
        if (language === "en") {
          notifyWarn("Failed to send OTP please try again.");
        } else {
          notifyWarn("ভেরিফিকেশন এসএমএস পাঠানো বিফল হইয়াছে, আবার চেষ্টা করুন.");
        }
      } else {
        dispatch(
          setCustomDialog({
            customDialog: {
              open: false,
              englishMsg: "",
              banglaMsg: "",
            },
          })
        );
        dispatch(
          setOtpDialog({
            otpDialog: { open: true, redirectTo: otpDialog.redirectTo },
          })
        );

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
      msgWrongOtp: false,
    });
    // dispatch(setOtpDialog({ otpDialog: false }));

    dispatch(
      setCustomDialog({
        customDialog: {
          open: true,
          englishMsg: "Verifying your phone number... please wait.",
          banglaMsg:
            "আপনার ফোন নাম্বার ভেরিফাই করা হচ্ছে ... অনুগ্রহ করে অপেক্ষা করুন",
        },
      })
    );

    otp.trim();
    verifyOtp({ aiId, phoneNumber, otp }).then((data) => {
      console.log("otp verify data:", data);
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
        setTimeLeft(0);
        setValues({
          ...values,
          error: data.error,
          success: false,
          msgWrongOtp: true,
        });
      } else {
        if (data.user) {
          dispatch(setUser({ user: data.user, encrypt: true }));
        }
        if (data.token) {
          dispatch(setToken({ token: data.token, encrypt: true }));
        }

        let redirectTo = otpDialog.redirectTo;
        console.log("redirectTo",redirectTo)
        dispatch(setOtpDialog({ otpDialog: { open: false, redirectTo: "" } }));
        console.log("redirectTo",redirectTo)

        if (language === "en") {
          notifySuccess("Verification successfull.");
        } else {
          notifySuccess("ভেরিফিকেশন সফল হইয়াছে।");
        }
        setValues({
          ...values,
          otp: "",
          error: "",
          success: true,
          redirectToReferrer: true,
          loading: false,
        });

        if (redirectTo && redirectTo.length > 0) {
          history.push(redirectTo);
        }
      }
    });
  };
  const otpForm = () => (
    <div className="form__box">
      <React.Fragment>
        {language === "en" ? (
          <h3 className="form__box--h3">
            {msgWrongOtp ? (
              <span style={{ color: "red" }}>
                Please write correct OTP or press on Resend button.
              </span>
            ) : (
              ` A One Time Password has been sent to ${phoneNumber} Please
              enter the OTP bellow to verify your account`
            )}
          </h3>
        ) : (
          <h3 className="form__box--h3">
            {msgWrongOtp ? (
              <span style={{ color: "red" }}>
                অনুগ্রহ করে সঠিক OTP প্রদান করুন অথবা আবার পাঠান এ ক্লিক করুন।
              </span>
            ) : (
              `আমরা ${phoneNumber} নাম্বারে ৪ সংখ্যার পিন পাঠিয়েছি, অনুগ্রহ করে
              পিন ব্যাবহার করে আপনার একাউন্ট ভেরিফাই করে নিন।`
            )}
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
            <input
              className="submit__btn margin__bottom20px"
              type="submit"
              value={language === "en" ? "Verify" : "ভেরিফাই"}
            />
          </div>
        </form>
      </React.Fragment>
    </div>
  );

  return <div className="">{otpForm()}</div>;
};

export default OtpVerificationForm;
