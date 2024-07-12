import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { createCourse, editCourse } from "../../apis/universaty";
import {
  createMediacalInsurance,
  createStudentLoan,
  editInsurance,
  editLoan,
} from "../../apis/studentapi";
import { useAuth } from "../../utilities/AuthProvider";
import moment from "moment";

const inIt = {
  university_name: "",
  course_title: "",
  course_start_date: "",
  loan_type: "",
  loan_amount: "",
  notes: "",
};

const SLmodal = ({
  isOpen,
  toggle,
  activeItem,
  setActiveItem,
  handleGetMedicalInsurance,
}) => {
  const [form, setForm] = useState(inIt);
  const { auth } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const validate = () => {
    if (!form?.course_title) {
      toast.error("Please enter a valid course_title.");
      return false;
    }

    if (!form?.university_name) {
      toast.error("Please enter your university_name.");
      return false;
    }
    if (!form?.loan_amount) {
      toast.error("Please enter a valid loan_amount.");
      return false;
    }
    if (!form?.loan_type) {
      toast.error("Please enter a valid loan_type.");
      return false;
    }
    if (!form?.course_start_date) {
      toast.error("Please select your course_start_date.");
      return false;
    }

    if (!form?.notes) {
      toast.error("Please enter your student_notes.");
      return false;
    }

    return true;
  };

  useEffect(() => {
    if (activeItem) {
      const {
        university_name,
        course_title,
        course_start_date,
        loan_type,
        loan_amount,
        notes,
        ...rest
      } = activeItem;

      const data = {
        course_title: activeItem.course_title || "",
        loan_type: activeItem.loan_type || "",
        notes: activeItem.notes || "",
        university_name: activeItem.university_name || "",
        loan_amount: activeItem.loan_amount || "",
        course_start_date: moment(activeItem?.cover_start_date).format(
          "YYYY-MM-DD"
        ),
      };

      setForm(data);
    }
  }, [activeItem]);

  const handleCreateMedicalInsurance = async () => {
    try {
      await createStudentLoan({
        ...form,
        course_start_date: moment(form.course_start_date).format("MM/DD/YYYY"),
        student_id: auth?.user?.student_id,
        status: "Applied",
      });
      setForm(inIt);
      toggle();
      handleGetMedicalInsurance();
      toast.success("Successfully course created");
    } catch (e) {
      console.log(e);
    }
  };

  const handleEditInsurance = async () => {
    try {
      await editLoan(
        {
          ...form,
          course_start_date: moment(form.course_start_date).format(
            "MM/DD/YYYY"
          ),
          student_id: auth?.user?.student_id,
        },
        activeItem?.loan_request_id
      );
      setForm(inIt);
      setActiveItem(null);
      toast.success("Saved Successfully");
      toggle();
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = () => {
    console.log("submit");
    if (validate()) {
      if (activeItem) handleEditInsurance();
      else handleCreateMedicalInsurance();
    }
  };
  return (
    <div>
      <Modal isOpen={isOpen} fade={false} toggle={toggle}>
        <ModalHeader className="header-wrapper" toggle={toggle}>
          Medical Insurance
        </ModalHeader>
        <ModalBody className="signin-modal-wrapper">
          <div className="add-application-wrapper">
            <div className="contact-us sign-in-wrapper">
              <div className="contact-us-content">
                <form id="contact-form">
                  <div className="row">
                    <div className="col-lg-12">
                      <fieldset>
                        <label style={{ fontSize: "14px" }}>
                          University Name
                        </label>
                        <input
                          type="text"
                          name="university_name"
                          id="university_name"
                          value={form.university_name}
                          onChange={handleChange}
                          placeholder="Enter university_name..."
                          required
                        />
                      </fieldset>
                    </div>

                    <div className="col-lg-12">
                      <fieldset>
                        <label style={{ fontSize: "14px" }}>Course Title</label>
                        <input
                          type="text"
                          name="course_title"
                          id="course_title"
                          value={form.course_title}
                          onChange={handleChange}
                          placeholder="Enter course_title..."
                          required
                        />
                      </fieldset>
                    </div>

                    <div className="col-lg-12">
                      <fieldset>
                        <label style={{ fontSize: "14px" }}>
                          Course Start Date
                        </label>
                        <input
                          type="date"
                          name="course_start_date"
                          id="course_start_date"
                          value={form.course_start_date}
                          onChange={handleChange}
                          placeholder="Enter course_start_date..."
                          required
                        />
                      </fieldset>
                    </div>

                    <div className="col-lg-12">
                      <fieldset>
                        <label style={{ fontSize: "14px" }}>Loan Amount</label>
                        <input
                          type="text"
                          name="loan_amount"
                          id="loan_amount"
                          value={form.loan_amount}
                          onChange={handleChange}
                          placeholder="Enter loan_amount..."
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <label style={{ fontSize: "14px" }}>Loan Type</label>
                        <select
                          name="loan_type"
                          className="common-input"
                          value={form.loan_type}
                          onChange={handleChange}
                        >
                          <option value="" disabled>
                            select
                          </option>
                          <option value="Collateral">Collateral</option>
                          <option value="Non-Collateral">Non-Collateral</option>
                        </select>
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <label style={{ fontSize: "14px" }}>Notes</label>
                        <input
                          type="text"
                          name="notes"
                          id="notes"
                          value={form.notes}
                          onChange={handleChange}
                          placeholder="Enter notes..."
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
                          Save
                        </button>
                      </fieldset>
                    </div>
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

export default SLmodal;
