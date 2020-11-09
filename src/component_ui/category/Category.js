import React from "react";
import { useSelector } from "react-redux";
import {
  selectResolutionSelection,
  selectLanguageSelection,
} from "../../redux/settingsSlice";
import  "./category.css";
export default function Category(props) {
  const resulationSelector = useSelector(selectResolutionSelection);
  const language = useSelector(selectLanguageSelection);
  const { category, onClick } = props;
  return (
    <div className="card" style={{ width: "14rem" }}>
      <img
        src={`${category.thumbnail}&res=${resulationSelector}`}
        className="card-img-top"
        alt={category.name}
      />
      <div className="card-body mx-auto">
        {language === "en" ? (
          <p className="card-text ">{category.name}</p>
        ) : (
          <p className="card-text ">{category.bengaliName}</p>
        )}
      </div>
    </div>
  );
}
