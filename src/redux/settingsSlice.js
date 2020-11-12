import { createSlice } from "@reduxjs/toolkit";

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    language: "en",  // for bangla value 'bn'
    resolution: "medium",   // low, heigh, medium // used to 
    
  },
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload.language;
    },
    setResolution: (state, action) => {
      state.resolution = action.payload.resolution;
    },
  },
});


export const { setLanguage, setResolution } = settingsSlice.actions;
export const selectLanguageSelection = (state) => state.settings.language;
export const selectResolutionSelection = (state) => state.settings.resolution;
export const selectDeviceSelection = (state) => state.settings.device;


export default settingsSlice.reducer;