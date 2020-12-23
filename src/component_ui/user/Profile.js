import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { selectLanguageSelection } from "../../redux/settingsSlice";
import {
  setToken,
  setUser,
  selectUser,
  selectToken,
} from "../../redux/authSlice";
import "./profile.css";
import {
  signin,
  authenticate,
  verifyOtp,
  isAuthenticated,
  resendOtp,
  profileUpdate,
} from "../../auth/index";

import { notifyWarn, notifyError, notifySuccess } from "../dialog/Toast";

import {
  selectCartTotalAmount,
  selectCartProducts,
  emptyCart,
} from "../../redux/cartSlice";

import { setCustomDialog, setOtpDialog } from "../../redux/globalSlice";

import { englishToBangla } from "../../util/utils";
import Footer from "../footer/Footer";
import { useEffect } from "react";
import { createOrder } from "../../core/apiCore";
const Profile = () => {
  const dispatch = useDispatch();
  const language = useSelector(selectLanguageSelection);
  const totalAmount = useSelector(selectCartTotalAmount);
  const products = useSelector(selectCartProducts);

  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  const [values, setValues] = useState({
    name: "",
    contactName: "",
    contactNumber: "",
    contactAddress: "",
    area: "",
    error: "",
    redirectToReferrer: false,
    updateProfile: false,
    noContactName: false,
  });

  const {
    name,
    contactAddress,
    contactNumber,
    error,
    redirectToReferrer,
    contactName,
    area,
    updateProfile,
    noContactName,
  } = values;

  useEffect(() => {
    if (user) {
      if (user.address && user.address.length > 0) {
        let address = user.address[user.address.length - 1];
        let cName = "";
        let noCName = false;
        if (address.contactName) {
          cName = address.contactName;
        } else {
          cName = user.name;
          noCName = true;
        }
        console.log("noCName", noCName);
        let cNum;
        if (address.contactNumber) {
          cNum = address.contactNumber;
        } else {
          cNum = user.phoneNumber;
        }
        let contactAddress = "";
        if (address.contactAddress) {
          contactAddress = address.contactAddress;
        }
        let area = "Uttara";
        if (address.area) {
          area = address.area;
        }
        setValues({
          ...values,
          name: user.name,
          contactName: cName,
          contactNumber: cNum,
          contactAddress: contactAddress,
          area: area,
          noContactName: noCName,
        });
      } else {
        setValues({
          ...values,
          name: user.name,
          contactName: user.name,
          contactNumber: user.phoneNumber,
          noContactName: true,
        });
      }
    }
  }, []);

  const onClickVerify = () => {
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

    let phoneNumber = user.phoneNumber;

    resendOtp({ phoneNumber }).then((data) => {
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
        setValues({ ...values, error: data.error, success: false });
        if (language === "en") {
          notifyError("Failed to send OTP, please try again.");
        } else {
          notifyError(
            "ভেরিফিকেশন এসএমএস পাঠানো বিফল হইয়াছে, অনুগ্রহ করে আবার চেষ্টা করুন."
          );
        }
      } else {
        dispatch(setOtpDialog({ otpDialog: {open:true, redirectTo:""} }));
        setValues({
          ...values,
          loading: false,
        });
      }
    });
  };
  const handleChange = (field) => {
    return (event) => {
      console.log("noContactName", noContactName);
      if (field === "name" && noContactName) {
        setValues({
          ...values,
          error: false,
          updateProfile: true,
          [field]: event.target.value,
          contactName: event.target.value,
        });
      } else {
        setValues({
          ...values,
          error: false,
          updateProfile: true,
          [field]: event.target.value,
        });
      }
    };
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    if (updateProfile) {
      dispatch(
        setCustomDialog({
          customDialog: {
            open: true,
            englishMsg: "Updating your profile.. please wait.",
            banglaMsg:
              "আপনার প্রোফাইল আপডেট করা হচ্ছে... অনুগ্রহ করে অপেক্ষা করুন।",
          },
        })
      );

      const userId = user._id;

      let address = {
        contactName,
        contactNumber,
        contactAddress: contactAddress.trim(),
        area,
      };

      let verified = user.verified;
      let phoneNumber = user.phoneNumber;
      profileUpdate({ name, phoneNumber, verified, address }).then((data) => {
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
          if (language === "en") {
            notifyError("Failed to update profile, please try again.");
          } else {
            notifyError(
              "প্রোফাইল আপডেট বিফল হইয়াছে, অনুগ্রহ করে আবার চেষ্টা করুন."
            );
          }
        } else {
          if (language === "en") {
            notifySuccess("Successfully updated your profile");
          } else {
            notifySuccess("আপনার প্রোফাইল সফলভাবে আপডেট হইয়াছে");
          }
          dispatch(setUser({ user: data.user, encrypt: true }));

          setValues({
            ...values,
            redirectToReferrer: true,
          });
        }
      });
    }
  };
  const profileForm = () => (
    <div className="checkout--container">
      <form onSubmit={clickSubmit}>
        <div className="checkout--row">
          <label for="name">{language === "en" ? "Name" : "নাম"}</label>
          <input
            // type="text"
            // id="fname"
            // name="firstname"
            // className="checkout__input"
            id="name"
            placeholder={language === "en" ? "name" : "নাম "}
            onChange={handleChange("name")}
            type="text"
            className="checkout__input"
            maxlength="32"
            required
            value={name}
          />
        </div>
        <div className="profile__phone--number">
          <div className="contact__number">{user.phoneNumber}</div>
          {user.verified === 1 ? (
            <div type="submit" className="profile__verify--btn--inactive">
              {language === "en" ? "Verified" : "ভেরিফাইড"}
            </div>
          ) : (
            <div
              type="submit"
              className="checkout__input--submit"
              onClick={() => onClickVerify()}
            >
              {language === "en" ? "Verify" : "ভেরিফাই"}
            </div>
          )}
        </div>
        <span className="text--checkout">Address Book</span>
        <div className="checkout-form">
          <div className="checkout-form--input">
            <div className="checkout--row">
              <label for="contactName">
                {language === "en" ? "Contact Name" : "যোগাযোগের নাম"}
              </label>
              <input
                // type="text"
                // id="fname"
                // name="firstname"
                // className="checkout__input"
                id="contactName"
                placeholder={language === "en" ? "name" : "নাম "}
                onChange={handleChange("contactName")}
                type="text"
                className="checkout__input"
                value={contactName}
              />
            </div>

            <div className="checkout--row">
              <label for="contactNumber">
                {language === "en"
                  ? "Contact Phone number"
                  : "যোগাযোগের ফোন নাম্বার"}
              </label>
              <input
                id="contactNumber"
                placeholder={language === "en" ? "Phone number" : "ফোন নাম্বার"}
                onChange={handleChange("contactNumber")}
                type="number"
                className="checkout__input"
                value={contactNumber}
                required
              />
            </div>
            <div className="checkout--row">
              <label for="country">Area</label>
              <select id="country" name="country" className="checkout__input">
                <option value="australia" className="checkout__input">
                  Uttara
                </option>
              </select>
            </div>
            <div className="checkout--row">
              <label for="address">Address</label>
              <textarea
                id="address"
                placeholder={language === "en" ? "Address" : "ঠিকানা"}
                onChange={handleChange("contactAddress")}
                type="textarea"
                className="checkout__input"
                value={contactAddress}
                required
              />
            </div>
          </div>

          <div className="checkout--row">
            {updateProfile ? (
              <input
                type="submit"
                value={language === "en" ? "Confirm" : "নিশ্চিত করুন"}
                className="checkout__input--submit"
              />
            ) : (
              <input
                type="submit"
                value={language === "en" ? "Confirm" : "নিশ্চিত করুন"}
                className="profile__input--submit--inactive"
              />
            )}
          </div>
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

  const redirectUser = () => {
    if (user.status === 0) {
      return <Redirect to="/" />;
    }
  };
  return (
    <div className="">
      {profileForm()}
      {redirectUser()}
      <Footer></Footer>
    </div>
  );
};

export default Profile;
