import { createSlice } from "@reduxjs/toolkit";
import { getProductsByCategorySlug } from "../core/apiCore";
import { setLoadingSpinner } from "./globalSlice";
export const categoryWithProductSlice = createSlice({
  name: "categoryWithProduct",
  initialState: {
    data: [],
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

export const loadCategoryWithProduct = (slug) => (dispatch) => {
  dispatch(setLoading({ loading: true }));

  getProductsByCategorySlug(slug).then((data) => {
    if (data === undefined && data.error) {
       dispatch(setLoading({ loading: false }));
    } else {
      dispatch(setCategoryWithProduct({ data }));
       dispatch(setLoading({ loading: false }));
    }
  });
};

export const selectCategoryWithProduct = (state) => {
  return state.categoryWithProduct.data;
};
export const selectLoading = (state) => {
  return state.categoryWithProduct.loading;
};

export default categoryWithProductSlice.reducer;
