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
var FontAwesome = require("react-fontawesome");

export default function SigninMenu({ mobile = false }) {
  const dispatch = useDispatch();

  const resulationSelector = useSelector(selectResolutionSelection);
  const language = useSelector(selectLanguageSelection);
  return (
    <div className="menu-item menu__cart">
      {mobile ? (
        <img
          src={orderImage}
          alt="user"
          style={{ width: "20px", height: "20px" }}
        />
      ) : language == "en" ? (
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
