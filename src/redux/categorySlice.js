import { createSlice } from "@reduxjs/toolkit";
import {getHome } from "../core/apiCore";

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    cats: [],
    offerProducts:[],
    advertisiments:[],
    
  },
  reducers: {
    setCategories: (state, action) => {
      state.cats = action.payload.cats;
    },
  },
});

const { setCategories } = categoriesSlice.actions;

export const loadCategories = () => (dispatch) => {
  getHome().then((data) => {
    if (data===undefined && data.error) {
    } else {
      dispatch(setCategories({ cats:data.categoryTree }));
    }
  });
};


export const selectCategories = (state) => {
  return state.categories.cats;
};
export default categoriesSlice.reducer;
