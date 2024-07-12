import moment from "moment";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { createAccount } from "../../apis/componentsApis";

const SignUp = ({ isOpen, toggle, signIn }) => {
  const [form, setForm] = useState({
    userName: "",
    familyName: "",
    email: "",
    gender: "",
    phoneNumber: "",
    dateOfBirth: "",
    country: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const validate = () => {
    if (!form?.userName) {
      toast.error("Please enter your name.");
      return false;
    }
    if (!form?.familyName) {
      toast.error("Please enter your surname.");
      return false;
    }
    if (!form?.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form?.email)) {
      toast.error("Please enter a valid email.");
      return false;
    }
    if (!form?.gender) {
      toast.error("Please select your gender.");
      return false;
    }
    if (!form?.phoneNumber || !/^\d+$/.test(form?.phoneNumber)) {
      toast.error("Please enter a valid phone number.");
      return false;
    }
    if (!form?.country) {
      toast.error("Please enter your country.");
      return false;
    }
    if (!form?.password) {
      toast.error("Please enter your password.");
      return false;
    }
    if (!form?.confirmPassword || form?.confirmPassword !== form?.password) {
      toast.error("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleSignUpAccount = async () => {
    try {
      const payload = {
        student_first_name: form?.userName || "",
        student_family_name: form?.familyName || "",
        student_dob: moment(form?.dateOfBirth).format("MM-DD-YYYY"),
        student_gender: form?.gender || "",
        student_country_origin: form?.country || "",
        student_phone_number: form?.phoneNumber || "",
        student_email: form?.email || "",
        student_password: form?.password || "",
        student_status: "false",
        role: "Student",
        student_document_status: "false",
      };
      await createAccount(payload);
      setForm({
        userName: "",
        familyName: "",
        email: "",
        gender: "",
        phoneNumber: "",
        country: "",
        password: "",
        dateOfBirth: "",
        confirmPassword: "",
      });
      toast.success("Successfully account created");
      signIn();
    } catch (e) {
      console.log("error->", e);
    }
  };

  const handleSubmit = () => {
    // e.preventDefault();
    console.log("submit");
    if (validate()) {
      handleSignUpAccount();

      console.log("Form is valid");
      // createAccount(); // Uncomment to call the createAccount function
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} fade={false} toggle={toggle}>
        <ModalHeader className="header-wrapper" toggle={toggle}>
          Sign Up
        </ModalHeader>
        <ModalBody className="signin-modal-wrapper">
          <div className="add-application-wrapper">
            <div className="contact-us sign-in-wrapper">
              <div className="contact-us-content">
                <form id="contact-form">
                  <div className="row">
                    <div className="col-lg-12">
                      <fieldset>
                        <label style={{ fontSize: "14px" }}>Name</label>
                        <input
                          type="text"
                          name="userName"
                          id="name"
                          value={form.userName}
                          onChange={handleChange}
                          placeholder="Your Name..."
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <label style={{ fontSize: "14px" }}>Surname</label>
                        <input
                          type="text"
                          name="familyName"
                          id="familyName"
                          value={form.familyName}
                          onChange={handleChange}
                          placeholder="Your Surname..."
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <label style={{ fontSize: "14px" }}>Email</label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="Your E-mail..."
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <label style={{ fontSize: "14px" }}>Gender</label>
                        <select
                          name="gender"
                          className="common-input"
                          value={form.gender}
                          onChange={handleChange}
                        >
                          <option value="" disabled>
                            Select Gender
                          </option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <label style={{ fontSize: "14px" }}>Phone Number</label>
                        <input
                          type="text"
                          name="phoneNumber"
                          id="phoneNumber"
                          value={form.phoneNumber}
                          onChange={handleChange}
                          placeholder="Your Phone Number..."
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <label style={{ fontSize: "14px" }}>
                          Date Of Birth
                        </label>
                        <input
                          type="date"
                          name="dateOfBirth"
                          id="dateOfBirth"
                          value={form.dateOfBirth}
                          onChange={handleChange}
                          placeholder="Your Phone Number..."
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <label style={{ fontSize: "14px" }}>Country</label>
                        <input
                          type="text"
                          name="country"
                          id="country"
                          value={form.country}
                          onChange={handleChange}
                          placeholder="Your Country..."
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <label style={{ fontSize: "14px" }}>Password</label>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          value={form.password}
                          onChange={handleChange}
                          placeholder="Your Password..."
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <label style={{ fontSize: "14px" }}>
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          name="confirmPassword"
                          id="confirmPassword"
                          value={form.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm Your Password..."
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
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default SignUp;
