import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import sideBarReducer  from "./sideBarSlice";
import categoryWithProductReducer from "./categoryWithProductSlice";


export default configureStore({
    reducer:{
        categories: categoryReducer,
        sideBar:sideBarReducer,
        categoryWithProduct:categoryWithProductReducer,
    }
})