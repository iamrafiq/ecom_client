import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSideBarMood, toggleSideBar } from "../redux/sideBarSlice";
import "./AppBarTop.css";
const AppBarTop = (props) => {
    const dispatch = useDispatch();
    // const mood = useSelector(selectSideBarMood);
   const {onClickMenu} = props;
  return (
    <div class="nav-bar-top">
      <div class="nav">
        <div class="search-box">
          <input type="text" placeholder="Search.." name="search" />
        </div>
        <div class="buttons">
          <div>Help</div>
          <button class="button" onClick={(e)=>{
              e.preventDefault();
            //   dispatch(toggleSideBar())
            console.log("ppp button click")
            onClickMenu();
          }}>Language</button>
          <div class="sign-in">Sign id</div>
          <div class="language">Language</div>
          <div class="sign-in">Sign id</div>
        </div>
      </div>
    </div>
  );
};

export default AppBarTop;
