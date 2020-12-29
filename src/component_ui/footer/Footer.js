import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  selectResolutionSelection,
  selectLanguageSelection,
} from "../../redux/settingsSlice";
import "./footer.css";
import oneHourImg from "../../images/1-hour.png";
import amexImg from "../../images/Amex.png";
import bKashImg from "../../images/bkash.png";
import cashOnDeliveryImg from "../../images/cash-on-delivery.png";
import codImg from "../../images/COD.png";
import visaImg from "../../images/VIsa.png";

import masterCardImg from "../../images/mastercard.png";
import playStoreImg from "../../images/google_play_store.png";
import phoneIcon from "../../images/phone_icon.png";
import facebookImg from "../../images/Facebook.png";
import twitterImg from "../../images/twitter.png";
import youtubeImg from "../../images/Youtube.png";
import instagramImg from "../../images/Instagram.png";
import appstoreImg from "../../images/app_store.png";
import { CONTACT_PHONE_NUMBER } from "../../config";
import { englishToBangla } from "../../util/utils";
import { getImage } from "../../core/apiCore";
export default function Footer(props) {
  const resulationSelector = useSelector(selectResolutionSelection);
  const language = useSelector(selectLanguageSelection);
  const [state, setState] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const init = () => {
    //setSelected(pre);
    getImage().then((data) => {
      setErrorMsg(data);
      if (data) {
        // setErrorMsg(JSON.parse(data))
      } else {
        // setValues({ ...values, childs: data.map((c, i)=>({ label: c.name, value: c._id})), formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    console.log("use effect");
    init();
  }, []);
  return (
    <div className="app__footer">
      <div className="footer__top">
        <div className="delivery--hr">
          <img src={oneHourImg} alt="1 hour delivery" />
          {language === "en" ? (
            <span>1 hour delivery</span>
          ) : (
            <span>{true ? `${errorMsg}` : `১ ঘণ্টার মধ্যে বিতরণ`}</span>
          )}

          <img src={cashOnDeliveryImg} alt="Cash on delivery" />
          {language === "en" ? (
            <span>Cash on delivery</span>
          ) : (
            <span> প্রদানোত্তর পরিশোধ</span>
          )}
        </div>
        <div className="pay--with">
          {language === "en" ? <span>Pay with</span> : <span>প্রদান করুন</span>}

          <img src={amexImg} alt="Amex" />
          <img src={masterCardImg} alt="Master Card" />
          <img src={visaImg} alt="Visa Card" />
          <img src={bKashImg} alt="bKash" />
          <img src={codImg} alt="Cash On Delivery" />
        </div>
      </div>
      <div className="footer__bottom">
        <div className="footer__company">
          <img
            onError={(e) => {
              setState(true);
              setErrorMsg(e.target);
            }}
            src="http://192.168.0.109:8000/api/image/home-10?p=pfs&ext=png&res=high"
          />

          {/* <img   src="/images/order.png" /> */}
          {language === "en" ? (
            <div className="company__goal">
              Did you ever imagine that the freshest of fruits and vegetables,
              top quality pulses and food grains, dairy products and hundreds of
              branded items could be handpicked and delivered to your home, all
              at the click of a button? Bangladesh’s first comprehensive online
              megastore, <strong>sowdamart.com</strong>, brings a whopping 7000+
              products with more than 1000 brands, for you.
              <br /> From household cleaning products to beauty and makeup,
              sowdamart has everything you need for your daily needs.
              sowdamart.com is convenience personified We’ve taken away all the
              stress associated with shopping for daily essentials, and you can
              now order all your household products and even buy groceries
              online without travelling long distances or standing in serpentine
              queues. Add to this the convenience of finding all your
              requirements at one single source, along with great savings, and
              you will realize that sowdamart- Banglades’s largest online
              supermarket, has revolutionized the way Bangladesh shops for
              groceries. <br />
              Online grocery shopping has never been easier. Need things fresh?
              Whether it’s fruits and vegetables or dairy and meat, we have this
              covered as well! Get fresh eggs, meat, fish and more online at
              your convenience. Hassle-free Home Delivery options We deliver to
              all cities across Bangladesh and maintain excellent delivery
              times, ensuring that all your products from groceries to snacks
              branded foods reach you in time.
              <br />
              <strong> Slotted Delivery:</strong> Pick the most convenient
              delivery slot to have your grocery delivered. From early morning
              delivery for early birds, to late-night delivery for people who
              work the late shift, sowdamart caters to every schedule. <br />
              <strong>Express Delivery: </strong>This super useful service can
              be availed by customers in Dhaka city, in which we deliver your
              orders to your doorstep in 60 Minutes.
            </div>
          ) : (
            <div className="company__goal">
              Did you ever imagine that the freshest of fruits and vegetables,
              top quality pulses and food grains, dairy products and hundreds of
              branded items could be handpicked and delivered to your home, all
              at the click of a button? Bangladesh’s first comprehensive online
              megastore, <strong>sowdamart.com</strong>, brings a whopping 7000+
              products with more than 1000 brands, for you.
              <br /> From household cleaning products to beauty and makeup,
              sowdamart has everything you need for your daily needs.
              sowdamart.com is convenience personified We’ve taken away all the
              stress associated with shopping for daily essentials, and you can
              now order all your household products and even buy groceries
              online without travelling long distances or standing in serpentine
              queues. Add to this the convenience of finding all your
              requirements at one single source, along with great savings, and
              you will realize that sowdamart- Banglades’s largest online
              supermarket, has revolutionized the way Bangladesh shops for
              groceries. <br />
              Online grocery shopping has never been easier. Need things fresh?
              Whether it’s fruits and vegetables or dairy and meat, we have this
              covered as well! Get fresh eggs, meat, fish and more online at
              your convenience. Hassle-free Home Delivery options We deliver to
              all cities across Bangladesh and maintain excellent delivery
              times, ensuring that all your products from groceries to snacks
              branded foods reach you in time.
              <br />
              <strong> Slotted Delivery:</strong> Pick the most convenient
              delivery slot to have your grocery delivered. From early morning
              delivery for early birds, to late-night delivery for people who
              work the late shift, sowdamart caters to every schedule. <br />
              <strong>Express Delivery: </strong>This super useful service can
              be availed by customers in Dhaka city, in which we deliver your
              orders to your doorstep in 60 Minutes.
            </div>
          )}

          <div className="footer__links">
            <div className="customer-service">
              {language === "en" ? (
                <div className="footer__links--title">Customer Service</div>
              ) : (
                <div className="footer__links--title">গ্রাহক সেবা</div>
              )}

              <hr className="footer__links--border" />
              {language === "en" ? (
                <div className="footer__links--item">Contact Us</div>
              ) : (
                <div className="footer__links--item">যোগাযোগ</div>
              )}

              {language === "en" ? (
                <div className="footer__links--item">FAQ</div>
              ) : (
                <div className="footer__links--item">
                  প্রতিনিয়ত জিজ্ঞাসিত প্রশ্ন
                </div>
              )}
            </div>
            <div className="about-company">
              {language === "en" ? (
                <div className="footer__links--title">About Sowdamart</div>
              ) : (
                <div className="footer__links--title">সওদামার্ট সম্পর্কে</div>
              )}

              <hr className="footer__links--border" />
              {language === "en" ? (
                <div className="footer__links--item">Privacy Policy</div>
              ) : (
                <div className="footer__links--item">গোপনীয়তা নীতি</div>
              )}

              {language === "en" ? (
                <div className="footer__links--item">Terms of Use</div>
              ) : (
                <div className="footer__links--item">ব্যবহারের নিয়মাবলি</div>
              )}
            </div>
            <div className="for-business">
              {language === "en" ? (
                <div className="footer__links--title">For Business</div>
              ) : (
                <div className="footer__links--title">ব্যাবসার জন্য</div>
              )}

              <hr className="footer__links--border" />
              {language === "en" ? (
                <div className="footer__links--item">Corporate</div>
              ) : (
                <div className="footer__links--item">কর্পোরেট</div>
              )}
            </div>
          </div>
        </div>
        <div className="footer__contact__apps">
          <div className="mobile-apps">
            <div className="box-app">
              <img src={playStoreImg} alt="" className="Anroid App" />
            </div>
            <div className="box-app">
              <img src={appstoreImg} alt="iPhone App" />
            </div>
          </div>
          <div className="contact-info">
            <div className="footer-phone-number">
              <img
                className="footer-phone-number-icon"
                src={phoneIcon}
                alt="Phone Icon"
              />
              {language === "en" ? (
                <span className="footer-phone-number-text">
                  {CONTACT_PHONE_NUMBER}
                </span>
              ) : (
                <span className="footer-phone-number-text">
                  {englishToBangla(CONTACT_PHONE_NUMBER)}
                </span>
              )}
            </div>
            <div className="email">
              or email{" "}
              <span className="emaill-address">support@sowdamart.com</span>
            </div>
          </div>
          <div className="social-networks">
            <img src={facebookImg} alt="Facebook" />
            <img src={youtubeImg} alt="Youtube" />
            <img src={twitterImg} alt="Twitter" />
            <img src={instagramImg} alt="Instagram" />
          </div>
        </div>
      </div>
    </div>
  );
}
