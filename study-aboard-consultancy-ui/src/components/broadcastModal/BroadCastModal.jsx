import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { createBroadcast, editBroadcast } from "../../apis/universaty";
import moment from "moment";

const inIt = {
  broadcast_title: "",
  broadcast_message: "",
  broadcast_send_date: "",
  broadcast_expiry_date: "",
};
const Bmodal = ({ isOpen, toggle, activeItem, setActiveItem }) => {
  const [form, setForm] = useState(inIt);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const validate = () => {
    if (!form?.broadcast_title) {
      toast.error("Please enter broadcast_title.");
      return false;
    }
    if (!form?.broadcast_message) {
      toast.error("Please enter your broadcast_message.");
      return false;
    }
    if (!form?.broadcast_send_date) {
      toast.error("Please enter broadcast_send_date.");
      return false;
    }
    if (!form?.broadcast_expiry_date) {
      toast.error("Please broadcast_expiry_date.");
      return false;
    }

    return true;
  };

  useEffect(() => {
    if (activeItem) {
      const {
        broadcast_id,
        broadcast_created_at,
        broadcast_updated_at,
        broadcast_deleted_at,
        ...rest
      } = activeItem;
      const data = {
        ...rest,
        broadcast_send_date: moment(rest.broadcast_send_date).format(
          "YYYY-MM-DD"
        ),
        broadcast_expiry_date: moment(rest.broadcast_expiry_date).format(
          "YYYY-MM-DD"
        ),
      };
      setForm(data);
    }
  }, [activeItem]);

  const handleCreateBroadcast = async (payload) => {
    try {
      await createBroadcast(payload);
      setForm(inIt);
      toggle();
      toast.success("Successfully course created");
    } catch (e) {
      console.log(e);
    }
  };

  const handleEditBroadcast = async (payload) => {
    try {
      await editBroadcast(payload, activeItem?.broadcast_id);
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
      const payload = {
        ...form,
        broadcast_send_date: moment(form.broadcast_send_date).format(
          "MM/DD/YYYY"
        ),
        broadcast_expiry_date: moment(form.broadcast_expiry_date).format(
          "MM/DD/YYYY"
        ),
      };
      if (activeItem) handleEditBroadcast(payload);
      else handleCreateBroadcast(payload);
    }
  };
  return (
    <div>
      <Modal isOpen={isOpen} fade={false} toggle={toggle}>
        <ModalHeader className="header-wrapper" toggle={toggle}>
          BroadCast
        </ModalHeader>
        <ModalBody className="signin-modal-wrapper">
          <div className="add-application-wrapper">
            <div className="contact-us sign-in-wrapper">
              <div className="contact-us-content">
                <form id="contact-form">
                  <div className="row">
                    <div className="col-lg-12">
                      <fieldset>
                        <label style={{ fontSize: "14px" }}>Title</label>
                        <input
                          type="text"
                          name="broadcast_title"
                          id="broadcast_title"
                          value={form.broadcast_title}
                          onChange={handleChange}
                          placeholder="Enter broadcast_title..."
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <label style={{ fontSize: "14px" }}>Message</label>
                        <input
                          type="text"
                          name="broadcast_message"
                          id="broadcast_message"
                          value={form.broadcast_message}
                          onChange={handleChange}
                          placeholder="Enter broadcast_message ..."
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <label style={{ fontSize: "14px" }}>Send Date</label>
                        <input
                          type="date"
                          name="broadcast_send_date"
                          id="broadcast_send_date"
                          value={form.broadcast_send_date}
                          onChange={handleChange}
                          placeholder="Enter broadcast_send_date..."
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <label style={{ fontSize: "14px" }}>Expiry Date</label>
                        <input
                          type="date"
                          name="broadcast_expiry_date"
                          id="broadcast_expiry_date"
                          value={form.broadcast_expiry_date}
                          onChange={handleChange}
                          placeholder="Enter broadcast_expiry_date..."
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

export default Bmodal;
