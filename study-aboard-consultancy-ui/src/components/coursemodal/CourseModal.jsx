import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { createCourse, editCourse } from "../../apis/universaty";

const initialState = {
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

const Cmodal = ({
  isOpen,
  toggle,
  activeItem,
  setActiveItem,
  universityId,
}) => {
  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  console.log("actice->", activeItem);

  const validate = () => {
    if (!form.course_name) {
      toast.error("Please enter the course name.");
      return false;
    }
    if (!form.course_main_entry_requirements) {
      toast.error("Please enter the course entry requirements.");
      return false;
    }
    if (!form.undergraduate_score_cgpa) {
      toast.error("Please enter the undergraduate CGPA.");
      return false;
    }
    if (!form.undergraduate_score_percent) {
      toast.error("Please enter the undergraduate score percentage.");
      return false;
    }
    if (!form.undergraduate_score) {
      toast.error("Please enter the undergraduate score.");
      return false;
    }
    if (!form.score_twelfth) {
      toast.error("Please enter the 12th grade score.");
      return false;
    }
    if (!form.fifteen_years_allowed) {
      toast.error("Please specify if fifteen years of education is allowed.");
      return false;
    }
    if (!form.ielts) {
      toast.error("Please enter the IELTS score.");
      return false;
    }
    if (!form.tofel) {
      toast.error("Please enter the tofel score.");
      return false;
    }
    if (!form.pte) {
      toast.error("Please enter the PTE score.");
      return false;
    }
    if (!form.duolingo) {
      toast.error("Please enter the Duolingo score.");
      return false;
    }
    if (!form.gmat_score) {
      toast.error("Please enter the GMAT score.");
      return false;
    }
    if (!form.gre_score) {
      toast.error("Please enter the GRE score.");
      return false;
    }
    if (!form.course_degree) {
      toast.error("Please enter the course degree.");
      return false;
    }
    if (!form.course_duration) {
      toast.error("Please enter the course duration.");
      return false;
    }
    if (!form.total_tuition_fee) {
      toast.error("Please enter the total tuition fee.");
      return false;
    }
    if (!form.application_fee) {
      toast.error("Please enter the application fee.");
      return false;
    }
    if (!form.course_intake) {
      toast.error("Please enter the course intake.");
      return false;
    }
    if (!form.course_intake_status) {
      toast.error("Please enter the course intake status.");
      return false;
    }
    if (!form.course_notes) {
      toast.error("Please enter course notes.");
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
        course_updated_at,
        universityId,
        ...rest
      } = activeItem;
      setForm(rest);
    }
  }, [activeItem]);

  const handleCreateCourse = async () => {
    try {
      await createCourse({ ...form, university_id: universityId });
      setForm(initialState);
      toggle();
      toast.success("Course created successfully");
    } catch (e) {
      console.error(e);
      toast.error("Failed to create course");
    }
  };

  const handleEditCourse = async () => {
    try {
      await editCourse(form, activeItem?.course_id);
      setForm(initialState);
      setActiveItem(null);
      toast.success("Course saved successfully");
      toggle();
    } catch (e) {
      console.error(e);
      toast.error("Failed to save course");
    }
  };

  const handleSubmit = () => {
    if (validate()) {
      if (activeItem) handleEditCourse();
      else handleCreateCourse();
    }
  };

  const fields = [
    { name: "course_name", label: "Course Name", type: "text" },
    {
      name: "course_main_entry_requirements",
      label: "Course Entry Requirements",
      type: "text",
    },
    {
      name: "undergraduate_score_cgpa",
      label: "Undergraduate CGPA",
      type: "text",
    },
    {
      name: "undergraduate_score_percent",
      label: "Undergraduate Score Percentage",
      type: "text",
    },
    {
      name: "undergraduate_score",
      label: "Undergraduate Score",
      type: "text",
    },
    {
      name: "score_twelfth",
      label: "12th Grade Score",
      type: "text",
    },
    {
      name: "fifteen_years_allowed",
      label: "15 Years of Education Allowed",
      type: "text",
    },
    { name: "ielts", label: "IELTS Score", type: "text" },
    { name: "tofel", label: "tofel Score", type: "text" },
    { name: "pte", label: "PTE Score", type: "text" },
    {
      name: "duolingo",
      label: "Duolingo Score",
      type: "text",
    },
    { name: "gmat_score", label: "GMAT Score", type: "text" },
    { name: "gre_score", label: "GRE Score", type: "text" },
    {
      name: "course_degree",
      label: "Course Degree",
      type: "text",
    },
    {
      name: "course_duration",
      label: "Course Duration",
      type: "text",
    },
    {
      name: "total_tuition_fee",
      label: "Total Tuition Fee",
      type: "text",
    },
    {
      name: "application_fee",
      label: "Application Fee",
      type: "text",
    },
    {
      name: "course_intake",
      label: "Course Intake",
      type: "text",
    },
    {
      name: "course_intake_status",
      label: "Course Intake Status",
      type: "text",
    },
    {
      name: "course_notes",
      label: "Course Notes",
      type: "text",
    },
  ];

  return (
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
                  {fields.map((field) => (
                    <div className="col-lg-12" key={field.name}>
                      <fieldset>
                        <label style={{ fontSize: "14px" }}>
                          {field?.label}
                        </label>
                        <input
                          type={field.type}
                          name={field.name}
                          id={field.name}
                          value={form[field.name]}
                          onChange={handleChange}
                          placeholder={`Enter ${field.label.toLowerCase()}...`}
                          required
                        />
                      </fieldset>
                    </div>
                  ))}
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
  );
};

export default Cmodal;
