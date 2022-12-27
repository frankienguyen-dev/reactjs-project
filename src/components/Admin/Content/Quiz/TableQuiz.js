import { useEffect, useState } from 'react';
import { getAllQuizForAdmin } from '../../../../services/apiService';
import ModalDeleteQuiz from './ModalDeleteQuiz';
import ModalUpdateQuiz from './ModalUpdateQuiz';

const TableQuiz = (props) => {
  const [listQuiz, setListQuiz] = useState([]);
  const [isShowModalUpdate, setIsShowModalUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState({});

  const handleClickEdit = (quiz) => {
    setIsShowModalUpdate(true);
    setDataUpdate(quiz);
  };

  const handleClickDelete = (quiz) => {
    setIsShowModalDelete(true);
    setDataDelete(quiz);
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    setDataUpdate({});
    setDataDelete({});

    let response = await getAllQuizForAdmin();

    if (response && response.EC === 0) {
      setListQuiz(response.DT);
    }
  };

  return (
    <>
      <div style={{ fontSize: '20px', fontWeight: 'bold' }}>List Quizzes:</div>
      <table className="table table-hover table-bordered mt-3">
        <thead>
          <tr className="text-center">
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Type</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listQuiz &&
            listQuiz.map((item, index) => {
              return (
                <tr className="text-center" key={`table-quiz-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.difficulty}</td>
                  <td className="text-center">
                    <button onClick={() => handleClickEdit(item)} className="btn btn-warning">
                      Edit
                    </button>
                    <button onClick={() => handleClickDelete(item)} className="btn btn-danger mx-3">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <ModalUpdateQuiz
        show={isShowModalUpdate}
        setShow={setIsShowModalUpdate}
        dataUpdate={dataUpdate}
        fetchQuiz={fetchQuiz}
        setDataUpdate={setDataUpdate}
      />

      <ModalDeleteQuiz
        show={isShowModalDelete}
        setShow={setIsShowModalDelete}
        dataDelete={dataDelete}
        setDataDelete={setDataDelete}
        fetchQuiz={fetchQuiz}
      />
    </>
  );
};

export default TableQuiz;
