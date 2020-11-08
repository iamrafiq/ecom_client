import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import "./product.css";
import { useSelector, useDispatch } from "react-redux";
import ProductDetails from "./ProductDetails";
import {
  setSlug,
  selectProductHoverSelection,
} from "../../redux/productHoverSlice";
import {
  selectLanguageSelection,
  selectResolutionSelection,
} from "../../redux/settingsSlice";
import {
  addItem,
  removeItem,
  selectCartProducts,
  selectAcartProduct,
} from "../../redux/cartSlice";

import OuterClickHandler from "../../util/OuterClickHandler";

import PureModal from "react-pure-modal";
import "./pure-modal.css";
var FontAwesome = require("react-fontawesome");

function Product({ product }) {
  const resulationSelector = useSelector(selectResolutionSelection);
  const [openDetailsView, setOpenDetailsView] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalInnerScroll, setModalInnerScroll] = useState(false);
  const [modalCenter, setModalCenter] = useState(false);
  const closeDetailsView = () => setOpenDetailsView(false);
  const {
    name,
    slug,
    bengaliName,
    nameWithOutSubText,
    subText,
    mrp,
    price,
    cropPrice,
    applyDiscounts,
    commonStock,
    preferredStock,
    isPerishable,
    earliestAvailabilityTime,
    availabilityCutOffTime,
    photosUrl,
    manufacturers,
  } = product;
  const selectedHoverSlug = useSelector(selectProductHoverSelection);
  const productFromCart = useSelector(selectAcartProduct(product));
  const { resolution } = useSelector(selectResolutionSelection);
  const { language } = useSelector(selectLanguageSelection);
  const dispatch = useDispatch();
  //dispatch(setSlug({ slug: product.slug }));
  useEffect(() => {}, [selectedHoverSlug, openDetailsView]);

  const onClickAddToCart = () => {
    dispatch(addItem({ product: product }));
  };
  const onClickRemoveFromCart = () => {
    dispatch(removeItem({ product: product }));
  };
  const onHoverProduct = () => {
    dispatch(setSlug({ slug: product.slug }));
  };
  const onClickDetails = () => {};
  const totalPrice = () => {
    if (applyDiscounts) {
      return productFromCart.qtyCart * cropPrice;
    } else {
      return productFromCart.qtyCart * mrp;
    }
  };

  const innerClickRef = OuterClickHandler((e) => {
    dispatch(setSlug({ slug: "" }));
  });

  return (
    <div>
      <React.Fragment>
        {modalInnerScroll && (
          <div>
            <PureModal
              header={""}
              scrollable={false}
              // footer="Buttons?"
              //  closeButtonPosition="bottom"
              // closeButtonPosition="bottom"
              // portal
              // closeButton={<div>&#10007;</div>}
              isOpen={modalInnerScroll}
              onClose={() => {
                 setModalInnerScroll(false);
                return true;
              }}
            >
              <ProductDetails product={product}></ProductDetails>
            </PureModal>
          </div>
        )}
        <div className="product-card">
          <div
            className="content-image"
            onTouchStart={() => onHoverProduct()}
            onMouseEnter={() => onHoverProduct()}
          >
            <div className="product-card__image ">
              <img
                src={
                  photosUrl && photosUrl.length > 0
                    ? `${photosUrl[0]}&res=${resulationSelector}`
                    : ""
                }
                alt={name}
              ></img>
            </div>
            <div className="product-card__content">
              <div className="title">
                {language === "en" ? <p>{name}</p> : <p>{bengaliName}</p>}
              </div>
              {subText && subText.length > 0 && (
                <div className="sub-text">
                  <span>{subText}</span>
                </div>
              )}

              <div className="price">
                {applyDiscounts ? (
                  cropPrice ? (
                    <div className="crop">
                      <span className="mrp product-card__price-text-color-red">
                        &#2547; {cropPrice}
                      </span>
                      <span className="discounted-mrp">
                        <del>&#2547; {mrp}</del>
                      </span>
                    </div>
                  ) : (
                    <span className="mrp">&#2547; 100</span>
                  )
                ) : (
                  <span className="mrp">&#2547; 100</span>
                )}
              </div>
            </div>
          </div>
          {selectedHoverSlug === slug ? (
            <div className="content-overly" ref={innerClickRef}>
              {productFromCart ? (
                <div className="add-to-cart">
                  <div className="amount">&#2547; {totalPrice()}</div>
                  <div className="actions-text">
                    <div className="actions">
                      <span
                        className="action-sub"
                        onClick={() => onClickRemoveFromCart()}
                      >
                        -
                      </span>
                      <span className="action-result">
                        {productFromCart.qtyCart}
                      </span>
                      <span
                        className="action-add"
                        onClick={() => onClickAddToCart()}
                      >
                        +
                      </span>
                    </div>
                    <div className="text">in bag</div>
                  </div>
                </div>
              ) : (
                <div className="add-text" onClick={() => onClickAddToCart()}>
                  <div className="text">Add to shopping bag</div>
                </div>
              )}
            </div>
          ) : (
            ""
          )}

          <div
            className="icon-overly"
            onClick={() => setModalInnerScroll(true)}
          >
            <FontAwesome className="details-icon" name="info-circle" />
          </div>

          {productFromCart ? (
            <div className="btn-bag">
              <div
                className="btn-bag__m"
                onClick={() => onClickRemoveFromCart()}
              >
                -
              </div>
              <span className="btn-bag__text">
                {productFromCart.qtyCart} {"in bag"}
              </span>
              <div className="btn-bag__p" onClick={() => onClickAddToCart()}>
                +
              </div>
            </div>
          ) : (
            <div class="btn btn-full" onClick={() => onClickAddToCart()}>
              <div className="btn-add-to-cart">
                <span>Add to cart</span>
              </div>
            </div>
          )}
        </div>
      </React.Fragment>
    </div>
  );
}
export default Product;
