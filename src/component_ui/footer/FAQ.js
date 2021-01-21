import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { useSelector } from "react-redux";

import {
  selectResolutionSelection,
  selectLanguageSelection,
} from "../../redux/settingsSlice";
import "./footer.css";

export default function FAQ(props) {
  const history = useHistory();
  const resulationSelector = useSelector(selectResolutionSelection);
  const language = useSelector(selectLanguageSelection);

  useEffect(() => {}, []);
  return (
    <div className="footer-tab">
      {language === "en" ? (
        <div class="">
          <h1>FAQ</h1>

          <h3>1. How does the site work? </h3>

          <p>
            <ul>
              <li>
                {" "}
                You can browse the site or use our search engine to find your
                desired products. You can then add them to your shopping bag and
                click on place order. You let us know your address, select a
                delivery time – and voila, you are done. A "Sowdamart"
                representative will then deliver your order right to your home
                or office.{" "}
              </li>
            </ul>
          </p>

          <h3>2. How much do deliveries cost? </h3>

          <p>
            <ul>
              <li>
                No delivery fee will be charged for any order confirmation.
              </li>
            </ul>
          </p>

          <h3>3. How can I contact you? </h3>

          <p>
            <ul>
              <li>
                You can always call +8802-8991145 or email support@sowdamart.com
              </li>
            </ul>
          </p>

          <h3>4. What are your delivery hours? </h3>

          <p>
            <ul>
              <li>
                We deliver from 9 am to 9 pm every day. You can choose from
                available slots to find something that is convenient to you.{" "}
              </li>
            </ul>
          </p>

          <h3>5. How do I know when my order is here? </h3>

          <p>
            <ul>
              <li>
                A "Sowdamart" representative will call you as soon as they are
                at your house to let you know about your delivery.
              </li>
            </ul>
          </p>
        </div>
      ) : (
        <div class="">
          <h1>প্রতিনিয়ত জিজ্ঞাসিত প্রশ্ন</h1>

          <h3>১. সাইটটি কীভাবে কাজ করে? </h3>

          <p>
            <ul>
              <li>
                {" "}
                আপনার পছন্দসই পণ্যগুলি খুঁজতে আপনি সাইটটি ব্রাউজ করতে পারেন বা
                আমাদের অনুসন্ধান ইঞ্জিন ব্যবহার করতে পারেন। তারপরে আপনি এগুলিকে
                আপনার শপিং ব্যাগে যুক্ত করতে পারেন এবং স্থান অর্ডারে ক্লিক করতে
                পারেন। আপনি আমাদের আপনার ঠিকানা জানান, প্রসবের সময় নির্বাচন
                করুন - এবং ভয়েলা, আপনি হয়ে গেছেন। একজন "সওদামার্ট" প্রতিনিধি
                তখন আপনার অর্ডারটি আপনার বাড়ি বা অফিসে পৌঁছে দেবে।{" "}
              </li>
            </ul>
          </p>

          <h3>২. বিলি করার জন্য কত খরচ হয়?</h3>

          <p>
            <ul>
              <li>অর্ডার নিশ্চিতকরণের জন্য কোনও বিতরণ ফি নেওয়া হবে না।</li>
            </ul>
          </p>

          <h3>৩. কিভাবে আপনি আমাদের সাথে যোগাযোগ করতে পারবেন?</h3>

          <p>
            <ul>
              <li>
                আপনি সর্বদা + 8802-8991145 এ কল করতে পারেন বা ইমেল
                support@sowdamart.com এ মেইল করতে পারেন
              </li>
            </ul>
          </p>

          <h3>৪. আমাদের বিলি করার সময়কাল কখন?</h3>

          <p>
            <ul>
              <li>
                আমরা প্রতিদিন সকাল 9 টা থেকে রাত 9 টা পর্যন্ত বিতরণ করি। আপনার
                পক্ষে সুবিধাজনক কিছু খুঁজে পেতে আপনি উপলভ্য স্লটগুলি থেকে চয়ন
                করতে পারেন।{" "}
              </li>
            </ul>
          </p>

          <h3>৫. আপনার অর্ডার যখন এখানে থাকবে তখন আমরা কীভাবে জানাব? </h3>

          <p>
            <ul>
              <li>
                আপনার "বিতরণ" সম্পর্কে আপনাকে অবহিত করার জন্য একজন "সওদামার্ট"
                প্রতিনিধি আপনাকে আপনার বাড়িতে পৌঁছে দেওয়ার সাথে সাথে ফোন করবে।
              </li>
            </ul>
          </p>
        </div>
      )}
    </div>
  );
}
