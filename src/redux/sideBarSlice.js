import { createSlice } from "@reduxjs/toolkit";

export const sideBarSlice = createSlice({
  name: "sideBar",
  initialState: {
    bar: "home",
    barCallback:""
  },
  reducers: {
    setBar: (state, action) => {
      state.bar = action.payload.bar;
      if (state.barCallback){
       state.barCallback(state.bar)
      }
    },
    setBarCallback: (state, action) => {
      state.barCallback = action.payload.barCallback;
    }
  },
});


export const changeBar = (barCallback) => (dispatch) => {
  dispatch(setBarCallback({ barCallback:barCallback }));
};
export const { setBar, setBarCallback } = sideBarSlice.actions;
export const selectSideBarSelection = (state) => state.sideBar.bar;
export default sideBarSlice.reducer;
