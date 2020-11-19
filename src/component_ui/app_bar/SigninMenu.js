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
  selectAuthenticateSelection,
  setAuthenticate,
} from "../../redux/settingsSlice";
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
var FontAwesome = require("react-fontawesome");

export default function SigninMenu({ mobile = false }) {
  const dispatch = useDispatch();
  const language = useSelector(selectLanguageSelection);
  const deviceType = useSelector(selectDeviceTypeSelection);
  const auth = useSelector(selectAuthenticateSelection);
  console.log("auth...", auth);
  const [overlay, setOverlay] = useState(false);

  const closeModal = () => setOverlay(false);
  const menuOpen = () => {
    setOverlay(true);
  };

  return (
    <div>
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
                  {auth ? (
                    language === "en" ? (
                      <span className="sigin__text--siginin">Sign out </span>
                    ) : (
                      <span className="sigin__text--siginin">সাইন আউট</span>
                    )
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
        contentStyle={{ width: "18rem", border: "none" }}
        arrow={true}
        open={overlay}
        onClose={closeModal}
      >
        {(close) => (
          <div className="menu--signin">
            {auth ? (
              <div className="signin__btn">
                <Link
                  className="btn__all app__btn200 app__btn--filled  link"
                  to="/"
                  onClick={() => {
                    close();
                    signout(() => {
                      // props.history.push("/");
                    });
                    dispatch(
                      setAuthenticate({
                        authenticate: undefined,
                      })
                    );
                  }}
                >
                  Signout
                </Link>
              </div>
            ) : (
              <div className="signin__btn">
                <Link
                  className="btn__all app__btn200 app__btn--filled  link"
                  to="/user/signin"
                  onClick={() => {
                    close();
                  }}
                >
                  {language === "en" ? (
                    <span>Signin</span>
                  ) : (
                    <span>সাইন ইন</span>
                  )}
                </Link>
                <span className="text__signup">
                  {language === "en" ? (
                    <span>New customer</span>
                  ) : (
                    <span>নতুন কাস্টমার</span>
                  )}
                  <Link to="/user/signup" onClick={() => close()}>
                    {language === "en" ? (
                      <span className="signup--link">&nbsp;Sign Up</span>
                    ) : (
                      <span className="signup--link">&nbsp;সাইন আপ</span>
                    )}
                  </Link>
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
                    <Link className="link" onClick={() => close()}>
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
                    <Link className="link" onClick={() => close()}>
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
                    <Link className="link" onClick={() => close()}>
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
                    <Link className="link" onClick={() => close()}>
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
                    <Link className="link" onClick={() => close()}>
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
                    <Link className="link" onClick={() => close()}>
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
