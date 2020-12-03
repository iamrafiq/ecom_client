import { createSlice } from "@reduxjs/toolkit";
import { SECREAT } from "../config";
import { createAiUser } from "../auth/index";
import {  useDispatch } from "react-redux";

var CryptoJS = require("crypto-js");
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: undefined,
    user: undefined,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
      if (typeof window !== "undefined") {
        localStorage.setItem("AuthT", JSON.stringify(state.token));
      }

      if (action.payload.signout) {
        state.token = undefined;
        localStorage.removeItem("AuthT");
      }
    },
    setUser: (state, action) => {
      console.log("aaaaaaaaaa", action.payload.user);
      if (action.payload.encrypt) {
        let ciphertext = CryptoJS.AES.encrypt(
          JSON.stringify(action.payload.user),
          SECREAT
        ).toString();
        console.log("c text", ciphertext);
        if (typeof window !== "undefined") {
          //localStorage.setItem("AuthU", JSON.stringify(ciphertext));
          localStorage.setItem("AuthU", JSON.stringify(action.payload.user));
        }
        state.user = action.payload.user;
      } else if (action.payload.decrypt) {
        var bytes = CryptoJS.AES.decrypt(action.payload.AuthU, SECREAT);
        // state.user = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        state.user = JSON.parse(action.payload.AuthU);
        console.log("decrypt..user", state.user);
      } else {
        state.user = action.payload.user;
      }

      if (action.payload.signout) {
        state.user = undefined;
        localStorage.removeItem("AuthU");
      }
    },
    initAiUser: (state, action) => {},
  },
});
export const initAiUser = () => (dispatch) => {
  createAiUser().then((data) => {
    if (data.error) {
    } else {
      console.log("data user", data);
      if (data.user) {
        dispatch(setUser({ user: data.user, encrypt: true }));
      }
    }
  });
};

export const { setToken, setUser } = authSlice.actions;
export const selectToken = (state) => state.auth.token;
export const selectUser = (state) =>state.auth.user;

export default authSlice.reducer;
