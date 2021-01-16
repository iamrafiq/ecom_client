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

function ImageProduct({ product, advertProductSlug = null }) {
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
               portal
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
        <div className="">
          <div
            className=""
            onClick={() => setModalProductDetails(true)}
          >
            <div className="content--image">
              <img
                src={`${imageUrlConverter(
                 ` ${photosUrl[0]}&res=${resulationSelector}`)}`} 
                alt={name}
                onClick={() => setModalProductDetails(true)}
              ></img>
            </div>
          </div>

        
        </div>
      </React.Fragment>
    </div>
  );
}
export default ImageProduct;
