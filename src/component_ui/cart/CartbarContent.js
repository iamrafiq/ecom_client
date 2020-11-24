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
} from "../../redux/settingsSlice";
import { selectCartProducts } from "../../redux/cartSlice";
import { selectOfferProducts } from "../../redux/homeSlice";
import "./cart.css";
import { englishToBangla } from "../../util/utils";
import CartItem from "./CartItem";

const SidebarContent = (props) => {
  const viewToBar = useSelector(selectSideBarViewToBarSelection);
  const resolutionSelector = useSelector(selectResolutionSelection);
  const language = useSelector(selectLanguageSelection);
  const auth = useSelector(selectAuthenticateSelection);
  const offerProducts = useSelector(selectOfferProducts);
  const products = useSelector(selectCartProducts);

  console.log("cart products...", products)
  const [state, setState] = useState({
    viewToBarChange: "",
  });
  const dispatch = useDispatch();

  
  const selectedBar = (bar) => {
    dispatch(loadCategoryWithProduct(bar));
    dispatch(setBarToView({ barToView: bar }));
  };
  useEffect(() => {
    if (state.viewToBarChange) {
      state.viewToBarChange({ slug: viewToBar.value });
    }
  }, [viewToBar]);

  return (
    <div className="cartbar__pannel">
      <div className="sidebar--header">
        {auth ? (
          <Link
            className="react__link--colorless"
            to="/user/profile"
            onClick={() => props.toggleSideBar()}
          >
            {language === "en" ? <span>Profile</span> : <span>প্রোফাইল</span>}
          </Link>
        ) : (
          <Link
            className="react__link--colorless"
            to="/user/signin"
            onClick={() => props.toggleSideBar()}
          >
            {language === "en" ? (
              <span>Hello, Sign in</span>
            ) : (
              <span>হ্যালো, সাইন ইন</span>
            )}
          </Link>
        )}
      </div>
      <div className="cart--content">
        {products.length > 0 ? (
          <React.Fragment>
            {products.map((ele, index) => (
              <CartItem cartItem={ele}></CartItem>
            ))}
          </React.Fragment>
        ) : (
          <div>No prodcts in cart</div>
        )}
      </div>
    </div>
  );
};

// SidebarContent.propTypes = {
//   style: PropTypes.object,
// };

export default SidebarContent;
