import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { signin, signup } from "../../auth/index";
import {
  selectLanguageSelection,
} from "../../redux/settingsSlice";
import {
  selectCustomDialog,
} from "../../redux/globalSlice";
import "./user-forms.css";

import LoadingBar from "../../util/LoadingBar";

const CustomDialog = () => {
  const dispatch = useDispatch();
  const language = useSelector(selectLanguageSelection);
  const customDialog = useSelector(selectCustomDialog);



  const dialog = () => (
    <div className="form__box">
     <React.Fragment>
          <React.Fragment>
            <LoadingBar
              loading={customDialog.open}
              message={
                language === "en"
                  ? `${customDialog.englishMsg}`
                  : `${customDialog.banglaMsg}`
              }
            ></LoadingBar>
          </React.Fragment>
        </React.Fragment>
    </div>
  );

  return (
    <div className="">
      {dialog()}
    </div>
  );
};

export default CustomDialog;
