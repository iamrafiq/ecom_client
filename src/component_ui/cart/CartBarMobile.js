import React from "react";
import Sidebar from "../side_bar/core/sidebar";
import CartbarContent from "./CartbarContent";
import { MOBIEL_DEVICE_RESOLUTION } from "../../config";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { unmoveableAddressBar, defaultStyle } from "../../util/bodyStyle";


import {
  selectCartBarMobile,
  setCartBarMobile,
} from "../../redux/settingsSlice";
const SideBar = (props) => {
  const dispatch = useDispatch();

  const cartBarMobile = useSelector(selectCartBarMobile);

  if (cartBarMobile.open) {
    for (let i in unmoveableAddressBar) {
      document.body.style[i] = unmoveableAddressBar[i];
    }
  } else {
    for (let i in unmoveableAddressBar) {
      document.body.style[i] = null;
    }
    for (let i in defaultStyle) {
      document.body.style[i] = defaultStyle[i];
    }
   
 
  }
  useEffect(() => {}, []);

  const toggleOpen = (ev) => {
    dispatch(
      setCartBarMobile({ cartBarMobile: { open: !cartBarMobile.open } })
    );
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
      <div>
        {cartBarMobile.open&&(
           <Sidebar {...sidebarProps}>
           <div />
         </Sidebar>
          // <PureModal
          //   header={""}
          //   scrollable={false}
          //   // footer="Buttons?"
          //   //  closeButtonPosition="bottom"
          //   // closeButtonPosition="bottom"
          //   portal
          //   closeButton={
          //     <div
          //       style={{
          //         position: "absolute",
          //         top: "1.3rem",
          //         right: "1.3rem",
          //         background: "#BDBDBD",
          //         width: "5rem",
          //         height: "2.5rem",
          //         fontSize: "1rem",
          //       }}
          //     >
          //       Close
          //     </div>
          //   }
          //   isOpen={true}
          //   onClose={() => {
          //     // setModalInnerScroll(false);
          //     for (let i in unmoveableAddressBar) {
          //       document.body.style[i] = null;
          //     }
          //     for (let i in defaultStyle) {
          //       document.body.style[i] = defaultStyle[i];
          //     }
          //     setCartBarMobile({
          //       cartBarMobile: { open: !cartBarMobile.open },
          //     });
          //     return true;
          //   }}
          // >
          //   <CartbarContent toggleSideBar={toggleOpen} />
          // </PureModal>
        )}
        </div>
    </div>
  );
};
export default SideBar;
