import React from "react";
import { useSelector } from "react-redux";
import {
  selectResolutionSelection,
  selectLanguageSelection,
} from "../redux/settingsSlice";
import { imageUrlConverter } from "./ImageUrlConverter";

import { css } from "@emotion/core";
import PuffLoader from "react-spinners/PuffLoader";

export default function LoadingBar({ loading, message = "" }) {
  const override = css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `;
  const language = useSelector(selectLanguageSelection);

  return (
    <div className="sweet-loading">
      <div className="sweet-loading-spinner">
        <PuffLoader
          css={override}
          size={100}
          color={"#00ff00"}
          loading={loading}
        />
      </div>

      {loading && (
        <div>
          <span>{message}</span>
        </div>
      )}
    </div>
  );
}
