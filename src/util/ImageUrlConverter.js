import React from "react";
import { LAN_IP } from "../config";

export function imageUrlConverter(url) {
    // console.log("url........", url)
    if (process.env.BUILD_TYPE === "dev"){
        let rep = "";
        if (url){
         rep = url.replace("ubuntu-Inspiron-5593:8000", LAN_IP+":8000")
        }
        console.log("r...", rep);
        return rep;
    }else{
        return url
    }
   
} 