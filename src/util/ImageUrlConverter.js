import React from "react";
import { LAN_IP } from "../config";

export function imageUrlConverter(url) {
    console.log("build mode...", process.env.REACT_APP_BUILD_TYPE)

    let abc = "http://sowdamart.com:8000/api/image/A-wide%20range%20of%20Products?p=hg&ext=jpg&res=high";
    let def = abc.replace(":8000",'');
    let pp = def.replace("http",'https');
    console.log("aabbcc", pp);

    if (process.env.REACT_APP_BUILD_TYPE==="dev"){
        let rep = "";
        if (url){
        rep = url.replace("ubuntu-Inspiron-5593:8001", LAN_IP+":8000")
        }
        console.log("rep...", rep);
        return rep;
    }else{

        let temUrl1 = url.replace(":8000",'');
         let temUrl2 = temUrl1.replace("http",'https');
        return temUrl2;
    }
   
} 