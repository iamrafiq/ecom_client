import { createSlice } from "@reduxjs/toolkit";

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    settings: {language:"en"}  // for bangla value 'bn'
  },
  reducers: {
    setSettings: (state, action) => {
      state.settings = action.payload.settings;
    },
  },
});


export const { setSettings } = settingsSlice.actions;
export const selectSettingsSelection = (state) => state.settings.settings;

export default settingsSlice.reducer;