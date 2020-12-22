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
} from "../../auth/index";

import { notifyWarn } from "../dialog/Toast";

import {
  selectCartTotalAmount,
  selectCartProducts,
  emptyCart,
} from "../../redux/cartSlice";

import {
  setCustomDialog,
  setOtpDialog,
} from "../../redux/globalSlice";

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
    name:"",
    contactName: "",
    contactNumber: "",
    contactAddress: "",
    area: "",
    error: "",
    redirectToReferrer: false,
    updateProfile: false,
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
  } = values;


  useEffect(() => {
    if (user) {
      if (user.address && user.address.length > 0) {
        let address = user.address[user.address.length - 1];
        let cName = "";
        if (address.contactName) {
          cName = address.contactName;
        } else {
          cName = user.name;
        }
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
          contactName: cName,
          contactNumber: cNum,
          contactAddress: contactAddress,
          area: area,
        });
      } else {
        setValues({
          ...values,
          contactName: user.name,
          contactNumber: user.phoneNumber,
        });
      }
    }
  }, []);

  const onClickVerify = () =>{
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
            banglaMsg:
              "",
          },
        })
      );
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
        if (language === "en"){
          notifyWarn("Failed to send OTP please try again.")
        }else{
          notifyWarn("ভেরিফিকেশন এসএমএস পাঠানো বিফল হইয়াছে, আবার চেষ্টা করুন.")

        }
      
      } else {
        dispatch(setOtpDialog({ otpDialog: true }));
        setValues({
          ...values,
          loading: false,
        });
      }
    });
  }
  const handleChange = (field) => {
    return (event) => {
      setValues({ ...values, error: false, [field]: event.target.value });
    };
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    console.log("submit....");
    setValues({ ...values, error: false, loading: true });
    contactNumber.trim();
    const userId = user._id;
   

    // console.log("user id:", userId);

    // console.log(checkoutProducts());
    // createOrder(userId, token, createOrderData).then((data) => {
    //   if (data.error) {
    //     setValues({ ...values, error: data.error, loading: false });
    //   } else {
    //     console.log("sign in data:", data);
    //     dispatch(emptyCart());
    //   }
    // });
  };
  const signInFrom = () => (
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
            <div type="submit" className="checkout__input--submit" onClick = {()=>onClickVerify()}>
              {language === "en" ? "Verify" : "ভেরিফাই"}
            </div>
          )}
        </div>
        <span className="text--checkout">Address Book</span>
        <div className="checkout-form">
          <div className="checkout-form--input">
            <div className="checkout--row">
              <label for="name">{language === "en" ? "Name" : "নাম"}</label>
              <input
                // type="text"
                // id="fname"
                // name="firstname"
                // className="checkout__input"
                id="name"
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
            <input
              type="submit"
              value={language === "en" ? "Checkout" : "ক্রয় করুন"}
              className="checkout__input--submit"
            />
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
    if (redirectToReferrer) {
      if (user.verified === 1) {
        if (user && user.role === 1) {
          return <Redirect to="/admin/dashboard" />;
        } else {
          return <Redirect to="/user/dashboard" />;
        }
      } else {
        return <Redirect to={`/user/otp-v`} />;
      }
    }
  };
  return (
    <div className="">
      {showError()}
      {signInFrom()}
      {redirectUser()}
      <Footer></Footer>
    </div>
  );
};

export default Profile;
