import { createSlice } from "@reduxjs/toolkit";
import {getHome } from "../core/apiCore";

export const homesSlice = createSlice({
  name: "home",
  initialState: {
    categories: [],
    offerProducts:[],
    advertisements:[],
    
  },
  reducers: {
    setHome: (state, action) => {
      state.categories = action.payload.data.categoryTree;
      state.offerProducts = action.payload.data.offerProducts;
      state.advertisements = action.payload.data.advertisements;

    },
  },
});

const { setHome } = homesSlice.actions;

export const loadHome = () => (dispatch) => {
  getHome().then((data) => {
    if (data===undefined && data.error) {
    } else {
      dispatch(setHome({ data }));

    }
  });
};


export const selectCategories = (state) => {
  return state.home.categories;
};
export const selectOfferProducts = (state) => {
  return state.home.offerProducts;
};
export const selectAdvertisements = (state) => {
  return state.home.advertisements;
};
export default homesSlice.reducer;
