import React from "react";
import Sidebar from "../side_bar/SideBar";
import Routes from "../../Routes";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AppBarTop from "../app_bar/AppBarTop";
import "./Layout.css";
import { useState, useEffect } from "react";
import { selectCategories , loadHome} from "../../redux/homeSlice";
import { setResolution, selectResolutionSelection } from "../../redux/settingsSlice";

import { useSelector, useDispatch } from "react-redux";
import { MOBIEL_DEVICE_RESOLUTION } from "../../config";

const mql = window.matchMedia(`(min-width: ${MOBIEL_DEVICE_RESOLUTION}px)`);

function Layout(props) {
  const dispatch = useDispatch();
  //const resolution = useSelector(selectResolutionSelection);
  console.log("mql...", mql.matches)

  if (mql.matches){
    dispatch(setResolution({resolution:"high"}));
  }else{
    dispatch(setResolution({resolution:"medium"}));
  }
  useEffect(() => {
    dispatch(loadHome());
  }, []);
  const [state, setState] = useState({
    menuClickCallBack: "",
    sidebar: "",
  });
  let menuClickCallBack;

  const cats = useSelector(selectCategories);

  console.log("Layout..................");
  const onTouchResetRedux = () => {
  };
  return (
    <BrowserRouter>
      <div className="layout">
        <AppBarTop
          onClickMenu={() => {
            state.menuClickCallBack();
          }}
        />
        {cats.length > 0 && (
          <Sidebar
           
            tree={cats}
            onClickMenu={(callBack) => {
              console.log("ppp...");
              setState({ ...state, menuClickCallBack: callBack });
              // menuClickCallBack = callBack;
              console.log("ppp...", menuClickCallBack);
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
}

export default Layout;
