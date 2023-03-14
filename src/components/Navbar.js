import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import Modal from "../Modal";
import Cart from "../screens/Cart";
const Navbar = () => {
const navigate=useNavigate();
const handlelogout=()=>{
 localStorage.removeItem("authToken");
 navigate("/login");
}

const[cartveiw,setcartview]=useState(false);
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-success">
        <div class="container-fluid">
          <Link class="navbar-brand fs-1" to="/">
            GoFood
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="/navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto mb-2">
              <li class="nav-item">
                <Link
                  class="nav-link  fs-3 text-white"
                  aria-current="page"
                  to="/">
                  Home
                </Link>
              </li>

              {localStorage.getItem("authToken") ? (
                <li class="nav-item">
                  <Link
                    class="nav-link  fs-3 text-white"
                    aria-current="page"
                    to="/">
                    My Orders
                  </Link>
                </li>
              ) : (
                " "
              )}
            </ul>

            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link
                  className="btn bg-white text-success  mx-1 fs-4"
                  to="/login">
                  Login
                </Link>

                <Link
                  className="btn bg-white text-success  mx-1 fs-4"
                  to="/signup">
                  Signup
                </Link>
              </div>
            ) : (
              <>
                <div className="btn bg-white text-success  mx-1 fs-4" onClick={()=>{setcartview(true)}}>
                 My cart{" "}
                 <Badge pill bg="danger">2</Badge>
                </div>

                {cartveiw?<Modal onClose={()=>setcartview(false)}><Cart/></Modal>:null}
                <div className="btn bg-white text-danger  mx-1 fs-4" onClick={handlelogout}>
                  Logout
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
