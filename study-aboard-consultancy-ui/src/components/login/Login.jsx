import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import { toast } from "react-toastify";
import { loginApi } from "../../apis/componentsApis";
import { useAuth } from "../../utilities/AuthProvider";
import ForgotPasscode from "../forgotpasscode/ForgotPasscode";
import ForgotPassword from "../forgotpassword/ForgotPassword";

const Login = ({ isOpen, toggle, signUp }) => {
  const [form, setForm] = useState({});
  const [passcodeModal, setPasscodeModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    try {
      const userData = await loginApi({
        student_email: form?.email,
        student_password: form?.password,
        passcode: form?.passcode,
      });
      localStorage.setItem("authToken", userData.token);
      localStorage.setItem("user", JSON.stringify(userData));
      login(userData.token, userData);
      toast.success("Login successfully");
      toggle();
      if (userData?.role === "Admin") navigate("/admindashboard");
      else navigate("/studentdashboard");
    } catch (error) {
      console.error("Error fetching user data:", error?.error);
    }
  };

  const validate = () => {
    if (!form?.email) {
      toast.error("Please enter your email.");
      return false;
    }
    if (!form?.password) {
      toast.error("Please enter your password.");
      return false;
    }
    if (!form?.passcode) {
      toast.error("Please enter your passcode.");
      return false;
    }
    if (!/^\d{6}$/.test(form.passcode)) {
      toast.error("Please enter correct Passcode ");
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (validate()) {
      console.log("Form is valid");
      handleLogin();
    }
  };

  return (
    <Modal isOpen={isOpen} fade={false} toggle={toggle}>
      <ModalHeader className="header-wrapper" toggle={toggle}>
        Sign In
      </ModalHeader>
      <ModalBody className="signin-modal-wrapper">
        <form className="add-application-wrapper">
          <div className="contact-us sign-in-wrapper">
            <div className="contact-us-content">
              <form id="contact-form">
                <div className="row">
                  <div className="col-lg-12">
                    <fieldset style={{ marginBottom: "40px" }}>
                      <label style={{ fontSize: "14px" }}>Email</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={form?.email || ""}
                        onChange={handleChange}
                        pattern="[^ @]*@[^ @]*"
                        placeholder="Your E-mail..."
                        required
                        style={{ marginBottom: "0px" }}
                      />
                    </fieldset>
                  </div>
                  <div className="col-lg-12">
                    <fieldset style={{ marginBottom: "30px" }}>
                      <label style={{ fontSize: "14px" }}>Password</label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        style={{ marginBottom: "0px" }}
                        value={form?.password || ""}
                        onChange={handleChange}
                        placeholder="Your Password..."
                        required
                      />
                      <span
                        style={{ fontSize: "12px", paddingTop: "5px" }}
                        className="d-flex justify-content-end"
                        onClick={() => {
                          setPasswordModal(true);
                        }}
                      >
                        Forgot password...!
                      </span>
                    </fieldset>
                  </div>
                  <div className="col-lg-12">
                    <fieldset style={{ marginBottom: "30px" }}>
                      <label style={{ fontSize: "14px" }}>Passcode</label>
                      <input
                        type="password"
                        name="passcode"
                        id="passcode"
                        value={form?.passcode || ""}
                        onChange={handleChange}
                        style={{ marginBottom: "0px" }}
                        placeholder="Your Passcode (Please check your email)..."
                        required
                      />
                      <span
                        style={{ fontSize: "12px", paddingTop: "5px" }}
                        className="d-flex justify-content-end"
                        onClick={() => {
                          setPasscodeModal(true);
                        }}
                      >
                        Forgot passcode...!
                      </span>
                    </fieldset>
                  </div>
                  <div className="col-lg-12 text-end">
                    <fieldset>
                      <button
                        type="button"
                        onClick={handleSubmit}
                        id="form-submit"
                        className="orange-button"
                      >
                        Sign In
                      </button>
                    </fieldset>
                  </div>
                  <p className="toggle-signup-color">
                    Not have an account? <a onClick={signUp}>Sign Up</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </form>
      </ModalBody>
      {passcodeModal && (
        <ForgotPasscode
          isOpen={passcodeModal}
          toggle={() => {
            setPasscodeModal(false);
          }}
        />
      )}
      {passwordModal && (
        <ForgotPassword
          isOpen={passwordModal}
          toggle={() => {
            setPasswordModal(false);
          }}
        />
      )}
    </Modal>
  );
};

export default Login;
