import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { useSelector } from "react-redux";

import {
  selectResolutionSelection,
  selectLanguageSelection,
} from "../../redux/settingsSlice";
import "./footer.css";

export default function PrivacyPolicy(props) {
  const history = useHistory();
  const resulationSelector = useSelector(selectResolutionSelection);
  const language = useSelector(selectLanguageSelection);

  useEffect(() => {
 
  }, []);
  return (
    <div className="footer-tab">
      {language === "en" ? (
        <div class="">
	 
        <h1>Privacy and Confidentiality</h1>
        
         <p>
              <ul>
                     <li>This Privacy Policy explains how we collect, use and (under certain conditions) disclose your personal information. 
             This Privacy Policy also explains the steps we have taken to secure your personal information.
             Finally, this Privacy Policy explains your options regarding the collection, use and disclosure of your personal information.
             By visiting the Site directly or through another site, you accept the practices described in this Policy.</li>
             
                     <li>Data protection is a matter of trust and your privacy is important to us. 
             We shall therefore only use your name and other information which relates to you in the manner set out in this Privacy Policy. 
             We will only collect information where it is necessary
             for us to do so and we will only collect information if it is relevant to our dealings with you.</li>
             
                     <li>We will only keep your information for
             as long as we are either required to by law or as is relevant for the purposes for which it was collected.</li>
             
                     <li>You can visit the Site and browse without having to provide personal details.
             During your visit to the Site you remain anonymous and at no time can we identify you
             unless you have an account on the Site and log on with your user name and password.</li>
          </ul>
           
                 </p>
           
            <h3>1. Data that we collect</h3>
           
           <p>
                 <ul>
                     <li>We may collect various pieces of information if you seek to place an order for a product with us on the Site.</li>
             
                     <li>We collect, store and process your data for processing your purchase on the Site and any possible later claims,
             and to provide you with our services. We may collect personal information including, but not limited to, your title, name,
             gender, date of birth, email address, postal address, delivery address (if different),telephone number,
             mobile number, fax number, payment details, payment card details or bank account details.</li>
             
                     <li>We will use the information you provide to enable us to process your orders and to provide you with the services
             and information offered through our website and which you request.
             Further, we will use the information you provide to administer your account with us;
             verify and carry out financial transactions in relation to payments you make; audit the downloading of data from our website;
             improve the layout and/or content of the pages of our website and customize them for users;
             identify visitors on our website; carry out research on our users' demographics; 
             send you information we think you may find useful or which you have requested from us, including information about our products and services,
             provided you have indicated that you have not objected to being contacted for these purposes.
             Subject to obtaining your consent we may contact you by email with details of other products and services.
             If you prefer not to receive any marketing communications from us, you can opt out at any time.</li>
             
                    {/* <!-- <li>We may pass your name and address on to a third party in order to make delivery of the product to you 
             (for example to our courier or supplier).
             You must only submit to us the Site information which is accurate and not misleading
             and you must keep it up to date and inform us of changes.</li> --> */}
             
             <li>Your actual order details may be stored with us but for security reasons cannot be retrieved directly by us. 
             However, you may access this information by logging into your account on the Site.
             Here you can view the details of your orders that have been completed, 
             those which are open and those which are shortly to be dispatched and administer your address details,
             bank details ( for refund purposes) and any newsletter to which you may have subscribed.
             You undertake to treat the personal access data confidentially and not make it available to unauthorized third parties.
             We cannot assume any liability for misuse of passwords unless this misuse is our fault.</li>
           </ul>
           
                 </p>
           
           <h3>2. Cookies</h3>
        
         <p>
              <ul>
                     <li>The acceptance of cookies is not a requirement for visiting the Site. However we would like to point out that the use of the 'basket'
             functionality on the Site and ordering is only possible with the activation of cookies. 
             Cookies are tiny text files which identify your computer to our server as a unique user when you visit certain pages on the Site
             and they are stored by your Internet browser on your computer's hard drive.
             Cookies can be used to recognize your Internet Protocol address, saving you time while you are on, or want to enter, the Site.
             We only use cookies for your convenience in using the Site (for example to remember
             who you are when you want to amend your shopping cart without having to re-enter your email address)
             and not for obtaining or using any other information about you (for example targeted advertising). 
             Your browser can be set to not accept cookies, but this would restrict your use of the Site. 
             Please accept our assurance that our use of cookies does not contain any personal or private details and are free from viruses. 
             If you want to find out more information about cookies, go to https://www.allaboutcookies.org 
             or to find out about removing them from your browser, go to https://www.allaboutcookies.org/manage-cookies/index.html.</li>
             
                    {/* <!-- <li>This website uses Google Analytics, a web analytics service provided by Google, Inc. ("Google").
             Google Analytics uses cookies, which are text files placed on your computer, to help the website analyze how users use the site.
             The information generated by the cookie about your use of the website (including your IP address)
             will be transmitted to and stored by Google on servers in the United States.
             Google will use this information for the purpose of evaluating your use of the website,
             compiling reports on website activity for website operators and providing other services relating to website activity and internet usage.
             Google may also transfer this information to third parties where required to do so by law,
             or where such third parties process the information on Google's behalf.
             Google will not associate your IP address with any other data held by Google. 
             You may refuse the use of cookies by selecting the appropriate settings on your browser,
             however please note that if you do this you may not be able to use the full functionality of this website.
             By using this website, you consent to the processing of data about you by Google in the manner and for the purposes set out above.</li> --> */}
          </ul>
           
                 </p>
           
            <h3>3. Security</h3>
         <p>
              <ul>
                     <li>We have in place appropriate technical and security measures
             to prevent unauthorized or unlawful access to or accidental loss of or destruction or damage to your information.
             When we collect data through the Site, we collect your personal details on a secure server. We use firewalls on our servers.
             Our security procedures mean that we may occasionally request proof of identity before we disclose personal information to you.
             You are responsible for protecting against unauthorized access to your password and to your computer.</li>
          </ul>
           
                 </p>
           
           <h3>4. Your rights</h3>
         <p>
              <ul>
                     <li>If you are concerned about your data you have the right
             to request access to the personal data which we may hold or process about you.
             You have the right to require us to correct any inaccuracies in your data free of charge.
             At any stage you also have the right to ask us to stop using your personal data
             for direct marketing purposes.</li>
          </ul>
           
                 </p>
        </div>
      ) : (
        <div class="">
	 
        <h1>ব্যক্তিগত তথ্য এবং গোপনীয়তা</h1>
        
         <p>
              <ul>
                     <li>এই গোপনীয়তা নীতি ব্যাখ্যা করে যে আমরা কীভাবে সংগ্রহ করি, ব্যবহার করব এবং (নির্দিষ্ট শর্তাধীন) আপনার ব্যক্তিগত তথ্য প্রকাশ করি।
               এই গোপনীয়তা নীতি আপনার ব্যক্তিগত তথ্য সুরক্ষিত করতে আমরা কী পদক্ষেপ নিয়েছি তাও ব্যাখ্যা করে। 
               অবশেষে, এই গোপনীয়তা নীতি আপনার ব্যক্তিগত তথ্য সংগ্রহ, ব্যবহার এবং প্রকাশ সম্পর্কিত আপনার বিকল্পগুলি ব্যাখ্যা করে।
               সরাসরি বা অন্য কোনও সাইটের মাধ্যমে সাইটটিতে গিয়ে আপনি এই নীতিতে বর্ণিত অনুশীলনগুলি গ্রহণ করেন।</li>
             
                     <li>তথ্য সুরক্ষা বিশ্বাসের বিষয় এবং আপনার গোপনীয়তা আমাদের কাছে গুরুত্বপূর্ণ।
               অতএব আমরা কেবলমাত্র আপনার নাম এবং অন্যান্য তথ্য ব্যবহার করব যা এই গোপনীয়তা নীতিতে নির্ধারিত পদ্ধতিতে আপনার সাথে সম্পর্কিত।
                                                         যেখানে প্রয়োজন সেখানে আমরা কেবল তথ্য সংগ্রহ করব।
               আমাদের এটি করার জন্য এবং এটি কেবলমাত্র যদি আপনার সাথে আমাদের লেনদেনের সাথে প্রাসঙ্গিক হয় তবে আমরা তথ্য সংগ্রহ করব।</li>
             
                     <li>আমরা কেবল আপনার তথ্য রাখব যতক্ষণ না আইন দ্বারা আমাদের প্রয়োজন হয় বা এটি যে উদ্দেশ্যে সংগ্রহ করা হয়েছিল তার জন্য প্রাসঙ্গিক হয়।</li>
             
                     <li>আপনি ব্যক্তিগত সাইট সরবরাহ না করে সাইটটি দেখতে এবং ব্রাউজ করতে পারেন।সাইটে আপনার ভিজিট চলাকালীন আপনি বেনামে রয়েছেন এবং কোনও সময় আমরা আপনাকে সনাক্ত করতে পারি না
                                                          যতক্ষণ না আপনার সাইটে অ্যাকাউন্ট থাকে এবং আপনার ব্যবহারকারীর নাম এবং পাসওয়ার্ড দিয়ে লগইন না করে।</li>
          </ul>
           
                 </p>
           
            <h3>১. আমরা যে তথ্য সংগ্রহ করি</h3>
           
           <p>
                 <ul>
                     <li>আপনি যদি আমাদের সাইটে কোনও পণ্যটির জন্য কোনও অর্ডার দেওয়ার চেষ্টা করেন তবে আমরা বিভিন্ন ধরণের তথ্য সংগ্রহ করতে পারি।</li>
             
                     <li>সাইটে আপনার ক্রয়ের প্রক্রিয়া করার জন্য এবং পরবর্তী কোনও সম্ভাব্য দাবি, আমরা আপনার ডেটা সংগ্রহ, সঞ্চয় এবং প্রক্রিয়াজাত করি,
               এবং আপনাকে আমাদের পরিষেবা সরবরাহ করতে। আমরা আপনার শিরোনাম, নাম, সহ সীমাবদ্ধ নয় তবে ব্যক্তিগত তথ্য সংগ্রহ করতে পারি
               লিঙ্গ, জন্ম তারিখ, ইমেল ঠিকানা, ডাক ঠিকানা, বিতরণের ঠিকানা (আলাদা হলে), টেলিফোন নম্বর,
                                                          মোবাইল নম্বর, ফ্যাক্স নম্বর, প্রদানের বিবরণ, পেমেন্ট কার্ডের বিশদ বা ব্যাংক অ্যাকাউন্টের বিশদ।</li>
             
                     <li>আপনার অর্ডারগুলি প্রক্রিয়া করতে এবং পরিষেবাগুলি আপনাকে সরবরাহ করতে সক্ষম করার জন্য আমরা আপনার সরবরাহিত তথ্য ব্যবহার করব
               এবং আমাদের ওয়েবসাইটের মাধ্যমে অফার করা তথ্য এবং যা আপনি অনুরোধ করছেন।
               আরও, আমরা আপনার সাথে আমাদের অ্যাকাউন্ট পরিচালনা করতে যে তথ্য সরবরাহ করি তা ব্যবহার করব;
               আপনার প্রদত্ত অর্থ প্রদানের ক্ষেত্রে আর্থিক লেনদেন যাচাই করুন এবং পরিচালনা করুন; আমাদের ওয়েবসাইট থেকে ডেটা ডাউনলোডের নিরীক্ষণ;
               আমাদের ওয়েবসাইটের পৃষ্ঠাগুলির বিন্যাস এবং / অথবা সামগ্রীর উন্নতি করুন এবং তাদের ব্যবহারকারীদের জন্য কাস্টমাইজ করুন;
               আমাদের ওয়েবসাইটে দর্শকদের সনাক্ত; আমাদের ব্যবহারকারীর জনসংখ্যার উপর গবেষণা চালিয়ে যান;
               আপনাকে এমন তথ্য প্রেরণ করুন যা আমরা মনে করি আপনি কার্যকর হতে পারেন বা যা আপনি আমাদের কাছ থেকে আমাদের পণ্য এবং পরিষেবাদি সম্পর্কিত তথ্য সহ অনুরোধ করেছেন,
               আপনি যদি লক্ষ করেন যে আপনি এই উদ্দেশ্যে যোগাযোগ করতে আপত্তি করেন নি।
               আপনার সম্মতি পাওয়ার সাপেক্ষে আমরা অন্যান্য পণ্য এবং পরিষেবাদির বিবরণ সহ ইমেলের মাধ্যমে আপনার সাথে যোগাযোগ করতে পারি।
               আপনি যদি আমাদের কাছ থেকে কোনও বিপণন যোগাযোগ না গ্রহণ করতে পছন্দ করেন তবে আপনি যে কোনও সময় অনির্বাচন করতে পারেন।</li>
             
                    {/* <!-- <li>আপনার কাছে পণ্য সরবরাহ করার জন্য আমরা আপনার নাম এবং ঠিকানা তৃতীয় পক্ষের কাছে প্রেরণ করতে পারি
               (উদাহরণস্বরূপ আমাদের দূত বা সরবরাহকারী)
               আপনাকে কেবলমাত্র আমাদের কাছে সাইট তথ্য জমা দিতে হবে যা সঠিক এবং বিভ্রান্তিমূলক নয়
               এবং আপনাকে অবশ্যই এটি আপ টু ডেট রাখতে হবে এবং আমাদের পরিবর্তনের বিষয়ে অবহিত করতে হবে।</li> --> */}
             
             <li>আপনার প্রকৃত অর্ডার বিশদ আমাদের সাথে সঞ্চিত হতে পারে তবে সুরক্ষার কারণে আমাদের দ্বারা সরাসরি আমাদের পুনরুদ্ধার করা যায় না।
               তবে আপনি সাইটে আপনার অ্যাকাউন্টে লগ ইন করে এই তথ্য অ্যাক্সেস করতে পারেন।
               এখানে আপনি আপনার অর্ডারগুলি সম্পূর্ণ হয়ে গেছে তার বিশদটি দেখতে পারেন,
               এগুলি যা খোলা রয়েছে এবং যা শীঘ্রই প্রেরণ করা হবে এবং আপনার ঠিকানার বিশদটি পরিচালনা করতে হবে,
               ব্যাঙ্কের বিশদ (অর্থ ফেরতের উদ্দেশ্যে) এবং যে কোনও নিউজলেটার আপনি সাবস্ক্রাইব করে থাকতে পারেন।
               আপনি ব্যক্তিগত অ্যাক্সেস ডেটা গোপনে চিকিত্সা করার উদ্যোগ নিয়েছেন এবং এটি অননুমোদিত তৃতীয় পক্ষগুলিতে উপলব্ধ করবেন না।
               পাসওয়ার্ডগুলির অপব্যবহারের জন্য আমরা কোনও দায়বদ্ধতা ধরে নিতে পারি না যদি এই অপব্যবহারটি আমাদের ত্রুটি না হয়।</li>
           </ul>
           
                 </p>
           
           <h3>২. কুকিজ</h3>
        
         <p>
              <ul>
                     <li>কুকিজ গ্রহণযোগ্যতা সাইট দেখার জন্য প্রয়োজন হয় না। তবে আমরা উল্লেখ করতে চাই যে 'বাস্কেট' ব্যবহার
               সাইটে কার্যকারিতা এবং ক্রম কেবল কুকিগুলির সক্রিয়করণের মাধ্যমেই সম্ভব।
               কুকিজ হ'ল ক্ষুদ্র পাঠ্য ফাইল যা আপনি যখন সাইটের নির্দিষ্ট পৃষ্ঠাগুলি ভিজিট করেন তখন আপনার কম্পিউটারকে অনন্য ব্যবহারকারী হিসাবে আমাদের সার্ভারে সনাক্ত করে
               এবং সেগুলি আপনার কম্পিউটারের হার্ড ড্রাইভে আপনার ইন্টারনেট ব্রাউজার দ্বারা সঞ্চিত।
               কুকিজ আপনার ইন্টারনেট প্রোটোকল ঠিকানা সনাক্ত করতে ব্যবহার করা যেতে পারে, আপনি চালু থাকাকালীন সময় বাঁচাতে বা সাইটটিতে প্রবেশ করতে চান।
               আমরা কেবল সাইটটি ব্যবহারে আপনার সুবিধার্থে কুকি ব্যবহার করি (উদাহরণস্বরূপ মনে রাখা
               আপনার ইমেল ঠিকানাটি আবার প্রবেশ না করে আপনি যখন শপিং কার্টটি সংশোধন করতে চান তখন আপনি কে
               এবং আপনার সম্পর্কে অন্য কোনও তথ্য প্রাপ্ত বা ব্যবহারের জন্য নয় (উদাহরণস্বরূপ লক্ষ্যযুক্ত বিজ্ঞাপন)।
               আপনার ব্রাউজারটি কুকিজ গ্রহণ না করার জন্য সেট করা যেতে পারে তবে এটি আপনার সাইটের ব্যবহারকে সীমাবদ্ধ করবে।
               আমাদের কুকিগুলির ব্যবহারে কোনও ব্যক্তিগত বা ব্যক্তিগত বিবরণ নেই এবং ভাইরাস থেকে মুক্ত সে বিষয়ে আমাদের আশ্বাসটি গ্রহণ করুন।
               আপনি যদি কুকিজ সম্পর্কে আরও তথ্য জানতে চান তবে https://www.allaboutcookies.org এ যান
               বা আপনার ব্রাউজার থেকে এগুলি সরিয়ে ফেলার বিষয়ে জানতে, https://www.allaboutcookies.org/manage-cookies/index.html এ যান।</li>
             
                    {/* <!-- <li>এই ওয়েবসাইটটি গুগল অ্যানালিটিক্স, গুগল, ইনক। ("গুগল") দ্বারা সরবরাহিত একটি ওয়েব অ্যানালিটিক্যাল পরিষেবা ব্যবহার করে।
               গুগল অ্যানালিটিক্স ব্যবহারকারীরা কীভাবে সাইট ব্যবহার করে তা বিশ্লেষণ করতে ওয়েবসাইটকে সহায়তা করতে গুগল অ্যানালিটিক্স আপনার কম্পিউটারে রাখা পাঠ্য ফাইলগুলি কুকিজ ব্যবহার করে।
               আপনার ওয়েবসাইটের ব্যবহার সম্পর্কে কুকি দ্বারা উত্পন্ন তথ্য (আপনার আইপি ঠিকানা সহ)
               গুগল মার্কিন যুক্তরাষ্ট্রে সার্ভারে প্রেরণ এবং সংরক্ষণ করা হবে।
               গুগল এই তথ্য আপনার ওয়েবসাইটের ব্যবহারের মূল্যায়নের উদ্দেশ্যে ব্যবহার করবে,
               ওয়েবসাইট অপারেটরদের জন্য ওয়েবসাইট ক্রিয়াকলাপে প্রতিবেদনগুলি সংকলন করা এবং ওয়েবসাইট ক্রিয়াকলাপ এবং ইন্টারনেট ব্যবহার সম্পর্কিত অন্যান্য পরিষেবা সরবরাহ করা।
               গুগল এই তথ্য তৃতীয় পক্ষগুলিতে স্থানান্তর করতে পারে যেখানে আইন অনুসারে এটি করা দরকার,
               বা যেখানে তৃতীয় পক্ষগুলি গুগলের পক্ষ থেকে তথ্য প্রসেস করে।
               গুগল আপনার আইপি ঠিকানা গুগলের অধীনে থাকা অন্য কোনও ডেটার সাথে সংযুক্ত করবে না।
               আপনি আপনার ব্রাউজারে উপযুক্ত সেটিংস নির্বাচন করে কুকিজের ব্যবহার অস্বীকার করতে পারেন,
               তবে দয়া করে নোট করুন যে আপনি যদি এটি করেন তবে আপনি এই ওয়েবসাইটটির সম্পূর্ণ কার্যকারিতাটি ব্যবহার করতে পারবেন না।
               এই ওয়েবসাইটটি ব্যবহার করে, আপনি গুগলের মাধ্যমে আপনার সম্পর্কে ডেটা প্রক্রিয়াকরণে পদ্ধতিতে এবং উপরে বর্ণিত উদ্দেশ্যে আপনি সম্মত হন।</li> --> */}
          </ul>
           
                 </p>
           
            <h3>৩. সুরক্ষা</h3>
         <p>
              <ul>
                     <li>আমাদের যথাযথ প্রযুক্তিগত এবং সুরক্ষা ব্যবস্থা রয়েছে
               আপনার তথ্যের অননুমোদিত বা অবৈধ অ্যাক্সেস বা দুর্ঘটনাজনিত ক্ষতি বা ধ্বংস বা ক্ষতি বা ক্ষতি রোধ করতে।
               আমরা যখন সাইটের মাধ্যমে ডেটা সংগ্রহ করি তখন আমরা আপনার ব্যক্তিগত বিবরণটি সুরক্ষিত সার্ভারে সংগ্রহ করি। আমরা আমাদের সার্ভারগুলিতে ফায়ারওয়াল ব্যবহার করি।
               আমাদের সুরক্ষা পদ্ধতিগুলির অর্থ হ'ল আমরা আপনাকে ব্যক্তিগত তথ্য প্রকাশের আগে মাঝে মাঝে পরিচয়ের প্রমাণের জন্য অনুরোধ করতে পারি।
               আপনি আপনার পাসওয়ার্ড এবং আপনার কম্পিউটারে অননুমোদিত অ্যাক্সেস থেকে রক্ষা করার জন্য দায়বদ্ধ।</li>
          </ul>
           
                 </p>
           
           <h3>৪. আপনার অধিকার</h3>
         <p>
              <ul>
                     <li>আপনি যদি আপনার ডেটা সম্পর্কে উদ্বিগ্ন হন তবে আপনার অধিকার রয়েছে
               আমরা আপনার কাছে রাখা বা ব্যক্তিগত প্রক্রিয়া করতে পারি এমন ব্যক্তিগত ডেটাতে অ্যাক্সেসের অনুরোধ জানাতে।
               আপনার ডেটাতে বিনা মূল্যে যে কোনও অকার্যকর সংশোধন করার জন্য আমাদের প্রয়োজনীয় অধিকার রয়েছে।
               যে কোনও পর্যায়ে আপনারও আমাদের ব্যক্তিগত তথ্য ব্যবহার বন্ধ করতে বলার অধিকার রয়েছে
               সরাসরি বিপণনের উদ্দেশ্যে।</li>
          </ul>
           
                 </p>
        </div>
      )}
    </div>
  );
}
