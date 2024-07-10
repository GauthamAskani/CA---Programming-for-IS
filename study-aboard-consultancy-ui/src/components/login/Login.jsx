import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
// import { loginApi } from "../../api/api/apis";
// import { useAuth } from "../../api/routeauth/RouteAuth";
import { useNavigate } from "react-router-dom";
import "./login.scss";

const Login = ({ isOpen, toggle, signUp }) => {
  const [form, setForm] = useState({});
  //   const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const validate = () => {
    if (!form?.email) {
      return false;
    }
    if (!form?.password) {
      return false;
    }

    return true;
  };

  //   const handleLogin = async () => {
  //     try {
  //       const userData = await loginApi({
  //         email: form?.email,
  //         password: form?.password,
  //       });
  //       localStorage.setItem("authToken", userData.token);
  //       localStorage.setItem("user", JSON.stringify(userData));
  //       login();
  //       toast.success("Login successfully");
  //       toggle();
  //       if (userData?.role === "Admin") navigate("/admindashboard");
  //       else navigate("/interview");
  //     } catch (error) {
  //       toast.error(error?.response?.data?.error);
  //       console.error("Error fetching user data:", error?.error);
  //     }
  //   };
  const handleSubmit = () => {
    if (validate()) {
      //   handleLogin();
    }
  };

  return (
    <Modal isOpen={isOpen} fade={false} toggle={toggle}>
      <ModalHeader className="header-wrapper" toggle={toggle}>
        Sign In
      </ModalHeader>
      <ModalBody className="signin-modal-wrapper">
        <form className="add-application-wrapper">
          <div class="contact-us sign-in-wrapper">
            <div class="contact-us-content">
              <form id="contact-form" action="" method="post">
                <div class="row">
                  <div class="col-lg-12">
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
                  <div class="col-lg-12">
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
                  <div class="col-lg-12 text-end">
                    <fieldset>
                      <button
                        type="button"
                        onClick={handleSubmit}
                        id="form-submit"
                        class="orange-button"
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
