import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { createProduct, getCategories } from "./apiAdmin";

const AddProduct = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    height: "",
    length: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: "",
  });

  const { user, token } = isAuthenticated();
  const {
    name,
    description,
    price,
    categories,
    category,
    height,
    length,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values;

  // Loads categories and sets form data

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          photo: "",
          price: "",
          quantity: "",
          height: "",
          length: "",
          loading: false,
          createdProduct: data.name,
        });
      }
    });
  };

  const newPostForm = () => (
    <form className="mb-3 mt-3" onSubmit={clickSubmit} style={{color: 'white', fontFamily: 'Big Shoulders Inline Display, cursive', fontSize: '20px', marginTop: '20px', marginBottom: '20px'}}>
      <h4>Product Photo</h4>
      <div className="form-group">
        <label className="btn btn-secondary btn-block">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image/*"
            style={{}}
          />
        </label>
      </div>
      <div className="form-group">
        <label>Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
          required
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          onChange={handleChange("description")}
          className="form-control"
          value={description}
          required
        />
      </div>
      <div className="form-group">
        <label>Price</label>
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          value={price}
          required
        />
      </div>
      <div className="form-group">
        <label>Category</label>
        <select
          onChange={handleChange("category")}
          className="form-control"
          value={category}
          required
        >
          <option>Select a Category</option>
          {categories &&
            categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <label>Height</label>
        <input
          onChange={handleChange("height")}
          type="number"
          className="form-control"
          value={height}
          required
        />
      </div>
      <div className="form-group">
        <label>Length</label>
        <input
          onChange={handleChange("length")}
          type="number"
          className="form-control"
          value={length}
          required
        />
      </div>
      <div className="form-group">
        <label>Quantity</label>
        <input
          onChange={handleChange("quantity")}
          type="number"
          className="form-control"
          value={quantity}
          required
        />
      </div>
      <button className="btn btn-success btn-block" style={{marginTop: '20px', marginBottom: '20px'}}>Create Product</button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h2>{`${createdProduct}`} has been successfully created!</h2>
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-success">
        <h2>Loading...</h2>
      </div>
    );

  return (
    <Layout
      className="container-fluid"
    >
      <div className="row" style={{ minHeight: '100vh', color: 'white', fontFamily: "Big Shoulders Inline Display, cursive"}}>
        <div className="col-md-8 offset-md-2 mt-3">
          <h1 style={{textAlign: 'center', textDecoration: 'underline' }}>Create a New Product</h1>
          {showError()}
          {showLoading()}
          {showSuccess()}
          {newPostForm()}
          <Link to="/admin/dashboard" className="btn btn-danger btn-block mb-5" style={{ overflow: 'hidden', borderRadius: '5px', fontSize: '20px'}}>
            Back to Dashboard
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default AddProduct;
