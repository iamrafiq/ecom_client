import React from "react";
import Sidebar from "../side_bar/SideBar";
import Routes from "../../RoutesMod";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AppBarTop from "../app_bar/AppBarTop";
import "./Layout.css";
import { useDispatch } from "react-redux";
import { initSideBarState } from "../../redux/sideBarSlice";
import { useState } from "react";

function Layout(props) {
  const dispatch = useDispatch();
  dispatch(initSideBarState());
  const [state, setState] = useState({
    menuClickCallBack: "",
    sidebar: "",
  });
  let menuClickCallBack;
  return (
    <BrowserRouter>
      <div class="layout">
        <AppBarTop
          onClickMenu={() => {
            state.menuClickCallBack();
            // setState({ ...state, sidebar: !state.sidebar });
          }}
        />

        <Sidebar
          onClickMenu={(callBack) => {
            console.log("ppp...");
            setState({ ...state, menuClickCallBack: callBack });
            // menuClickCallBack = callBack;
            console.log("ppp...", menuClickCallBack);
          }}
        ></Sidebar>
        <div className="layout-body">
          {/* <div className={!state.sidebar?"layout-body-full":"layout-body"}> */}
          <Routes></Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default Layout;
