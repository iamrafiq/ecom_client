import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
  name: "global",
  initialState: {
    userId: "",  // for otp verification temporaryling saving
    password: "",   // for otp verification temporaryling saving
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload.userId;
    },
    setPassword: (state, action) => {
      state.password = action.payload.password;
    }
  },
});

export const {
setUserId,
setPassword
} = globalSlice.actions;
export const selectUserId = (state) => state.global.userId;
export const selectPassword = (state) => state.global.password;


export default globalSlice.reducer;