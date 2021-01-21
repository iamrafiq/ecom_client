import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { useSelector } from "react-redux";

import {
  selectResolutionSelection,
  selectLanguageSelection,
} from "../../redux/settingsSlice";
import "./footer.css";

export default function TermsOfUse(props) {
  const history = useHistory();
  const resulationSelector = useSelector(selectResolutionSelection);
  const language = useSelector(selectLanguageSelection);

  useEffect(() => {}, []);
  return (
    <div className="footer-tab">
      {language === "en" ? (
        <div class="">
          <h1>Terms of use</h1>

          <h3>1. Introduction</h3>

          <p>
            <ul>
              <li>
                Welcome to sowdamart.com also hereby known as "Sowdamart". We
                are an online marketplace and these are the terms and conditions
                governing your access and use of "Sowdamart" along with its
                related sub-domains, sites, mobile app, services and tools (the
                "Site"). By using the Site, you hereby accept these terms and
                conditions (including the linked information herein) and
                represent that you agree to comply with these terms and
                conditions (the "User Agreement"). This User Agreement is deemed
                effective upon your use of the Site which signifies your
                acceptance of these terms. If you do not agree to be bound by
                this User Agreement please do not access, register with or use
                this Site. This Site is owned and operated by "Sowdamart" Pvt.
                Limited, a company incorporated under the Companies Act, 2021.
                The Site reserves the right to change, modify, add, or remove
                portions of these Terms and Conditions at any time without any
                prior notification. Changes will be effective when posted on the
                Site with no other notice provided. Please check these Terms and
                Conditions regularly for updates. Your continued use of the Site
                following the posting of changes to Terms and Conditions of use
                constitutes your acceptance of those changes.
              </li>
            </ul>
          </p>

          <h3>2. CONDITIONS OF USE</h3>

          <h3>YOUR ACCOUNT</h3>

          <p>
            <ul>
              <li>
                To access certain services offered by the platform, we may
                require that you create an account with us or provide personal
                information to complete the creation of an account. We may at
                any time in our sole and absolute discretion, invalidate the
                user-name and/or password without giving any reason or prior
                notice and shall not be liable or responsible for any losses
                suffered by, caused by, arising out of, in connection with or by
                reason of such request or invalidation.
              </li>

              <li>
                You are responsible for maintaining the confidentiality of your
                user identification, password, account details and related
                private information. You agree to accept this responsibility and
                ensure your account and its related details are maintained
                securely at all times and all necessary steps are taken to
                prevent misuse of your account. You should inform us immediately
                if you have any reason to believe that your password has become
                known to anyone else, or if the password is being, or is likely
                to be, used in an unauthorized manner.
              </li>

              <li>
                Please ensure that the details you provide us with are correct
                and complete at all times. You are obligated to update details
                about your account in real time by accessing your account
                online. For pieces of information you are not able to update by
                accessing Your Account on the Site, you must inform us via our
                customer service communication channels to assist you with these
                changes. We reserve the right to refuse access to the Site,
                terminate accounts, remove or edit content at any time without
                prior notice to you.
              </li>
            </ul>
          </p>

          <h3>PRIVACY</h3>

          <p>
            <ul>
              <li>
                Please review our Privacy Agreement, which also governs your
                visit to the Site. The personal information / data provided to
                us by you or your use of the Site will be treated as strictly
                confidential, in accordance with the Privacy Agreement and
                applicable laws and regulations. If you object to your
                information being transferred or used in the manner specified in
                the Privacy Agreement, please do not use the Site.
              </li>
            </ul>
          </p>

          <h3>PLATFORM FOR COMMUNICATION</h3>
          <p>
            <ul>
              <li>
                You agree, understand and acknowledge that the Site is an online
                platform that enables you to purchase products listed at the
                price indicated therein at any time from any location using a
                payment method of your choice. You further agree and acknowledge
                that we are only a facilitator and cannot be a party to or
                control in any manner any transactions on the Site or on a
                payment gateway as made available to you by an independent
                service provider. Accordingly, the contract of sale of products
                on the Site shall be a strictly bipartite contract between you
                and the sellers on our Site while the payment processing occurs
                between you, the service provider and in case of prepayments
                with electronic cards your issuer bank. Accordingly, the
                contract of payment on the Site shall be strictly a bipartite
                contract between you and the service provider as listed on our
                Site.
              </li>
            </ul>
          </p>

          <h3>CONTINUED AVAILABILITY OF THE SITE</h3>
          <p>
            <ul>
              <li>
                We will do our utmost to ensure that access to the Site is
                consistently available and is uninterrupted and error-free.
                However, due to the nature of the Internet and the nature of the
                Site, this cannot be guaranteed. Additionally, your access to
                the Site may also be occasionally suspended or restricted to
                allow for repairs, maintenance, or the introduction of new
                facilities or services at any time without prior notice. We will
                attempt to limit the frequency and duration of any such
                suspension or restriction.
              </li>
            </ul>
          </p>
        </div>
      ) : (
        <div class="">
          <h1>ব্যবহারের শর্তাবলী</h1>

          <h3>১. ভূমিকা</h3>

          <p>
            <ul>
              <li>
                এখানে সোডাআমার্ট ডটকমকে স্বাগত জানাই যার দ্বারা এটি "সওদামার্ট"
                নামে পরিচিত। আমরা একটি অনলাইন মার্কেটপ্লেস এবং এগুলি আপনার
                প্রবেশাধিকার পরিচালিত শর্তাদি এবং এর সাথে সম্পর্কিত
                সাব-ডোমেনগুলি, সাইটগুলি, মোবাইল অ্যাপ্লিকেশন, পরিষেবাগুলি এবং
                সরঞ্জামগুলি ("সাইট") এর সাথে "সওদামার্ট" ব্যবহার করুন। সাইটটি
                ব্যবহার করে, আপনি এখানে এই শর্তাদি এবং শর্তাদি স্বীকার করে নিন
                (এখানে লিঙ্কযুক্ত তথ্য সহ) এবং উপস্থাপন করুন যে আপনি এই শর্তাবলী
                ("ব্যবহারকারীর চুক্তি") মেনে চলতে সম্মত হন। এই ব্যবহারকারীর
                চুক্তিটি আপনার সাইটের ব্যবহারের উপর কার্যকর হিসাবে বিবেচিত হবে
                যা আপনার এই শর্তাদি স্বীকার করার ইঙ্গিত দেয়। আপনি যদি এই
                ব্যবহারকারীর চুক্তির দ্বারা আবদ্ধ হতে সম্মত না হন তবে দয়া করে
                এই সাইটের সাথে প্রবেশ বা নিবন্ধন ব্যবহার করবেন না। এই সাইটটির
                মালিকানাধীন ও পরিচালিত "সওদামার্ট" প্রাইভেট লিমিটেড। লিমিটেড,
                সংস্থা আইন-২০২১, এর অধীনে গঠিত একটি সংস্থা। সাইটটি কোনও পূর্বের
                বিজ্ঞপ্তি ছাড়াই যেকোন সময় এই শর্তাদি এবং শর্তাবলীর অংশ
                পরিবর্তন, সংশোধন, যুক্ত বা অপসারণের অধিকার সংরক্ষণ করে।
                পরিবর্তনগুলি কার্যকর হবে যখন সাইটে নোটিশ সরবরাহ না করে সাইটে
                পোস্ট করা হবে। আপডেটের জন্য দয়া করে নিয়মিত এই শর্তাদি এবং
                শর্তাদি পরীক্ষা করুন। শর্তাদি এবং ব্যবহারের শর্তাবলীতে
                পরিবর্তনগুলি পোস্ট করার পরে আপনার সাইটের অবিরত ব্যবহার সেই
                পরিবর্তনগুলির জন্য আপনার গ্রহণযোগ্যতা গঠন করে।
              </li>
            </ul>
          </p>

          <h3>২.ব্যবহারের শর্ত</h3>

          <h3>আপনার অ্যাকাউন্ট</h3>

          <p>
            <ul>
              <li>
                প্ল্যাটফর্মের দ্বারা প্রদত্ত কিছু পরিষেবা প্রবেশ করতে, আমাদের
                প্রয়োজন হতে পারে আপনি আমাদের সাথে একটি অ্যাকাউন্ট তৈরি করুন
                অথবা অ্যাকাউন্ট তৈরির কাজ শেষ করতে ব্যক্তিগত তথ্য সরবরাহ করুন।
                আমরা আমাদের একক এবং নিখুঁত বিবেচনার যে কোনও সময়, কোনও কারণ না
                দিয়েই ব্যবহারকারীর নাম এবং / অথবা পাসওয়ার্ডকে অবৈধ করুন বা
                পূর্ব নোটিশ এবং ক্ষতিগ্রস্থদের জন্য ক্ষতিগ্রস্ত বা দায়বদ্ধ বা
                দায়বদ্ধ হবে না, এরকম অনুরোধ বা অবৈধতার কারণে বা এর কারণে বা এর
                দ্বারা উদ্ভূত।
              </li>

              <li>
                আপনি আপনার ব্যবহারকারীর পরিচয়, পাসওয়ার্ড,অ্যাকাউন্টের বিশদ এবং
                ব্যক্তিগত তথ্য সম্পর্কিত বিষয়ে দায়বদ্ধ। আপনি এই দায়িত্বটি
                স্বীকার করতে সম্মত হন এবং আপনার অ্যাকাউন্ট এবং এর সম্পর্কিত
                বিশদটি সর্বদা সুরক্ষিত রক্ষণাবেক্ষণের বিষয়ে নিশ্চিত হন এবং
                আপনার অ্যাকাউন্টের অপব্যবহার রোধ করার জন্য প্রয়োজনীয় সমস্ত
                পদক্ষেপ নেওয়া হয়েছে। আপনার পাসওয়ার্ড অন্য কারও কাছে জানা হয়ে
                গেছে বলে বিশ্বাস করার কোনও কারণ থাকলে কিংবা যদি পাসওয়ার্ডটি
                অননুমোদিত পদ্ধতিতে ব্যবহৃত হয় বা হতে পারে আপনার অবিলম্বে আমাদের
                অবশ্যই জানাবেন।
              </li>

              <li>
                দয়া করে নিশ্চিত করুন যে আপনি আমাদের যে বিবরণ সরবরাহ করেছেন তা
                সঠিক এবং সর্বদা সম্পূর্ণ। আপনার অ্যাকাউন্টটি অনলাইনে প্রবেশ করে
                রিয়েল টাইমে আপনার অ্যাকাউন্ট সম্পর্কে বিশদ আপডেট করার জন্য
                আপনাকে বাধ্য করা হয়। তথ্যের টুকরো জন্য আপনি সাইটে আপনার
                অ্যাকাউন্টে প্রবেশ করে আপডেট করতে পারবেন না, এই পরিবর্তনগুলির
                সাথে আপনাকে সহায়তা করার জন্য আপনাকে অবশ্যই আমাদের গ্রাহক
                পরিষেবা যোগাযোগ চ্যানেলগুলির মাধ্যমে আমাদের অবহিত করতে হবে।
                আপনার কাছে পূর্ব নোটিশ ছাড়াই যেকোন সময় সাইটে প্রবেশ
                প্রত্যাখ্যান, অ্যাকাউন্টগুলি সমাপ্ত করা, সামগ্রী অপসারণ বা
                সম্পাদনা করার অধিকার আমরা সংরক্ষণ করি।
              </li>
            </ul>
          </p>

          <h3>গোপনীয়তা</h3>

          <p>
            <ul>
              <li>
                দয়া করে আমাদের গোপনীয়তা চুক্তি পর্যালোচনা করুন, যা সাইটে আপনার
                ভিজিটকেও পরিচালনা করে। আপনার দ্বারা বা আপনার সাইটের ব্যবহারের
                দ্বারা আমাদের সরবরাহ করা ব্যক্তিগত তথ্য / ডেটা কঠোরভাবে গোপনীয়
                হিসাবে বিবেচিত হবে গোপনীয়তা চুক্তি এবং প্রযোজ্য আইন ও বিধিমালা
                অনুসারে। আপনি যদি আপনার তথ্যটি গোপনীয়তা চুক্তিতে বর্ণিত
                পদ্ধতিতে স্থানান্তরিত বা ব্যবহৃত হওয়ার বিষয়ে আপত্তি করেন তবে
                দয়া করে সাইটটি ব্যবহার করবেন না।
              </li>
            </ul>
          </p>

          <h3>যোগাযোগের জন্য প্রচারের মাধ্যম</h3>
          <p>
            <ul>
              <li>
                আপনি সম্মত হন, বুঝতে এবং স্বীকার করেন যে সাইটটি একটি অনলাইন
                প্ল্যাটফর্ম যা আপনাকে পণ্য ক্রয়ে সক্ষম করে আপনার পছন্দের
                অর্থপ্রদানের পদ্ধতি ব্যবহার করে যে কোনও অবস্থান থেকে যে কোনও
                সময়ে এতে নির্দেশিত মূল্যে তালিকাভুক্ত। আপনি আরও সম্মত হন এবং
                স্বীকার করেন যে আমরা কেবল একটি সুবিধা প্রদানকারী এবং কোনওভাবেই
                কোনও লেনদেনের পক্ষ বা নিয়ন্ত্রণ করতে পারি না। সাইটে অথবা কোনও
                স্বতন্ত্র পরিষেবা সরবরাহকারীর মাধ্যমে আপনার জন্য উপলব্ধ পেমেন্ট
                গেটওয়েতে হবে। তদনুসারে, সাইটে পণ্য বিক্রয় চুক্তি আপনার মধ্যে
                একটি দ্বিপক্ষীয় চুক্তি হবে এবং পেমেন্ট প্রসেসিংটি যখন আপনার
                মধ্যে ঘটে তখন আমাদের সাইটে বিক্রেতারা, পরিষেবা সরবরাহকারী এবং
                আপনার ইস্যুকারী ব্যাংক ইলেকট্রনিক কার্ডের সাথে পূর্বের পরিশোধের
                ক্ষেত্রে। তদনুসারে, সাইটে অর্থ প্রদানের চুক্তিটি হ'ল আমাদের
                সাইটে তালিকাভুক্ত আপনার এবং পরিষেবা সরবরাহকারীর মধ্যে
                দ্বিপক্ষীয় চুক্তি
              </li>
            </ul>
          </p>

          <h3>সাইটের ক্রমাগত উপলব্ধতা</h3>
          <p>
            <ul>
              <li>
                সাইটে প্রবেশ ধারাবাহিকভাবে উপলব্ধ এবং নিরবচ্ছিন্ন এবং
                ত্রুটি-মুক্ত কিনা তা নিশ্চিত করার জন্য আমরা আমাদের সর্বোচ্চ
                চেষ্টা করব । তবে ইন্টারনেটের প্রকৃতি এবং সাইটের প্রকৃতির কারণে
                এটির গ্যারান্টি দেওয়া যায় না। অতিরিক্তভাবে, সাইটে আপনার প্রবেশ
                মাঝে মাঝে স্থগিত বা অনুমতি সীমাবদ্ধ হতে পারে। কোনও পূর্বে নোটিশ
                ছাড়াই মেরামত, রক্ষণাবেক্ষণ, বা কোনও নতুন সুবিধা বা পরিষেবা
                প্রবর্তনের জন্য। আমরা এই জাতীয় কোনও স্থগিতাদেশ বা সীমাবদ্ধতার
                ফ্রিকোয়েন্সি এবং সময়কাল সীমাবদ্ধ করার চেষ্টা করব।
              </li>
            </ul>
          </p>
        </div>
      )}
    </div>
  );
}
