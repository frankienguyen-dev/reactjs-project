import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/apiService";
import _ from "lodash";
import "./DetailQuiz.scss";
import { useLocation } from "react-router-dom";

const DetailQuiz = (props) => {
  const params = useParams();
  const location = useLocation();
  const quizId = params.id;

  console.log("location: ", location);
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
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, [quizId]);

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
          <div className="question">Question 1: How are you doing?</div>
          <div className="answer">
            <div className="answer-option">A. HIHI</div>
            <div className="answer-option">B. HAHA</div>
            <div className="answer-option">C. HEHE</div>
          </div>
        </div>

        <div className="footer">
          <button className="button-next">Previous</button>
          <button className="button-prev">Next</button>
        </div>
      </div>

      <div className="right-content">countdown</div>
    </div>
  );
};

export default DetailQuiz;
