import React from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";

const AdminDashboard = () => {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();
  
  const adminLinks = () => {
    return (
      <div className="card" style={{ fontFamily: "Big Shoulders Inline Display, cursive", color: "#373737" }}>
        <h3 className="card-header">Admin Links</h3>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/create/category">
              Create Category
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/create/product">
              Create Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/orders">
              Manage Orders
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/products">
              Manage Products
            </Link>
          </li>
        </ul>
      </div>
    );
  };
  
  const adminInfo = () => {
    return (
      <div className="card mb-5" style={{ fontFamily: "Big Shoulders Inline Display, cursive" }} >
        <h3 className="card-header">Admin Information</h3>
        <ul className="list-group">
          <li className="list-group-item">Name: {name}</li>
          <li className="list-group-item">Email: {email}</li>
          <li className="list-group-item">Account Type: 
            {role === 1 ? " Admin" : " Registered User"}
          </li>
        </ul>
      </div>
    );
  };
  
  return (
    <Layout
      title="Dashboard"
      description={`Welcome to your DeerhartDesigns dashboard, ${name}!`}
      className="container-fluid"
    >
      <div className="row" style={{minHeight: '85vh'}}>
        <div className="col-3">{adminLinks()}</div>
        <div className="col-9">{adminInfo()}</div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
