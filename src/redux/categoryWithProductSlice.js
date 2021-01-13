import { createSlice } from "@reduxjs/toolkit";
import {
  getProductsByCategorySlug,
  getProductsByCategoryId,
} from "../core/apiCore";
import { setLoadingSpinner } from "./globalSlice";
export const categoryWithProductSlice = createSlice({
  name: "categoryWithProduct",
  initialState: {
    data: null,
    loading: false,
  },
  reducers: {
    setCategoryWithProduct: (state, action) => {
      state.data = action.payload.data;
      //console.log("category lodaded....", state.data)
    },
    setLoading: (state, action) => {
      state.loading = action.payload.loading;
      //console.log("category lodaded....", state.data)
    },
  },
});

const { setCategoryWithProduct, setLoading } = categoryWithProductSlice.actions;

export const loadCategoryWithProduct = (slug, catId = undefined) => (
  dispatch
) => {
  dispatch(setLoading({ loading: true }));
  if (catId === undefined) {
    getProductsByCategorySlug(slug).then((data) => {

      console.log("category-q", data)
      if (data.error) {
        dispatch(setLoading({ loading: false }));
      } else {
        dispatch(setCategoryWithProduct({ data }));
        dispatch(setLoading({ loading: false }));
      }
    });
  } else {
    getProductsByCategoryId(catId).then((data) => {
      console.log("category-q", data)
      if (data.error) {
        dispatch(setLoading({ loading: false }));
      } else {
        dispatch(setCategoryWithProduct({ data }));
        dispatch(setLoading({ loading: false }));
      }
    });
  }
};

export const selectCategoryWithProduct = (state) => {
  return state.categoryWithProduct.data;
};
export const selectLoadingCategoryWithProduct = (state) => {
  return state.categoryWithProduct.loading;
};

export default categoryWithProductSlice.reducer;
