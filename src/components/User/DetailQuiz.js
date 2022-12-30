import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDataQuiz, postSubmitQuiz } from '../../services/apiService';
import _ from 'lodash';
import './DetailQuiz.scss';
import { useLocation } from 'react-router-dom';
import Question from './Question';
import ModalResult from './ModalResult';
import RightContent from './Content/RightContent';

const DetailQuiz = (props) => {
  const params = useParams();
  const location = useLocation();
  const quizId = params.id;

  const [dataQuiz, setDataQuiz] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isShowModalResult, setIsShowModalResult] = useState(false);
  const [dataModalResult, setDataModalResult] = useState({});

  const handlePrevious = () => {
    if (currentQuestion - 1 < 0) return;
    setCurrentQuestion(currentQuestion - 1);
  };

  const handleNext = () => {
    if (dataQuiz && dataQuiz.length > currentQuestion + 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else return;
  };

  const handleFinishQuiz = async () => {
    let payload = {
      quizId: +quizId,
      answers: [],
    };

    let answers = [];
    if (dataQuiz && dataQuiz.length > 0) {
      dataQuiz.forEach((question) => {
        let questionId = question.questionId;
        let userAnswerId = [];

        question.answers.forEach((answer) => {
          if (answer.isSelected === true) {
            userAnswerId.push(answer.id);
          }
        });

        answers.push({
          questionId: +questionId,
          userAnswerId: userAnswerId,
        });
      });
    }
    payload.answers = answers;

    // submit api
    let response = await postSubmitQuiz(payload);
    console.log('check response: ', response);
    if (response && response.EC === 0) {
      setDataModalResult({
        countCorrect: response.DT.countCorrect,
        countTotal: response.DT.countTotal,
        quizData: response.DT.quizData,
      });
      setIsShowModalResult(true);
    } else {
      alert('error');
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, [quizId]);

  const fetchQuestion = async () => {
    let response = await getDataQuiz(quizId);

    if (response && response.EC === 0) {
      let raw = response.DT;
      let data = _.chain(raw)
        // Group the elements of Array based on `color` property
        .groupBy('id')
        // `key` is group's name (color), `value` is the array of objects
        .map((value, key) => {
          let answers = [];
          let questionDescription,
            image = null;
          value.forEach((item, index) => {
            if (index === 0) {
              questionDescription = item.description;
              image = item.image;
            }
            item.answers.isSelected = false;
            answers.push(item.answers);
          });

          return {
            questionId: key,
            answers: answers,
            questionDescription: questionDescription,
            image: image,
          };
        })
        .value();

      setDataQuiz(data);
    }
  };

  const handleCheckBox = (answerId, questionId) => {
    let dataQuizClone = _.cloneDeep(dataQuiz);
    let question = dataQuizClone.find((item) => +item.questionId === +questionId);
    if (question && question.answers) {
      question.answers = question.answers.map((item) => {
        if (+item.id === +answerId) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });
    }
    let index = dataQuizClone.findIndex((item) => +item.questionId === +questionId);
    if (index > -1) {
      dataQuizClone[index] = question;
      setDataQuiz(dataQuizClone);
    }
  };

  return (
    <div className="detail-quiz-container">
      <div className="left-content">
        <div className="title">
          Quiz {`${quizId}`}: {location?.state?.quizTitle}
        </div>
        <hr />

        <div className="question-body">
          <img src="" />
        </div>

        <div className="question-content">
          <Question
            currentQuestion={currentQuestion}
            handleCheckBox={handleCheckBox}
            dataQuiz={dataQuiz && dataQuiz.length > 0 ? dataQuiz[currentQuestion] : []}
          />
        </div>

        <div className="footer">
          <button onClick={() => handlePrevious()} className="button-next">
            Previous
          </button>
          <button onClick={() => handleNext()} className="button-prev">
            Next
          </button>

          <button onClick={() => handleFinishQuiz()} className="button-finish">
            Finish
          </button>
        </div>
      </div>

      <div className="right-content">
        <RightContent dataQuiz={dataQuiz} handleFinishQuiz={handleFinishQuiz} />
      </div>
      <ModalResult
        dataModalResult={dataModalResult}
        show={isShowModalResult}
        setShow={setIsShowModalResult}
      />
    </div>
  );
};

export default DetailQuiz;
