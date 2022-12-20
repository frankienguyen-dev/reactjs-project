import { useEffect, useState } from 'react';
import { getQuizByUser } from '../../services/apiService';
import './ListQuiz.scss';
import { useNavigate } from 'react-router-dom';

const ListQuiz = (props) => {
  const [arrQuiz, setArrQuiz] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    getQuizData();
  }, []);

  const getQuizData = async () => {
    const response = await getQuizByUser();

    if (response && response.EC === 0) {
      setArrQuiz(response.DT);
    }
  };
  return (
    <div className="listQuiz-container container">
      {arrQuiz &&
        arrQuiz.length > 0 &&
        arrQuiz.map((quiz, index) => {
          return (
            <div key={`${index} - quiz`} className="card" style={{ width: '18rem' }}>
              <img src={`data:image/jpeg;base64, ${quiz.image}`} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Quiz {index + 1}</h5>
                <p className="card-text">{quiz.description}</p>
                <button
                  onClick={() =>
                    navigate(`/quiz/${quiz.id}`, {
                      state: { quizTitle: quiz.description },
                    })
                  }
                  className="btn btn-primary"
                >
                  Start now
                </button>
              </div>
            </div>
          );
        })}

      {arrQuiz && arrQuiz.length === 0 && <div>You don't have any quiz now</div>}
    </div>
  );
};

export default ListQuiz;
