import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { SIDE_BAR_WIDTH } from "../../config";
import TreeExample from "../treebeard/tree";
import { useDispatch, useSelector } from "react-redux";
import {
  setBarToView,
  selectSideBarViewToBarSelection,
} from "../../redux/sideBarSlice";
import { loadCategoryWithProduct } from "../../redux/categoryWithProductSlice";
import {
  selectResolutionSelection,
  selectLanguageSelection,
  selectAuthenticateSelection,
  selectDeviceTypeSelection,
} from "../../redux/settingsSlice";
import { selectCartProducts, selectCartCount } from "../../redux/cartSlice";
import { selectOfferProducts } from "../../redux/homeSlice";
import "./cart.css";
import { englishToBangla } from "../../util/utils";
import CartItem from "./CartItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/fontawesome-free-solid";
import { CART_BAR_WIDTH } from "../../config";

const SidebarContent = (props) => {
  const viewToBar = useSelector(selectSideBarViewToBarSelection);
  const resolutionSelector = useSelector(selectResolutionSelection);
  const deviceType = useSelector(selectDeviceTypeSelection);

  const itemCount = useSelector(selectCartCount);

  const language = useSelector(selectLanguageSelection);
  const auth = useSelector(selectAuthenticateSelection);
  const products = useSelector(selectCartProducts);
  let width ;
  if (deviceType === "desktop") {
     width =
      parseInt(getComputedStyle(document.documentElement).fontSize) *
      CART_BAR_WIDTH;
  } else {
     width = window.innerWidth;
  }
  console.log("cart products...", products);
  const [state, setState] = useState({
    viewToBarChange: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (state.viewToBarChange) {
      state.viewToBarChange({ slug: viewToBar.value });
    }
  }, [viewToBar]);

  return (
    <div className="cart__pannel" style={{ width: width }}>
      <div className="pannel--header">
        <span className="header--left">
          <FontAwesomeIcon size="2x" icon={faShoppingBag} />
          <span className="total__item">{` ${itemCount} items`}</span>
        </span>
        <span className="cart--close">Close</span>
      </div>
      <div className="pannel--content">
        {products.length > 0 ? (
          <React.Fragment>
            {products.map((ele, index) => (
              <CartItem cartItem={ele}></CartItem>
            ))}
            {products.map((ele, index) => (
              <CartItem cartItem={ele}></CartItem>
            ))}
            {products.map((ele, index) => (
              <CartItem cartItem={ele}></CartItem>
            ))}
            {products.map((ele, index) => (
              <CartItem cartItem={ele}></CartItem>
            ))}
            {products.map((ele, index) => (
              <CartItem cartItem={ele}></CartItem>
            ))}
            {products.map((ele, index) => (
              <CartItem cartItem={ele}></CartItem>
            ))}
            {products.map((ele, index) => (
              <CartItem cartItem={ele}></CartItem>
            ))}
            {products.map((ele, index) => (
              <CartItem cartItem={ele}></CartItem>
            ))}
          </React.Fragment>
        ) : (
          <div>No prodcts in cart</div>
        )}
      </div>
      <div className="pannel--footer"></div>
    </div>
  );
};

// SidebarContent.propTypes = {
//   style: PropTypes.object,
// };

export default SidebarContent;
