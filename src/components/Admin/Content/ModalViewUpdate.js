import _ from "lodash";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { putUpdateUser } from "../../../services/apiService";

const ModalViewUpdate = (props) => {
  const { show, setShow, dataView } = props;

  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setImage("");
    setRole("User");
    setUsername("");
    setPreviewImage("");
  };

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (!_.isEmpty(dataView)) {
      setEmail(dataView.email);
      setImage("");
      setRole(dataView.role);
      setUsername(dataView.username);
      if (dataView.image) {
        setPreviewImage(`data:image/jpeg;base64,${dataView.image}`);
      }
    }
  }, [dataView]);

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
          <Modal.Title>View user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                disabled={true}
                onChange={(event) => setEmail(event.target.value)}
                value={email}
                type="email"
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                disabled={true}
                onChange={(event) => setPassword(event.target.value)}
                value={password}
                type="password"
                className="form-control"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Username</label>
              <input
                disabled={true}
                onChange={(event) => setUsername(event.target.value)}
                value={username}
                type="text"
                className="form-control"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Role</label>
              <select
                value={role}
                disabled={true}
                onChange={(event) => setRole(event.target.value)}
                className="form-select"
              >
                <option defaultValue={"user"}>User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <div className="col-md-12 img-preview">
              {previewImage ? (
                <img src={previewImage} />
              ) : (
                <span>Preview Image</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalViewUpdate;
