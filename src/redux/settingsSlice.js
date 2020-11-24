import { createSlice } from "@reduxjs/toolkit";

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    language: "bn", // for bangla value 'bn'
    resolution: "medium", // low, heigh, medium // used to
    deviceType: "desktop", //"tablet"/ "mobile"/ "desktop" // default should be desktop because UAParser set device type mobile only when it is in mobile
    authenticate: undefined, // hold object
    sideBar: {open:false},
    cartBarDesktop: {open:false},
    cartBarMobile:{open:false}
  },
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload.language;
    },
    setResolution: (state, action) => {
      state.resolution = action.payload.resolution;
    },
    setDeviceType: (state, action) => {
      state.deviceType = action.payload.deviceType;
    },
    setAuthenticate: (state, action) => {
      state.authenticate = action.payload.authenticate;
    },
    setSideBar: (state, action) => {
      state.sideBar = action.payload.sideBar;
    },
    setCartBarDesktop: (state, action) => {
      state.cartBarDesktop = action.payload.cartBarDesktop;
    },
    setCartBarMobile:(state, action)=>{
      state.cartBarMobile = action.payload.cartBarMobile;
    }
  },
});

export const {
  setLanguage,
  setResolution,
  setDeviceType,
  setAuthenticate,
  setSideBar,
  setCartBarDesktop,
  setCartBarMobile
} = settingsSlice.actions;
export const selectSideBar = (state) => state.settings.sideBar;
export const selectCartBarDesktop = (state) => state.settings.cartBarDesktop;
export const selectCartBarMobile = (state) => state.settings.cartBarMobile;

export const selectLanguageSelection = (state) => state.settings.language;
export const selectResolutionSelection = (state) => state.settings.resolution;
export const selectDeviceTypeSelection = (state) => state.settings.deviceType;
export const selectAuthenticateSelection = (state) =>
  state.settings.authenticate;

export default settingsSlice.reducer;
