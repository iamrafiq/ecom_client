import { createSlice } from "@reduxjs/toolkit";
import { getProductsByGroupSlug } from "../core/apiCore";
import { setLoadingSpinner } from "./globalSlice";
export const groupWithProductSlice = createSlice({
  name: "groupWithProduct",
  initialState: {
    data: null,
    loading: false,
  },
  reducers: {
    setGroupWithProduct: (state, action) => {
      state.data = action.payload.data;
      //console.log("category lodaded....", state.data)
    },
    setLoading: (state, action) => {
      state.loading = action.payload.loading;
      //console.log("category lodaded....", state.data)
    },
  },
});

const { setGroupWithProduct, setLoading } = groupWithProductSlice.actions;

export const loadGroupWithProduct = (slug) => (
  dispatch
) => {
  dispatch(setLoading({ loading: true }));
  getProductsByGroupSlug(slug).then((data) => {
    console.log("grouppppp..", data)
    if (data.error) {
      dispatch(setLoading({ loading: false }));
    } else {
      dispatch(setGroupWithProduct({ data }));
      dispatch(setLoading({ loading: false }));
    }
  });
};

export const selectGroupWithProduct = (state) => {
  return state.groupWithProduct.data;
};
export const selectLoadingGroupWithProduct = (state) => {
  return state.groupWithProduct.loading;
};

export default groupWithProductSlice.reducer;
