import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { createCourse, editCourse } from "../../apis/universaty";
import { createMediacalInsurance, editInsurance } from "../../apis/studentapi";
import { useAuth } from "../../utilities/AuthProvider";
import moment from "moment";

const inIt = {
  cover_start_date: "",
  cover_end_date: "",
  destination_country: "",
  university_name: "",
  course_title: "",
  course_cost: "",
  course_start_date: "",
  course_end_date: "",
  student_notes: "",
};
const CMImodal = ({ isOpen, toggle, activeItem, setActiveItem }) => {
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
    if (!form?.cover_start_date) {
      toast.error("cover_start_date is required");
      return false;
    }
    if (!form?.cover_end_date) {
      toast.error("Please enter your cover_end_date.");
      return false;
    }
    if (!form?.course_title) {
      toast.error("Please enter a valid course_title.");
      return false;
    }
    if (!form?.destination_country) {
      toast.error("Please select your destination_country.");
      return false;
    }

    if (!form?.university_name) {
      toast.error("Please enter your university_name.");
      return false;
    }
    if (!form?.course_cost) {
      toast.error("Please enter a valid course_cost.");
      return false;
    }
    if (!form?.course_start_date) {
      toast.error("Please select your course_start_date.");
      return false;
    }

    if (!form?.course_end_date) {
      toast.error("Please enter your course_end_date.");
      return false;
    }
    if (!form?.student_notes) {
      toast.error("Please enter your student_notes.");
      return false;
    }

    return true;
  };

  useEffect(() => {
    if (activeItem) {
      const {
        course_id,
        course_created_at,
        course_deleted_at,
        course_updated_atcourse_deleted_at,
        ...rest
      } = activeItem;

      const data = {
        cover_start_date: moment(activeItem?.cover_start_date).format(
          "YYYY-MM-DD"
        ),
        cover_end_date: moment(activeItem?.cover_start_date).format(
          "YYYY-MM-DD"
        ),
        destination_country: activeItem.destination_country,
        university_name: activeItem.university_name || "",
        course_title: activeItem.course_title || "",
        course_cost: activeItem.course_cost || "",
        course_start_date: moment(activeItem?.cover_start_date).format(
          "YYYY-MM-DD"
        ),
        course_end_date: moment(activeItem?.cover_start_date).format(
          "YYYY-MM-DD"
        ),
        student_notes: activeItem.student_notes || "",
      };

      setForm(data);
    }
  }, [activeItem]);

  const handleCreateMedicalInsurance = async () => {
    try {
      await createMediacalInsurance({
        ...form,
        cover_start_date: moment(form.cover_start_date).format("MM/DD/YYYY"),
        cover_end_date: moment(form.cover_end_date).format("MM/DD/YYYY"),
        course_start_date: moment(form.course_start_date).format("MM/DD/YYYY"),
        course_end_date: moment(form.course_end_date).format("MM/DD/YYYY"),
        student_id: auth?.user?.student_id,
        status: "Applied",
      });
      setForm(inIt);
      toggle();
      toast.success("Successfully course created");
    } catch (e) {
      console.log(e);
    }
  };

  const handleEditInsurance = async () => {
    try {
      await editInsurance(
        {
          ...form,
          cover_start_date: moment(form.cover_start_date).format("MM/DD/YYYY"),
          cover_end_date: moment(form.cover_end_date).format("MM/DD/YYYY"),
          course_start_date: moment(form.course_start_date).format(
            "MM/DD/YYYY"
          ),
          course_end_date: moment(form.course_end_date).format("MM/DD/YYYY"),
          student_id: auth?.user?.student_id,
          status: "Applied",
        },
        activeItem?.medical_insurance_id
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
                        <label>cover_start_date</label>
                        <input
                          type="date"
                          name="cover_start_date"
                          id="course_name"
                          value={form.cover_start_date}
                          onChange={handleChange}
                          placeholder="Enter cover_start_date..."
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <label>cover_end_date</label>
                        <input
                          type="date"
                          name="cover_end_date"
                          id="cover_end_date"
                          value={form.cover_end_date}
                          onChange={handleChange}
                          placeholder="Enter cover_end_date ..."
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <input
                          type="text"
                          name="destination_country"
                          id="destination_country"
                          value={form.destination_country}
                          onChange={handleChange}
                          placeholder="Enter destination_country..."
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
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
                        <input
                          type="text"
                          name="course_cost"
                          id="course_cost"
                          value={form.course_cost}
                          onChange={handleChange}
                          placeholder="Enter course_cost..."
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <label className="">course_start_date</label>
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
                        <label>course_end_date</label>
                        <input
                          type="date"
                          name="course_end_date"
                          id="course_end_date"
                          value={form.course_end_date}
                          onChange={handleChange}
                          placeholder="Enter course_end_date..."
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <input
                          type="text"
                          name="student_notes"
                          id="student_notes"
                          value={form.student_notes}
                          onChange={handleChange}
                          placeholder="Enter student_notes..."
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

export default CMImodal;
