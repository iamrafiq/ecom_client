import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import sideBarReducer  from "./sideBarSlice";

export default configureStore({
    reducer:{
        categories: categoryReducer,
        sideBar:sideBarReducer,
    }
})