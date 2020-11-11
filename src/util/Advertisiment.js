import React from "react";
import { useSelector } from "react-redux";
import {
  selectResolutionSelection,
} from "../redux/settingsSlice";

export default function Adevertisiment({advertisiment}) {
  const resulationSelector = useSelector(selectResolutionSelection);
  onClick = (advertisiment) =>{
    console.log(advertisiment)
  }
  return (
    <div className="" onClick = {()=>onClick(advertisiment)}>
      <img
        src={`${advertisiment.photo}&res=${resulationSelector}`}
        alt={advertisiment.name}
      />
    </div>
  );
}
