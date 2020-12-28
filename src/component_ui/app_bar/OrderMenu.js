import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  selectResolutionSelection,
  selectLanguageSelection,
  setLanguage,
} from "../../redux/settingsSlice";
import "./navmenu.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import orderImage from "../../images/order.svg";
import enFlag from "../../images/en.png";
import LanguagePopup from "./LanguagePopup";
import { RadioGroup, Radio } from "react-radio-group";
import { useHistory } from "react-router-dom";
import {
  setOtpDialog,
  setSigninDialog,
  setSignupDialog,
  setCustomDialog
} from "../../redux/globalSlice";
import { selectUser } from "../../redux/authSlice";
import { resendOtp } from "../../auth/index";

var FontAwesome = require("react-fontawesome");

export default function OrderMenu() {
  const history = useHistory();
  const dispatch = useDispatch();
  const resulationSelector = useSelector(selectResolutionSelection);
  const language = useSelector(selectLanguageSelection);
  const user = useSelector(selectUser);
  const onClickReturnAndOrder = () =>{
    if (user.status === 0) {
      dispatch(setSignupDialog({ signupDialog: {open:true, redirectTo:"/user/order"} }));
    }else{
      if (user.verified === 1){
        history.push("/user/order");
      }else{
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
        const phoneNumber = user.phoneNumber;
        resendOtp({ phoneNumber }).then((data) => {
          if (data.error) {
            // setValues({ ...values, error: data.error, success: false });
          }
          dispatch(
            setCustomDialog({
              customDialog: { open: false, englishMsg: "", banglaMsg: "" },
            })
          );
          dispatch(
            setOtpDialog({
              otpDialog: {open:true, redirectTo:"/user/order"},
            })
          );
        });
      }
    }
  }

  return (
    <div className="menu-item menu__cart" onClick = {()=>onClickReturnAndOrder()}>
      { language == "en" ? (
        <span className="sigin__text">
          <span className="sigin__text--siginin">Returns</span>
          <span className="sigin__text--account">&#38;&nbsp;Orders</span>
        </span>
      ) : (
        <span className="sigin__text">
          <span className="sigin__text--siginin">রিটার্ন</span>
          <span className="sigin__text--account">&#38;&nbsp;অর্ডার</span>
        </span>
      )}
    </div>
  );
}
