import React from "react";
import { useSelector, useDispatch } from "react-redux";
import FontAwesome from "react-fontawesome";

import "./AppBarTop.css";
const AppBarTop = (props) => {
  const dispatch = useDispatch();
  // const mood = useSelector(selectSideBarMood);
  const { onClickMenu } = props;
  return (
    <div className="nav-bar">
      <div className="nav-bar-left">
        <div className="logo">
          <img  src="http://alupiaj.com/images/logo5.png" alt="" />
        </div>
      </div>
      <div className="nav-bar-right">
        <div className="search-box">
          <input type="text" placeholder="Search.." name="search" />
        </div>
        <div className="buttons">
          <button
            className="button menu"
            style={{ background: "transparent" }}
            onClick={(e) => {
              e.preventDefault();
              //   dispatch(toggleSideBar())
              console.log("ppp button click");
              onClickMenu();
            }}
          >
             <FontAwesome
              name="bars"
              size="2x"
              style={{ textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)" }}
            />
          </button>
          <button
            className="button home"
            style={{ background: "transparent" }}
            onClick={(e) => {
              e.preventDefault();
              //   dispatch(toggleSideBar())
              console.log("ppp button click");
              onClickMenu();
            }}
          >
             <FontAwesome
              name="home"
              size="2x"
              style={{ textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)" }}
            />
          </button>
          <button
            className="button cart"
            style={{ background: "transparent" }}
            onClick={(e) => {
              e.preventDefault();
              //   dispatch(toggleSideBar())
              console.log("ppp button click");
              onClickMenu();
            }}
          >
            <FontAwesome
              name="user"
              size="2x"
              style={{ textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)" }}
            />
          </button>
          <button className="button cart" style={{ background: "transparent" }}>
            <span>
              <span
                className="button text-button"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                EN
              </span>{" "}
              <span className="text-button">|</span>{" "}
              <span
                className="button text-button"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                {" "}
                বাং
              </span>
            </span>
          </button>

          <button
            className="button language"
            style={{ background: "transparent" }}
            onClick={(e) => {
              e.preventDefault();
              //   dispatch(toggleSideBar())
              onClickMenu();
            }}
          >
            <FontAwesome
              name="cart-plus"
              size="2x"
              style={{ textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)" }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppBarTop;
