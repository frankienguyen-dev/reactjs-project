import { useState } from 'react';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteQuiz } from '../../../../services/apiService';

const ModalDeleteQuiz = (props) => {
  const { setShow, show, dataDelete, setDataDelete } = props;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  const handleClose = () => {
    setShow(false);
    setName('');
    setDescription('');
    setType('');
    setImage('');
    setPreviewImage('');
    setDataDelete({});
  };

  const handleSubmitDelete = async () => {
    let data = await deleteQuiz(dataDelete.id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      await props.fetchQuiz();
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <Modal backdrop="static" className="modal-delete-user" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete Quiz?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure? Quiz name:{' '}
        <strong>{dataDelete && dataDelete.name ? dataDelete.name : ''} </strong>{' '}
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
  );
};

export default ModalDeleteQuiz;
