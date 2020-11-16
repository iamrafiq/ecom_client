import React from "react";
import Sidebar from "../side_bar/SideBar";
import Routes from "../../Routes";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AppBar from "../app_bar/AppBar";
import UAParser from "ua-parser-js";

import "./Layout.css";
import { useState, useEffect } from "react";
import { selectTree, loadHome } from "../../redux/homeSlice";
import {
  setResolution,
  setDeviceType,
  selectLanguageSelection,
  setLanguage,
} from "../../redux/settingsSlice";

import { useSelector, useDispatch } from "react-redux";
import { MOBIEL_DEVICE_RESOLUTION, TAB_DEVICE_RESOLUTION } from "../../config";

const mql = window.matchMedia(`(min-width: ${MOBIEL_DEVICE_RESOLUTION}px)`);

const Layout = (props) => {
  const dispatch = useDispatch();
  //const resolution = useSelector(selectResolutionSelection);
  console.log("mql...", mql.matches);
  const parser = new UAParser();
  const result = parser.getResult();
  let deviceType = `desktop`
  if (result.device && result.device.type){
    deviceType = JSON.stringify( result.device.type);
  }
  dispatch(setDeviceType({ deviceType: deviceType }));

  const lngSelect = localStorage.getItem("lngSelect");
  if (lngSelect) {
    dispatch(setLanguage({ language: lngSelect }));
  }

  if (mql.matches) {
    dispatch(setResolution({ resolution: "high" }));
  } else {
    dispatch(setResolution({ resolution: "medium" }));
  }

  useEffect(() => {
    dispatch(loadHome());
  }, []);
  const [state, setState] = useState({
    menuClickCallBack: "",
    sidebar: "",
  });
  let menuClickCallBack;

  const cats = useSelector(selectTree);

  const onTouchResetRedux = () => {};

  return (
    <BrowserRouter>
      <div className="layout">
        <AppBar
          onClickMenu={() => {
            state.menuClickCallBack();
          }}
        />
        {cats.length > 0 && (
          <Sidebar
            tree={cats}
            onClickMenu={(callBack) => {
              setState({ ...state, menuClickCallBack: callBack });
              // menuClickCallBack = callBack;
            }}
          ></Sidebar>
        )}
        <div className="layout-body">
          {/* <div className={!state.sidebar?"layout-body-full":"layout-body"}> */}
          <Routes></Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};
export default Layout;
