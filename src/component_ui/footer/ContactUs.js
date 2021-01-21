import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { useSelector } from "react-redux";

import {
  selectResolutionSelection,
  selectLanguageSelection,
} from "../../redux/settingsSlice";
import "./footer.css";

export default function ContactUs(props) {
  const history = useHistory();
  const resulationSelector = useSelector(selectResolutionSelection);
  const language = useSelector(selectLanguageSelection);

  useEffect(() => {
 
  }, []);
  return (
    <div className="footer-tab">
      {language === "en" ? (
        <span>
          Feel free to contact us anytime at +8802-8991145 or email
          support@sowdamart.com Or if you prefer, you can drop us a note using
          the form below. You'll always get a response from a real person — with
          a real name — within 24 hours.
        </span>
      ) : (
        <span>
          আমাদের সাথে +৮৮০২-৮৯৯১১৪৫ এ যেকোন সময় যোগাযোগ করতে বা ইমেল
          support@sowdamart.com এ নির্দ্বিধায় যোগাযোগ করুন অথবা আপনি যদি পছন্দ
          করেন তবে নীচের ফর্মটি ব্যবহার করে আমাদের একটি নোট ফেলে দিতে পারেন।
          আপনি 24 ঘন্টার মধ্যে একটি আসল নাম - সহ সত্যিকারের ব্যক্তির কাছ থেকে
          সর্বদা প্রতিক্রিয়া পাবেন।
        </span>
      )}
    </div>
  );
}
