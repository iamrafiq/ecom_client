import React, { Fragment, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import PropTypes from "prop-types";
import { SIDE_BAR_WIDTH } from "../../config";
import TreeExample from "../treebeard/tree";
import { useDispatch, useSelector } from "react-redux";
import {
  setBarToView,
  selectSideBarViewToBarSelection,
} from "../../redux/sideBarSlice";
import { loadCategoryWithProduct } from "../../redux/categoryWithProductSlice";
import {
  selectResolutionSelection,
  selectLanguageSelection,
  selectDeviceTypeSelection,
  selectCartBarMobile,
  setCartBarMobile,
  selectCartBarDesktop,
  setCartBarDesktop,
} from "../../redux/settingsSlice";
import {
  selectCartProducts,
  selectCartCount,
  selectCartTotalAmount,
} from "../../redux/cartSlice";

import { selectOfferProducts } from "../../redux/homeSlice";
import "./cart.css";
import { englishToBangla } from "../../util/utils";
import CartItem from "./CartItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBag,
  faCommentDots,
} from "@fortawesome/fontawesome-free-solid";
import { CART_BAR_WIDTH, CONTACT_PHONE_NUMBER } from "../../config";
import {
  selectUser,
  setToken,
  setUser,
  initAiUser,
} from "../../redux/authSlice";

const SidebarContent = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const resolutionSelector = useSelector(selectResolutionSelection);
  const deviceType = useSelector(selectDeviceTypeSelection);
  const totalAmount = useSelector(selectCartTotalAmount);

  const itemCount = useSelector(selectCartCount);

  const language = useSelector(selectLanguageSelection);
  const products = useSelector(selectCartProducts);
  const cartBarDesktop = useSelector(selectCartBarDesktop);
  const cartBarMobile = useSelector(selectCartBarMobile);

  let width;
  if (deviceType === "desktop") {
    width =
      parseInt(getComputedStyle(document.documentElement).fontSize) *
      CART_BAR_WIDTH;
  } else {
    width = window.innerWidth;
  }
  console.log("cart products...", products);
  const [state, setState] = useState({
    viewToBarChange: "",
  });

  // const totalAmount = () => {
  //   let totalAmount = 0;
  //   for (let i = 0; i < products.length; i++) {
  //     if (products[i].product.applyDiscounts) {
  //       totalAmount += products[i].product.cropPrice;
  //     } else {
  //       totalAmount += products[i].product.mrp;
  //     }
  //   }
  //   return totalAmount;
  // };
  useEffect(() => {}, []);
 const onClickPlaceOrder = () =>{
   if (deviceType !== "desktop"){
    dispatch(
      setCartBarMobile({
        cartBarMobile: { open: !cartBarMobile.open },
      })
    )
   }
  history.push(`/user/checkout`);
 }
  const placeOrder = () => (
    <React.Fragment>
      {language === "en" ? (
        <div className="cart__footer--totalamount ">
          <span> &#2547;{` ${totalAmount}`}</span>
        </div>
      ) : (
        <div className="cart__footer--totalamount ">
          <span> &#2547;{` ${englishToBangla(totalAmount)}`}</span>
        </div>
      )}

      <div
        className="cart__footer--placeorder btn__all  app__btn--filled "
        onClick={() => onClickPlaceOrder()}
      >
        {language === "en" ? (
          <span>Place Order</span>
        ) : (
          <span> অর্ডার স্থাপন করুন</span>
        )}
      </div>
    </React.Fragment>
  );
  return (
    <React.Fragment>
      {deviceType === "desktop" ? (
        <React.Fragment>
          <div
            className="cart__bar cart__pannel--desktop "
            style={{ width: width }}
          >
            <div className="pannel--header--desktop">
              <span className="header--left">
                <FontAwesomeIcon size="2x" icon={faShoppingBag} />
                {language === "en" ? (
                  <span className="total__item">{` ${itemCount} items`}</span>
                ) : (
                  <span className="total__item">{` ${englishToBangla(
                    itemCount
                  )} টি পণ্য`}</span>
                )}
              </span>
              <span
                className="cart--close"
                onClick={() =>
                  dispatch(
                    setCartBarDesktop({
                      cartBarDesktop: { open: !cartBarDesktop.open },
                    })
                  )
                }
              >
                {language === "en" ? (
                  <span>Close</span>
                ) : (
                  <span>বন্ধ করুন</span>
                )}
              </span>
            </div>
            <div className="pannel--content--desktop">
              {products.length > 0 ? (
                <React.Fragment>
                  {products.map((ele, index) => (
                    <CartItem cartItem={ele}></CartItem>
                  ))}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {language === "en" ? (
                    <div className="no__product--message">
                      No prodcts in cart
                    </div>
                  ) : (
                    <div className="no__product--message">ব্যাগ পণ্য নেই</div>
                  )}
                </React.Fragment>
              )}
            </div>
            <div className="pannel--footer--desktop">
              <div className="cart__footer--top">
                {products.length > 0 ? (
                  <React.Fragment>{placeOrder()}</React.Fragment>
                ) : (
                  <React.Fragment>
                    <span className="phone--number--cart">{`Phone: ${CONTACT_PHONE_NUMBER}`}</span>
                  </React.Fragment>
                )}
              </div>
              {language === "en" ? (
                <div className="cartbar__livechat btn__all  app__btn--filled ">
                  <FontAwesomeIcon size="2x" icon={faCommentDots} />

                  <span>Live Chat</span>
                </div>
              ) : (
                <div className="cartbar__livechat btn__all  app__btn--filled ">
                  <FontAwesomeIcon size="2x" icon={faCommentDots} />
                  <span>লাইভ চ্যাট</span>
                </div>
              )}
            </div>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div
            className="cart__bar cart__pannel--mobile"
            style={{ width: width }}
          >
            <div className="pannel--header--mobile">
              <span className="header--left">
                <FontAwesomeIcon size="2x" icon={faShoppingBag} />
                {language === "en" ? (
                  <span className="total__item">{` ${itemCount} items`}</span>
                ) : (
                  <span className="total__item">{` ${englishToBangla(
                    itemCount
                  )} টি পণ্য`}</span>
                )}
              </span>
              <span
                className="cart--close"
                onClick={() =>
                  dispatch(
                    setCartBarMobile({
                      cartBarMobile: { open: !cartBarMobile.open },
                    })
                  )
                }
              >
                {language === "en" ? (
                  <span>Close</span>
                ) : (
                  <span>বন্ধ করুন</span>
                )}
              </span>
            </div>
            <div className="pannel--content--mobile">
              {products.length > 0 ? (
                <React.Fragment>
                  {products.map((ele, index) => (
                    <CartItem cartItem={ele}></CartItem>
                  ))}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {language === "en" ? (
                    <div className="no__product--message">
                      No prodcts in cart
                    </div>
                  ) : (
                    <div className="no__product--message">ব্যাগ পণ্য নেই</div>
                  )}
                </React.Fragment>
              )}
            </div>
            <div className="pannel--footer--mobile">
              <div className="cart__footer--top">
                {products.length > 0 ? (
                  <React.Fragment>{placeOrder()}</React.Fragment>
                ) : (
                  // <React.Fragment>
                  //   {language === "en" ? (
                  //     <div className="cart__footer--totalamount ">
                  //       <span> &#2547;{` ${totalAmount}`}</span>
                  //     </div>
                  //   ) : (
                  //     <div className="cart__footer--totalamount ">
                  //       <span>
                  //         {" "}
                  //         &#2547;{` ${englishToBangla(totalAmount)}`}
                  //       </span>
                  //     </div>
                  //   )}
                  //   {language === "en" ? (
                  //     <div className="cart__footer--placeorder btn__all  app__btn--filled ">
                  //       Place Order
                  //     </div>
                  //   ) : (
                  //     <div className="cart__footer--placeorder btn__all  app__btn--filled ">
                  //       অর্ডার স্থাপন করুন
                  //     </div>
                  //   )}
                  // </React.Fragment>
                  <React.Fragment>
                    <span className="phone--number--cart">{`Phone: ${CONTACT_PHONE_NUMBER}`}</span>
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

// SidebarContent.propTypes = {
//   style: PropTypes.object,
// };

export default SidebarContent;
