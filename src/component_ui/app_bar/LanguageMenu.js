import React,{ useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  selectLanguageSelection,
  setLanguage,
  selectDeviceTypeSelection
} from "../../redux/settingsSlice";
import "./navmenu.css";
import { imageUrlConverter } from "../../util/ImageUrlConverter";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import bnFlag from "../../images/bn.png";
import enFlag from "../../images/en.png";
import { RadioGroup, Radio } from "react-radio-group";
var FontAwesome = require("react-fontawesome");

export default function LanguageMenu({ gallery }) {
  const dispatch = useDispatch();

  const language = useSelector(selectLanguageSelection);
  const deviceType = useSelector(selectDeviceTypeSelection);

  const [overlay, setOverlay] = useState(false);
  const closeModal = () => setOverlay(false);
  const menuOpen = () => {
    setOverlay(true);
  };
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
    <div className="">
      <Popup
      trigger={
        <div className="menu-item">
          {" "}
          <div
              className="menu__box"
              onTouchStart={() => menuOpen()}
              onMouseEnter={() => menuOpen()}
          >
            <img
              src={language === "en" ? enFlag : bnFlag}
              alt="flag"
              style={{ width: "25px", height: "25px" }}
            />
            <FontAwesome name="sort-down" size="1x" className="icon--down" />
          </div>{" "}
        </div>
      }
      position="bottom center"
      on="hover"
      closeOnDocumentClick 
      mouseEnterDelay={0}
      contentStyle={{ padding: "0px", border: "none", zIndex:"1002"}}
      arrow={true}
      open={overlay}
      onClose={closeModal}
    >
      {(close) => (
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
