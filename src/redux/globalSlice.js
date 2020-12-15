import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
  name: "global",
  initialState: {
    signinDialog: false,
    signupDialog: false,
    otpDialog: false,
    loadingSpinner: false,
    sideBar: {open:false},
    cartBarDesktop: {open:false},
    cartBarMobile:{open:false}

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
    setOtpDialog: (state, action) => {
      state.otpDialog = action.payload.otpDialog;
    },

    setLoadingSpinner: (state, action) => {
      state.loadingSpinner = action.payload.loadingSpinner;
    },
    setCartBarDesktop: (state, action) => {
      state.cartBarDesktop = action.payload.cartBarDesktop;
    },
    setCartBarMobile: (state, action) => {
      state.cartBarMobile = action.payload.cartBarMobile;
    },
    setSideBar: (state, action) => {
      state.sideBar = action.payload.sideBar;
    },
  },
});

export const {
  setSigninDialog,
  setSignupDialog,
  setOtpDialog,
  setLoadingSpinner,
  setSideBar,
  setCartBarDesktop,
  setCartBarMobile,
} = globalSlice.actions;

export const selectSigninDialog = (state) => {
  return state.global.signinDialog;
};
export const selectSignupDialog = (state) => {
  return state.global.signupDialog;
};
export const selectOtpDialog = (state) => {
  return state.global.otpDialog;
};

export const selectLoadingSpinner = (state) => {
  return state.global.loadingSpinner;
};
export const selectCartBarDesktop = (state) => state.global.cartBarDesktop;
export const selectCartBarMobile = (state) => state.global.cartBarMobile;
export const selectSideBar = (state) => state.global.sideBar;

export default globalSlice.reducer;
