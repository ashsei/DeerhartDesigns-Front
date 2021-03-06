import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { listOrders, getStatusValues, updateOrderStatus } from "./apiAdmin";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);

  const { user, token } = isAuthenticated();

  const loadOrders = () => {
    listOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  const loadStatusValues = () => {
    getStatusValues(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setStatusValues(data);
      }
    });
  };
  useEffect(() => {
    loadOrders();
    loadStatusValues();
  }, []);

  const showOrdersLength = () => {
    if (orders.length > 0) {
      return (
        <>
          <h1 style={{ textAlign: 'center', color: 'white', textDecoration: 'underline' }}>Manage Orders</h1>
          <hr />
          <h2 style={{textAlign: 'center', color: 'white'}}>Total Orders: {orders.length}</h2>
          <hr />
        </> 
      );
    } else {
      return <h4 style={{textAlign: 'center', color: 'white'}}>No Orders Yet!</h4>;
    }
  };

  const showInput = (key, value) => (
    <div className="input-group mb-2 mr-sm-2">
      <div className="input-group-prepend">
        <div className="input-group-text">{key}</div>
      </div>
      <input type="text" className="form-control" value={value} readOnly />
    </div>
  );

  const handleStatusChange = (e, orderId) => {
    updateOrderStatus(user._id, token, orderId, e.target.value).then((data) => {
      if (data.error) {
        console.log("Status Update Failed");
      } else {
        loadOrders();
      }
    });
  };

  const showStatus = (o) => (
    <div className="form-group">
      <h3 className="mark mb-4">Status: {o.status} </h3>
      <select
        className="form-control"
        onChange={(e) => handleStatusChange(e, o._id)}
      >
        <option>Update Status</option>
        {statusValues.map((status, index) => (
          <option key={index} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );


  return (
    <Layout
      title="Orders"
    >
      <div className="row" style={{fontFamily: "Big Shoulders Inline Display, cursive"}}>
        <div className="col-md-8 offset-md-2">
          {showOrdersLength()}
          {orders.map((o, oIndex) => {
            return (
              <div
                className="mt-5"
                key={oIndex}
                style={{ borderBottom: "5px solid white" }}
              >
                <h2 className="mb-5" style={{ textAlign: 'center'}}>
                  <span className="bg-white">Order ID: {o._id}</span>
                </h2>

                <ul className="list-group">
                  <li className="list-group-item">
                    Order Status: {showStatus(o)}
                  </li>
                  <li className="list-group-item">
                    Transaction ID: {o.transaction_id}
                  </li>
                  <li className="list-group-item">Amount: ${o.amount/100}</li>
                  <li className="list-group-item">Ordered By: {o.user.name}</li>
                  <li className="list-group-item">
                    Ordered On: {moment(o.createdAt).fromNow()}
                  </li>
                  <li className="list-group-item">
                    Delivery Address: {o.address}
                  </li>
                </ul>
                <h3 className="mt-4 mb-4" style={{ textAlign: 'center', color: 'white', textDecoration: 'underline' }}>
                  Total Produtcs in the Order: {o.products.length}
                </h3> 
                {(o.products.map((p, i) => (
                  <div
                    className="mb-4"
                    key={i}
                    style={{ padding: "20px", border: "1px solid white", borderRadius: "5px"}}
                  >
                    {showInput("Product Name", p.name)}
                    {showInput("Product Price", p.price)}
                    {showInput("Product Count", p.count)}
                    {showInput("Product ID", p._id)}
                  </div>
                )))}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
