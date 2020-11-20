import React from "react";
import Sidebar from "./core/sidebar";
import CartBarContent from "./core/cartbar_content";
import { MOBIEL_DEVICE_RESOLUTION } from "../../config";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  selectCartBar,
  setCartBar,
} from "../../redux/settingsSlice";
const CartBar = (props) => {
  const dispatch = useDispatch();

  const cartBar = useSelector(selectCartBar);

  const [state, setState] = useState({
    open: false,
    loading: false,
    tree: JSON.parse(JSON.stringify(props.tree)),
  });
  useEffect(() => {}, []);

  const toggleOpen = (ev) => {
    if (ev) {
      ev.preventDefault();
    }
    // setState({ open: !state.open });
    dispatch(setCartBar({ cartBar: {open:!cartBar.open} }));
  };
  const onSetOpen = (open) => {
    dispatch(setCartBar({ cartBar: {open:open} }));

  }

  const { loading, tree } = state;
  const sidebar = (
    <CartBarContent toggleSideBar={toggleOpen} tree={tree} />
  );

  const sidebarProps = {
    sidebar,
    // pullRight: "true",
    open: cartBar.open,
    onSetOpen: onSetOpen,
  };
  return (
    <div>
      {cartBar.open && (
        <div class="side__bar__cross--left" onClick={toggleOpen}></div>
      )}
      {console.log("open bar",cartBar)}

      <Sidebar {...sidebarProps}>
        <div />
      </Sidebar>
    </div>
  );
};
export default CartBar;
