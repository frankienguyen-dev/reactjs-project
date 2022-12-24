import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { FcPlus } from 'react-icons/fc';

import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { putUpdateQuiz } from '../../../../services/apiService';

const ModalUpdateQuiz = (props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const { show, setShow, dataUpdate, setDataUpdate } = props;

  const handleClose = () => {
    setShow(false);
    setName('');
    setDescription('');
    setType('');
    setImage('');
    setPreviewImage('');
    setDataUpdate({});
  };

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
  };

  const handleSubmitEditQuiz = async () => {
    let data = await putUpdateQuiz(dataUpdate.id, description, name, type, image);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      props.fetchQuiz();
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      setName(dataUpdate.name);
      setDescription(dataUpdate.description);
      setType(dataUpdate.difficulty);
      setImage('');
      if (dataUpdate.image) {
        setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
      }
    }
  }, [dataUpdate]);

  return (
    <>
      <Modal
        className="modal-add-user"
        size="xl"
        show={show}
        backdrop="static"
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="mb-3">
              <label className="form-label">Name:</label>
              <input
                onChange={(event) => setName(event.target.value)}
                value={name}
                type="text"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description: </label>
              <input
                onChange={(event) => setDescription(event.target.value)}
                value={description}
                type="text"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Difficulty:</label>
              <select
                value={type}
                onChange={(event) => setType(event.target.value)}
                className="form-select"
              >
                <option defaultValue={'Easy'}>Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div className="col-md-12 ">
              <label className="form-label label-upload" htmlFor="label-upload">
                <FcPlus /> Upload File Image
              </label>
              <input
                onChange={(event) => handleUploadImage(event)}
                id="label-upload"
                type="file"
                hidden
              />
            </div>

            <div className="col-md-12 img-preview">
              {previewImage ? <img src={previewImage} /> : <span>Preview Image</span>}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmitEditQuiz()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateQuiz;
