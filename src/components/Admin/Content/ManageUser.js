import ModalCreateUser from "./ModalCreateUser";
import ManagerUser from "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUsers, getUserWithPaginate } from "../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUpdate from "./ModalViewUpdate";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";

const ManageUser = (props) => {
  const LIMIT_USER = 3;
  const [pageCount, setPageCount] = useState(0);
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [showModalViewUpdate, setShowModalViewUpdate] = useState(false);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const [dataDelete, setDataDelete] = useState({});
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataView, setDataView] = useState({});
  const [listUser, setListUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchListUserWithPaginate(1);
  }, []);

  const fetchListUser = async () => {
    let response = await getAllUsers();
    if (response.EC === 0) {
      setListUser(response.DT);
    }
  };

  const fetchListUserWithPaginate = async (page) => {
    let response = await getUserWithPaginate(page, LIMIT_USER);
    if (response.EC === 0) {
      setListUser(response.DT.users);
      setPageCount(response.DT.totalPages);
    }
  };

  const handleClickButtonUpdate = (user) => {
    setShowModalUpdateUser(true);
    setDataUpdate(user);
  };

  const handleClickButtonView = (user) => {
    setShowModalViewUpdate(true);
    setDataView(user);
  };

  const handleClickButtonDelete = (user) => {
    setShowModalDeleteUser(true);
    setDataDelete(user);
  };

  const resetUpdateData = () => {
    setDataUpdate({});
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
          {/* <TableUser
            listUser={listUser}
            handleClickButtonUpdate={handleClickButtonUpdate}
            handleClickButtonView={handleClickButtonView}
            handleClickButtonDelete={handleClickButtonDelete}
          /> */}

          <TableUserPaginate
            listUser={listUser}
            handleClickButtonUpdate={handleClickButtonUpdate}
            handleClickButtonView={handleClickButtonView}
            handleClickButtonDelete={handleClickButtonDelete}
            fetchListUserWithPaginate={fetchListUserWithPaginate}
            pageCount={pageCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>

        <ModalCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          fetchListUser={fetchListUser}
          fetchListUserWithPaginate={fetchListUserWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        <ModalUpdateUser
          setShow={setShowModalUpdateUser}
          show={showModalUpdateUser}
          dataUpdate={dataUpdate}
          resetUpdateData={resetUpdateData}
          fetchListUser={fetchListUser}
          fetchListUserWithPaginate={fetchListUserWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        <ModalViewUpdate
          setShow={setShowModalViewUpdate}
          show={showModalViewUpdate}
          dataView={dataView}
        />

        <ModalDeleteUser
          setShow={setShowModalDeleteUser}
          show={showModalDeleteUser}
          dataDelete={dataDelete}
          fetchListUser={fetchListUser}
          fetchListUserWithPaginate={fetchListUserWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ManageUser;
