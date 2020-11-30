import React from "react";
import Layout from "./Layout";
import {
  getProducts,
  getBraintreeClientToken,
  processPayment,
  createOrder,
} from "./apiCore";
import { emptyCart } from "./cartHelper";
import { useEffect, useState } from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser, selectToken } from "../redux/authSlice";
import "braintree-web";
import DropIn from "braintree-web-drop-in-react";
const Checkout = ({ products, changeEffectCallBack }) => {
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const [data, setData] = useState({
    loading: false,
    paymentSuccess: false,
    clientToken: null,
    error: "",
    instance: {},
    address: "",
  });
  const userId = user && user._id;

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((data) => {
      if (data.error) {
        setData({ ...data, error: data.error });
      } else {
        setData({
          ...data,
          paymentSuccess: false,
          clientToken: data.clientToken,
        });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);
  const getTotal = (products) => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };
  const showCheckout = () => {
    return user ? (
      <div className="">{showDropIn()}</div>
    ) : (
      <Link to="/signin">
        <button className="btn btn-primary">Signin to checkout</button>
      </Link>
    );
  };
  let deliveryAddress = data.address;
  const buy = () => {
    setData({
      loading: true,
    });
    // send the nonce to your server
    // nonce = data.instance.requestPaymentMethod()
    // payment method: paypal or card .. etc
    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
        console.log(data);
        nonce = data.nonce;
        // once we have nonce (card type, card number) send nonce as 'paymentMethodNonce' to backend
        // and alos total to be charged

        //   console.log('send nonce and total to process:', nonce, getTotal(products))
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products),
        };

        processPayment(userId, token, paymentData)
          .then((response) => {
            console.log(response);
            //create order
            const createOrderData = {
              products: products,
              transaction_id: response.transaction.id,
              amount: response.transaction.amount,
              address: deliveryAddress,
            };
            createOrder(userId, token, createOrderData)
              .then((responce) => {
                // empty cart,
                emptyCart(() => {
                  // setChangeEffect(changeEffect+1)
                  changeEffectCallBack();
                  setData({
                    loading: false,
                    paymentSuccess: true,
                  });
                });
              })
              .catch((error) => {
                console.log(error);
                setData({ loading: false });
              });
            //setData({ ...data, paymentSuccess: response.success });
          })
          .catch((error) => {
            console.log(console.error());
            setData({
              loading: false,
            });
          });
      })
      .catch((error) => {
        console.log("dropin error: ", error);
        setData({ ...data, error: error.message });
      });
  };
  const handleAddress = (event) => {
    console.log(event.target.value);
    setData({ ...data, address: event.target.value });
  };
  const showDropIn = () => (
    <div onBlur={() => setData({ ...data, error: "" })} className="">
      {data.clientToken !== null && products.length > 0 ? (
        <div className="">
          <div className="">
            <div className="gorm-group mb-3">
              <label htmlFor="" className="text-muted">
                Delivery address:
              </label>
              <textarea
                onChange={handleAddress}
                className="form-control"
                value={data.address}
                placeholder="Type your delivery address here..."
              ></textarea>
            </div>
          </div>
          <DropIn
            options={{
              authorization: data.clientToken,
              // paypal: {
              //   flow: "vault",
              // },
            }}
            onInstance={(instance) => (data.instance = instance)}
          />
          <button onClick={buy} className="btn btn-success btn-block">
            Pay
          </button>
        </div>
      ) : null}
    </div>
  );
  const showError = (error) => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );
  const showSuccess = (success) => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      Thanks! Your payment was successfull
    </div>
  );
  const showLoading = (loading) => loading && <h2>Loading...</h2>;
  return (
    <div className="">
      <h2>Total: ${getTotal(products)}</h2>
      {showLoading(data.loading)}
      {showSuccess(data.paymentSuccess)}
      {showError(data.error)}
      {showCheckout()}
    </div>
  );
};

export default Checkout;
