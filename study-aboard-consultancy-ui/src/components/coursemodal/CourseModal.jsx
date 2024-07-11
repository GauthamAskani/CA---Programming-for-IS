import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { createCourse, editCourse } from "../../apis/universaty";

const inIt = {
  course_name: "",
  course_main_entry_requirements: "",
  undergraduate_score_cgpa: "",
  undergraduate_score_percent: "",
  undergraduate_score: "",
  score_twelfth: "",
  fifteen_years_allowed: "",
  ielts: "",
  tofel: "",
  pte: "",
  duolingo: "",
  gmat_score: "",
  gre_score: "",
  course_degree: "",
  course_duration: "",
  total_tuition_fee: "",
  application_fee: "",
  course_intake: "",
  course_intake_status: "",
  course_notes: "",
};
const Cmodal = ({ isOpen, toggle, activeItem, setActiveItem }) => {
  const [form, setForm] = useState(inIt);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const validate = () => {
    if (!form?.university_name) {
      toast.error("Please enter your name.");
      return false;
    }
    if (!form?.university_shortname) {
      toast.error("Please enter your surname.");
      return false;
    }
    if (!form?.university_description) {
      toast.error("Please enter a valid email.");
      return false;
    }
    if (!form?.university_program_intake) {
      toast.error("Please select your gender.");
      return false;
    }

    if (!form?.university_program_intake_status) {
      toast.error("Please enter your country.");
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

      setForm(rest);
    }
  }, [activeItem]);

  const handleCreateUniversaty = async () => {
    try {
      await createCourse({ form });
      setForm(inIt);
      toggle();
      toast.success("Successfully course created");
    } catch (e) {
      console.log(e);
    }
  };

  const handleEditUniversaty = async () => {
    try {
      await editCourse(form, activeItem?.course_id);
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
      if (activeItem) handleEditUniversaty();
      else handleCreateUniversaty();
    }
  };
  return (
    <div>
      <Modal isOpen={isOpen} fade={false} toggle={toggle}>
        <ModalHeader className="header-wrapper" toggle={toggle}>
          Course
        </ModalHeader>
        <ModalBody className="signin-modal-wrapper">
          <div className="add-application-wrapper">
            <div className="contact-us sign-in-wrapper">
              <div className="contact-us-content">
                <form id="contact-form">
                  <div className="row">
                    <div className="col-lg-12">
                      <fieldset>
                        <input
                          type="text"
                          name="course_name"
                          id="course_name"
                          value={form.course_name}
                          onChange={handleChange}
                          placeholder="Enter course name..."
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <input
                          type="text"
                          name="course_main_entry_requirements"
                          id="university_shortname"
                          value={form.course_main_entry_requirements}
                          onChange={handleChange}
                          placeholder="Enter requirements ..."
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <input
                          type="text"
                          name="undergraduate_score_cgpa"
                          id="undergraduate_score_cgpa"
                          value={form.undergraduate_score_cgpa}
                          onChange={handleChange}
                          placeholder="Enter undergraduate_score_cgpa..."
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <input
                          type="text"
                          name="undergraduate_score_percent"
                          id="undergraduate_score_percent"
                          value={form.undergraduate_score_percent}
                          onChange={handleChange}
                          placeholder="Enter undergraduate_score_percent..."
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <input
                          type="text"
                          name="undergraduate_score"
                          id="undergraduate_score"
                          value={form.undergraduate_score}
                          onChange={handleChange}
                          placeholder="Enter undergraduate_score..."
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <input
                          type="text"
                          name="score_twelfth"
                          id="score_twelfth"
                          value={form.score_twelfth}
                          onChange={handleChange}
                          placeholder="Enter score_twelfth..."
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <input
                          type="text"
                          name="fifteen_years_allowed"
                          id="fifteen_years_allowed"
                          value={form.fifteen_years_allowed}
                          onChange={handleChange}
                          placeholder="Enter fifteen_years_allowed..."
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <input
                          type="text"
                          name="ielts"
                          id="ielts"
                          value={form.ielts}
                          onChange={handleChange}
                          placeholder="Enter ielts..."
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <input
                          type="text"
                          name="tofel"
                          id="tofel"
                          value={form.tofel}
                          onChange={handleChange}
                          placeholder="Enter tofel..."
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <input
                          type="text"
                          name="pte"
                          id="pte"
                          value={form.pte}
                          onChange={handleChange}
                          placeholder="Enter pte..."
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <input
                          type="text"
                          name="duolingo"
                          id="duolingo"
                          value={form.duolingo}
                          onChange={handleChange}
                          placeholder="Enter duolingo..."
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <input
                          type="text"
                          name="gmat_score"
                          id="gmat_score"
                          value={form.gmat_score}
                          onChange={handleChange}
                          placeholder="Enter gmat_score..."
                          required
                        />
                      </fieldset>
                    </div>

                    <div className="col-lg-12">
                      <fieldset>
                        <input
                          type="text"
                          name="gre_score"
                          id="gre_score"
                          value={form.gre_score}
                          onChange={handleChange}
                          placeholder="Intake gre_score..."
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <input
                          type="text"
                          name="course_degree"
                          id="course_degree"
                          value={form.course_degree}
                          onChange={handleChange}
                          placeholder="course_degree..."
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <input
                          type="text"
                          name="course_duration"
                          id="course_duration"
                          value={form.course_duration}
                          onChange={handleChange}
                          placeholder="course_duration..."
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <input
                          type="text"
                          name="total_tuition_fee"
                          id="total_tuition_fee"
                          value={form.total_tuition_fee}
                          onChange={handleChange}
                          placeholder="total_tuition_fee..."
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <input
                          type="text"
                          name="application_fee"
                          id="application_fee"
                          value={form.application_fee}
                          onChange={handleChange}
                          placeholder="application_fee..."
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <input
                          type="text"
                          name="course_intake"
                          id="course_intake"
                          value={form.course_intake}
                          onChange={handleChange}
                          placeholder="course_intake..."
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <input
                          type="text"
                          name="course_intake_status"
                          id="course_intake_status"
                          value={form.course_intake_status}
                          onChange={handleChange}
                          placeholder="course_intake_status..."
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <input
                          type="text"
                          name="course_notes"
                          id="course_notes"
                          value={form.course_notes}
                          onChange={handleChange}
                          placeholder="course_notes..."
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

export default Cmodal;
