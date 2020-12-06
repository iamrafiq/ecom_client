import React from "react";
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
import {CONTACT_PHONE_NUMBER } from "../../config";
import { englishToBangla } from "../../util/utils";

export default function Footer(props) {
  const resulationSelector = useSelector(selectResolutionSelection);
  const language = useSelector(selectLanguageSelection);

  return (
    <div className="app__footer">
      <div className="footer__top">
        <div className="delivery--hr">
          <img src={oneHourImg} alt="1 hour delivery" />
          {language === "en" ? (
            <span>1 hour delivery</span>
          ) : (
            <span>১ ঘণ্টার মধ্যে বিতরণ</span>
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
          <img src="http://sowdamart.com/images/logo.png" alt="Logo" />
          {language === "en" ? (
            <div className="company__goal">
              Sowdamart.com is an online shop in Dhaka, Bangladesh. We believe
              time is valuable to our fellow Dhaka residents, and that they
              should not have to waste hours in traffic, brave bad weather and
              wait in line just to buy basic necessities like eggs! This is why
              Sowdamart delivers everything you need right at your door-step and
              at no additional cost.
            </div>
          ) : (
            <div className="company__goal">
              সওদামার্ট বাংলাদেশ এর সর্ব প্রথম অনলাইন ভিত্তিক শপ। বর্তমান সমাজের
              ব্যস্তটায় ফাঁকে প্রত্যেকটি মানুষ তার নিত্য প্রয়োজনীয় জিনিস যেন ঘরে
              বসে অনয়াসেই কেনাকাটা করতে পারে এমন লক্ষ্য নিয়েই সওদামার্ট এর
              যাত্রা শুরু। “সময় বাঁচাও, খরচ বাঁচাও” এই স্লোগান নিয়েই সওদামার্ট
              ঢাকাবাসীদের তাদের প্রাত্যহিক হয়রানি থেকে মুক্তি দেওয়ার চেষ্টায়
              নিয়োজিত। যদিও আপাতত এই সেবাটি ঢাকা এর মাঝেই সীমাবদ্ধ, তবে আমরা আশা
              করছি অচিরেই সারা বাংলাদেশে আমাদের এই সেবা ছড়িয়ে দেব।
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
            <div className="phone-number">
              <img src={phoneIcon} alt="Phone Icon" />
              {language === "en" ? (
                <span>{CONTACT_PHONE_NUMBER}</span>
              ) : (
              <span>{englishToBangla(CONTACT_PHONE_NUMBER)}</span>
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
