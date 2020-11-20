import "./bar.css";
import React from "react";
import { SIDE_BAR_WIDTH } from "../../config";
import SideBarContent from "./SidebarContent";
import { MOBIEL_DEVICE_RESOLUTION } from "../../config";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSideBar, setSideBar } from "../../redux/settingsSlice";
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
const Sidebar = ({ height, children }) => {
  const dispatch = useDispatch();
  const sideBar = useSelector(selectSideBar);
  const [xPosition, setX] = useState(0);

  const toggleMenu = () => {
    if (xPosition < 0) {
      setX(0);
    } else {
      setX(-SIDE_BAR_WIDTH);
    }
  };

  useEffect(() => {
    toggleMenu();
  }, [sideBar]);
  return (
    <React.Fragment>
      {xPosition > -SIDE_BAR_WIDTH ? (
        <div
          className="overlay--sidebar "
          onClick={() => {
            toggleMenu();
          }}
          style={{ opacity: "1" }}
        >
          <div class="side__bar__cross--left" onClick={toggleMenu}></div>
        </div>
      ) : (
        <div
          className="overlay--sidebar "
          style={{ opacity: "0", pointerEvents: "none", cursor: "default" }}
        ></div>
      )}

      <div
        className="cart-bar"
        style={{
          transform: `translatex(${xPosition}px)`,
          width: SIDE_BAR_WIDTH,
          minHeight: height,
        }}
      >
        <div className="sidebar__content">
          {<SideBarContent toggleSideBar={toggleMenu} tree={children} />}
          
        </div>
        
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
