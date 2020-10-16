import { configureStore } from "@reduxjs/toolkit";
import { sideBarSlice } from "./sideBarSlice";

export default configureStore({
    reducer:{
        sideBar: sideBarSlice
    }
})