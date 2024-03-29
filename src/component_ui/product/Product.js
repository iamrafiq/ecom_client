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

function Product({ product, advertProductSlug = null }) {
  const resulationSelector = useSelector(selectResolutionSelection);
  const [openDetailsView, setOpenDetailsView] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalProductDetails, setModalProductDetails] = useState(false);
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
    if (advertProductSlug && advertProductSlug === product.slug) {
      setModalProductDetails(true);
    }
  }, []); //selectedHoverSlug, openDetailsView

  const onClickAddToCart = () => {
    console.log("product..***.add", product)
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
        {modalProductDetails && (
          <div>
            <PureModal
              header={""}
              scrollable={false}
              // footer="Buttons?"
              //  closeButtonPosition="bottom"
              // closeButtonPosition="bottom"
              // portal
              // closeButton={<div>&#10007;</div>}
              isOpen={modalProductDetails}
              onClose={() => {
                setModalProductDetails(false);
                return true;
              }}
            >
              <ProductDetails
                product={product}
                closeModal={() => {
                  setModalProductDetails(false);
                }}
              ></ProductDetails>
            </PureModal>
          </div>
        )}
        <div className="product-card">
          <div
            className="card__content"
            // onTouchStart={() => onHoverProduct()}
            // onMouseEnter={() => onHoverProduct()}
            onClick={() => setModalProductDetails(true)}
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
                onClick={() => setModalProductDetails(true)}
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

          {productFromCart ? (
            <div className="btn__bag">
              <div
                className="btn__bag--m"
                onClick={() => onClickRemoveFromCart()}
              >
                <FontAwesome className="" name="minus" />
              </div>
              <div className="btn__bag-text-box">
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
                <span
                  className="btn__bag--text-price"
                  onClick={() => onClickAddToCart()}
                >
                  <span>&#2547;</span>{" "}
                  {language === "en"
                    ? `   ${totalPrice()}`
                    : `   ${englishToBangla(totalPrice())} `}
                </span>
              </div>

              <div className="btn__bag--p" onClick={() => onClickAddToCart()}>
                <FontAwesome className="" name="plus" />
              </div>
            </div>
          ) : (
            <div class="btn__all app__btn" onClick={() => onClickAddToCart()}>
              <div>
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
