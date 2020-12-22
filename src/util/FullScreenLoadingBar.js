import React from "react";

import { css } from "@emotion/core";
import ScaleLoader from "react-spinners/ScaleLoader";

export default function FullScreenLoadingBar({ loading }) {
  const override = css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `;

  return (
    <div className="full-screen-loading">
      <ScaleLoader
        css={override}
        size={100}
        color={"#00ff00"}
        loading={loading}
      />
    </div>
  );
}