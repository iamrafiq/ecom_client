import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();

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
              products with more than 1000 brands, for you. Online grocery
              shopping has never been easier. Need things fresh? Whether it’s
              fruits and vegetables or dairy and meat, we have this covered as
              well! Get fresh eggs, meat, fish and more online at your
              convenience.
            </div>
          ) : (
            <div className="company__goal">
              আপনি কি কখন চিন্তা করেছেন খুব সহজে এক ক্লিকে আপনার দরজায় পৌছে যাবে
              তাজা ফলমূল শাক-সবজি, চাল, ডাল, তৈল, আটা, ময়দা, লবন, আলু, পেয়াজ,
              আদা, রসূন, দুধজাত দ্রব্য, ডিম, মসলা, নুডুলস, কসমেটিকস সামগ্রী,
              ডেইরি প্রোডাক্ট এবং শত শত ব্যান্ডের পণ্য।
              <strong>সওদামার্ট</strong> বাংলাদেশের প্রথম (সর্ববৃহৎ) অনলাইন মেগা
              স্টোর আপনার জন্য নিয়ে এসেছে ৭০০০ সাত হাজারের বেশি ব্যান্ডের এক
              বিশাল সমাহার। বাসাবাড়ি পরিস্কার থেকে শুরু করে ত্বকে ব্যবহার্য
              প্রসাধনী সামগ্রী দৈনন্দিন জীবনে যা আপনার প্রয়োজন সওদামার্টে পাবেন
              সবকিছু। ধন্যবাদ
            </div>
          )}

          <div className="footer__links">
            <div className="customer-service">
              <div className="footer__links--title">
                {language === "en" ? "Customer Service" : "গ্রাহক সেবা"}
              </div>

              <hr className="footer__links--border" />
              <div className="footer__links--item"  onClick={() => {
                  history.push({
                    pathname: `/ft/contact-us`,
                  });
                }}>
                {language === "en" ? "Contact Us" : "যোগাযোগ"}
              </div>
              <div className="footer__links--item"  onClick={() => {
                  history.push({
                    pathname: `/ft/faq`,
                  });
                }}>
                {language === "en" ? "FAQ" : " প্রতিনিয়ত জিজ্ঞাসিত প্রশ্ন"}
              </div>
            </div>
            <div className="about-company">
              <div className="footer__links--title">
                {language === "en" ? "About Sowdamart" : "সওদামার্ট সম্পর্কে"}
              </div>
              <hr className="footer__links--border" />
              <div className="footer__links--item"  onClick={() => {
                  history.push({
                    pathname: `/ft/privacy-policy`,
                  });
                }}>
                {language === "en" ? "Privacy Policy" : "গোপনীয়তা নীতি"}
              </div>
              <div className="footer__links--item"  onClick={() => {
                  history.push({
                    pathname: `/ft/terms-of-use`,
                  });
                }}>
                {language === "en" ? "Terms of Use" : "ব্যবহারের নিয়মাবলি"}
              </div>
            </div>
            <div className="for-business">
              <div className="footer__links--title">
                {language === "en" ? "For Business" : "ব্যাবসার জন্য"}
              </div>
              <hr className="footer__links--border" />
              <div
                className="footer__links--item"
                onClick={() => {
                  history.push({
                    pathname: `/ft/corporate`,
                  });
                }}
              >
                {language === "en" ? "Corporate" : "কর্পোরেট"}
              </div>
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
