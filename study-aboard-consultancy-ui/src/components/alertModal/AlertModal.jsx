import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import PrivacyTipOutlinedIcon from "@mui/icons-material/PrivacyTipOutlined";

const AlertModal = ({ isOpen, toggle, onConfirm, onCancel }) => {
  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          <PrivacyTipOutlinedIcon color="error" /> Alert
        </ModalHeader>
        <ModalBody>
          Are you sure you want to delete?
          <div className="mt-3 d-flex justify-content-end">
            <button
              type="button"
              id="form-submit"
              onClick={onCancel}
              className="btn btn-outline-dark ms-3"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              id="form-submit"
              class="  ml-1"
              className="btn btn-dark ms-3"
            >
              Ok
            </button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AlertModal;
