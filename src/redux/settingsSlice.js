import { createSlice } from "@reduxjs/toolkit";

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    language: "bn", // for bangla value 'bn'
    resolution: "medium", // low, heigh, medium // used to
    deviceType: "desktop", //"tablet"/ "mobile"/ "desktop" // default should be desktop because UAParser set device type mobile only when it is in mobile
    
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
 
  },
});

export const {
  setLanguage,
  setResolution,
  setDeviceType,
  setAuthenticate,

} = settingsSlice.actions;


export const selectLanguageSelection = (state) => state.settings.language;
export const selectResolutionSelection = (state) => state.settings.resolution;
export const selectDeviceTypeSelection = (state) => state.settings.deviceType;

export default settingsSlice.reducer;
