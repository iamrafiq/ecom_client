import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { signin } from "../../auth/index";
import { selectLanguageSelection } from "../../redux/settingsSlice";
import {
  setToken,
  setUser,
  selectUser,
  selectToken,
} from "../../redux/authSlice";
import "./checkout.css";
import googleImg from "../../images/google_icon.svg";
import facebookImg from "../../images/facebook.svg";
import cashOnDeliveryImg from "../../images/cash-on-delivery.png";
import oneHourImg from "../../images/1-hour.png";
import {
  selectCartTotalAmount,
  selectCartProducts,
} from "../../redux/cartSlice";

import { englishToBangla } from "../../util/utils";
import Footer from "../footer/Footer";
import { useEffect } from "react";
import { createOrder } from "../../core/apiCore";
const Checkout = () => {
  const dispatch = useDispatch();
  const language = useSelector(selectLanguageSelection);
  const totalAmount = useSelector(selectCartTotalAmount);
  const products = useSelector(selectCartProducts);

  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  const [values, setValues] = useState({
    name: "",
    contactNumber: "",
    address: "",
    area: "",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  const {
    address,
    contactNumber,
    loading,
    error,
    redirectToReferrer,
    name,
    area,
  } = values;

  const checkoutProducts = () => {
    return products.map((ele, index) => {
      
      return {
        _id: ele.product._id,
        productCode: ele.product.productCode,
        name: ele.product.name,
        count: ele.qtyCart,
        price: ele.product.applyDiscounts
        ? ele.product.cropPrice
        : ele.product.mrp
      };
    });
  };
  useEffect(() => {
    if (user) {
      setValues({
        ...values,
        name: user.name,
        contactNumber: user.phoneNumber,
        address: user.address,
        area: "Uttara",
      });
    }
  }, []);

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
    address.trim();
    const userId = user._id;
    const createOrderData = {
      products: checkoutProducts(),
      amount: totalAmount,
      address,
      area,
      contactNumber,
      name,
    };

    console.log("user id:", userId);

    console.log(checkoutProducts());
    createOrder(userId, token, createOrderData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        console.log("sign in data:", data);
      }
    });
  };
  const signInFrom = () => (
    <div className="checkout--container">
      <span className="text--checkout">Checkout</span>
      <form onSubmit={clickSubmit}>
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
                placeholder={
                  language === "en" ? "name (optional)" : "নাম (অপসনাল)"
                }
                onChange={handleChange("name")}
                type="text"
                className="checkout__input"
                value={name}
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
                onChange={handleChange("address")}
                type="textarea"
                className="checkout__input"
                value={address}
                required
              />
            </div>
          </div>
          <div className="chekout-form--info">
            <div className="payment__method">
              <img src={cashOnDeliveryImg} alt="" />
              <span> Cash on delivery</span>
            </div>
            <div className="delivery__time">
              <img src={oneHourImg} alt="Cash on delivery" />
              <span>1 hour express delivery</span>
            </div>
          </div>
          {language === "en" ? (
            <div className="chekout-form--total">
              <div className="checkout--text--space--between deliver--charge">
                <span>Delivery charge</span>
                <span>0</span>
              </div>
              <div className="checkout--text--space--between cart--total">
                <span>Cart total</span>
                <span>{totalAmount}</span>
              </div>
              <hr className="hr--padding-left" />
              <div className="checkout--text--space--between cart--total">
                <span>Sub total</span>
                <span>{totalAmount}</span>
              </div>
            </div>
          ) : (
            <div className="chekout-form--total">
              <div className="checkout--text--space--between deliver--charge">
                <span>ডেলিভারি চার্জ </span>
                <span>{englishToBangla(0)}</span>
              </div>
              <div className="checkout--text--space--between cart--total">
                <span>পণ্যে সমূহের মূল্য</span>
                <span>{englishToBangla(totalAmount)}</span>
              </div>
              <hr className="hr--padding-left" />
              <div className="checkout--text--space--between cart--total">
                <span>মোট মূল্য</span>
                <span>{englishToBangla(totalAmount)}</span>
              </div>
            </div>
          )}

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
      } else {
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

export default Checkout;
