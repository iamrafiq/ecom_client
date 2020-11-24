import React from "react";
import Sidebar from "../side_bar/core/sidebar";
import CartbarContent from "./CartbarContent";
import { MOBIEL_DEVICE_RESOLUTION } from "../../config";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectCartBarMobile, setCartBarMobile } from "../../redux/settingsSlice";
const SideBar = (props) => {
  const dispatch = useDispatch();

  const cartBarMobile = useSelector(selectCartBarMobile);

  //   const [state, setState] = useState({
  //     loading: false,
  //     tree: JSON.parse(JSON.stringify(props.tree)),
  //   });
  useEffect(() => {}, []);

  const toggleOpen = (ev) => {
    dispatch(setCartBarMobile({ cartBarMobile: { open: !cartBarMobile.open } }));
  };
  const onSetOpen = (open) => {
    dispatch(setCartBarMobile({ cartBarMobile: { open: open } }));
  };

  //   const { loading, tree } = state;
  const sidebar = <CartbarContent toggleSideBar={toggleOpen} />;

  const sidebarProps = {
    sidebar,
    pullRight: "true",
    open: cartBarMobile.open,
    onSetOpen: onSetOpen,
  };
  return (
    <div>
      {cartBarMobile.open && (
        <div class="side__bar__cross--left" onClick={toggleOpen}></div>
      )}
      <Sidebar {...sidebarProps}>
        <div />
      </Sidebar>
    </div>
  );
};
export default SideBar;
