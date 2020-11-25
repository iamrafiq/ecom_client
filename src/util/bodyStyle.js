import React from "react";


export const defaultStyle ={
    margin: "0",
    fontFamily: "Roboto, sans-serif",
}
export const unmoveableAddressBar = {
    height: "100%",
    position: "fixed",
    /* prevent overscroll bounce*/
    // backgroundColor: "lightgreen",
    overflowY: "scroll",
    webkitOverflowScrolling: "touch",
    /* iOS velocity scrolling */
    // width: "50%",
    // marginLeft:" 25%"
}