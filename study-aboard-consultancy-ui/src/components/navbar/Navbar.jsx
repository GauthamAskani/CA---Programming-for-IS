import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.scss";
import Login from "../login/Login";

const Navbar = () => {
  const [login, setLogin] = useState(false);
  return (
    <nav className="navbar navbar-expand-lg navbar-light  custom-navbar">
      <div className="container">
        <a className="navbar-brand" href="/">
          StudyAbroad
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link ms-3" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link ms-3" href="/">
                Why Us
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link ms-3" href="/">
                Feature
              </a>
            </li>
          </ul>
          <button
            type="button"
            onClick={() => {
              setLogin(true);
            }}
            className="btn btn-outline-dark ms-3"
          >
            Log in
          </button>
          <button className="btn btn-dark ms-2">Sign up</button>
        </div>
      </div>
      {login && (
        <Login
          isOpen={login}
          toggle={() => {
            setLogin(false);
          }}
          signUp={() => {}}
        />
      )}
    </nav>
  );
};

export default Navbar;
