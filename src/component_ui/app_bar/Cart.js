import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  selectResolutionSelection,
  selectLanguageSelection,
  setLanguage,
} from "../../redux/settingsSlice";
import "./navmenu.css";
import { imageUrlConverter } from "../../util/ImageUrlConverter";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import cartImage from "../../images/addtocart.svg";
import enFlag from "../../images/en.png";
import LanguagePopup from "./LanguagePopup";
import { RadioGroup, Radio } from "react-radio-group";
var FontAwesome = require("react-fontawesome");

export default function SigninMenu({ mobile = false }) {
  const dispatch = useDispatch();

  const resulationSelector = useSelector(selectResolutionSelection);
  const language = useSelector(selectLanguageSelection);

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
  return (
    <div className="menu-item">
      {mobile ? (
        <div className="menu__box menu__cart">
          <img
            src={cartImage}
            alt="cart"
            style={{ width: "25px", height: "25px" }}
          />
          <span className="cart--quantity--mobile">10</span>
        </div>
      ) : (
        <div className="menu__box menu__cart">
          <img
            src={cartImage}
            alt="cart"
            style={{ width: "30px", height: "30px" }}
          />
          <span className="cart--text--desktop">Cart</span>
          <span className="cart--quantity--desktop">10</span>
        </div>
      )}
    </div>
  );
}
