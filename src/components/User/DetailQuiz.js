import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/apiService";
import _ from "lodash";
import "./DetailQuiz.scss";
import { useLocation } from "react-router-dom";
import Question from "./Question";

const DetailQuiz = (props) => {
  const params = useParams();
  const location = useLocation();
  const quizId = params.id;

  const [dataQuiz, setDataQuiz] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handlePrevious = () => {
    if (currentQuestion - 1 < 0) return;
    setCurrentQuestion(currentQuestion - 1);
  };

  const handleNext = () => {
    if (dataQuiz && dataQuiz.length > currentQuestion + 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else return;
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
        .groupBy("id")
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
      console.log("check data: ", data);
      setDataQuiz(data);
    }
  };

  console.log("check data quiz: ", dataQuiz);

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
            dataQuiz={
              dataQuiz && dataQuiz.length > 0 ? dataQuiz[currentQuestion] : []
            }
          />
        </div>

        <div className="footer">
          <button onClick={() => handlePrevious()} className="button-next">
            Previous
          </button>
          <button onClick={() => handleNext()} className="button-prev">
            Next
          </button>
        </div>
      </div>

      <div className="right-content">countdown</div>
    </div>
  );
};

export default DetailQuiz;
