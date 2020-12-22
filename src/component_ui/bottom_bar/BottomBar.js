import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import FontAwesome from "react-fontawesome";
// import SearchBox from "./SearchBox";
import "./bottombar.css";
import { imageUrlConverter } from "../../util/ImageUrlConverter";
import { selectHomeSelection } from "../../redux/homeSlice";

import {
  selectResolutionSelection,
  selectLanguageSelection,
  selectDeviceTypeSelection,
} from "../../redux/settingsSlice";
import {
  setCartBarMobile,
  selectCartBarMobile,
  setSideBar,
} from "../../redux/globalSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faShoppingBag,
} from "@fortawesome/fontawesome-free-solid";
import { englishToBangla } from "../../util/utils";
import { selectCartCount } from "../../redux/cartSlice";
import { selectUser } from "../../redux/authSlice";
import {
  setOtpDialog,
  setSigninDialog,
  setSignupDialog,
  setCustomDialog
} from "../../redux/globalSlice";
import { resendOtp } from "../../auth/index";


// import logo from "../../images/logo.svg";
// import SearchBoxMobile from "./SearchBoxMobile";
// import LanguageMenu from "./LanguageMenu";
// import SigninMenu from "./SigninMenu";
// import Orders from "./Orders";
// import Cart from "./Cart";

const BottomBar = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const home = useSelector(selectHomeSelection);
  const resulationSelector = useSelector(selectResolutionSelection);
  const language = useSelector(selectLanguageSelection);
  const deviceType = useSelector(selectDeviceTypeSelection);
  const productCount = useSelector(selectCartCount);
  const cartBarMobile = useSelector(selectCartBarMobile);
  const user = useSelector(selectUser);

  // const mood = useSelector(selectSideBarMood);
  const { onClickMenu } = props;

  const contentStyle = {
    position: "fixed",
    height: "200px",
    backgroundColor: "red",
  };
  const onClickOrder = () => {
    if (user.status === 0) {
      dispatch(setSignupDialog({ signupDialog: true }));
    }else{
      if (user.verified === 1){
        history.push("/user/checkout");
      }else{
        dispatch(
          setCustomDialog({
            customDialog: {
              open: true,
              englishMsg: "Sending verification sms... please wait",
              banglaMsg:
                "ভেরিফিকেশন এসএমএস পাঠানো হচ্ছে ... অনুগ্রহ করে অপেক্ষা করুন ",
            },
          })
        );
        const phoneNumber = user.phoneNumber;
        resendOtp({ phoneNumber }).then((data) => {
          if (data.error) {
            // setValues({ ...values, error: data.error, success: false });
          }
          dispatch(
            setCustomDialog({
              customDialog: { open: false, englishMsg: "", banglaMsg: "" },
            })
          );
          dispatch(
            setOtpDialog({
              otpDialog: true,
            })
          );
        });
      }
    }
  };
  return (
    <div className="bottom__bar">
      <div className="bottom__chat">
        {" "}
        <FontAwesomeIcon size="2x" icon={faCommentDots} />
      </div>
      {productCount > 0 ? (
        <div className="bottom__order" onClick={onClickOrder}>
          {" "}
          {language === "en" ? (
            <span>Place Order</span>
          ) : (
            <span>অর্ডার স্থাপন করুন</span>
          )}
        </div>
      ) : (
        <div
          className="bottom__order"
          onClick={() => dispatch(setSideBar({ sideBar: { open: true } }))}
        >
          {" "}
          {language === "en" ? (
            <span>Start Shopping</span>
          ) : (
            <span>বাজার শুরু করুন</span>
          )}
        </div>
      )}

      <div
        className="bottom__cart"
        onClick={() =>
          dispatch(
            setCartBarMobile({ cartBarMobile: { open: !cartBarMobile.open } })
          )
        }
      >
        {language === "en" ? (
          <div className="item__count">{productCount}</div>
        ) : (
          <div className="item__count">{englishToBangla(productCount)}</div>
        )}

        <FontAwesomeIcon size="2x" icon={faShoppingBag} />
      </div>
    </div>
  );
};

export default BottomBar;
