import React from "react";
import { useSelector, useDispatch } from "react-redux";
import FontAwesome from "react-fontawesome";
import { RadioGroup, Radio } from "react-radio-group";
import SearchBox from "./SearchBox";
import "./app-bar.css";
import { imageUrlConverter } from "../../util/ImageUrlConverter";
import { selectHomeSelection } from "../../redux/homeSlice";
import bnFlag from "../../images/bn.png";
import enFlag from "../../images/en.png";

import LanguagePopup from "./LanguagePopup";
import {
  selectResolutionSelection,
  selectLanguageSelection,
  setLanguage
} from "../../redux/settingsSlice";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const AppBar = (props) => {
  const dispatch = useDispatch();
  const home = useSelector(selectHomeSelection);
  const resulationSelector = useSelector(selectResolutionSelection);
  const language = useSelector(selectLanguageSelection);
  // const mood = useSelector(selectSideBarMood);
  const { onClickMenu } = props;
 
  const handleLanguageChange = (value) =>{
    console.log("handle change")
    if (value == "en"){
      dispatch(setLanguage({ language: "en"}))
    }
    if (value == "bn"){
      dispatch(setLanguage({ language: "bn"}))
    }
  }
  const contentStyle = {
    position: "fixed",
    height: "200px",
    backgroundColor: "red",
  };
  return (
    <div className="nav__bar__main">
      <div className="nav__left">
        <div
          className="button__menu"
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
            src={`${imageUrlConverter(home.logo)}&res=${resulationSelector}`}
            alt="Sowdamart.com"
          />
        )}
      </div>
      <div className="nav__middle">
        <SearchBox className="nav_middle"></SearchBox>
      </div>
      <div className="nav__right">
        <div className="nav__right--mobile">
          <FontAwesome name="ellipsis-v" size="2x" />
        </div>
        <div className="nav__right--desktop">
          {/* <div
            className="desktop--language"
            onTouchStart={() => onHoverProduct()}
            onMouseEnter={() => onHoverProduct()}
          >
            <img src={bnFlag} alt="flag" />
            <FontAwesome name="sort-down" size="1x" />
          </div> */}
          <div className="menu">
            <Popup
              trigger={
                <div className="menu-item">
                  {" "}
                  <div
                    className="desktop--language"
                    // onTouchStart={() => onHoverProduct()}
                    // onMouseEnter={() => onHoverProduct()}
                  >
                    <img src={language==="en"?enFlag:bnFlag} alt="flag" style={{width:"25px", height:"25px"}}/>
                    <FontAwesome name="sort-down" size="1x" />
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
                    <span>&nbsp; &nbsp; বাংলা</span> &nbsp; &nbsp;  &nbsp; &nbsp;<img src={bnFlag} alt="flag" style={{width:"25px", height:"25px"}}/>

                  </label>
                  <br/>
                  <label>
                    <Radio value="en" />
                    <span>&nbsp; &nbsp; English</span> &nbsp; &nbsp;<img src={enFlag} alt="flag" style={{width:"25px", height:"25px"}}/>

                  </label>
                </RadioGroup>
              </div>
            </Popup>
          </div>
        </div>
      </div>
      {/* <SearchBox className="nav_middle"></SearchBox> */}
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
