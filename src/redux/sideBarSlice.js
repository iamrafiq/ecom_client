import { createSlice } from "@reduxjs/toolkit";

export const sideBarSlice = createSlice({
  name: "sideBar",
  initialState: {
    barToView: "",
    viewToBar: "",
    barCallback:""
  },
  reducers: {
    setBarToView: (state, action) => {
      state.barToView = action.payload.barToView;
    },
    setViewToBar: (state, action) => {
      state.viewToBar = action.payload.viewToBar;
    },
    setBarCallback: (state, action) => {
      state.barCallback = action.payload.barCallback;
    }
  },
});


export const changeBar = (barCallback) => (dispatch) => {
  dispatch(setBarCallback({ barCallback:barCallback }));
};
export const { setBarToView, setViewToBar, setBarCallback } = sideBarSlice.actions;
export const selectSideBarBarToViewSelection = (state) => state.sideBar.barToView;
export const selectSideBarViewToBarSelection = (state) => state.sideBar.viewToBar;

export default sideBarSlice.reducer;
