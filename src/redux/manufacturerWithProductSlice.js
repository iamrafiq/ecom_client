import { createSlice } from "@reduxjs/toolkit";
import { getProductsByManufacturerSlug } from "../core/apiCore";
export const manufacturerWithProductSlice = createSlice({
  name: "manufacturerWithProduct",
  initialState: {
    data: null,
    loading: false,
  },
  reducers: {
    setManufacturerWithProduct: (state, action) => {
      state.data = action.payload.data;
      //console.log("category lodaded....", state.data)
    },
    setLoading: (state, action) => {
      state.loading = action.payload.loading;
      //console.log("category lodaded....", state.data)
    },
  },
});

const { setManufacturerWithProduct, setLoading } = manufacturerWithProductSlice.actions;

export const loadManufacturerWithProduct = (slug) => (
  dispatch
) => {
  dispatch(setLoading({ loading: true }));
  getProductsByManufacturerSlug(slug).then((data) => {
    if (data === undefined && data.error) {
      dispatch(setLoading({ loading: false }));
    } else {
      dispatch(setManufacturerWithProduct({ data }));
      dispatch(setLoading({ loading: false }));
    }
  });
};

export const selectManufacturerWithProduct = (state) => {
  return state.manufacturerWithProduct.data;
};
export const selectLoadingManufacturerWithProduct = (state) => {
  return state.manufacturerWithProduct.loading;
};

export default manufacturerWithProductSlice.reducer;
