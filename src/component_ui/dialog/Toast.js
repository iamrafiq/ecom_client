import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  setSigninDialog,
  selectSigninDialog,
  setOtpDialog,
  selectOtpDialog,
  selectSignupDialog,
  setSignupDialog,
  setCustomDialog,
  selectCustomDialog,
} from "../../redux/globalSlice";
import PureModal from "react-pure-modal";
import "../pure-modal.css";
import SigninForm from "../user/SigninForm";
import OtpVerificationForm from "../user/OtpVerificationForm";
import SignupForm from "../user/SignupForm";
import CustomLoadingDialog from "../user/CustomLoadingDialog";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Toast() {
  const dispatch = useDispatch();
  const signinDialog = useSelector(selectSigninDialog);
  const otpDialog = useSelector(selectOtpDialog);
  const signupDialog = useSelector(selectSignupDialog);
  const customDialog = useSelector(selectCustomDialog);

  return (
    <div>
      <ToastContainer />
    </div>
  );
}
export const notifyAddProduct = (language) =>
  toast.info(
    `${
      language === "en"
        ? "Please add products in your cart."
        : "আপনার ব্যাগে পণ্য যোগ করুন"
    }`
  );

export const notifyPlaceOrderSuccess = (language) =>
  toast.success(
    `${
      language === "en"
        ? "Your order successfully placed"
        : "আপনার অর্ডার সফলভবে স্থাপন করা  হইয়াছে "
    }`
  );
export const notifyPlaceOrderFailed = (language) =>
  toast.warn(
    `${
      language === "en"
        ? "Failed to place your order, please try again"
        : "আপনার অর্ডার স্থাপন বিফল হইয়াছে, আবার চেষ্টা করুন "
    }`
  );
