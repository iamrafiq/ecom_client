import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectResolutionSelection,
  selectLanguageSelection,
} from "../../redux/settingsSlice";
import "./search-box-mobile.css";
import { useHistory } from "react-router-dom";

var FontAwesome = require("react-fontawesome");

export default function SearchBoxMobile({ gallery }) {
  const resulationSelector = useSelector(selectResolutionSelection);
  const language = useSelector(selectLanguageSelection);
  const [text, setText] = useState(null);

  const history = useHistory();

  const handleChange = () => (event) => {
    event.preventDefault();
    setText(event.target.value);
    history.push(`/search/${event.target.value}`);
  };
  const clickSubmit = (event) => {
    console.log("search click submit");
    event.preventDefault();
    history.replace(`/search/${text}`);
  };
  return (
    <div class="search-wrapper-mobile">
      <form form id="form-search" onSubmit={clickSubmit}>
        <input
          type="text"
          name="focus"
          required
          class="search-box-mobile"
          placeholder="Enter search text"
          onChange={handleChange("name")}
        ></input>
        <button
          class="search-btn-mobile"
          type="submit"
          form="form-search"
          value="Submit"
        >
          <FontAwesome className="" name="search" />
        </button>
      </form>
    </div>
  );
}
