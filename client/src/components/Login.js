import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Login = props => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post(`/login`, credentials)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        props.history.push("/bubbles");
      })
      .catch(err => {
        console.log(err);
      });
    setCredentials({ username: "", password: "" });
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          value={credentials.username}
          onChange={handleChange}
          type="text"
          name="username"
        />
        <label htmlFor="password">Password</label>
        <input
          value={credentials.password}
          onChange={handleChange}
          type="password"
          name="password"
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
