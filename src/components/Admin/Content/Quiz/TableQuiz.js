import { useEffect, useState } from 'react';
import { getAllQuizForAdmin } from '../../../../services/apiService';

const TableQuiz = (props) => {
  const [listQuiz, setListQuiz] = useState([]);

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    let response = await getAllQuizForAdmin();
    console.log('check response: ', response);
    if (response && response.DT) {
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
                    <button className="btn btn-warning">Edit</button>
                    <button className="btn btn-danger mx-3">Delete</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default TableQuiz;
