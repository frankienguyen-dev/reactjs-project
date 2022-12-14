import ModalCreateUser from "./ModalCreateUser";
import ManagerUser from "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";

const ManageUser = (props) => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [listUser, setListUser] = useState([]);

  useEffect(() => {
    fetchListUser();
  }, []);

  const fetchListUser = async () => {
    let response = await getAllUsers();
    if (response.EC === 0) {
      setListUser(response.DT);
    }
  };

  const handleClickButtonUpdate = (user) => {
    setShowModalUpdateUser(true);
    setDataUpdate(user);
  };

  return (
    <div className="manager-user-container">
      <div className="title">Manage Users</div>

      <div className="user-content">
        <div className="btn-add-new">
          <button
            className="btn btn-primary d-flex align-items-center gap-2"
            onClick={() => setShowModalCreateUser(true)}
          >
            <FcPlus />
            Add new user
          </button>
        </div>
        <div className="table-users-container">
          <TableUser
            listUser={listUser}
            handleClickButtonUpdate={handleClickButtonUpdate}
          />
        </div>

        <ModalCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          fetchListUser={fetchListUser}
        />

        <ModalUpdateUser
          setShow={setShowModalUpdateUser}
          show={showModalUpdateUser}
          dataUpdate={dataUpdate}
        />
      </div>
    </div>
  );
};

export default ManageUser;
