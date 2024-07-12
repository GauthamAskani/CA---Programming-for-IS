import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./Navbar.scss";
import Login from "../login/Login";
import SignUp from "../signup/SignUp";
import { useAuth } from "../../utilities/AuthProvider";
import { Link } from "react-router-dom";
import { Avatar, Menu, MenuItem } from "@mui/material";
import axiosInstance from "../../utilities/AxiosInstance";
import { ThreeCircles } from "react-loader-spinner";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  FaUniversity,
  FaRegHospital,
  FaMoneyCheckAlt,
  FaFileAlt,
  FaBroadcastTower,
  FaClipboardList,
  FaUserGraduate,
} from "react-icons/fa";
import Profile from "../profile/Profile";

const Navbar = () => {
  const [login, setLogin] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [profile, setProfile] = useState(false);
  const { auth, logout } = useAuth();

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
    setProfile(true);
    handleMenuClose();
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      function (config) {
        setLoading(true);
        return config;
      },
      function (error) {
        setLoading(false);
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      function (response) {
        setLoading(false);
        return response;
      },
      function (error) {
        setLoading(false);
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return (
    <>
      {loading && (
        <div className="loader-wrapper">
          <ThreeCircles
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            color="#0f363f"
          />
        </div>
      )}
      <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
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
            {!auth?.user?.role && (
              <>
                <ul className="navbar-nav ms-auto">
                  {/* <li className="nav-item">
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
                  </li> */}
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
              </>
            )}
            {auth?.user?.role === "Admin" && (
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link ms-1" to="/admindashboard">
                    <FaUniversity className="mb-1" /> Universities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link ms-1" to="/student-list">
                    <FaUserGraduate className="mb-1" /> Students
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link ms-1" to="/student-application">
                    <FaClipboardList className="mb-1" /> Applications
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link ms-1" to="/documents">
                    <FaFileAlt className="mb-1" /> Documents
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link ms-1" to="/medical-insurance">
                    <FaRegHospital className="mb-1" /> Medical Insurances
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link ms-1" to="/loans">
                    <FaMoneyCheckAlt className="mb-1" /> Loans
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link ms-1" to="/broadcast">
                    <FaBroadcastTower className="mb-1" /> Broadcast
                  </Link>
                </li>
                <li>
                  <Avatar
                    onClick={handleMenuOpen}
                    alt="User Avatar"
                    sx={{ width: 34, height: 34, cursor: "pointer" }}
                  />

                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleProfile}>
                      <AccountCircleIcon />
                      <span className="p-1">Profile</span>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <LogoutIcon />
                      <span className="p-1">Logout</span>
                    </MenuItem>
                  </Menu>
                </li>
              </ul>
            )}

            {auth?.user?.role === "Student" && (
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link
                    className="nav-link ms-1 d-flex align-items-center"
                    to="/studentdashboard"
                  >
                    <FaUniversity className="mb-1" /> Universities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link ms-1" to="/applications-list">
                    <FaClipboardList className="mb-1" /> Applications
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link ms-1" to="/document-upload">
                    <FaFileAlt className="mb-1" /> Documents
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link ms-1" to="/student-medicallist">
                    <FaRegHospital className="mb-1" /> Medical Insurances
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link ms-1" to="/student-loan">
                    <FaMoneyCheckAlt className="mb-1" /> Loan
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link ms-1" to="/student-broadcast">
                    <FaBroadcastTower className="mb-1" /> Broadcast
                  </Link>
                </li>
                <li>
                  <Avatar
                    onClick={handleMenuOpen}
                    alt="User Avatar"
                    sx={{ width: 34, height: 34, cursor: "pointer" }}
                  />

                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleProfile}>
                      <AccountCircleIcon /> <span className="p-1">Profile</span>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <LogoutIcon />
                      <span className="p-1">Logout</span>
                    </MenuItem>
                  </Menu>
                </li>
              </ul>
            )}
          </div>
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
        {profile && (
          <Profile
            isOpen={profile}
            toggle={() => {
              setProfile(false);
            }}
          />
        )}
      </nav>
    </>
  );
};

export default Navbar;
