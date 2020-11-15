import React from "react";
import { useSelector } from "react-redux";
import {
  selectResolutionSelection,
  selectLanguageSelection,
} from "../redux/settingsSlice";
import {imageUrlConverter} from "./ImageUrlConverter";

export default function Adevertisiment({advertisiment}) {
  const resulationSelector = useSelector(selectResolutionSelection);
  const language = useSelector(selectLanguageSelection);
  
  const onClick = (advertisiment) =>{
    console.log(advertisiment)
  }
  return (
    <div  style={{cursor:"pointer", objectFit:"contain", width:"auto", padding:"2px"}} onClick = {()=>onClick(advertisiment)}>
      {language === "en"?( <img
        src={`${imageUrlConverter(advertisiment.photo)}&res=${resulationSelector}`}
        alt={advertisiment.name}
      />):( <img
        src={`${imageUrlConverter(advertisiment.photoBangla)}&res=${resulationSelector}`}
        alt={advertisiment.name}
      />)}
     
    </div>
  );
}
