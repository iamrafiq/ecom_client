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

export default function MoreMobile({ mobile = false }) {
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

              <FontAwesome className="icon--down" name="sort-down" size="1x" />
            </div>
          </div>
        }
        position="bottom center"
        on="hover"
        closeOnDocumentClick
        mouseEnterDelay={0}
        contentStyle={{ width: "18rem", border: "none" , zIndex:"1002"}}
        arrow={true}
        open={overlay}
        onClose={closeModal}
      >
        {(close) => (
          <div className="menu--signin">
           
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
