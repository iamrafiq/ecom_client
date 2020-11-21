import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  selectResolutionSelection,
  selectLanguageSelection,
  selectCartBar,
  setCartBar,
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
import { englishToBangla } from "../../util/utils";
var FontAwesome = require("react-fontawesome");

export default function SigninMenu({ mobile = false }) {
  const dispatch = useDispatch();
  const cartBar = useSelector(selectCartBar);

  const resulationSelector = useSelector(selectResolutionSelection);
  const language = useSelector(selectLanguageSelection);
  return (
    <div className="menu-item" onClick={(e) => {
      e.preventDefault();
      dispatch(setCartBar({cartBar:{open:!cartBar.open}}))
    }}>
      {mobile ? (
        <div className="menu__box menu__cart">
          <img
            src={cartImage}
            alt="cart"
            style={{ width: "25px", height: "25px" }}
          />
          {language === "en"?(<span className="cart--quantity--mobile">10</span>):(<span className="cart--quantity--mobile">{englishToBangla(10)}</span>)}
          
        </div>
      ) : (
        <div className="menu__box menu__cart">
          <img
            src={cartImage}
            alt="cart"
            style={{ width: "30px", height: "30px" }}
          />
          {language === "en" ? (
            <div className="">
              <span className="cart--text--desktop">Cart</span>
              <span className="cart--quantity--desktop">10</span>
            </div>
          ) : (
            <div className="">
              <span className="cart--text--desktop">ব্যাগ</span>
              <span className="cart--quantity--desktop">
                {englishToBangla(10)}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
