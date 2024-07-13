import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { toast } from "react-toastify";
import { forgotPassword } from "../../apis/componentsApis";

const ForgotPassword = ({ isOpen, toggle }) => {
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handlePassword = async () => {
    try {
      await forgotPassword({
        student_email: form?.email,
        new_password: form?.password,
        passcode: form?.passcode,
      });

      toast.success("Password updated successfully");
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
    if (!form?.password) {
      toast.error("Please enter your New password.");
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
      handlePassword();
    }
  };

  return (
    <Modal isOpen={isOpen} fade={false} toggle={toggle}>
      <ModalHeader className="header-wrapper" toggle={toggle}>
        Forgot Password
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
                      <label style={{ fontSize: "14px" }}>Passcode</label>
                      <input
                        type="password"
                        name="passcode"
                        id="passcode"
                        value={form?.passcode || ""}
                        onChange={handleChange}
                        style={{ marginBottom: "0px" }}
                        placeholder="Your Passcode..."
                        required
                      />
                    </fieldset>
                  </div>
                  <div className="col-lg-12">
                    <fieldset>
                      <label style={{ fontSize: "14px" }}>New Password</label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        value={form?.password || ""}
                        onChange={handleChange}
                        placeholder="Your New Password..."
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

export default ForgotPassword;
