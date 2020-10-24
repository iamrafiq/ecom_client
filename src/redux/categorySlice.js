import { createSlice } from "@reduxjs/toolkit";
import { getCategories, getTree } from "../admin/apiAdmin";

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    cats: [],
  },
  reducers: {
    setCategories: (state, action) => {
      state.cats = action.payload.cats;
    },
  },
});

const { setCategories } = categoriesSlice.actions;

export const loadCategories = () => (dispatch) => {
  getTree().then((data) => {
    if (data===undefined && data.error) {
    } else {
      dispatch(setCategories({ cats:data }));
    }
  });
};

export const selectCategories = (state) => {
  return state.categories.cats;
};
export default categoriesSlice.reducer;
