import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import { toast } from "react-toastify";
import { loginApi } from "../../apis/componentsApis";

const Login = ({ isOpen, toggle, signUp }) => {
  const [form, setForm] = useState({});
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
        email: form?.email,
        password: form?.password,
      });
      localStorage.setItem("authToken", userData.token);
      localStorage.setItem("user", JSON.stringify(userData));
      // login();
      toast.success("Login successfully");
      toggle();
      if (userData?.role === "Admin") navigate("/admindashboard");
      else navigate("/interview");
    } catch (error) {
      toast.error(error?.response?.data?.error);
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
      // handleLogin(); // Uncomment to call the handleLogin function
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
                    <fieldset>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={form?.email || ""}
                        onChange={handleChange}
                        pattern="[^ @]*@[^ @]*"
                        placeholder="Your E-mail..."
                        required
                      />
                    </fieldset>
                  </div>
                  <div className="col-lg-12">
                    <fieldset>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        value={form?.password || ""}
                        onChange={handleChange}
                        placeholder="Your Password..."
                        required
                      />
                    </fieldset>
                  </div>
                  <div className="col-lg-12">
                    <fieldset>
                      <input
                        type="password"
                        name="passcode"
                        id="passcode"
                        value={form?.passcode || ""}
                        onChange={handleChange}
                        placeholder="Your Passcode..."
                        required
                      />
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
    </Modal>
  );
};

export default Login;
