import { createSlice } from "@reduxjs/toolkit";

/**
 * when user touched on a product use this hover slice
 * when user touched out side of product reaset this slice to empty :Layout.js
 */
export const productHoverSlice = createSlice({
  name: "productHover",
  initialState: {
    slug: "",
  },
  reducers: {
    setSlug: (state, action) => {
      state.slug = action.payload.slug;
    },
  },
});


export const { setSlug } = productHoverSlice.actions;
export const selectProductHoverSelection = (state) => state.productHover.slug;

export default productHoverSlice.reducer;