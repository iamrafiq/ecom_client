import React from "react";
import { useEffect, useState } from "react";
import { englishToBangla } from "../../util/utils";
import { dateWithNameOfDay } from "../../util/date";

import { getOrderList } from "../../user/apiUser";
import { selectUser, selectToken } from "../../redux/authSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  selectResolutionSelection,
  selectLanguageSelection,
  selectDeviceTypeSelection,
} from "../../redux/settingsSlice";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

// Demo styles, see 'Styles' section below for some notes on use.
import "react-accessible-accordion/dist/fancy-example.css";
import "./order.css";
export default function AllOrder() {
  const language = useSelector(selectLanguageSelection);
  const deviceType = useSelector(selectDeviceTypeSelection);

  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const [order, setOrder] = useState([]);
  useEffect(() => {
    getOrderList(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrder(data);
        console.log("order data:", data);
      }
      //   dispatch(setLoadingSpinner({ loadingSpinner: false }));
    });
  }, []);

  return (
    <div className="order">
      <div className="order__title">Your orders</div>
      <React.Fragment>
        {order && order.length > 0 ? (
          <Accordion>
            {order.map((item, index) => (
              <React.Fragment>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      <React.Fragment className="order__header">
                        <span> Date: </span>
                        <span className="order__date">{`${dateWithNameOfDay(
                                new Date(item.createdAt)
                              )}  `}</span>
                        <span> Status: </span>

                        <span
                          className={
                            item.status === `Delivered`
                              ? "order__status_delivered"
                              : `${
                                  item.status === `Cancelled`
                                    ? "order__status_canceled"
                                    : `${
                                        item.status === `Processing`
                                          ? "order__status_processing"
                                          : `${
                                              item.status === `Shipped`
                                                ? "order__status_shipped"
                                                : "order__status_not_processed"
                                            }`
                                      }`
                                }`
                          }
                        >{`${item.status}`}</span>
                      </React.Fragment>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <div className="order__pannel">
                      {item.products.map((product, index) => (
                        <div className="order_product">
                          <span className="order_product--name">
                            {language === "en"
                              ? `${product.name}`
                              : `${product.bengaliName}`}
                          </span>
                          <span className="order_product--subtext">
                            {language === "en"
                              ? `${product.subText}`
                              : `${englishToBangla(product.subText)}`}
                          </span>
                          <span className="order_product--count">
                            {" "}
                            {language === "en"
                              ? `Count: ${product.count}`
                              : `পরিমাণঃ  ${englishToBangla(product.count)}`}
                          </span>
                          <span className="order_product--price">
                            {language === "en"
                              ? `Total Price: ${product.price}`
                              : `মূল্যঃ  ${englishToBangla(product.price)}`}
                          </span>
                          <div className="horizontal--line"></div>
                        </div>
                      ))}
                      <span className="order_product--grand--amount">
                        {language === "en"
                          ? `Grand Amount: ${item.amount}`
                          : `মোট মূল্যঃ  ${englishToBangla(item.amount)}`}
                      </span>
                    </div>
                  </AccordionItemPanel>
                </AccordionItem>
              </React.Fragment>
            ))}
          </Accordion>
        ) : language === "en" ? (
          <span>No order found</span>
        ) : (
          <span>কোন অর্ডার পাওয়া যাইনি</span>
        )}
      </React.Fragment>
    </div>
  );
}
