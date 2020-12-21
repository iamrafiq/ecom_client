import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Toast() {
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
