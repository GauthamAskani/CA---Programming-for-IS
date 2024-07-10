import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

const SignUp = ({ isOpen, toggle, signIn }) => {
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  //   const createAccount = async () => {
  //     try {
  //       await postSignUp(form);
  //       setForm({
  //         userName: "",
  //         email: "",
  //         password: "",
  //         confirmPassword: "",
  //       });
  //       toast.success("Successfully account created");
  //       signIn();
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };

  const validate = () => {
    if (!form?.userName) {
      return false;
    }
    if (!form?.email) {
      return false;
    }
    if (!form?.password) {
      return false;
    }
    if (!form?.confirmPassword || form?.confirmPassword !== form?.password) {
      return false;
    }

    return true;
  };
  const handleSubmit = () => {
    console.log("vaa->", validate());
    if (validate()) {
      //   createAccount();
    }
  };

  return (
    <Modal isOpen={isOpen} fade={false} toggle={toggle}>
      <ModalHeader className="header-wrapper" toggle={toggle}>
        Sign Up
      </ModalHeader>
      <ModalBody className="signin-modal-wrapper">
        <form className="add-application-wrapper">
          <div class="contact-us sign-in-wrapper">
            <div class="contact-us-content">
              <form id="contact-form">
                <div class="row">
                  <div class="col-lg-12">
                    <fieldset>
                      <input
                        type="name"
                        name="userName"
                        id="name"
                        value={form?.userName || ""}
                        onChange={handleChange}
                        placeholder="Your Name..."
                        required
                      />
                    </fieldset>
                  </div>
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
                  <div class="col-lg-12">
                    <fieldset>
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={form?.confirmPassword || ""}
                        onChange={handleChange}
                        placeholder="Your Confirm Password..."
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
                        Sign Up
                      </button>
                    </fieldset>
                  </div>
                  <p className="toggle-signup-color">
                    Already have an account? <a onClick={signIn}>Sign In</a>
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

export default SignUp;
