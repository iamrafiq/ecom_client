import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import "./product-details.css";
import { useSelector, useDispatch } from "react-redux";
import { selectLanguageSelection } from "../../redux/settingsSlice";
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
var FontAwesome = require("react-fontawesome");

function ProductDetails({ product }) {
  const dispatch = useDispatch();
  const language = useSelector(selectLanguageSelection);
  const resulationSelector = useSelector(selectResolutionSelection);
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
                src={`${advertisments[0].photo}&res=${resulationSelector}`}
                alt="Sowdamart"
              />
            </Fragment>
          ) : (
            <Fragment>
              <span> সওদামার্ট এ কেন বাজার করবেন </span>
              <img
                src={`${advertisments[0].photoBangla}&res=${resulationSelector}`}
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
          <div className="top">
            <div className="left">
              <img
                src="https://cdn.chaldal.net/asset/Egg.Grocery.Fabric/Egg.Grocery.Web/1.5.0+Release-1490/Default/stores/chaldal/components/page/BrandComponent/images/1-hour.png?q=low&webp=1&alpha=1"
                alt="1 hour delivery"
              />
              {language === "en" ? (
                <span>1 hour delivery</span>
              ) : (
                <span>১ ঘণ্টার মধ্যে বিতরণ</span>
              )}

              <img
                src="https://cdn.chaldal.net/asset/Egg.Grocery.Fabric/Egg.Grocery.Web/1.5.0+Release-1490/Default/stores/chaldal/components/page/BrandComponent/images/cash-on-delivery.png?q=low&webp=1&alpha=1"
                alt="Cash on delivery"
              />
              {language === "en" ? (
                <span>Cash on delivery</span>
              ) : (
                <span> প্রদানোত্তর পরিশোধ</span>
              )}
            </div>
            <div className="right">
              {language === "en" ? (
                <span>Pay with</span>
              ) : (
                <span>প্রদান করুন</span>
              )}

              <img
                src="https://cdn.chaldal.net/asset/Egg.Grocery.Fabric/Egg.Grocery.Web/1.5.0+Release-1490/Default/components/shared/NewFooter/images/Amex.png?q=low&webp=1&alpha=1"
                alt="Amex"
              />
              <img
                src="https://cdn.chaldal.net/asset/Egg.Grocery.Fabric/Egg.Grocery.Web/1.5.0+Release-1490/Default/components/shared/NewFooter/images/mastercard.png?q=low&webp=1&alpha=1"
                alt="Master Card"
              />
              <img
                src="https://cdn.chaldal.net/asset/Egg.Grocery.Fabric/Egg.Grocery.Web/1.5.0+Release-1490/Default/components/shared/NewFooter/images/VIsa.png?q=low&webp=1&alpha=1"
                alt="Visa Card"
              />
              <img
                src="https://cdn.chaldal.net/asset/Egg.Grocery.Fabric/Egg.Grocery.Web/1.5.0+Release-1490/Default/components/shared/NewFooter/images/bkash.png?v=1&q=low&webp=1&alpha=1"
                alt="bKash"
              />
              <img
                src="https://cdn.chaldal.net/asset/Egg.Grocery.Fabric/Egg.Grocery.Web/1.5.0+Release-1490/Default/components/shared/NewFooter/images/COD.png?v=1&q=low&webp=1&alpha=1"
                alt="Cash On Delivery"
              />
            </div>
          </div>
          <div className="bottom">
            <div className="left">
              <img src="http://sowdamart.com/images/logo.png" alt="Logo" />
              {language === "en" ? (
                <div className="company-goal">
                  Sowdamart.com is an online shop in Dhaka, Bangladesh. We
                  believe time is valuable to our fellow Dhaka residents, and
                  that they should not have to waste hours in traffic, brave bad
                  weather and wait in line just to buy basic necessities like
                  eggs! This is why Sowdamart delivers everything you need right
                  at your door-step and at no additional cost.
                </div>
              ) : (
                <div className="company-goal">
                  সওদামার্ট বাংলাদেশ এর সর্ব প্রথম অনলাইন ভিত্তিক শপ। বর্তমান
                  সমাজের ব্যস্তটায় ফাঁকে প্রত্যেকটি মানুষ তার নিত্য প্রয়োজনীয়
                  জিনিস যেন ঘরে বসে অনয়াসেই কেনাকাটা করতে পারে এমন লক্ষ্য নিয়েই
                  সওদামার্ট এর যাত্রা শুরু। “সময় বাঁচাও, খরচ বাঁচাও” এই স্লোগান
                  নিয়েই সওদামার্ট ঢাকাবাসীদের তাদের প্রাত্যহিক হয়রানি থেকে
                  মুক্তি দেওয়ার চেষ্টায় নিয়োজিত। যদিও আপাতত এই সেবাটি ঢাকা এর
                  মাঝেই সীমাবদ্ধ, তবে আমরা আশা করছি অচিরেই সারা বাংলাদেশে আমাদের
                  এই সেবা ছড়িয়ে দেব।
                </div>
              )}

              <div className="links">
                <div className="customer-service">
                  {language === "en" ? (
                    <div className="title">Customer Service</div>
                  ) : (
                    <div className="title">গ্রাহক সেবা</div>
                  )}

                  <hr className="border" />
                  {language === "en" ? (
                    <div className="item">Contact Us</div>
                  ) : (
                    <div className="item">যোগাযোগ</div>
                  )}

                  {language === "en" ? (
                    <div className="item">FAQ</div>
                  ) : (
                    <div className="item">প্রতিনিয়ত জিজ্ঞাসিত প্রশ্ন</div>
                  )}
                </div>
                <div className="about-company">
                  {language === "en" ? (
                    <div className="title">About Sowdamart</div>
                  ) : (
                    <div className="title">সওদামার্ট সম্পর্কে</div>
                  )}

                  <hr className="border" />
                  {language === "en" ? (
                    <div className="item">Privacy Policy</div>
                  ) : (
                    <div className="item">গোপনীয়তা নীতি</div>
                  )}

                  {language === "en" ? (
                    <div className="item">Terms of Use</div>
                  ) : (
                    <div className="item">ব্যবহারের নিয়মাবলি</div>
                  )}
                </div>
                <div className="for-business">
                  {language === "en" ? (
                    <div className="title">For Business</div>
                  ) : (
                    <div className="title">ব্যাবসার জন্য</div>
                  )}

                  <hr className="border" />
                  {language === "en" ? (
                    <div className="item">Corporate</div>
                  ) : (
                    <div className="item">কর্পোরেট</div>
                  )}
                </div>
              </div>
            </div>
            <div className="right">
              <div className="mobile-apps">
                <div className="box-app">
                  <img
                    src="https://cdn.chaldal.net/asset/Egg.Grocery.Fabric/Egg.Grocery.Web/1.5.0+Release-1490/Default/components/shared/NewFooter/images/google_play_store.png?q=low&webp=1&alpha=1"
                    alt=""
                    className="Anroid App"
                  />
                </div>
                <div className="box-app">
                  <img
                    src="https://cdn.chaldal.net/asset/Egg.Grocery.Fabric/Egg.Grocery.Web/1.5.0+Release-1490/Default/components/shared/NewFooter/images/app_store.png?q=low&webp=1&alpha=1"
                    alt="iPhone App"
                  />
                </div>
              </div>
              <div className="contact-info">
                <div className="phone-number">
                  <img
                    src="https://cdn.chaldal.net/asset/Egg.Grocery.Fabric/Egg.Grocery.Web/1.5.0+Release-1490/Default/components/shared/NewFooter/images/phone_icon.png?q=low&webp=1&alpha=1"
                    alt="Phone Icon"
                  />
                  {language === "en" ? (
                    <span>0176-8567184</span>
                  ) : (
                    <span>০১৭৬-৮৫৬৭১৮৪</span>
                  )}
                </div>
                <div className="email">
                  or email{" "}
                  <span className="emaill-address">support@sowdamart.com</span>
                </div>
              </div>
              <div className="social-networks">
                <img
                  src="https://cdn.chaldal.net/asset/Egg.Grocery.Fabric/Egg.Grocery.Web/1.5.0+Release-1490/Default/components/shared/NewFooter/images/Facebook.png?q=low&webp=1&alpha=1"
                  alt="Facebook"
                />
                <img
                  src="https://cdn.chaldal.net/asset/Egg.Grocery.Fabric/Egg.Grocery.Web/1.5.0+Release-1490/Default/components/shared/NewFooter/images/Youtube.png?q=low&webp=1&alpha=1"
                  alt="Youtube"
                />
                <img
                  src="https://cdn.chaldal.net/asset/Egg.Grocery.Fabric/Egg.Grocery.Web/1.5.0+Release-1490/Default/components/shared/NewFooter/images/twitter.png?q=low&webp=1&alpha=1"
                  alt="Twitter"
                />
                <img
                  src="https://cdn.chaldal.net/asset/Egg.Grocery.Fabric/Egg.Grocery.Web/1.5.0+Release-1490/Default/components/shared/NewFooter/images/Instagram.png?q=low&webp=1&alpha=1"
                  alt="Instagram"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
