import React from "react";
import SideBarContent from "../sidebar/SidebarContent";
import { MOBIEL_DEVICE_RESOLUTION } from "../../config";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../sidebar/Sidebar";
import {
  selectSideBar,
  setSideBar,
} from "../../redux/settingsSlice";
const SideBar = (props) => {
  const dispatch = useDispatch();

  const sideBar = useSelector(selectSideBar);

  const [state, setState] = useState({
    loading: false,
    tree: JSON.parse(JSON.stringify(props.tree)),
  });
  useEffect(() => {}, []);

  const toggleOpen = (ev) => {
    dispatch(setSideBar({ sideBar: {open:!sideBar.open} }));
  };
  const onSetOpen = (open) => {
    dispatch(setSideBar({ sideBar: {open:open} }));

  }

  const { loading, tree } = state;
  const sidebar = (
    <SideBarContent toggleSideBar={toggleOpen} tree={tree} />
  );

  const sidebarProps = {
    sidebar,
    // pullRight: "true",
    open: sideBar.open,
    onSetOpen: onSetOpen,
  };
  return (
    <React.Fragment>
      {sideBar.open && (
        <div class="side__bar__cross--left" onClick={toggleOpen}></div>
      )}
      {console.log("open bar",sideBar)}

      <Sidebar width={300} height={1000} children={sidebar} >
       
      </Sidebar>
      </React.Fragment>
  );
};
export default SideBar;
