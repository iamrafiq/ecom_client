import React from "react";
import Sidebar from "../sidebar/Sidebar";
import Cartbar from "../sidebar/Cartbar";
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
  selectSideBar,
  selectCartBar,
  setLanguage,
  setAuthenticate,
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
  const cartBar = useSelector(selectCartBar);
  let deviceType = `desktop`;
  if (result.device && result.device.type) {
    deviceType = JSON.stringify(result.device.type);
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
  if (localStorage.getItem("jwt")) {
    dispatch(
      setAuthenticate({ authenticate: JSON.parse(localStorage.getItem("jwt")) })
    );
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
          <Sidebar children={JSON.parse(JSON.stringify(cats))}></Sidebar>
        )}
        {deviceType === "desktop" ? (
          <React.Fragment>
            {" "}
            {cartBar.open ? (
              <div className={`layout-body layout-body--padding`}>
                {cats.length > 0 && (
                  <Cartbar
                    children={JSON.parse(JSON.stringify(cats))}
                  ></Cartbar>
                )}
                <Routes></Routes>
              </div>
            ) : (
              <div className={`layout-body`}>
                {cats.length > 0 && (
                  <Cartbar
                    children={JSON.parse(JSON.stringify(cats))}
                  ></Cartbar>
                )}
                <Routes></Routes>
              </div>
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className={`layout-body`}>
              {cats.length > 0 && (
                <Cartbar children={JSON.parse(JSON.stringify(cats))}></Cartbar>
              )}
              <Routes></Routes>
            </div>
          </React.Fragment>
        )}
      </div>
    </BrowserRouter>
  );
};
export default Layout;
