import { useState, useEffect } from 'react';
import Select from 'react-select';
import { getAllQuizForAdmin, getAllUsers } from '../../../../services/apiService';

const Assign = (props) => {
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [listQuiz, setListQuiz] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [listUser, setListUser] = useState([]);

  const fetchQuiz = async () => {
    let response = await getAllQuizForAdmin();
    if (response && response.DT) {
      let newQuiz = response.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.description}`,
        };
      });
      setListQuiz(newQuiz);
    }
  };

  const fetchUsers = async () => {
    let response = await getAllUsers();
    console.log('check response user list: ', response.DT);
    if (response && response.DT) {
      let users = response.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.username} - ${item.email}`,
        };
      });
      setListUser(users);
    }
  };

  useEffect(() => {
    fetchQuiz();
    fetchUsers();
  }, []);
  return (
    <div className="assign-quiz-container row">
      <div className="col-6 form-group">
        <label style={{ marginBottom: 15, fontSize: 20, fontWeight: 600 }}>Select Quiz:</label>
        <Select defaultValue={selectedQuiz} onChange={setSelectedQuiz} options={listQuiz} />
      </div>

      <div className="col-6 form-group">
        <label style={{ marginBottom: 15, fontSize: 20, fontWeight: 600 }}>Select User:</label>

        <Select defaultValue={selectedUser} onChange={setSelectedUser} options={listUser} />
      </div>

      <div>
        <button className="btn btn-warning mt-3">Assign</button>
      </div>
    </div>
  );
};

export default Assign;
