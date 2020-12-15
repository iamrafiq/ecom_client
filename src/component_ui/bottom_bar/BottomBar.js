import React from "react";
import { useSelector, useDispatch } from "react-redux";
import FontAwesome from "react-fontawesome";
// import SearchBox from "./SearchBox";
import "./bottombar.css";
import { imageUrlConverter } from "../../util/ImageUrlConverter";
import { selectHomeSelection } from "../../redux/homeSlice";

import {
  selectResolutionSelection,
  selectLanguageSelection,
  selectDeviceTypeSelection,
} from "../../redux/settingsSlice";
import {
  selectSideBar,
  setCartBarMobile,
  selectCartBarMobile,
} from "../../redux/globalSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faShoppingBag,
} from "@fortawesome/fontawesome-free-solid";
import { englishToBangla } from "../../util/utils";
import { selectCartCount } from "../../redux/cartSlice";

// import logo from "../../images/logo.svg";
// import SearchBoxMobile from "./SearchBoxMobile";
// import LanguageMenu from "./LanguageMenu";
// import SigninMenu from "./SigninMenu";
// import Orders from "./Orders";
// import Cart from "./Cart";

const BottomBar = (props) => {
  const dispatch = useDispatch();
  const home = useSelector(selectHomeSelection);
  const resulationSelector = useSelector(selectResolutionSelection);
  const language = useSelector(selectLanguageSelection);
  const deviceType = useSelector(selectDeviceTypeSelection);
  const sideBar = useSelector(selectSideBar);
  const productCount = useSelector(selectCartCount);
  const cartBarMobile = useSelector(selectCartBarMobile);

  // const mood = useSelector(selectSideBarMood);
  const { onClickMenu } = props;

  const contentStyle = {
    position: "fixed",
    height: "200px",
    backgroundColor: "red",
  };
  return (
    <div className="bottom__bar">
      <div className="bottom__chat">
        {" "}
        <FontAwesomeIcon size="2x" icon={faCommentDots} />
      </div>
      <div className="bottom__order">
        {" "}
        {language === "en" ? (
          <span>Place Order</span>
        ) : (
          <span>অর্ডার স্থাপন করুন</span>
        )}
      </div>
      <div
        className="bottom__cart"
        onClick={() =>
          dispatch(
            setCartBarMobile({ cartBarMobile: { open: !cartBarMobile.open } })
          )
        }
      >
        {language === "en" ? (
          <div className="item__count">{productCount}</div>
        ) : (
          <div className="item__count">{englishToBangla(productCount)}</div>
        )}

        <FontAwesomeIcon size="2x" icon={faShoppingBag} />
      </div>
    </div>
  );
};

export default BottomBar;
