import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { signup } from "../auth";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, success, error } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          success: true,
        });
      }
    });
  };

  const signUpForm = () => (
    <form style={{ minHeight: '61vh', marginTop: '22vh' }}>
      <h2 style={{textAlign: 'center', color: 'white'}}>Sign Up for a Deerhart Designs Account</h2>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
          placeholder="Name"
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("email")}
          type="text"
          className="form-control"
          value={email}
          placeholder="Email Address"
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("password")}
          type="password"
          className="form-control"
          value={password}
          placeholder="Password"
        />
        {/* !!! Add option for user to see password !!!  */}
      </div>
      <button onClick={clickSubmit} className="btn btn-success btn-block">
        Submit
      </button>
      <Link to="/signin" className="btn btn-secondary btn-block">Already have an account? Click here to Sign In!</Link>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none", marginBottom: '-150px', marginTop: '80px' }}
    >
      {error}
    </div>
  );

  // MAKE SO THIS AUTO SIGNS USER IN
  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      Account created successfully, welcome to the Deerhart Family! Please{" "}
      <Link to="/signin">sign in here.</Link>
    </div>
  );

  return (
    <Layout
      className="container col-md-8"
    >
      {showSuccess()}
      {showError()}
      {signUpForm()}
    </Layout>
  );
};

export default Signup;
