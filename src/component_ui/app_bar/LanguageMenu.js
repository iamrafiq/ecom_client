import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  selectResolutionSelection,
  selectLanguageSelection,
  setLanguage
} from "../../redux/settingsSlice";
import "./navmenu.css";
import { imageUrlConverter } from "../../util/ImageUrlConverter";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import bnFlag from "../../images/bn.png";
import enFlag from "../../images/en.png";
import LanguagePopup from "./LanguagePopup";
import { RadioGroup, Radio } from "react-radio-group";
var FontAwesome = require("react-fontawesome");

export default function LanguageMenu({ gallery }) {
  const dispatch = useDispatch();

  const resulationSelector = useSelector(selectResolutionSelection);
  const language = useSelector(selectLanguageSelection);
  
  const handleLanguageChange = (value) =>{
    if (value == "en"){
      dispatch(setLanguage({ language: "en"}))
      localStorage.setItem('lngSelect', "en");
    }
    if (value == "bn"){
      dispatch(setLanguage({ language: "bn"}))
      localStorage.setItem('lngSelect', "bn");

    }
  }
  return (
    <div className="menu__lang">
      <div>
        <Popup
          trigger={
            <div className="menu-item">
              {" "}
              <div
                className="menu__lang--language"
                // onTouchStart={() => onHoverProduct()}
                // onMouseEnter={() => onHoverProduct()}
              >
                <img
                  src={language === "en" ? enFlag : bnFlag}
                  alt="flag"
                  style={{ width: "25px", height: "25px" }}
                />
                <FontAwesome
                  name="sort-down"
                  size="1x"
                  className="icon--down"
                />
              </div>{" "}
            </div>
          }
          position="bottom center"
          on="hover"
          closeOnDocumentClick
          mouseLeaveDelay={300}
          mouseEnterDelay={0}
          contentStyle={{ padding: "0px", border: "none" }}
          arrow={true}
        >
          <div className="menu">
            <RadioGroup
              name="language"
              selectedValue={language}
              onChange={handleLanguageChange}
            >
              <label>
                <Radio value="bn" />
                <span>&nbsp; &nbsp; বাংলা</span> &nbsp; &nbsp; &nbsp; &nbsp;
                <img
                  src={bnFlag}
                  alt="flag"
                  style={{ width: "25px", height: "25px" }}
                />
              </label>
              <br />
              <label>
                <Radio value="en" />
                <span>&nbsp; &nbsp; English</span> &nbsp; &nbsp;
                <img
                  src={enFlag}
                  alt="flag"
                  style={{ width: "25px", height: "25px" }}
                />
              </label>
            </RadioGroup>
          </div>
        </Popup>
      </div>
    </div>
  );
}
