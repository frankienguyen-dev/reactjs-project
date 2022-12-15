import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";

const TableUserPaginate = (props) => {
  const {
    listUser,
    pageCount,
    handleClickButtonUpdate,
    handleClickButtonView,
    handleClickButtonDelete,
  } = props;

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    console.log(
      `User requested page number ${Number.parseInt(event.selected) + 1}`
    );
    props.fetchListUserWithPaginate(Number.parseInt(event.selected) + 1);
  };

  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listUser &&
            listUser.length > 0 &&
            listUser.map((user, index) => {
              return (
                <tr key={`table user - ${index}`}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td className="d-flex justify-content-center">
                    <button
                      onClick={() => handleClickButtonView(user)}
                      className="btn btn-secondary"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleClickButtonUpdate(user)}
                      className="btn btn-warning mx-3"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleClickButtonDelete(user)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          {listUser && listUser.length === 0 && (
            <tr>
              <td colSpan={"4"}>Not found data</td>
            </tr>
          )}
        </tbody>
      </table>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default TableUserPaginate;
