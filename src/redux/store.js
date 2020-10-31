import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import sideBarReducer  from "./sideBarSlice";
import categoryWithProductReducer from "./categoryWithProductSlice";
import productHoverReducer from "./productHoverSlice";
import settingsReducer from "./settingsSlice";
import cartReducer from "./cartSlice";




export default configureStore({
    reducer:{
        categories: categoryReducer,
        sideBar:sideBarReducer,
        categoryWithProduct:categoryWithProductReducer,
        productHover:productHoverReducer,
        settings:settingsReducer,
        cart:cartReducer,

    }
})