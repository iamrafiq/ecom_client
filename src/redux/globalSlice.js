import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
  name: "global",
  initialState: {
    signinDialog: false, 
    signupDialog: false, 
    otpDialog: false,
  },
  reducers: {
    setSigninDialog: (state, action) => {
      state.signinDialog = action.payload.signinDialog;
    },
    setSignupDialog: (state, action) => {
      state.signupDialog = action.payload.signupDialog;
    },
    setOtpDialog: (state, action) => {
      state.otpDialog = action.payload.otpDialog;
    },
  },
});

export const {setSigninDialog, setSignupDialog, setOtpDialog} = globalSlice.actions;


export const selectSigninDialog = (state) => {
  return state.global.signinDialog;
};
export const selectSignupDialog = (state) =>{
  return state.global.signupDialog;
}
export const selectOtpDialog = (state) => {
  return state.global.otpDialog;
};
export default globalSlice.reducer;
