import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import "./product-details.css";
import { useSelector, useDispatch } from "react-redux";
import {
  selectLanguageSelection,
  selectDeviceTypeSelection,
} from "../../redux/settingsSlice";
import { setCartBarDesktop, setCartBarMobile, selectCartBarDesktop } from "../../redux/globalSlice";

import { getAdvertisementsBySlug } from "../../admin/advertisement/apiAdvertisement";
import {
  addItem,
  removeItem,
  selectCartProducts,
  selectAcartProduct,
} from "../../redux/cartSlice";
import ProductPhotoViewer from "../../util/ProductPhotoViewer";
import { englishToBangla, discountInPercentage } from "../../util/utils";
import { selectResolutionSelection } from "../../redux/settingsSlice";
import Footer from "../footer/Footer";
import { imageUrlConverter } from "../../util/ImageUrlConverter";

var FontAwesome = require("react-fontawesome");

function ProductDetails({ product, closeModal }) {
  const dispatch = useDispatch();
  const language = useSelector(selectLanguageSelection);
  const resulationSelector = useSelector(selectResolutionSelection);
  const cartBarDesktop = useSelector(selectCartBarDesktop);

  const deviceType = useSelector(selectDeviceTypeSelection);
  const cartProducts = useSelector(selectCartProducts);

  const productFromCart = useSelector(selectAcartProduct(product));
  const [advertisments, setAdvertisiments] = useState("");

  const {
    photosUrl,
    name,
    bengaliName,
    subText,
    mrp,
    cropPrice,
    shortDesc,
    longDesc,
    applyDiscounts,
  } = product;
  const onClickAddToCart = () => {
    dispatch(addItem({ product: product }));
  };
  const onClickRemoveFromCart = () => {
    dispatch(removeItem({ product: product }));
  };
  const onClickBuy = () => {
    console.log("on click buy");
    closeModal();
    const p = cartProducts.find(
      (p) => p.product && p.product._id === product._id
    );
    if (!p) {
      dispatch(addItem({ product: product }));
    }
    if (deviceType === "desktop") {
      if (!cartBarDesktop.open){
        dispatch(setCartBarDesktop({ cartBarDesktop: { open: true } }));

      }
    } else {
      dispatch(setCartBarMobile({ cartBarMobile: { open: true } }));
    }
  };
  const downloadAdvertisement = (slug) => {
    getAdvertisementsBySlug(slug).then((data) => {
      if (!data.error) {
        setAdvertisiments(data);
      }
    });
  };
  useEffect(() => {
    downloadAdvertisement(product.slug);
  }, []);
  return (
    <div className="root-details">
      {advertisments && advertisments.length > 0 && (
        <div className="advert">
          {language === "en" ? (
            <Fragment>
              <span>Why shop in Sowdamart</span>
              <img
                src={`${imageUrlConverter(
                  `${advertisments[0].photo}&res=${resulationSelector}`
                )}`}
                alt="Sowdamart"
              />
            </Fragment>
          ) : (
            <Fragment>
              <span> সওদামার্ট এ কেন বাজার করবেন </span>
              <img
                src={`${imageUrlConverter(
                 `${ advertisments[0].photoBangla}&res=${resulationSelector}`
                )}`}
                alt="Sowdamart"
              />
            </Fragment>
          )}
        </div>
      )}

      <div className="root-container">
        <div className="container-top">
          <div className="left">
            <ProductPhotoViewer
              photosUrl={photosUrl}
              alt={name}
            ></ProductPhotoViewer>
          </div>
          <div className="right">
            {language === "en" ? (
              <div className="title">{name}</div>
            ) : (
              <div className="title">{bengaliName}</div>
            )}

            {subText &&
              (language === "en" ? (
                <div className="subtext">{subText}</div>
              ) : (
                <div className="subtext">{englishToBangla(subText)}</div>
              ))}

            <div className="price">
              <div className="left">
                {applyDiscounts && cropPrice && cropPrice > 0 ? (
                  language === "en" ? (
                    <React.Fragment>
                      <span className="font-large-price">
                        &#2547; {cropPrice} &nbsp;
                      </span>
                      <span className="font-small-price">
                        <del>MRP {mrp} &#2547; </del>
                      </span>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <span className="font-large-price">
                        &#2547; {englishToBangla(cropPrice)} &nbsp;
                      </span>
                      <span className="font-small-price">
                        <del>MRP {englishToBangla(mrp)} &#2547; </del>
                      </span>
                    </React.Fragment>
                  )
                ) : language === "en" ? (
                  <React.Fragment>
                    <span className="font-large-price">MRP {mrp} &#2547;</span>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <span className="font-large-price">
                      MRP {englishToBangla(mrp)} &#2547;
                    </span>
                  </React.Fragment>
                )}
                {/* <span className="crop-price"> &#2547; {cropPrice} &nbsp;</span>
                <span className="mrp">
                  <del>MRP {mrp} &#2547; </del>
                </span> */}
              </div>

              {cropPrice && (
                <div className="right">
                  <span className="dot"></span>
                  {language === "en" ? (
                    <span className="text">
                      {discountInPercentage(mrp, cropPrice)} % OFF
                    </span>
                  ) : (
                    <span className="text">
                      {englishToBangla(discountInPercentage(mrp, cropPrice))} %
                      OFF
                    </span>
                  )}
                </div>
              )}
            </div>
            <div className="btns">
              <div className="counter">
                <div className="minus" onClick={() => onClickRemoveFromCart()}>
                  <FontAwesome className="" name="minus" />
                </div>
                <div className="bag">
                  {language == "en" ? (
                    <React.Fragment>
                      {productFromCart ? (
                        <div className="top">{productFromCart.qtyCart}</div>
                      ) : (
                        <div className="top">{0}</div>
                      )}
                      <div className="bottom">in bag</div>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      {productFromCart ? (
                        <div className="top">
                          {englishToBangla(productFromCart.qtyCart)}
                        </div>
                      ) : (
                        <div className="top">{englishToBangla(0)}</div>
                      )}

                      <div className="bottom">{`টি ব্যাগে`}</div>
                    </React.Fragment>
                  )}
                </div>
                <div className="plus" onClick={() => onClickAddToCart()}>
                  <FontAwesome className="" name="plus" />
                </div>
              </div>
              <div className="buy-now" onClick={() => onClickBuy()}>
                <span>Buy now</span>
              </div>
            </div>
            <hr className="divider" />
            <div className="description">{longDesc}</div>
          </div>
        </div>
        <div className="container-bottom">
          <Footer></Footer>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
