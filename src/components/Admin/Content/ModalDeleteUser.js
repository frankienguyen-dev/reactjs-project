import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../../../services/apiService";
import { toast } from "react-toastify";

const ModalDeleteUser = (props) => {
  const { show, setShow, dataDelete, currentPage, setCurrentPage } = props;

  const handleClose = () => {
    setShow(false);
  };

  const handleSubmitDelete = async () => {
    let data = await deleteUser(dataDelete.id);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      setCurrentPage(1);
      await props.fetchListUserWithPaginate(1);
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal
        backdrop="static"
        className="modal-delete-user"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete User?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure? Email:{" "}
          <strong>
            {dataDelete && dataDelete.email ? dataDelete.email : ""}
          </strong>{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={() => handleSubmitDelete()}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteUser;
