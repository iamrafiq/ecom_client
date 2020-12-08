import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { useSelector } from "react-redux";

import { selectUser, selectToken } from "../redux/authSlice";
import { Link } from "react-router-dom";
import { orderDetails } from "./apiAdmin";
import moment from "moment";
const OrderDetails = (props) => {
  const [order, setOrder] = useState([]);
  const [statusValues, setStatusValues] = useState([]);

  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  console.log("order details  a:", user);
 
  useEffect(() => {
    const orderId = props.match.params.orderId;
    console.log("order details:");
    orderDetails(user._id, orderId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log("order details:", data);
        setOrder(data);
        // setOrders(data);
      }
    });   
  }, []);

  const showInput = (key, value) => (
    <div className="input-group mb-2 mr-sm-2">
      <div className="input-group-prepend">
        <div className="input-group-text">{key}</div>
      </div>
      <input type="text" className="from-control" value={value} readOnly />
    </div>
  );

  return (
    <Layout
      title="Orders"
      description={`G'day ${user.name}, you can managers here?`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {order && order.products && (
            <React.Fragment>
              <h3 className="mt-4 mb-4 font-italic">
                Total products in the order {order.products.length}
              </h3>
              {order.products.map((p, pIndex) => (
                <div
                  className="mb-4"
                  key={pIndex}
                  style={{ padding: "20px", border: "1px solid indigo" }}
                >
                  {showInput("Product name", p.name)}
                  {showInput("Product price", p.price)}
                  {showInput("Product total", p.count)}
                  {showInput("Product Id", p._id)}
                </div>
              ))}
            </React.Fragment>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetails;
