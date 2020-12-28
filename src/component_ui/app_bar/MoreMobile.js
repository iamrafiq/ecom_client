import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  signin,
  signout,
  authenticate,
  isAuthenticated,
} from "../../auth/index";

import {
  selectLanguageSelection,
  selectDeviceTypeSelection,
  setLanguage,
} from "../../redux/settingsSlice";
import {
  selectUser,
  setToken,
  setUser,
  initAiUser,
} from "../../redux/authSlice";

import "./navmenu.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import userImage from "../../images/user.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBasket,
  faTruckMoving,
  faEllipsisV,
  faCheckCircle,
} from "@fortawesome/fontawesome-free-solid";
import bnFlag from "../../images/bn.png";
import enFlag from "../../images/en.png";
import { RadioGroup, Radio } from "react-radio-group";
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
// import PureModal from "react-pure-modal";
// import "../pure-modal.css";
// import SigninForm from "../user/SigninForm";
// import OtpVerificationForm from "../user/OtpVerificationForm";
// import SignupForm from "../user/SignupForm";
// import CustomLoadingDialog from "../user/CustomLoadingDialog";
import { resendOtp } from "../../auth/index";
import { useHistory } from "react-router-dom";

import Dialogs from "../dialog/Dialogs";
import Toast from "../dialog/Toast";

export default function MoreMobile({ mobile = false }) {
  const history = useHistory();

  const dispatch = useDispatch();
  const signinDialog = useSelector(selectSigninDialog);
  const otpDialog = useSelector(selectOtpDialog);
  const signupDialog = useSelector(selectSignupDialog);
  const customDialog = useSelector(selectCustomDialog);

  const language = useSelector(selectLanguageSelection);
  const deviceType = useSelector(selectDeviceTypeSelection);
  const user = useSelector(selectUser);
  const [overlay, setOverlay] = useState(false);
 
  const handleLanguageChange = (value) => {
    if (value == "en") {
      dispatch(setLanguage({ language: "en" }));
      localStorage.setItem("lngSelect", "en");
    }
    if (value == "bn") {
      dispatch(setLanguage({ language: "bn" }));
      localStorage.setItem("lngSelect", "bn");
    }
  };
  const closeModal = () => setOverlay(false);
  const menuOpen = () => {
    setOverlay(true);
  };
  const onClickOrders = () =>{
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
    <div>
      {/* <Toast></Toast>
     <Dialogs></Dialogs> */}
      <Popup
        trigger={
          <button className="button">
            {" "}
            <FontAwesomeIcon icon={faEllipsisV} />{" "}
          </button>
        }
        position="left top"
        on="hover"
        closeOnDocumentClick
        mouseEnterDelay={0}
        contentStyle={{ width: "18rem", border: "none", zIndex: "1002" }}
        arrow={true}
      >
        {(close) => (
          <div className="menu--signin">
            {user && user.status ? (
              <div className="signin__btn">
                <Link
                  className="btn__all app__btn200 app__btn--filled  react__link--colorless"
                  to="/"
                  onClick={() => {
                    close();
                    signout(() => {
                      // props.history.push("/");
                    });
                    dispatch(setToken({ token: undefined, signout: true }));
                    dispatch(setUser({ user: undefined, signout: true }));
                    dispatch(initAiUser());
                  }}
                >
                  Signout
                </Link>
              </div>
            ) : (
              <div className="signin__btn">
                <div
                  className="btn__all app__btn200 app__btn--filled  react__link--colorless"
                  // to="/user/signin"
                  onClick={() => {
                    close();
                    dispatch(
                      setSigninDialog({
                        signinDialog: { open: true, redirectTo: "" },
                      })
                    );
                  }}
                >
                  {language === "en" ? (
                    <span>Signin</span>
                  ) : (
                    <span>সাইন ইন</span>
                  )}
                </div>
                <span
                  className="text__signup"
                  onClick={() => {
                    close();
                    dispatch(
                      setSignupDialog({
                        signupDialog: { open: true, redirectTo: "" },
                      })
                    );
                  }}
                >
                  {language === "en" ? (
                    <span>New customer</span>
                  ) : (
                    <span>নতুন কাস্টমার</span>
                  )}
                  <span className="react__link--colored">
                    {language === "en" ? (
                      <span>&nbsp;Sign Up</span>
                    ) : (
                      <span>&nbsp;সাইন আপ</span>
                    )}
                  </span>
                </span>
              </div>
            )}

            <hr className="line line--horizontal" />
            <div className="menu__mobile">
              <span className="mobile__menu--text">Select language</span>
              <RadioGroup
                name="language"
                selectedValue={language}
                onChange={(value) => {
                  handleLanguageChange(value);
                  close();
                }}
              >
                <div className="mobile__language-menu">
                  <label className="radio--lang">
                    <Radio value="bn" />
                    <span>&nbsp; &nbsp; বাংলা</span> &nbsp; &nbsp; &nbsp; &nbsp;
                    {/* <img src={bnFlag} alt="flag" /> */}
                  </label>

                  <label className="radio--lang">
                    <Radio value="en" />
                    <span>&nbsp; &nbsp; English</span> &nbsp; &nbsp;
                    {/* <img src={enFlag} alt="flag" /> */}
                  </label>
                </div>
              </RadioGroup>
            </div>
            <hr className="line line--horizontal" />
            <div className="menu__mobile">
              <span className="mobile__menu--text" onClick={()=>onClickOrders()}>Your Orders</span>
            </div>
          </div>
        )}
      </Popup>
      {overlay &&
        (deviceType === "desktop" ? (
          <div className="overlay overlay__menu--desktop"></div>
        ) : (
          <div className="overlay overlay__menu--mobile"></div>
        ))}
    </div>
  );
}
