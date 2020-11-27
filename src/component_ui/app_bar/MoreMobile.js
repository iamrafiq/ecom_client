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
  setLanguage,
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
  faEllipsisV,
  faCheckCircle,
} from "@fortawesome/fontawesome-free-solid";
import bnFlag from "../../images/bn.png";
import enFlag from "../../images/en.png";
import { RadioGroup, Radio } from "react-radio-group";
export default function MoreMobile({ mobile = false }) {
  const dispatch = useDispatch();
  const language = useSelector(selectLanguageSelection);
  const deviceType = useSelector(selectDeviceTypeSelection);
  const auth = useSelector(selectAuthenticateSelection);
  console.log("auth...", auth);
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

  return (
    <div>
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
        contentStyle={{ width: "18rem", border: "none" , zIndex:"1002"}}
        arrow={true}
      >
        {(close) => (
          <div className="menu--signin">
            {auth ? (
              <div className="signin__btn">
                <Link
                  className="btn__all app__btn200 app__btn--filled  react__link--colorless"
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
                  className="btn__all app__btn200 app__btn--filled  react__link--colorless"
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
                  <Link className="react__link--colored" to="/user/signup" onClick={() => close()}>
                    {language === "en" ? (
                      <span >&nbsp;Sign Up</span>
                    ) : (
                      <span >&nbsp;সাইন আপ</span>
                    )}
                  </Link>
                </span>
              </div>
            )}

            <hr className="line line--horizontal" />

            <div className="menu">
            <RadioGroup
            name="language"
            selectedValue={language}
            onChange={(value) => {
              handleLanguageChange(value);
              close();
            }}
          >
            <label className="radio--lang">
              <Radio value="bn" />
              <span>&nbsp; &nbsp; বাংলা</span> &nbsp; &nbsp; &nbsp; &nbsp;
              <img
                src={bnFlag}
                alt="flag"
                
              />
            </label>
           
            <label className="radio--lang">
              <Radio value="en" />
              <span>&nbsp; &nbsp; English</span> &nbsp; &nbsp;
              <img
                src={enFlag}
                alt="flag"
                
              />
            </label>
          </RadioGroup>
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
