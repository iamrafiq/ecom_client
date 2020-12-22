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
export const notifyInfo = (msg) => toast.info(msg);
export const notifySuccess = (msg) => toast.success(msg);
export const notifyWarn = (msg) => toast.warn(msg);
export const notifyError = (msg) => toast.error(msg);
export const notifyDark = (msg) => toast.dark(msg);
