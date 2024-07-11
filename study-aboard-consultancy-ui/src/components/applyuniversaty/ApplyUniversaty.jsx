import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { createUniversaty, getCoursesList } from "../../apis/universaty";
import { useAuth } from "../../utilities/AuthProvider";
import { createApplication, editApplication } from "../../apis/studentapi";

const Aumodal = ({ isOpen, toggle, activeItem, setActiveItem, mode }) => {
  const [courses, setCourses] = useState([]);
  const { auth } = useAuth();
  const [form, setForm] = useState({
    course_id: activeItem?.course_id || "",
    student_notes: activeItem?.student_notes || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const validate = () => {
    if (!form?.course_id) {
      toast.error("Please select course.");
      return false;
    }
    if (!form?.student_notes) {
      toast.error("Please enter your notes.");
      return false;
    }

    return true;
  };

  const handleCreateUniversaty = async () => {
    try {
      const payload = {
        student_id: auth?.user?.student_id,
        university_id: activeItem?.university_id,
        course_id: form?.course_id,
        student_notes: form?.student_notes,
        application_status: "Applied",
      };
      await createApplication(payload);
      setForm({
        course_id: null,
        student_notes: "",
      });
      toggle();
      toast.success("Successfully universaty created");
    } catch (e) {
      console.log(e);
    }
  };

  const handleEditApplication = async () => {
    try {
      const payload = {
        student_notes: form?.student_notes,
      };
      await editApplication(payload, activeItem?.application_id);
      setForm({
        course_id: "",
        student_notes: "",
      });
      toggle();
      toast.success("Saved successfully");
    } catch (e) {
      console.log(e);
    }
  };

  const handleGetUniversatyCourse = async () => {
    try {
      const res = await getCoursesList(activeItem?.university_id);
      setCourses(res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleGetUniversatyCourse();
  }, []);

  const handleSubmit = () => {
    console.log("submit");
    if (validate()) {
      if (mode === "edit") {
        handleEditApplication();
      } else handleCreateUniversaty();
    }
  };
  return (
    <div>
      <Modal isOpen={isOpen} fade={false} toggle={toggle}>
        <ModalHeader className="header-wrapper" toggle={toggle}>
          Universaty
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
                          name="university_name"
                          id="university_name"
                          value={activeItem.university_name}
                          placeholder="Enter university name..."
                          disabled
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <select
                          name="course_id"
                          className="common-input"
                          value={form.course_id}
                          onChange={handleChange}
                          disabled={mode === "edit"}
                        >
                          <option value="" disabled>
                            Select Course
                          </option>
                          {courses?.length &&
                            courses?.map((item) => (
                              <option value={item?.course_id}>
                                {item?.course_name}
                              </option>
                            ))}
                        </select>
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
                          placeholder="Enter Description..."
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

export default Aumodal;
