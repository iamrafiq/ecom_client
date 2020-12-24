import React from "react";
import { LAN_IP } from "../config";

export function imageUrlConverter(url) {
  console.log("build mode...", process.env.REACT_APP_BUILD_TYPE);
  let originalUrl =
    "https://sowdamart.com/api/image/Quaker-Oats-Jar-500-gm?p=p1&ext=webp&res=high";
  let abc =
    "https://sowdamart.com:8000/api/image/A-wide%20range%20of%20Products?p=hg&ext=jpg&res=high";
  let url1 =
    "https://sowdamart.com/sowdamart/images/high/p1/7-Up-Pet-1-ltr.webp";

  //    let strQArray = originalUrl.split("?");
  //    let imName = strQArray[0].split("/")
  //    let qStrings = strQArray[strQArray.length-1].split("&");
  //    let pStr = qStrings[0].split("=");
  //    let extStr = qStrings[1].split("=");
  //    let resStr = qStrings[2].split("=");
  //    let sURl = `https://sowdamart.com/sowdamart/images/${resStr[1]}/${pStr[1]}/${imName[imName.length-1]}.${extStr[1]}`
  console.log("new url", sURl);

  let def = abc.replace(":8000", "");
  let pp = def;
  if (!def.includes("https")) {
    pp = def.replace("http", "https");
  }
  console.log("aabbcc", pp);

  if (process.env.REACT_APP_BUILD_TYPE === "dev") {
    let rep = "";
    if (url) {
      rep = url.replace("ubuntu-Inspiron-5593:8001", LAN_IP + ":8000");
    }
    console.log("rep...", rep);
    return rep;
  } else {
    let strQArray = originalUrl.split("?");
    let imName = strQArray[0].split("/");
    let qStrings = strQArray[strQArray.length - 1].split("&");
    let pStr = qStrings[0].split("=");
    let extStr = qStrings[1].split("=");
    let resStr = qStrings[2].split("=");
    let sURl = `https://sowdamart.com/sowdamart/images/${resStr[1]}/${
      pStr[1]
    }/${imName[imName.length - 1]}.${extStr[1]}`;

    let temUrl1 = url.replace(":8000", "");
    let temUrl2 = temUrl1;
    if (!temUrl1.includes("https")) {
      temUrl2 = temUrl1.replace("http", "https");
    }
    // return temUrl2;

    let strQArray = temUrl2.split("?");
    let imName = strQArray[0].split("/");
    let qStrings = strQArray[strQArray.length - 1].split("&");
    let pStr = qStrings[0].split("=");
    let extStr = qStrings[1].split("=");
    let resStr = qStrings[2].split("=");
    let sURl = `https://sowdamart.com/sowdamart/images/${resStr[1]}/${
      pStr[1]
    }/${imName[imName.length - 1]}.${extStr[1]}`;

    return sURl;
  }
}
