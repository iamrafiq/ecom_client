import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  selectResolutionSelection,
  selectLanguageSelection,
  selectCartBarDesktop,
  setCartBarDesktop,
  setCartBarMobile,
  selectCartBarMobile,
  selectDeviceTypeSelection,
  setLanguage,
} from "../../redux/settingsSlice";
import { selectCartCount } from "../../redux/cartSlice";
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

export default function CartMenu({ mobile = false }) {
  const dispatch = useDispatch();
  const cartBarDesktop = useSelector(selectCartBarDesktop);
  const cartBarMobile = useSelector(selectCartBarMobile);
  const productCount = useSelector(selectCartCount);

  const resulationSelector = useSelector(selectResolutionSelection);
  const deviceType = useSelector(selectDeviceTypeSelection);

  const language = useSelector(selectLanguageSelection);
  return (
    <div className="menu-item" onClick={(e) => {
      e.preventDefault();
      if (deviceType === "desktop"){
        dispatch(setCartBarDesktop({cartBarDesktop:{open:!cartBarDesktop.open}}))
      }else{
        dispatch(setCartBarMobile({cartBarMobile:{open:!cartBarMobile.open}}))

      }
    }}>
      {mobile ? (
        <div className="menu__box menu__cart">
          <img
            src={cartImage}
            alt="cart"
            style={{ width: "25px", height: "25px" }}
          />
          {language === "en"?(<span className="cart--quantity--mobile">{productCount}</span>):(<span className="cart--quantity--mobile">{englishToBangla(productCount)}</span>)}
          
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
          <span className="cart--quantity--desktop">{productCount}</span>
            </div>
          ) : (
            <div className="">
              <span className="cart--text--desktop">ব্যাগ</span>
              <span className="cart--quantity--desktop">
                {englishToBangla(productCount)}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
