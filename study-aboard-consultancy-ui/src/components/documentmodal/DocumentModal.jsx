import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { editApplication, updateDocument } from "../../apis/universaty";

const inIt = {
  admin_remarks: "",
  status: "",
};
const Dmodal = ({ isOpen, toggle, activeItem, setActiveItem }) => {
  const [form, setForm] = useState(inIt);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const validate = () => {
    if (!form?.admin_remarks) {
      toast.error("Please enter admin remarks.");
      return false;
    }
    if (!form?.status) {
      toast.error("Please select status.");
      return false;
    }

    return true;
  };

  useEffect(() => {
    if (activeItem) {
      const { status, admin_remarks, ...rest } = activeItem;

      setForm({
        admin_remarks: admin_remarks,
        status: status,
      });
    }
  }, [activeItem]);

  const handleEditDocument = async () => {
    try {
      await updateDocument(form, activeItem?.document_id);
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
      handleEditDocument();
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} fade={false} toggle={toggle}>
        <ModalHeader className="header-wrapper" toggle={toggle}>
          Document {"- " + activeItem?.document_id || ""}
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
                          name="admin_remarks"
                          id="admin_remarks"
                          value={form.admin_remarks}
                          onChange={handleChange}
                          placeholder="Enter Remarks..."
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <select
                          name="status"
                          className="common-input"
                          value={form.status}
                          onChange={handleChange}
                        >
                          <option value="" disabled>
                            Select status
                          </option>
                          <option value="Applied">Applied</option>
                          <option value="Processed">Processed</option>
                          <option value="Accepted">Accepted</option>
                          <option value="Processed">Rejected</option>
                        </select>
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

export default Dmodal;
