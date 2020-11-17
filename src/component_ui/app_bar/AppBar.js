import React from "react";
import { useSelector, useDispatch } from "react-redux";
import FontAwesome from "react-fontawesome";
import SearchBox from "./SearchBox";
import "./app-bar.css";
import { imageUrlConverter } from "../../util/ImageUrlConverter";
import { selectHomeSelection } from "../../redux/homeSlice";

import {
  selectResolutionSelection,
  selectLanguageSelection,
  setLanguage,
  selectDeviceTypeSelection,
} from "../../redux/settingsSlice";
import logo from "../../images/logo.svg";
import SearchBoxMobile from "./SearchBoxMobile";
import LanguageMenu from "./LanguageMenu";
import SigninMenu from "./SigninMenu";
import Orders from "./Orders";
import Cart from "./Cart";

const AppBar = (props) => {
  const dispatch = useDispatch();
  const home = useSelector(selectHomeSelection);
  const resulationSelector = useSelector(selectResolutionSelection);
  const language = useSelector(selectLanguageSelection);
  const deviceType = useSelector(selectDeviceTypeSelection);


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
                  console.log("ppp button click");
                  onClickMenu();
                }}
              >
                <FontAwesome name="bars" size="2x" />
              </div>
              {home.logo && (
                <img
                  src={`${imageUrlConverter(
                    home.logo
                  )}&res=${resulationSelector}`}
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
        <div className="nav__bar__main--mobile">
          <div className="nav--mobile">
            <div className="nav__mobile--left">
              <div
                className="button__lang--menu"
                onClick={(e) => {
                  e.preventDefault();
                  //   dispatch(toggleSideBar())
                  console.log("ppp button click");
                  onClickMenu();
                }}
              >
                <FontAwesome name="bars" size="2x" />
              </div>
              {home.logo && (
                <img
                  src={`${imageUrlConverter(home.logo)}&res=${"low"}`}
                  alt="Sowdamart.com"
                />
              )}
            </div>
            <div className="nav__mobile--right">
              <div className="nav__menu--mobile">
                <div className="mobile--menu--item">
                  <LanguageMenu></LanguageMenu>
                </div>
                <div className="mobile--menu--item">
                  <SigninMenu mobile={true}></SigninMenu>
                </div>
                <div className="mobile--menu--item">
                  <Orders mobile={true}></Orders>
                </div>
                <div className="mobile--menu--item">
                <Cart mobile={true}></Cart>
              </div>
              </div>
            </div>
          </div>
          <div className="search__box--mobile">
            <SearchBoxMobile className=""></SearchBoxMobile>
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
