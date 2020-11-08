import React from "react";
import { useEffect, useState } from "react";
import "./product_details.css";
import { useSelector, useDispatch } from "react-redux";
import {
  selectLanguageSelection,
  selectResolutionSelection,
} from "../../redux/settingsSlice";
function ProductDetails({ product }) {
  const resulationSelector = useSelector(selectResolutionSelection);
  const { language } = useSelector(selectLanguageSelection);
  const { photosUrl } = product;
  return (
    <div className="root-details">
      <div className="root-container">
        <div className="container-top">
          <div className="left">
            <div className="top">
              <img
                src={
                  photosUrl && photosUrl.length > 0
                    ? `${photosUrl[0]}&res=${resulationSelector}`
                    : ""
                }
                alt=""
              />
            </div>

            {photosUrl && photosUrl.length > 1 && (
              <div className="bottom">
                {photosUrl.map((url, index) => (
                  <img
                    src={`${photosUrl[index]}&res=${"low"}`}
                    alt=""
                  />
                ))}
              </div>
            )}
            {/* <div className="bottom">
              <img
                src="https://cdn.chaldal.net/_mpimage/nestle-maggi-2-minute-noodles-masala-8-pack-496-gm?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D47374&q=low&v=1&w=80&webp=1"
                alt=""
                className="group round-circle-border"
              />
              <img
                src="https://cdn.chaldal.net/_mpimage/nestle-maggi-2-minute-noodles-masala-8-pack-496-gm?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D46402&q=low&v=1&w=80&webp=1"
                alt=""
                className="group"
              />
              <img
                src="https://cdn.chaldal.net/_mpimage/nestle-maggi-2-minute-noodles-masala-8-pack-496-gm?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D47372&q=low&v=1&w=80&webp=1"
                alt=""
                className="group"
              />
              <img
                src="https://cdn.chaldal.net/_mpimage/nestle-maggi-2-minute-noodles-masala-8-pack-496-gm?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D47373&q=low&v=1&w=80&webp=1"
                alt=""
                className="group"
              />
            </div> */}
          </div>
          <div className="right">
            <div className="title">
              Nestlé MAGGI 2-Minute Noodles Masala 8 Pack
            </div>
            <div className="subtext">496 gram</div>
            <div className="price">
              <div className="left">
                <span className="crop-price"> &#2547; 300 &nbsp;</span>
                <span className="mrp">
                  <del>MRP &#2547; 500</del>
                </span>
              </div>
              <div className="right">
                <span className="dot"></span>
                <span className="text">25% OFF</span>
              </div>
            </div>
            <div className="btns">
              <div className="counter">
                <div className="minus">-</div>
                <div className="bag">
                  <div className="top">0</div>
                  <div className="bottom">in bag</div>
                </div>
                <div className="plus">+</div>
              </div>
              <div className="buy-now">
                <span>Buy now</span>
              </div>
            </div>
            <hr className="divider" />
            <div className="description">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum
              error voluptates blanditiis quo quae praesentium ducimus delectus
              aut assumenda illo! Illo nulla laborum perferendis mollitia
              excepturi, quos explicabo aut fugit ea! Expedita quis ipsam
              tempore debitis! Nam quasi ut libero vel at rerum, perferendis
              numquam! Voluptatem tempore maiores expedita aperiam cumque
              consequatur eaque minima, accusantium rerum amet perferendis quos
              eveniet sint ex doloribus, dicta numquam vel? Odio assumenda
              fugiat minus eaque optio adipisci architecto. Quam perspiciatis
              iusto laboriosam rerum voluptate eum maiores illum eos doloremque
              suscipit dolorem id, at error ad veniam qui adipisci voluptatum
              accusamus optio minus. Unde, ex!
            </div>
          </div>
        </div>
        <div className="container-bottom">
          <div className="top">
            <div className="left">
              <img
                src="https://cdn.chaldal.net/asset/Egg.Grocery.Fabric/Egg.Grocery.Web/1.5.0+Release-1490/Default/stores/chaldal/components/page/BrandComponent/images/1-hour.png?q=low&webp=1&alpha=1"
                alt="1 hour delivery"
              />
              <span>1 hour delivery</span>
              <img
                src="https://cdn.chaldal.net/asset/Egg.Grocery.Fabric/Egg.Grocery.Web/1.5.0+Release-1490/Default/stores/chaldal/components/page/BrandComponent/images/cash-on-delivery.png?q=low&webp=1&alpha=1"
                alt="Cash on delivery"
              />
              <span>Cash on delivery</span>
            </div>
            <div className="right">
              <span>Pay with</span>
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
              <div className="company-goal">
                Sowdamart.com is an online shop in Dhaka, Bangladesh. We believe
                time is valuable to our fellow Dhaka residents, and that they
                should not have to waste hours in traffic, brave bad weather and
                wait in line just to buy basic necessities like eggs! This is
                why Chaldal delivers everything you need right at your door-step
                and at no additional cost.
              </div>
              <div className="links">
                <div className="customer-service">
                  <div className="title">Customer Service</div>
                  <hr className="border" />
                  <div className="item">Contact Us</div>
                  <div className="item">FAQ</div>
                </div>
                <div className="about-company">
                  <div className="title">About Sowdamart</div>
                  <hr className="border" />
                  <div className="item">Privacy Policy</div>
                  <div className="item">Terms of Use</div>
                </div>
                <div className="for-business">
                  <div className="title">For Business</div>
                  <hr className="border" />
                  <div className="item">Contact Us</div>
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
                  <span>01768567184</span>
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
