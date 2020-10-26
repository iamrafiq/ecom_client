import { createSlice } from "@reduxjs/toolkit";
import { getCategoryWithProducts } from "../core/apiCore";
export const categoryWithProductSlice = createSlice({
  name: "categoryWithProduct",
  initialState: {
    data: [],
  },
  reducers: {
    setCategoryWithProduct: (state, action) => {
      state.data = action.payload.data;
      //console.log("category lodaded....", state.data)

    },
  },
});

const { setCategoryWithProduct } = categoryWithProductSlice.actions;

export const loadCategoryWithProduct = (slug) => (dispatch) => {
  getCategoryWithProducts(slug).then((data) => {
    if (data===undefined && data.error) {
    } else {
      dispatch(setCategoryWithProduct({ data }));
    }
  });
};

export const selectCategoryWithProduct = (state) => {
  return state.categoryWithProduct.data;
};
export default categoryWithProductSlice.reducer;
