import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { useNavigate } from "react-router-dom";
// import "./login.scss";
import { toast } from "react-toastify";
import { forgotPasscode, loginApi } from "../../apis/componentsApis";
import { useAuth } from "../../utilities/AuthProvider";

const ForgotPasscode = ({ isOpen, toggle }) => {
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handlepasscode = async () => {
    try {
      await forgotPasscode({
        student_email: form?.email,
      });
      toast.success("New passcode sent to your email");
      toggle();
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

    return true;
  };

  const handleSubmit = () => {
    if (validate()) {
      console.log("Form is valid");
      handlepasscode();
    }
  };

  return (
    <Modal isOpen={isOpen} fade={false} toggle={toggle}>
      <ModalHeader className="header-wrapper" toggle={toggle}>
        Forgot Passcode
      </ModalHeader>
      <ModalBody className="signin-modal-wrapper">
        <form className="add-application-wrapper">
          <div className="contact-us sign-in-wrapper">
            <div className="contact-us-content">
              <form id="contact-form">
                <div className="row">
                  <div className="col-lg-12">
                    <fieldset style={{ marginBottom: "40px" }}>
                      <span style={{ fontSize: "12px" }}>
                        We are sending passcode to your email address
                      </span>
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

                  <div className="col-lg-12 text-end">
                    <fieldset>
                      <button
                        type="button"
                        onClick={handleSubmit}
                        id="form-submit"
                        className="orange-button"
                      >
                        Send
                      </button>
                    </fieldset>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default ForgotPasscode;
