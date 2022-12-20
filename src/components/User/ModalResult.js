import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalResult = (props) => {
  const { show, setShow, dataModalResult } = props;

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <Modal backdrop="static" className="modal-delete-user" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Result: .....</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            Total Question: <strong>{dataModalResult.countTotal}</strong>{' '}
          </div>
          <div>
            Total Correct Answer: <strong> {dataModalResult.countCorrect}</strong>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Show Result
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalResult;
