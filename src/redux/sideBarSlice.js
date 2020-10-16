import { createSlice } from "@reduxjs/toolkit";

export const sideBarSlice = createSlice({
    name:"sideBar",
    initialState:{
        mood:false
    },
    reducers:{
        setSideBar:(state, action)=>{
            state.mood = action.payload.mood;
        }
    }
    
});

const {setSideBar}=sideBarSlice.actions;

export const initSideBarState=()=>(dispatch)=>{
 dispatch(setSideBar({mood:false}));
}
export const toggleSideBar=()=>(dispatch)=>{
    dispatch(setSideBar({mood:true}));
   }

export const selectSideBarMood = state =>state.sideBar.mood;

export default sideBarSlice.reducer;