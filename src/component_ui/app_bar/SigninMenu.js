import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  selectLanguageSelection,
  selectDeviceTypeSelection,
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
                  <span className="sigin__text--siginin">Hello Sign in </span>
                  <span className="sigin__text--account">
                    Account&nbsp;&#38;&nbsp;List
                  </span>
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
        contentStyle={{ width: "16rem", border: "none" }}
        arrow={true}
        open={overlay}
        onClose={closeModal}
      >
        {(close) => (
          <div className="menu--signin">
            <div className="signin__btn">
              <Link
                className="btn__all app__btn200 app__btn--filled  link"
                to="/user/signin"
                onClick={() => {
                  close();
                }}
              >
                Signin
              </Link>
              <span className="text__signup">
                New customer{" "}
                <Link to="/user/signup" onClick={() => close()}>
                  <span className="signup--link"> Sign Up</span>
                </Link>
              </span>{" "}
            </div>
            <hr className="line line--horizontal" />
            <div className="list__order">
              <div className="list__your">
                <span className="list__title">Your List</span>

                <ul>
                  <li>
                    <Link className="link" onClick={() => close()}>
                      <FontAwesomeIcon
                        className="icon--list "
                        size="1x"
                        icon={faCheckCircle}
                      />
                      <span className="list__item">Daily List</span>
                    </Link>
                  </li>
                  <li>
                    <Link className="link" onClick={() => close()}>
                      <FontAwesomeIcon
                        className="icon--list "
                        size="1x"
                        icon={faCheckCircle}
                      />
                      <span className="list__item">Weekly List</span>
                    </Link>
                  </li>
                  <li>
                    <Link className="link" onClick={() => close()}>
                      <FontAwesomeIcon
                        className="icon--list "
                        size="1x"
                        icon={faCheckCircle}
                      />
                      <span className="list__item">Monthly List</span>
                    </Link>
                  </li>
                  <li>
                    <Link className="link" onClick={() => close()}>
                      <FontAwesomeIcon
                        className="icon--list "
                        size="1x"
                        icon={faCheckCircle}
                      />
                      <span className="list__item"> Create a List</span>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="line row_break" />
              <div className="order__your">
                <span className="list__title">Your Orders</span>
                <ul>
                  <li>
                    <Link className="link" onClick={() => close()}>
                      <FontAwesomeIcon
                        className="icon--list icon--flip"
                        size="1x"
                        icon={faTruckMoving}
                      />
                      <span className="list__item"> Track and Manage</span>
                    </Link>
                  </li>

                  <li>
                    <Link className="link" onClick={() => close()}>
                      <FontAwesomeIcon
                        className="icon--list "
                        size="1x"
                        icon={faShoppingBasket}
                      />
                      <span className="list__item"> Buy again</span>
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
