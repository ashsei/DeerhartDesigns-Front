import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { getPurchaseHistory } from "./apiUser";
import moment from "moment";

const Dashboard = () => {
  const [history, setHistory] = useState([]);
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const token = isAuthenticated().token;

  const init = (userId, token) => {
    getPurchaseHistory(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setHistory(data);
      }
    });
  };

  useEffect(() => {
    init(_id, token);
  }, []);

  const userLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">User Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="btn btn-secondary btn-block" id="dash-link" to="/cart">
              My Cart
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="btn btn-secondary btn-block" id="dash-link" to={`/profile/${_id}`}>
              Update Information
            </Link>
          </li>
        </ul>
      </div>
    );
  };
  const userInfo = () => {
    return (
      <div className="card mb-3">
        <h3 className="card-header">User Information</h3>
        <ul className="list-group">
          <li className="list-group-item">{name}</li>
          <li className="list-group-item">{email}</li>
          <li className="list-group-item">
            {role === 1 ? "Admin" : "Registered User"}
          </li>
        </ul>
      </div>
    );
  };
  const purchaseHistory = (history) => {
    if (!history) {
      return(
        <div className="card mb-5">
          <h3 className="card-header">Purchase History</h3>
          <h6>No Purchase History Yet!</h6>
        </div>
      )
    } else {
      return (
        <div className="card mb-5">
          <h3 className="card-header">Purchase History</h3>
          <ul className="list-group">
            <li className="list-group-item">
              {history.map((h, i) => {
                return (
                  <div key={i}>
                    <hr />
                    <h5>Order Status: {h.status}</h5>
                    <h5>Order ID: {h._id}</h5>
                    <h5>Products In Order ({h.products.length}):</h5>
                    {h.products.map((p, i) => {
                      return (
                        <div key={i} style={{ textIndent: '20px' }}>
                          <hr/>
                          <h6>Product name: {p.name}</h6>
                          <h6>Product price: ${p.price}</h6>
                          <h6>Purchased date: {moment(p.createdAt).fromNow()}</h6>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </li>
          </ul>
        </div>
    );
    }
    
    
  };

  return (
    <Layout
      className="container-fluid"
    >
      <div className="row mt-3" style={{fontFamily: "Big Shoulders Inline Display, cursive"}}>
        <div className="col-3">{userLinks()}</div>
        <div className="col-9">
          {userInfo()}
          {purchaseHistory(history)}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
