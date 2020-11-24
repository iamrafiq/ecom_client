import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { SIDE_BAR_WIDTH } from "../../config";
import { useDispatch, useSelector } from "react-redux";

import {
  selectResolutionSelection,
  selectLanguageSelection,
  selectAuthenticateSelection,
  selectDeviceTypeSelection,
} from "../../redux/settingsSlice";
import { imageUrlConverter } from "../../util/ImageUrlConverter";
import { selectOfferProducts } from "../../redux/homeSlice";
import "./cart.css";
import { englishToBangla } from "../../util/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/fontawesome-free-solid";
import { addItem, removeItem, deleteItem } from "../../redux/cartSlice";

const Cart = ({ cartItem }) => {
  const resolutionSelector = useSelector(selectResolutionSelection);
  const language = useSelector(selectLanguageSelection);
  const auth = useSelector(selectAuthenticateSelection);

  let { product, qtyCart } = cartItem;
  if (product.photosUrl && product.photosUrl.length > 0) {
    var productImage = `${product.photosUrl[0]}&res=low`;
  }
  console.log("cart item:.........", cartItem.product.photosUrl);
  const deviceType = useSelector(selectDeviceTypeSelection);
  const dispatch = useDispatch();

  useEffect(() => {}, []);
  const onClickAddToCart = () => {
    dispatch(addItem({ product: product }));
  };
  const onClickRemoveFromCart = () => {
    dispatch(removeItem({ product: product }));
  };
  const onClickDeleteFromCart = () => {
    dispatch(deleteItem({ product: product }));
  };
  const totalPrice = () => {
    if (product.applyDiscounts) {
      return qtyCart * product.cropPrice;
    } else {
      return qtyCart * product.mrp;
    }
  };
  const totalOriginalPrice = () => {
    return qtyCart * product.mrp;
  };
  return (
    <div className="cart__item">
      <div
        className={`cart__cross ${
          deviceType !== "desktop" ? "cart__cross--mobile" : ""
        }`}
        onClick={() => onClickDeleteFromCart()}
      ></div>
      <div className="product__image">
        <img src={imageUrlConverter(productImage)}></img>
      </div>
      {language === "en" ? (
        <div className="cart__item__info">
          <div className="info--name">{product.name}</div>
          <div className="info__other">
            <div className="info--price">
              &#2547;
              {product.applyDiscounts === 1 ? (
                <span>{product.cropPrice}</span>
              ) : (
                <span>{product.cropPrice}</span>
              )}
            </div>
            <span>/</span>
            <div className="info--sub">
              <span>{product.subText}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="cart__item__info">
          <div className="info--name">{product.bengaliName}</div>

          <div className="info__other">
            <div className="info--price">
              &#2547;
              {product.applyDiscounts === 1 ? (
                <span>{englishToBangla(product.cropPrice)}</span>
              ) : (
                <span>{englishToBangla(product.cropPrice)}</span>
              )}
            </div>
            <span>/</span>
            <div className="info--sub">
              <span>{englishToBangla(product.subText)}</span>
            </div>
          </div>
        </div>
      )}

      {language === "en" ? (
        <React.Fragment>
          {" "}
          {product.applyDiscounts ? (
            <div className="total__price">
              <span className="discounted--price text--red">
                &#2547;{totalPrice()}
              </span>
              <del className="original--price">
                &#2547;{totalOriginalPrice()}
              </del>
            </div>
          ) : (
            <span className="total__price">&#2547;{totalPrice()}</span>
          )}
        </React.Fragment>
      ) : (
        <React.Fragment>
          {" "}
          {product.applyDiscounts ? (
            <div className="total__price">
              <span className="discounted--price text--red">
                &#2547;{englishToBangla(totalPrice())}
              </span>
              <del className="original--price">
                &#2547;{englishToBangla(totalOriginalPrice())}
              </del>
            </div>
          ) : (
            <span className="total__price">
              &#2547;{englishToBangla(totalPrice())}
            </span>
          )}
        </React.Fragment>
      )}

      <div className="cart__counter">
        <div className="counter--plus" onClick={() => onClickAddToCart()}>
          {" "}
          <FontAwesomeIcon size="1x" icon={faPlus} />
        </div>
        {language === "en" ? (
          <div className="counter--number" onClick={() => onClickAddToCart()}>
            {qtyCart}
          </div>
        ) : (
          <div className="counter--number" onClick={() => onClickAddToCart()}>
            {englishToBangla(qtyCart)}
          </div>
        )}
        <div className="counter--minus" onClick={() => onClickRemoveFromCart()}>
          {" "}
          <FontAwesomeIcon size="1x" icon={faMinus} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
