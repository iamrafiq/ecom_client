import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./homeSlice";
import sideBarReducer  from "./sideBarSlice";
import categoryWithProductReducer from "./categoryWithProductSlice";
import productHoverReducer from "./productHoverSlice";
import settingsReducer from "./settingsSlice";
import cartReducer from "./cartSlice";




export default configureStore({
    reducer:{
        home: homeReducer,
        sideBar:sideBarReducer,
        categoryWithProduct:categoryWithProductReducer,
        productHover:productHoverReducer,
        settings:settingsReducer,
        cart:cartReducer,

    }
})