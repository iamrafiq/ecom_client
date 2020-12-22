import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  setSigninDialog,
  selectSigninDialog,
  setOtpDialog,
  selectOtpDialog,
  selectSignupDialog,
  setSignupDialog,
  setCustomDialog,
  selectCustomDialog,
} from "../../redux/globalSlice";
import PureModal from "react-pure-modal";
import "../pure-modal.css";
import SigninForm from "../user/SigninForm";
import OtpVerificationForm from "../user/OtpVerificationForm";
import SignupForm from "../user/SignupForm";
import CustomLoadingDialog from "../user/CustomLoadingDialog";

export default function Dialogs() {
  const dispatch = useDispatch();
  const signinDialog = useSelector(selectSigninDialog);
  const otpDialog = useSelector(selectOtpDialog);
  const signupDialog = useSelector(selectSignupDialog);
  const customDialog = useSelector(selectCustomDialog);

  return (
    <div>
      {signupDialog && (
        <div>
          <PureModal
            header={""}
            scrollable={false}
            // footer="Buttons?"
            //  closeButtonPosition="bottom"
            // closeButtonPosition="bottom"
            // portal
            // closeButton={<div>&#10007;</div>}
            isOpen={signupDialog}
            onClose={() => {
              dispatch(setSignupDialog({ signupDialog: false }));
              return true;
            }}
          >
            <SignupForm></SignupForm>
          </PureModal>
        </div>
      )}
      {signinDialog && (
        <div>
          <PureModal
            header={""}
            scrollable={false}
            // footer="Buttons?"
            //  closeButtonPosition="bottom"
            // closeButtonPosition="bottom"
            // portal
            // closeButton={<div>&#10007;</div>}
            isOpen={signinDialog}
            onClose={() => {
              dispatch(setSigninDialog({ signinDialog: false }));
              return true;
            }}
          >
            <SigninForm></SigninForm>
          </PureModal>
        </div>
      )}
      {otpDialog && (
        <div>
          <PureModal
            header={""}
            scrollable={false}
            // footer="Buttons?"
            //  closeButtonPosition="bottom"
            // closeButtonPosition="bottom"
            // portal
            // closeButton={<div>&#10007;</div>}
            isOpen={otpDialog}
            onClose={() => {
              dispatch(setOtpDialog({ otpDialog: false }));
              return true;
            }}
          >
            <OtpVerificationForm></OtpVerificationForm>
          </PureModal>
        </div>
      )}
       {customDialog.open && (
        <div>
          <PureModal
            // header="Sending one time password (OTP)"
            scrollable={false}
            // footer="Buttons?"
            //  closeButtonPosition="bottom"
            // closeButtonPosition="bottom"
            // portal
            // closeButton={<div>&#10007;</div>}
            isOpen={customDialog.open}
            onClose={() => {
              dispatch(
                setCustomDialog({
                  customDialog: { open: false, englishMsg: "", banglaMsg: "" },
                })
              );
              return true;
            }}
          >
            <CustomLoadingDialog
              englishMsg={customDialog.englishMsg}
              banglaMsg={customDialog.banglaMsg}
            ></CustomLoadingDialog>
          </PureModal>
        </div>
      )}
    </div>
  );
}
