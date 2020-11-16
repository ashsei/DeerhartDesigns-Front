import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { signin, authenticate, isAuthenticated } from "../auth";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  const { email, password, error, loading, redirectToReferrer } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({ ...values, redirectToReferrer: true, loading: false });
        });
      }
    });
  };

  const signUpForm = () => (
    <form style={{height: '60vh', marginTop: '22vh'}}>
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
      <button onClick={clickSubmit} className="btn btn-secondary btn-block">
        Submit
      </button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none", marginBottom: '-150px', marginTop: '80px'  }}
    >
      {error}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div
        className="alert alert-info"
        style={{ display: loading ? "" : "none" }}
      >
        <h2>Loading...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  return (
    <Layout
      className="container m-20 col-md-8 offset-md-2"
    >
      {showLoading()}
      {showError()}
      {signUpForm()}
      {redirectUser()}
    </Layout>
  );
};

export default Signin;
