import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { createUniversaty, editUniversaty } from "../../apis/universaty";

const Umodal = ({ isOpen, toggle, activeItem, setActiveItem }) => {
  const [form, setForm] = useState({
    university_name: "",
    university_shortname: "",
    university_description: "",
    university_program_intake: "",
    university_program_intake_status: "",
  });

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
      const data = {
        university_name: activeItem.university_name,
        university_shortname: activeItem.university_shortname,
        university_description: activeItem.university_description,
        university_program_intake: activeItem.university_program_intake,
        university_program_intake_status:
          activeItem.university_program_intake_status,
      };
      setForm(data);
    }
  }, [activeItem]);

  const handleCreateUniversaty = async () => {
    try {
      await createUniversaty(form);
      setForm({
        university_name: "",
        university_shortname: "",
        university_description: "",
        university_program_intake: "",
        university_program_intake_status: "",
      });
      toggle();
      toast.success("Successfully universaty created");
    } catch (e) {
      console.log(e);
    }
  };

  const handleEditUniversaty = async () => {
    try {
      await editUniversaty(form, activeItem?.university_id);
      setForm({
        university_name: "",
        university_shortname: "",
        university_description: "",
        university_program_intake: "",
        university_program_intake_status: "",
      });
      setActiveItem(null);
      toast.success("Successfully universaty created");
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
          University
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
                          placeholder="Enter university name..."
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <label style={{ fontSize: "14px" }}>
                          University Short Name
                        </label>
                        <input
                          type="text"
                          name="university_shortname"
                          id="university_shortname"
                          value={form.university_shortname}
                          onChange={handleChange}
                          placeholder="Enter University Shortname ..."
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <label style={{ fontSize: "14px" }}>Description</label>
                        <textarea
                          className="textarea-field"
                          name="university_description"
                          id="university_description"
                          value={form.university_description}
                          onChange={handleChange}
                          placeholder={`Enter Description...`}
                          required
                        />
                      </fieldset>
                    </div>

                    <div className="col-lg-12">
                      <fieldset>
                        <label style={{ fontSize: "14px" }}>
                          In Take Status
                        </label>
                        <input
                          type="text"
                          name="university_program_intake_status"
                          id="university_program_intake_status"
                          value={form.university_program_intake_status}
                          onChange={handleChange}
                          placeholder="Intake Status like(OPEN or CLOSED)..."
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <label style={{ fontSize: "14px" }}>In Take</label>
                        <input
                          type="text"
                          name="university_program_intake"
                          id="university_program_intake"
                          value={form.university_program_intake}
                          onChange={handleChange}
                          placeholder="University Program Intake like(JAN & MAR)..."
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

export default Umodal;
