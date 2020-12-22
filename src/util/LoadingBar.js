import React from "react";
import { useSelector } from "react-redux";
import {
  selectResolutionSelection,
  selectLanguageSelection,
} from "../redux/settingsSlice";
import { imageUrlConverter } from "./ImageUrlConverter";

import { css } from "@emotion/core";
import ScaleLoader from "react-spinners/ScaleLoader";

export default function LoadingBar({ loading, message = "" }) {
  const override = css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `;
  return (
    <div className="sweet-loading">
      <ScaleLoader
        css={override}
        size={100}
        color={"#00ff00"}
        loading={loading}
      />

      {loading && (
        <div  className="sweet-loading-text">
          <span>{message}</span>
        </div>
      )}
    </div>
  );
}
