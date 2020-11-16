import React from "react";
import { useSelector } from "react-redux";
import {
  selectResolutionSelection,
  selectLanguageSelection,
} from "../../redux/settingsSlice";
import "./search-box-mobile.css";
import { imageUrlConverter } from "../../util/ImageUrlConverter";
var FontAwesome = require("react-fontawesome");

export default function SearchBoxMobile({ gallery }) {
  const resulationSelector = useSelector(selectResolutionSelection);
  const language = useSelector(selectLanguageSelection);

  return (
    <div class="search-wrapper-mobile">
      <form>
        <input
          type="text"
          name="focus"
          required
          class="search-box-mobile"
          placeholder="Enter search term food goods meets"
        ></input>
        <button class="search-btn-mobile" type="reset">
          <FontAwesome className="" name="search" />
        </button>
      </form>
    </div>
  );
}
