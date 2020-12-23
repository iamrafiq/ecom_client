import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signout } from "../../auth/index";

import {
  selectLanguageSelection,
  selectDeviceTypeSelection,
} from "../../redux/settingsSlice";
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

import {
  selectUser,
  setToken,
  setUser,
  initAiUser,
} from "../../redux/authSlice";
import "./navmenu.css";
import { imageUrlConverter } from "../../util/ImageUrlConverter";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import userImage from "../../images/user.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBasket,
  faTruckMoving,
  faSortDown,
  faCheckCircle,
} from "@fortawesome/fontawesome-free-solid";
// import PureModal from "react-pure-modal";
// import "../pure-modal.css";
// import SignupForm from "../user/SignupForm";

// import SigninForm from "../user/SigninForm";
// import OtpVerificationForm from "../user/OtpVerificationForm";
// import CustomLoadingDialog from "../user/CustomLoadingDialog";
import Dialogs from "../dialog/Dialogs";
import Toast from "../dialog/Toast";
var FontAwesome = require("react-fontawesome");

export default function SigninMenu({ mobile = false }) {
  const dispatch = useDispatch();
  const language = useSelector(selectLanguageSelection);
  // const signinDialog = useSelector(selectSigninDialog);
  // const customDialog = useSelector(selectCustomDialog);

  // const signupDialog = useSelector(selectSignupDialog);

  // const otpDialog = useSelector(selectOtpDialog);

  const deviceType = useSelector(selectDeviceTypeSelection);
  const user = useSelector(selectUser);
  const [overlay, setOverlay] = useState(false);

  const closeModal = () => setOverlay(false);
  const menuOpen = () => {
    setOverlay(true);
  };

  return (
    <div>
      {/* {signupDialog && (
        <div>
          <PureModal
            header="Signup"
            scrollable={false}
            // footer="Buttons?"
            //  closeButtonPosition="bottom"
            // closeButtonPosition="bottom"
            // portal
            // closeButton={<div>&#10007;</div>}
            isOpen={signupDialog}
            onClose={() => {
              dispatch(setSignupDialog({ signupDialog: false }));
              return true;
            }}
          >
            <SignupForm></SignupForm>
          </PureModal>
        </div>
      )}
      {signinDialog && (
        <div>
          <PureModal
            header="Signin"
            scrollable={false}
            // footer="Buttons?"
            //  closeButtonPosition="bottom"
            // closeButtonPosition="bottom"
            // portal
            // closeButton={<div>&#10007;</div>}
            isOpen={signinDialog}
            onClose={() => {
              dispatch(setSigninDialog({ signinDialog: { open: false, redirectTo: "" } }));
              return true;
            }}
          >
            <SigninForm></SigninForm>
          </PureModal>
        </div>
      )}
      {otpDialog && (
        <div>
          <PureModal
            header="One time password (OTP)"
            scrollable={false}
            // footer="Buttons?"
            //  closeButtonPosition="bottom"
            // closeButtonPosition="bottom"
            // portal
            // closeButton={<div>&#10007;</div>}
            isOpen={otpDialog}
            onClose={() => {
              dispatch(setOtpDialog({ otpDialog: {open:false, redirectTo:""} }));
              return true;
            }}
          >
            <OtpVerificationForm></OtpVerificationForm>
          </PureModal>
        </div>
      )}
      {customDialog.open && (
        <div>
          <PureModal
            // header="Sending one time password (OTP)"
            scrollable={false}
            // footer="Buttons?"
            //  closeButtonPosition="bottom"
            // closeButtonPosition="bottom"
            // portal
            // closeButton={<div>&#10007;</div>}
            isOpen={customDialog.open}
            onClose={() => {
              dispatch(
                setCustomDialog({
                  customDialog: { open: false, englishMsg: "", banglaMsg: "" },
                })
              );
              return true;
            }}
          >
            <CustomLoadingDialog
              englishMsg={customDialog.englishMsg}
              banglaMsg={customDialog.banglaMsg}
            ></CustomLoadingDialog>
          </PureModal>
        </div>
      )} */}
      <Toast></Toast>
      <Dialogs></Dialogs>
      <Popup
        trigger={
          <div className="menu-item">
            {" "}
            <div
              className="menu__box"
              onTouchStart={() => menuOpen()}
              onMouseEnter={() => menuOpen()}
            >
              {mobile ? (
                <img
                  src={userImage}
                  alt="user"
                  style={{ width: "20px", height: "20px" }}
                />
              ) : (
                <span className="sigin__text">
                  {user && user.status > 0 ? (
                    <span className="sigin__text--siginin">
                      {user.name ? user.name : user.phoneNumber}{" "}
                    </span>
                  ) : language === "en" ? (
                    <span className="sigin__text--siginin">
                      Hello, Sign in{" "}
                    </span>
                  ) : (
                    <span className="sigin__text--siginin">
                      হ্যালো, সাইন ইন{" "}
                    </span>
                  )}
                  {language === "en" ? (
                    <span className="sigin__text--account">
                      Account&nbsp;&#38;&nbsp;List
                    </span>
                  ) : (
                    <span className="sigin__text--account">
                      একাউন্ট&nbsp;&#38;&nbsp;লিস্ট
                    </span>
                  )}
                </span>
              )}

              <FontAwesome className="icon--down" name="sort-down" size="1x" />
            </div>
          </div>
        }
        position="bottom center"
        on="hover"
        closeOnDocumentClick
        mouseEnterDelay={0}
        contentStyle={{ width: "18rem", border: "none", zIndex: "1002" }}
        arrow={true}
        open={overlay}
        onClose={closeModal}
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
                  //  to="/user/signin"
                  onClick={() => {
                    close();
                    dispatch(setSigninDialog({ signinDialog: { open: true, redirectTo: "" } }));
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
                    dispatch(setSignupDialog({ signupDialog: { open: true, redirectTo: "" } }));
                  }}
                >
                  {language === "en" ? (
                    <span>New customer</span>
                  ) : (
                    <span>নতুন কাস্টমার</span>
                  )}
                  <span
                    className="react__link--colored"
                    // to="/user/signup"
                  >
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
            <div className="list__order">
              <div className="list__your">
                {language === "en" ? (
                  <span className="list__title">Your List</span>
                ) : (
                  <span className="list__title">আপনার লিস্ট</span>
                )}
                <ul>
                  <li>
                    <Link
                      className="react__link--colorless"
                      onClick={() => close()}
                    >
                      <FontAwesomeIcon
                        className="icon--list "
                        size="1x"
                        icon={faCheckCircle}
                      />
                      {language === "en" ? (
                        <span className="list__item">Daily List</span>
                      ) : (
                        <span className="list__item">দৈনিক লিস্ট</span>
                      )}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="react__link--colorless"
                      onClick={() => close()}
                    >
                      <FontAwesomeIcon
                        className="icon--list "
                        size="1x"
                        icon={faCheckCircle}
                      />
                      {language === "en" ? (
                        <span className="list__item">Weekly List</span>
                      ) : (
                        <span className="list__item">সাপ্তাহিক লিস্ট</span>
                      )}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="react__link--colorless"
                      onClick={() => close()}
                    >
                      <FontAwesomeIcon
                        className="icon--list "
                        size="1x"
                        icon={faCheckCircle}
                      />
                      {language === "en" ? (
                        <span className="list__item">Monthly List</span>
                      ) : (
                        <span className="list__item">মাসিক লিস্ট</span>
                      )}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="react__link--colorless"
                      onClick={() => close()}
                    >
                      <FontAwesomeIcon
                        className="icon--list "
                        size="1x"
                        icon={faCheckCircle}
                      />
                      {language === "en" ? (
                        <span className="list__item">Create a List</span>
                      ) : (
                        <span className="list__item">লিস্ট লিখুন</span>
                      )}
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="line row_break" />
              <div className="order__your">
                {language === "en" ? (
                  <span className="list__title">Your Orders</span>
                ) : (
                  <span className="list__title">আপনার অর্ডার</span>
                )}
                <ul>
                  <li>
                    <Link
                      className="react__link--colorless"
                      onClick={() => close()}
                    >
                      <FontAwesomeIcon
                        className="icon--list icon--flip"
                        size="1x"
                        icon={faTruckMoving}
                      />
                      {language === "en" ? (
                        <span className="list__item">
                          {" "}
                          Track&nbsp;&#38;&nbsp;Manage
                        </span>
                      ) : (
                        <span className="list__item">
                          ট্র্যাক&nbsp;&#38;&nbsp;ম্যানেজ{" "}
                        </span>
                      )}
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="react__link--colorless"
                      onClick={() => close()}
                    >
                      <FontAwesomeIcon
                        className="icon--list "
                        size="1x"
                        icon={faShoppingBasket}
                      />
                      {language === "en" ? (
                        <span className="list__item"> Buy again</span>
                      ) : (
                        <span className="list__item">আবার কিনুন</span>
                      )}
                    </Link>
                  </li>
                </ul>
              </div>
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
