import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.scss";
import Login from "../login/Login";
import SignUp from "../signup/SignUp";
import { useAuth } from "../../utilities/AuthProvider";
import { Link } from "react-router-dom";
import { Avatar, Menu, MenuItem } from "@mui/material";

const Navbar = () => {
  const [login, setLogin] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const { auth, logout } = useAuth();

  console.log("auth->", auth?.user);

  const handleSignUp = () => {
    setLogin(false);
    setSignUp(true);
  };

  const handleSignIn = () => {
    setLogin(true);
    setSignUp(false);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    // Handle profile click
    console.log("Profile clicked");
    handleMenuClose();
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    logout();
    handleMenuClose();
  };

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
        {!auth?.user?.role && (
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
            <button
              type="button"
              onClick={() => {
                setSignUp(true);
              }}
              className="btn btn-dark ms-2"
            >
              Sign up
            </button>
          </div>
        )}
        {auth?.user?.role === "Admin" && (
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link ms-3" to="/admindashboard">
                  Universaties
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link ms-3" to="/student-list">
                  Students
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link ms-3" to="/student-application">
                  Applications
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link ms-3" to="/documents">
                  Documents
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link ms-3" to="/medical-insurance">
                  Medical Insurances
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link ms-3" to="/loans">
                  Loans
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link ms-3" to="/broadcast">
                  Broadcast
                </Link>
              </li>
              <li>
                <Avatar
                  onClick={handleMenuOpen}
                  alt="User Avatar"
                  sx={{ width: 34, height: 34 }}
                />

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleProfile}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </li>
            </ul>
          </div>
        )}

        {auth?.user?.role === "Student" && (
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link ms-3" to="/studentdashboard">
                  Universaties
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link ms-3" to="/applications-list">
                  Applications
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link ms-3" to="/document-upload">
                  Documents
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link ms-3" to="/student-medicallist">
                  Medical Insurances
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link ms-3" to="/student-loan">
                  Loan
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link ms-3" to="/student-broadcast">
                  Broadcast
                </Link>
              </li>
              <li>
                <Avatar
                  onClick={handleMenuOpen}
                  alt="User Avatar"
                  sx={{ width: 34, height: 34 }}
                />

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleProfile}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </li>
            </ul>
          </div>
        )}
      </div>
      {login && (
        <Login
          isOpen={login}
          toggle={() => {
            setLogin(false);
          }}
          signUp={handleSignUp}
        />
      )}
      {signUp && (
        <SignUp
          isOpen={signUp}
          toggle={() => {
            setSignUp(false);
          }}
          signIn={handleSignIn}
        />
      )}
    </nav>
  );
};

export default Navbar;
