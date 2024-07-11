import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { editInsurance, editLoan } from "../../apis/universaty";
import { uploadDocument } from "../../apis/studentapi";

const inIt = {
  admin_remarks: "",
  status: "",
};
const UDmodal = ({ isOpen, toggle, activeItem, setActiveItem, mode }) => {
  const [form, setForm] = useState(inIt);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const validate = () => {
    if (!form?.notes) {
      toast.error("Please enter notes.");
      return false;
    }
    if (!form?.document_category) {
      toast.error("Document Category is Required.");
      return false;
    }
    if (!form?.file) {
      toast.error("Please upload a file.");
      return false;
    }
    if (!["application/pdf", "application/zip"].includes(form.file.type)) {
      toast.error("Only PDF and ZIP files are allowed.");
      return false;
    }

    return true;
  };

  const createPayload = () => {
    return {
      document_category: form.status,
      notes: form.notes,
      file: form.file,
      document_type: form.file.type,
    };
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      await uploadDocument(form, activeItem?.medical_insurance_id);
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
      //   handleEditUniversaty();
    }
  };
  return (
    <div>
      <Modal isOpen={isOpen} fade={false} toggle={toggle}>
        <ModalHeader className="header-wrapper" toggle={toggle}>
          Documents
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
                          type="file"
                          name="file"
                          style={{ paddingTop: "10px" }}
                          id="file"
                          accept=".pdf,.zip"
                          onChange={handleChange}
                          placeholder="Enter Remarks..."
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
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
                    <div className="col-lg-12">
                      <fieldset>
                        <select
                          name="document_category"
                          className="common-input"
                          value={form.status}
                          required
                          onChange={handleChange}
                        >
                          <option value="" disabled>
                            Select status
                          </option>

                          <option value="10THMARKSHEET">10THMARKSHEET</option>
                          <option value="12THMARKSHEET">12THMARKSHEET</option>
                          <option value="TRANSCRIPT">TRANSCRIPT</option>
                          <option value="DEGREECERTIFICATE">
                            DEGREECERTIFICATE
                          </option>
                          <option value="CIRCULLAMVITAE">CIRCULLAMVITAE</option>
                          <option value="SOP">SOP</option>
                          <option value="1LOR">1LOR</option>
                          <option value="2LOR">2LOR</option>
                          <option value="ENGLISHTESTSCORE">
                            ENGLISHTESTSCORE
                          </option>
                          <option value="GARDUATIONSEMESTER">
                            GARDUATIONSEMESTER
                          </option>
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

export default UDmodal;
