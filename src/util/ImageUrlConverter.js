import React from "react";
import { LAN_IP } from "../config";

export function imageUrlConverter(url) {
    if (url)
    return url.replace("ubuntu-Inspiron-5593", LAN_IP)

   // return url.replace("ubuntu-Inspiron-5593", "192.168.0.131") // home internet
} 