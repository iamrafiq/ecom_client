import React from "react";
import { useEffect, useState } from "react";
import { englishToBangla } from "../../util/utils";

import { getOrderList } from "../../user/apiUser";
import { selectUser, selectToken } from "../../redux/authSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  selectResolutionSelection,
  selectLanguageSelection,
  selectDeviceTypeSelection,
} from "../../redux/settingsSlice";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import AllOrders from "./AllOrders";
import TrackOrder from "./TrackOrder";
// Demo styles, see 'Styles' section below for some notes on use.
import "./order.css";
import Footer from "../footer/Footer";
export default function Order() {
  const language = useSelector(selectLanguageSelection);
  const deviceType = useSelector(selectDeviceTypeSelection);

  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <div className="order--tab">
        <Tabs>
          <TabList>
            <Tab>
              {language === "en"
                ? `Track Your Order`
                : `আপনার অর্ডার ট্র্যাক করুন`}
            </Tab>
            <Tab>{language === "en" ? `All Order` : `সকল অর্ডার`}</Tab>
          </TabList>

          <TabPanel>
            <TrackOrder></TrackOrder>
          </TabPanel>
          <TabPanel>
            <AllOrders></AllOrders>
          </TabPanel>
        </Tabs>
      </div>

      <Footer></Footer>
    </React.Fragment>
  );
}
