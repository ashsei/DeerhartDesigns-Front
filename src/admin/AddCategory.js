import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { createCategory } from "./apiAdmin";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // Destructure user and token from localStorage
  const { user, token } = isAuthenticated();

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    // Make request to backend to create category
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
      }
    });
  };

  const newCategoryForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group" style={{ paddingTop: "20vh", fontFamily: "Big Shoulders Inline Display, cursive", textAlign: "center", color: "white" }}>
        <h3 >Use this form to create a new product category:</h3>
        <input
          type="text"
          className="form-control"
          onChange={handleChange}
          value={name}
          autoFocus
          placeholder="New Category Name"
          required
        />
        <button className="btn btn-secondary btn-block" style={{ marginTop: '10px', overflow: 'hidden', borderRadius: '5px', fontSize: '20px'}}>Create Category</button>
      </div>
    </form>
  );

  const showSuccess = () => {
    if (success) {
      return (
        <h3 className="text-success">
          A category with the name: "{name}" was created successfully!
        </h3>
      );
    }
  };

  const showError = () => {
    if (error) {
      return (
        <h3 className="text-danger">
          Category was not created successfully, please check that you are
          adding a unique category name.
        </h3>
      );
    }
  };

  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="btn btn-danger btn-block" style={{ overflow: 'hidden', borderRadius: '5px', fontSize: '20px'}}>
        Back to Dashboard
      </Link>
    </div>
  );

  return (
    <Layout
      className="container-fluid"
    >
      <div className="row" style={{ display: 'block', overflow: 'auto', fontFamily: "Big Shoulders Inline Display, cursive", minHeight: '83vh'}}>
        <div className="col-md-8 offset-md-2">
          {showSuccess()}
          {showError()}
          {newCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
