import { createSlice } from "@reduxjs/toolkit";
import { getHome } from "../core/apiCore";

export const homesSlice = createSlice({
  name: "home",
  initialState: {
    data: {},
    categories: [],
    tree: [],
    offerProducts: [],
    offerProductsCount:0,
    advertisements: [],
    homeLoaded: false,
  },
  reducers: {
    setHome: (state, action) => {
      // console.log("action.payload.data", action.payload.data)
      if (action.payload.data) {
        let data = action.payload.data.categories;
        const idMapping = data.reduce((acc, el, i) => {
          acc[el._id] = i;
          return acc;
        }, {});

        let root = "";
        data.forEach((el) => {
          // Handle the root element
          if (!el.parent || el.parent === null) {
            root = el;
            return;
          }
          // Use our mapping to locate the parent element in our data array
          const parentEl = data[idMapping[el.parent._id]];
          // Add our current el to its parent's `children` array
          parentEl.children = [...(parentEl.children || []), el];
        });

        if (root.children) {
          state.tree = root.children;
        } else {
          state.tree = root;
        }

        state.data = action.payload.data;
        state.categories = action.payload.data.categories;
        state.offerProducts = action.payload.data.offerProducts;
        state.offerProductsCount = action.payload.data.offerProductsCount;
        //  console.log("state.offerProductsCount", action.payload.data.offerProductsCount);
        state.advertisements = action.payload.data.advertisements;
      }
      state.homeLoaded = true;
    },
  },
});

const { setHome } = homesSlice.actions;

export const loadHome = () => (dispatch) => {
  getHome().then((data) => {
    if (data === undefined) {
      dispatch(setHome({ data: undefined }));
    } else {
      dispatch(setHome({ data }));
    }
  });
};

export const selectCategories = (state) => {
  return state.home.categories;
};
export const selectHomeLoaded = (state) =>{
  return state.home.homeLoaded;
}
export const selectTree = (state) => {
  return state.home.tree;
};
export const selectHomeSelection = (state) => {
  return state.home.data;
};
export const selectOfferProducts = (state) => {
  return state.home.offerProducts;
};
export const selectOfferProductsCounts = (state) => {
  return state.home.offerProductsCount;
};
export const selectAdvertisements = (state) => {
  return state.home.advertisements;
};
export default homesSlice.reducer;
