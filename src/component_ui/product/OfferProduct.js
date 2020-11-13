import React, { Fragment, useCallback } from "react";
import { useEffect, useState } from "react";
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
import { englishToBangla } from "../../util/utils";
import "./product.css";
import "./offer-product.css";

var FontAwesome = require("react-fontawesome");

function OfferProduct({ regularProduct, offerProduct, product }) {
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
    offerPhotosUrl,
    manufacturers,
  } = product;
  const selectedHoverSlug = useSelector(selectProductHoverSelection);
  const productFromCart = useSelector(selectAcartProduct(product));
  const resolution = useSelector(selectResolutionSelection);
  const language = useSelector(selectLanguageSelection);
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
              portal
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
        <div className="offer__product-card">
          <div
            class="offer__details--btn offer__details--btn--full"
            onClick={() => setModalInnerScroll(true)}
          >
            <div className="offer__btn__details">
              {language === "en" ? (
                <span>Show details</span>
              ) : (
                <span> বিস্তারিত দেখুন </span>
              )}
            </div>
          </div>
          <div className="offer__image">
            <img
              src={
                offerPhotosUrl && offerPhotosUrl.length > 0
                  ? `${offerPhotosUrl[0]}&res=${resulationSelector}`
                  : ""
              }
              alt={name}
            ></img>
          </div>

          <div
            className="offer__card__content"
            onTouchStart={() => onHoverProduct()}
            onMouseEnter={() => onHoverProduct()}
          >
            {selectedHoverSlug === slug ? (
              <div className="offer_content__overly" ref={innerClickRef}>
                {productFromCart ? (
                  <div className="offer__overly__cart">
                    {language === "en" ? (
                      <div className="offer__cart__amount--totla">
                        &#2547; {totalPrice()}
                      </div>
                    ) : (
                      <div className="offer__cart__amount--totla">
                        &#2547; {englishToBangla(totalPrice())}
                      </div>
                    )}

                    <div className="offer__cart__action">
                      <div className="offer__actions">
                        <span
                          className="offer__action--sub"
                          onClick={() => onClickRemoveFromCart()}
                        >
                          <FontAwesome className="" name="minus" />
                        </span>
                        {language === "en" ? (
                          <span className="offer__action--result">
                            {productFromCart.qtyCart}
                          </span>
                        ) : (
                          <span className="offer__action--result">
                            {englishToBangla(productFromCart.qtyCart)}
                          </span>
                        )}

                        <span
                          className="offer__action--add"
                          onClick={() => onClickAddToCart()}
                        >
                          <FontAwesome className="" name="plus" />
                        </span>
                      </div>
                      {language === "en" ? (
                        <div className="offer__cart--text">in bag</div>
                      ) : (
                        <div className="offer__cart--text">টি ব্যাগে</div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div
                    className="offer__add-text"
                    onClick={() => onClickAddToCart()}
                  >
                    {language === "en" ? (
                      <div className="text">
                        Add to <br />
                        shopping bag
                      </div>
                    ) : (
                      <div className="text">
                        বাজারের ব্যাগে <br /> যোগ করুন
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              ""
            )}
            <div className="content--image">
              <img
                src={
                  photosUrl && photosUrl.length > 0
                    ? `${photosUrl[0]}&res=${"low"}`
                    : ""
                }
                alt={name}
              ></img>
            </div>
            <div className="offer__content__text">
              <div className="offer__text--title">
                {language === "en" ? (
                  <span>{nameWithOutSubText}</span>
                ) : (
                  <p>{bengaliName}</p>
                )}
              </div>
              {subText && subText.length > 0 && (
                <div className="offer__text--sub">
                  {language === "en" ? (
                    <span>{subText}</span>
                  ) : (
                    <p>{englishToBangla(subText)}</p>
                  )}
                </div>
              )}

              <div className="offer__product__price">
                {applyDiscounts && cropPrice && cropPrice > 0 ? (
                  <div className="offer__price--crop">
                    {language === "en" ? (
                      <Fragment>
                        <span className="offer__price--mrp price--red">
                          &#2547; {cropPrice}
                        </span>
                        <span>
                          <del>&#2547; {mrp}</del>
                        </span>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <span className="offer__price--mrp price--red">
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
                      <span className="offer__price--mrp">&#2547; {mrp}</span>
                    ) : (
                      <span className="offer__price--mrp">
                        &#2547; {englishToBangla(mrp)}
                      </span>
                    )}
                  </Fragment>
                )}
              </div>
            </div>
          </div>

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
              {language === "en" ? (
                <span className="btn__bag--text">
                  {productFromCart.qtyCart} {"in bag"}
                </span>
              ) : (
                <span className="btn__bag--text">
                  {englishToBangla(productFromCart.qtyCart)} {"টি ব্যাগে"}
                </span>
              )}

              <div className="btn__bag--p" onClick={() => onClickAddToCart()}>
                <FontAwesome className="" name="plus" />
              </div>
            </div>
          ) : (
            <div
              class="product__card__btn product__card__btn--full"
              onClick={() => onClickAddToCart()}
            >
              <div className="btn__add">
                {language === "en" ? (
                  <span>Add to cart</span>
                ) : (
                  <span>ব্যাগে যোগ করুন</span>
                )}
              </div>
              {/* <div className="btn__add">
                {language === "en" ? (
                  <span>Add to cart</span>
                ) : (
                  <span>ব্যাগে যোগ করুন</span>
                )}
              </div> */}
            </div>
          )}
        </div>
      </React.Fragment>
    </div>
  );
}
export default OfferProduct;
