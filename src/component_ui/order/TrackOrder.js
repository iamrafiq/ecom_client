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
export default function TrackOrder() {
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
        // console.log("order data:", data);
      }
      //   dispatch(setLoadingSpinner({ loadingSpinner: false }));
    });
  }, []);

  return (
    <div className="order">
      <div className="order__title">Track Your orders</div>
      <React.Fragment>
        {order && order.length > 0 ? (
          <div className="">
            <Accordion>
              {order.map((item, index) => (
                <React.Fragment>
                  {(item.status === `Not processed` ||
                    item.status === `Processing` ||
                    item.status === `Shipped` ||
                    item.status === `Delivered`) && (
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
                            {/* {item.statusTimeline.map((timeLine, index) => (
                              <div className="order_product">
                                {timeLine.name} - {timeLine.createdAt}
                              </div>
                            ))} */}
                            <section class="root">
                              <figure>
                                <img
                                  src="https://image.flaticon.com/icons/svg/970/970514.svg"
                                  alt=""
                                />
                                <figcaption>
                                  <h4>Tracking Details</h4>
                                  <h6>Order Number</h6>
                          <h2># {item.orderId}</h2>
                                </figcaption>
                              </figure>
                              <div class="order-track">
                                {item.statusTimeline.map((timeLine, index) => (
                                  <React.Fragment>
                                    {timeLine.name === "Not processed" && (
                                      <div class="order-track-step">
                                        <div class="order-track-status">
                                          <span class="order-track-status-dot"></span>
                                          <span class="order-track-status-line"></span>
                                        </div>
                                        <div class="order-track-text">
                                          <p class="order-track-text-stat">
                                            Created / Placed
                                          </p>
                                          <span class="order-track-text-sub">
                                            {`${dateWithNameOfDay(
                                              new Date(timeLine.createdAt)
                                            )}`}
                                          </span>
                                        </div>
                                      </div>
                                    )}
                                    {timeLine.name === "Processing" && (
                                      <div class="order-track-step">
                                        <div class="order-track-status">
                                          <span class="order-track-status-dot"></span>
                                          <span class="order-track-status-line"></span>
                                        </div>
                                        <div class="order-track-text">
                                          <p class="order-track-text-stat">
                                            {timeLine.name}
                                          </p>
                                          <span class="order-track-text-sub">
                                            {`${dateWithNameOfDay(
                                              new Date(timeLine.createdAt)
                                            )}`}
                                          </span>
                                        </div>
                                      </div>
                                    )}
                                    {timeLine.name === "Shipped" && (
                                      <div class="order-track-step">
                                        <div class="order-track-status">
                                          <span class="order-track-status-dot"></span>
                                          <span class="order-track-status-line"></span>
                                        </div>
                                        <div class="order-track-text">
                                          <p class="order-track-text-stat">
                                            {timeLine.name}
                                          </p>
                                          <span class="order-track-text-sub">
                                            {`${dateWithNameOfDay(
                                              new Date(timeLine.createdAt)
                                            )}`}
                                          </span>
                                        </div>
                                      </div>
                                    )}
                                    {timeLine.name === "Delivered" && (
                                      <div class="order-track-step">
                                        <div class="order-track-status">
                                          <span class="order-track-status-dot"></span>
                                          <span class="order-track-status-line"></span>
                                        </div>
                                        <div class="order-track-text">
                                          <p class="order-track-text-stat">
                                            {timeLine.name}
                                          </p>
                                          <span class="order-track-text-sub">
                                            {`${dateWithNameOfDay(
                                              new Date(timeLine.createdAt)
                                            )}`}
                                          </span>
                                        </div>
                                      </div>
                                    )}
                                  </React.Fragment>
                                ))}

                                {/* <div class="order-track-step">
                                  <div class="order-track-status">
                                    <span class="order-track-status-dot"></span>
                                    <span class="order-track-status-line"></span>
                                  </div>
                                  <div class="order-track-text">
                                    <p class="order-track-text-stat">
                                      {" "}
                                      Estimated - 456 End St. New York City, NY
                                    </p>
                                    <span class="order-track-text-sub">
                                      3rd November, 2019
                                    </span>
                                  </div>
                                </div> */}
                              </div>
                            </section>
                          </div>
                        </AccordionItemPanel>
                      </AccordionItem>
                    </React.Fragment>
                  )}
                </React.Fragment>
              ))}
            </Accordion>
          </div>
        ) : language === "en" ? (
          <span>No order found</span>
        ) : (
          <span>কোন অর্ডার পাওয়া যাইনি</span>
        )}
      </React.Fragment>
    </div>
  );
}
