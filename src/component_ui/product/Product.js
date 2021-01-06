import React, { Fragment, useCallback } from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductDetails from "./ProductDetails";
import { imageUrlConverter } from "../../util/ImageUrlConverter";

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
import "../pure-modal.css";
import { englishToBangla } from "../../util/utils";
import "./product.css";
import "./regular-product.css";

var FontAwesome = require("react-fontawesome");

function Product({product, advertProductSlug }) {
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
  const resolution = useSelector(selectResolutionSelection);
  const language = useSelector(selectLanguageSelection);
  const dispatch = useDispatch();
  //dispatch(setSlug({ slug: product.slug }));
  useEffect(() => {
    if (advertProductSlug&&advertProductSlug===product.slug){
      setModalInnerScroll(true);
    }
  }, []);//selectedHoverSlug, openDetailsView

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
              <ProductDetails
                product={product}
                closeModal={() => {
                  setModalInnerScroll(false);
                }}
              ></ProductDetails>
            </PureModal>
          </div>
        )}
        <div className="product-card">
          {/* {offerProduct&&(
             <div className="offer__image">
             <img
               src={
                 photosUrl && photosUrl.length > 0
                   ? `${photosUrl[0]}&res=${resulationSelector}`
                   : ""
               }
               alt={name}
             ></img>
           </div>
          )} */}
          <div
            className="card__content"
            onTouchStart={() => onHoverProduct()}
            onMouseEnter={() => onHoverProduct()}
          >
            <div className="content--image">
              <img
                src={
                  photosUrl && photosUrl.length > 0
                    ? `${imageUrlConverter(
                        `${photosUrl[0]}&res=${resulationSelector}`
                      )}`
                    : ""
                }
                alt={name}
              ></img>
            </div>
            <div className="content__text">
              <div className="text--title">
                {language === "en" ? <p>{name}</p> : <p>{bengaliName}</p>}
              </div>
              {subText && subText.length > 0 && (
                <div className="text--sub">
                  {language === "en" ? (
                    <span>{subText}</span>
                  ) : (
                    <p>{englishToBangla(subText)}</p>
                  )}
                </div>
              )}

              <div className="product__price">
                {applyDiscounts && cropPrice && cropPrice > 0 ? (
                  <div className="price--crop">
                    {language === "en" ? (
                      <Fragment>
                        <span className="price--mrp price--red">
                          &#2547; {cropPrice}
                        </span>
                        <span>
                          <del>&#2547; {mrp}</del>
                        </span>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <span className="price--mrp price--red">
                          &#2547; {englishToBangla(cropPrice)}
                        </span>
                        <span>
                          <del>&#2547; {englishToBangla(mrp)}</del>
                        </span>
                      </Fragment>
                    )}
                  </div>
                ) : (
                  <Fragment>
                    {language === "en" ? (
                      <span className="price--mrp">&#2547; {mrp}</span>
                    ) : (
                      <span className="price--mrp">
                        &#2547; {englishToBangla(mrp)}
                      </span>
                    )}
                  </Fragment>
                )}
              </div>
            </div>
          </div>
          {selectedHoverSlug === slug ? (
            <div className="content__overly" ref={innerClickRef}>
              {productFromCart ? (
                <div className="overly__cart">
                  {language === "en" ? (
                    <div className="cart__amount--totla">
                      &#2547; {totalPrice()}
                    </div>
                  ) : (
                    <div className="cart__amount--totla">
                      &#2547; {englishToBangla(totalPrice())}
                    </div>
                  )}

                  <div className="cart__action">
                    <div className="actions">
                      <span
                        className="action--sub"
                        onClick={() => onClickRemoveFromCart()}
                      >
                        <FontAwesome className="" name="minus" />
                      </span>
                      {language === "en" ? (
                        <span className="action--result">
                          {productFromCart.qtyCart}
                        </span>
                      ) : (
                        <span className="action--result">
                          {englishToBangla(productFromCart.qtyCart)}
                        </span>
                      )}

                      <span
                        className="action--add"
                        onClick={() => onClickAddToCart()}
                      >
                        <FontAwesome className="" name="plus" />
                      </span>
                    </div>
                    {language === "en" ? (
                      <div className="cart--text">in bag</div>
                    ) : (
                      <div className="cart--text">টি ব্যাগে</div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="add-text" onClick={() => onClickAddToCart()}>
                  {language === "en" ? (
                    <div className="text">Add to shopping bag</div>
                  ) : (
                    <div className="text">বাজারের ব্যাগে যোগ করুন</div>
                  )}
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
            <div className="btn__bag">
              <div
                className="btn__bag--m"
                onClick={() => onClickRemoveFromCart()}
              >
                <FontAwesome className="" name="minus" />
              </div>
              <span
                className="btn__bag--text"
                onClick={() => onClickAddToCart()}
              >
                {language === "en"
                  ? ` ${productFromCart.qtyCart} ${"in bag"}`
                  : `${englishToBangla(
                      productFromCart.qtyCart
                    )} ${"টি ব্যাগে"}`}
              </span>

              <div className="btn__bag--p" onClick={() => onClickAddToCart()}>
                <FontAwesome className="" name="plus" />
              </div>
            </div>
          ) : (
            <div class="btn__all app__btn" onClick={() => onClickAddToCart()}>
              <div className="btn__add">
                {language === "en" ? (
                  <span>Add to cart</span>
                ) : (
                  <span>ব্যাগে যোগ করুন</span>
                )}
              </div>
            </div>
          )}
        </div>
      </React.Fragment>
    </div>
  );
}
export default Product;
