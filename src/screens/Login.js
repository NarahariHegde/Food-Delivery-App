import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
const { useNavigate } = require("react-router-dom");
const Login = () => {
  let navigate = useNavigate();
  const [credentials, setcredentials] = useState({
    email: " ",
    password: "",
  });
  const handlesubmit = async e => {
    //synthetic events
    e.preventDefault();
    const response = await fetch("http://localhost:3001/api/loginuser", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("enter valid credentials");
    }
    if (json.success) {
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }
  };

  const onchange = event => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="container mt-5">
        <form onSubmit={handlesubmit}>
          <div className="mb-3">
            <label htmlfor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={credentials.email}
              onChange={onchange}
            />
          </div>
          <div className="mb-3">
            <label htmlfor="exampleInputPassword1" className="form-label">
              password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={onchange}
            />
          </div>
          <button type="submit" className=" m-3 btn btn-primary">
            Submit
          </button>
          <Link to="/signup" className="m-3 btn btn-danger">
            I'm a new user
          </Link>
        </form>
      </div>
    </>
  );
};
export default Login;
