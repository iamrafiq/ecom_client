import React, { useState } from "react";
import { Redirect, Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signin } from "../../auth/index";
import {
  selectLanguageSelection,
  selectDeviceTypeSelection,
} from "../../redux/settingsSlice";
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
  emptyCart,
} from "../../redux/cartSlice";
import { setCustomDialog, selectCustomDialog } from "../../redux/globalSlice";
import { englishToBangla } from "../../util/utils";
import Footer from "../footer/Footer";
import { useEffect } from "react";
import { createOrder } from "../../core/apiCore";
import { profileUpdate } from "../../auth/index";
import { ToastContainer, toast } from "react-toastify";
import { notifySuccess, notifyError } from "../dialog/Toast";
import "react-toastify/dist/ReactToastify.css";

const Checkout = () => {
  const dispatch = useDispatch();
  const language = useSelector(selectLanguageSelection);
  const deviceType = useSelector(selectDeviceTypeSelection);
  const customDialog = useSelector(selectCustomDialog);

  const totalAmount = useSelector(selectCartTotalAmount);
  const products = useSelector(selectCartProducts);
  const history = useHistory();
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  const [values, setValues] = useState({
    contactName: "",
    contactNumber: "",
    contactAddress: "",
    area: "",
    error: "",
    redirectToReferrer: false,
    updateProfile: false,
  });

  const {
    contactAddress,
    contactNumber,
    error,
    redirectToReferrer,
    contactName,
    area,
    updateProfile,
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
          : ele.product.mrp,
      };
    });
  };
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

  const handleChange = (field) => {
    return (event) => {
      setValues({
        ...values,
        updateProfile: true,
        error: false,
        [field]: event.target.value,
      });
    };
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    if (products.length > 0) {
      setValues({ ...values, error: false });

      // contactNumber.trim();
      contactAddress.trim();
      const userId = user._id;
      const createOrderData = {
        products: checkoutProducts(),
        amount: totalAmount,
        contactAddress,
        area,
        contactNumber,
        contactName,
      };

      console.log("user id:", userId);

      console.log(checkoutProducts());
      dispatch(
        setCustomDialog({
          customDialog: {
            open: true,
            englishMsg: "Your order is processing... please wait.",
            banglaMsg:
              "আপনার অর্ডার টি প্রসেস করা হচ্ছে... অনুগ্রহ করে অপেক্ষা করুন।",
          },
        })
      );
      createOrder(userId, token, createOrderData).then((data) => {
        if (data.error) {
          dispatch(
            setCustomDialog({
              customDialog: {
                open: false,
                englishMsg: "",
                banglaMsg: "",
              },
            })
          );
          setValues({ ...values, error: data.error });
          if (language === "en") {
            notifyError(`Failed to place your order, please try again`);
          } else {
            notifyError(`আপনার অর্ডার স্থাপন বিফল হইয়াছে, অনুগ্রহ করে আবার চেষ্টা করুন`);
          }
        } else {
          dispatch(emptyCart());
          if (language === "en") {
            notifySuccess(`Your order successfully placed.`);
          } else {
            notifySuccess(`আপনার অর্ডার সফলভবে স্থাপন করা  হইয়াছে `);
          }
          if (updateProfile) {
            let address = {
              contactName,
              contactNumber,
              contactAddress,
              area,
            };
            let verified = user.verified;
            let phoneNumber = user.phoneNumber;
            profileUpdate({ phoneNumber, verified, address }).then((data) => {
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
                setValues({
                  ...values,
                  redirectToReferrer: true,
                });
              } else {
                dispatch(setUser({ user: data.user, encrypt: true }));
                setValues({
                  ...values,
                  redirectToReferrer: true,
                });
              }
            });
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
          }
        }
      });
    } else {
    }
  };
  const checkoutFrom = () => (
    <div className="checkout--container">
      <React.Fragment>
        {" "}
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
                  placeholder={language === "en" ? "name" : "নাম"}
                  onChange={handleChange("contactName")}
                  type="text"
                  className="checkout__input"
                  value={contactName}
                  required
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
                  placeholder={
                    language === "en" ? "Phone number" : "ফোন নাম্বার"
                  }
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
      </React.Fragment>
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

  const showNoProducts = () => {
    // if (notifyAddP){
    //   setValues({ ...values, notifyAddP: false });
    if (products.length <= 0) {
      // notifyAddProduct();
      return history.push("/");
    }
    //}
  };

  const redirectUser = () => {
    console.log("rediricting .............user to home", redirectToReferrer);
    if (redirectToReferrer) {
      console.log("rediricting .............user to home, enter");

      return <Redirect to={`/`} />;
    }
  };
  return (
    <div className="">
      {showError()}
      {showNoProducts()}
      {checkoutFrom()}
      {redirectUser()}

      <Footer></Footer>
    </div>
  );
};

export default Checkout;
