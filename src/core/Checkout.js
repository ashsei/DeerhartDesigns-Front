import React, { useState, useEffect } from "react";
import {
  getBraintreeClientToken,
  processPayment,
  createOrder,
} from "./apiCore";
import { emptyCart } from "./CartHelpers.js";
import Card from "./Card";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import "braintree-web";
import DropIn from "braintree-web-drop-in-react";

const Checkout = ({ products, setRun = (f) => f, run = undefined }) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: "",
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((data) => {
      if (data.error) {
        setData({ ...data, error: data.error });
      } else {
        setData({ clientToken: data.clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const handleAddress = (event) => {
    setData({ ...data, address: event.target.value });
  };

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const showCheckout = () => {
    return isAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to="/signin">
        <button className="btn btn-secondary btn-block">Sign In</button>
      </Link>
    );
  };

  let deliveryAddress = data.address;

  const buy = () => {
    setData({ loading: true });
    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
        // console.log(data)
        nonce = data.nonce;
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products),
        };
        processPayment(userId, token, paymentData)
          .then((response) => {
            // console.log(response)
            const createOrderData = {
              products: products,
              transaction_id: response.transaction.id,
              amount: response.transaction.amount,
              address: deliveryAddress,
            };
            createOrder(userId, token, createOrderData)
              .then((response) => {
                emptyCart(() => {
                  setRun(!run);
                  setData({
                    loading: false,
                    success: true,
                  });
                });
              })
              .catch((error) => {
                console.log(error);
                setData({ loading: false });
              });
          })
          .catch((error) => {
            console.log(error);
            setData({ loading: false });
          });
      })
      .catch((error) => {
        // console.log("DropIn Error: ", error);
        setData({ ...data, error: error.message });
      });
  };

  const showDropIn = () => (
    <div onBlur={() => setData({ ...data, error: "" })}>
      {data.clientToken !== null && products.length > 0 ? (
        <div style={{textAlign: 'center', color: 'white', background: 'none', border: 'none', fontFamily: "Big Shoulders Inline Display, cursive",  marginTop: '10px'}}style={{textAlign: 'center', color: 'white', background: 'none', border: 'none', fontFamily: "Big Shoulders Inline Display, cursive",  marginTop: '10px'}}>
          <div className="form-group mb-3">
            <label style={{color: 'white', fontFamily: "Big Shoulders Inline Display, cursive",  marginTop: '10px', fontSize: '20px'}}>Delivery Address:</label>
            <textarea
              onChange={handleAddress}
              className="form-control"
              value={data.address}
              placeholder="Please enter your full mailing address here!"
            />
          </div>
          <DropIn
            options={{
              authorization: data.clientToken,
              paypal: {
                flow: "vault",
              }
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
      style={{ display: success ? "" : "none", textAlign: 'center', color: 'white', background: 'none', border: 'none', fontFamily: "Big Shoulders Inline Display, cursive",  marginTop: '10px' }}
    >
      Thank you! Your payment was successful! Please check your email for
      confirmation of this order.
    </div>
  );
  const showLoading = (loading) => loading && <h2>Loading...</h2>;

  return (
    <div>
      <hr />
      <h2 style={{textAlign: 'center', color: 'green', fontFamily: "Big Shoulders Inline Display, cursive",  marginTop: '10px'}}>Item Subtotal: ${getTotal()}</h2>
      {showLoading(data.loading)}
      {showSuccess(data.success)}
      {showError(data.error)}
      {showCheckout()}
    </div>
  );
};

export default Checkout;
