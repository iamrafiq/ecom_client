import React from "react";
import Sidebar from "../side_bar/SideBar";
import Routes from "../../Routes";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AppBarTop from "../app_bar/AppBarTop";
import "./Layout.css";
import { loadCategories } from "../../redux/categorySlice";
import { useState, useEffect } from "react";
import { selectCategories } from "../../redux/categorySlice";
import { useSelector, useDispatch } from "react-redux";
function Layout(props) {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(loadCategories());
  },[])
  const [state, setState] = useState({
    menuClickCallBack: "",
    sidebar: "",
  });
  let menuClickCallBack;

  const cats =  useSelector(selectCategories)
 
  console.log("Layout..................")
  return (
    <BrowserRouter>
      <div className="layout">
        <AppBarTop
          onClickMenu={() => {
           state.menuClickCallBack();
          }}
        />
        {cats.length>0&&
        (<Sidebar
          tree={cats}
          onClickMenu={(callBack) => {
            console.log("ppp...");
            setState({ ...state, menuClickCallBack: callBack });
            // menuClickCallBack = callBack;
            console.log("ppp...", menuClickCallBack);
          }}
        ></Sidebar>)}
        <div className="layout-body">
          {/* <div className={!state.sidebar?"layout-body-full":"layout-body"}> */}
          <Routes></Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default Layout;
