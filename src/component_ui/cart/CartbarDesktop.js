import "../sidebar/bar.css";
import React from "react";
import { CART_BAR_WIDTH } from "../../config";
import CartbarContent from "./CartbarContent";
import { MOBIEL_DEVICE_RESOLUTION } from "../../config";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCartBarDesktop, setSideBar, selectDeviceTypeSelection } from "../../redux/settingsSlice";
import { Navigation } from "react-minimal-side-navigation";

import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
const CartbarDesktop = ({ height, children }) => {
  const devicType = useSelector(selectDeviceTypeSelection);

  let width = 0;
  // if (devicType == "desktop"){
    width =
    parseInt(getComputedStyle(document.documentElement).fontSize) *
    CART_BAR_WIDTH;
  // }else{
  //   width = window.innerWidth;
  // }
   
  let windowWidth = 0//window.innerWidth;
  let posX = 0//windowWidth-width
  let posXOutSide = width//windowWidth+width;
  const [rendered, setRendered] = useState(false);

  const dispatch = useDispatch();
  const cartBarDesktop = useSelector(selectCartBarDesktop);
  console.log("cart bar desktop", cartBarDesktop)
  const [xPosition, setX] = useState(posX);

  console.log("window width:", windowWidth);
  const toggleMenu = () => {
    if (xPosition > posX) {
      setX(posX);
    } else {
      setX(posXOutSide);
    }
  };

  useEffect(() => {
    toggleMenu();
    setRendered(true);
  }, [cartBarDesktop]);
  return (
    <React.Fragment>
      {/* {rendered && xPosition > -width ? (
        <div
          className="overlay--sidebar "
          onClick={() => {
            toggleMenu();
          }}
          style={{ opacity: "1" }}
        >
          <div class="side__bar__cross--left" onClick={toggleMenu}></div>
        </div>
      ) : (
        <div
          className="overlay--sidebar "
          style={{ opacity: "0", pointerEvents: "none", cursor: "default" }}
        ></div>
      )} */}

      {rendered && (
        <div
          className="cart-bar"
          style={{
             transform: `translatex(${xPosition}px)`,
            width: width,
            minHeight: height,
          }}
        >
          <div className="sidebar__content">
            {<CartbarContent toggleSideBar={toggleMenu} tree={children} />}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default CartbarDesktop;
