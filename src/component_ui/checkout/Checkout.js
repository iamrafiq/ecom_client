import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { signin } from "../../auth/index";
import { selectLanguageSelection } from "../../redux/settingsSlice";
import { setToken, setUser, selectUser } from "../../redux/authSlice";
import "./checkout.css";
import googleImg from "../../images/google_icon.svg";
import facebookImg from "../../images/facebook.svg";
import cashOnDeliveryImg from "../../images/cash-on-delivery.png";
import oneHourImg from "../../images/1-hour.png";
import { selectCartTotalAmount } from "../../redux/cartSlice";

import { englishToBangla } from "../../util/utils";
import Footer from "../footer/Footer";
const Checkout = () => {
  const dispatch = useDispatch();
  const language = useSelector(selectLanguageSelection);
  const cartTotal = useSelector(selectCartTotalAmount);

  const user = useSelector(selectUser);

  const [values, setValues] = useState({
    userId: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  const { userId, password, loading, error, redirectToReferrer } = values;

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
        console.log("sign in data:", data);
        // dispatch(setAuthenticate({ authenticate: data }));
        dispatch(setToken({ token: data.token }));
        dispatch(setUser({ user: data.user, encrypt: true }));
        setValues({
          ...values,
          userId: "",
          password: "",
          error: "",
          loading: false,
          redirectToReferrer: true,
        });
        // authenticate(data, () => {
        //   setValues({
        //     ...values,
        //     userId: "",
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
    <div className="checkout--container">
      <span className="text--checkout">Checkout</span>
      <form>
        <div className="checkout-form">
          <div className="checkout-form--input">
            <div className="checkout--row">
              <label for="fname">Name</label>
              <input
                type="text"
                id="fname"
                name="firstname"
                placeholder="Your name.."
                className="checkout__input"
              />
            </div>

            <div className="checkout--row">
              <label for="lname">Mobile Number</label>
              <input
                type="text"
                id="lname"
                name="lastname"
                placeholder="Your mobile number"
                className="checkout__input"
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
              <label for="lname">Address</label>
              <textarea
                type="textarea"
                id="lname"
                name="lastname"
                placeholder="Delivery address"
                className="checkout__input"
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
                <span>{cartTotal}</span>
              </div>
              <hr className="hr--padding-left" />
              <div className="checkout--text--space--between cart--total">
                <span>Sub total</span>
                <span>{cartTotal}</span>
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
                <span>{englishToBangla(cartTotal)}</span>
              </div>
              <hr className="hr--padding-left" />
              <div className="checkout--text--space--between cart--total">
                <span>মোট মূল্য</span>
                <span>{englishToBangla(cartTotal)}</span>
              </div>
            </div>
          )}

          <div className="checkout--row">
            <input
              type="submit"
              value="Checkout"
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
