import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
const Signup = () => {
  const [credentials, setcredentials] = useState({
    name: " ",
    email: " ",
    password: "",
    location: " ",
  });
  const handlesubmit = async e => {
    //synthetic events
    e.preventDefault();
    const response = await fetch("http://localhost:3001/api/createuser", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.location,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("enter valid credentials");
    }
  };

  const onchange = event => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return (
    <>
    <div><Navbar/></div>
      <div className="container mt-5">
        <form onSubmit={handlesubmit}>
          <div className="mb-3">
            <label htmlfor="username" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={credentials.name}
              onChange={onchange}
            />
          </div>

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
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={onchange}
            />
          </div>
          <div className="mb-3">
            <label htmlfor="adress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              name="location"
              value={credentials.location}
              onChange={onchange}
            />
          </div>
          <button type="submit" className=" m-3 btn btn-primary">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-danger">
            already a user?
          </Link>
        </form>
      </div>
    </>
  );
};

export default Signup;
