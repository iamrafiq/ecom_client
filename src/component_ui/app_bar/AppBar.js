import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faBars } from "@fortawesome/fontawesome-free-solid";
import SearchBox from "./SearchBox";
import "./app-bar.css";
import { imageUrlConverter } from "../../util/ImageUrlConverter";
import { selectHomeSelection } from "../../redux/homeSlice";
import MoreMobile from "./MoreMobile";
import {
  selectResolutionSelection,
  selectLanguageSelection,
  selectDeviceTypeSelection,
} from "../../redux/settingsSlice";
import {
  selectSideBar,
  setSideBar
} from "../../redux/globalSlice";
import logo from "../../images/logo.svg";
import SearchBoxMobile from "./SearchBoxMobile";
import LanguageMenu from "./LanguageMenu";
import SigninMenu from "./SigninMenu";
import Orders from "./Orders";
import Cart from "./Cart";
import Popup from "reactjs-popup";
import "./more-menu.css";
const AppBar = (props) => {
  const dispatch = useDispatch();
  const home = useSelector(selectHomeSelection);
  const resulationSelector = useSelector(selectResolutionSelection);
  const language = useSelector(selectLanguageSelection);
  const deviceType = useSelector(selectDeviceTypeSelection);
  const sideBar = useSelector(selectSideBar);

  // const mood = useSelector(selectSideBarMood);
  const { onClickMenu } = props;

  const contentStyle = {
    position: "fixed",
    height: "200px",
    backgroundColor: "red",
  };
  return (
    <div className="nav__bar">
      {deviceType === "desktop" ? (
        <div className="nav__bar__main--desktop">
          <div className="nav--desktop">
            <div className="nav__desktop--left">
              <div
                className="button__lang--menu"
                onClick={(e) => {
                  e.preventDefault();
                  //   dispatch(toggleSideBar())
                  // onClickMenu();
                  dispatch(setSideBar({ sideBar: { open: !sideBar.open } }));
                }}
              >
                <FontAwesomeIcon size="2x" icon={faBars} />
              </div>
              {home.logo && (
                <img
                  src={`${imageUrlConverter(
                    `${home.logo}&res=${resulationSelector}`
                  )}`}
                  alt="Sowdamart.com"
                />
              )}
            </div>
            <div className="search__box--desktop">
              <SearchBox className="search__box--desktop"></SearchBox>
            </div>
            <div className="desktop--menu">
              <div className="destop--menu--item">
                <LanguageMenu></LanguageMenu>
              </div>
              <div className="desktop--menu--item">
                <SigninMenu></SigninMenu>
              </div>
              <div className="desktop--menu--item">
                <Orders></Orders>
              </div>
              <div className="desktop--menu--item">
                <Cart></Cart>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="nav__bar--mobile">
          <div
            className="mobile--menu"
            onClick={(e) => {
              e.preventDefault();
              dispatch(setSideBar({ sideBar: { open: !sideBar.open } }));
            }}
          >
            <FontAwesomeIcon size="2x" icon={faBars} />
          </div>
          <div className="mobile--search-box">
            <SearchBoxMobile className=""></SearchBoxMobile>
          </div>
          <div className="mobile--more">
            <MoreMobile></MoreMobile>
          </div>
        </div>
      )}
    </div>
    // <div className="nav__bar">
    //   <div className="nav__bar--logo">
    //     <div className="logo">
    //       <img  src="http://alupiaj.com/images/logo5.png" alt="" />
    //     </div>
    //   </div>
    //   <div className="nav-bar-right">
    //     <div className="search-box">
    //       <SearchBox></SearchBox>
    //     </div>
    //     <div className="buttons">
    // <button
    //   className="button menu"
    //   style={{ background: "transparent" }}
    //   onClick={(e) => {
    //     e.preventDefault();
    //     //   dispatch(toggleSideBar())
    //     console.log("ppp button click");
    //     onClickMenu();
    //   }}
    // >
    //    <FontAwesome
    //     name="bars"
    //     size="2x"
    //     style={{ textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)" }}
    //   />
    // </button>
    //       <button
    //         className="button home"
    //         style={{ background: "transparent" }}
    //         onClick={(e) => {
    //           e.preventDefault();
    //           //   dispatch(toggleSideBar())
    //           console.log("ppp button click");
    //           onClickMenu();
    //         }}
    //       >
    //          <FontAwesome
    //           name="home"
    //           size="2x"
    //           style={{ textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)" }}
    //         />
    //       </button>
    //       <button
    //         className="button cart"
    //         style={{ background: "transparent" }}
    //         onClick={(e) => {
    //           e.preventDefault();
    //           //   dispatch(toggleSideBar())
    //           console.log("ppp button click");
    //           onClickMenu();
    //         }}
    //       >
    //         <FontAwesome
    //           name="user"
    //           size="2x"
    //           style={{ textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)" }}
    //         />
    //       </button>
    //       <button className="button cart" style={{ background: "transparent" }}>
    //         <span>
    //           <span
    //             className="button text-button"
    //             onClick={(e) => {
    //               e.preventDefault();
    //             }}
    //           >
    //             EN
    //           </span>{" "}
    //           <span className="text-button">|</span>{" "}
    //           <span
    //             className="button text-button"
    //             onClick={(e) => {
    //               e.preventDefault();
    //             }}
    //           >
    //             {" "}
    //             বাং
    //           </span>
    //         </span>
    //       </button>

    //       <button
    //         className="button language"
    //         style={{ background: "transparent" }}
    //         onClick={(e) => {
    //           e.preventDefault();
    //           //   dispatch(toggleSideBar())
    //           onClickMenu();
    //         }}
    //       >
    //         <FontAwesome
    //           name="cart-plus"
    //           size="2x"
    //           style={{ textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)" }}
    //         />
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default AppBar;
