import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/apiService";
import _ from "lodash";

const DetailQuiz = (props) => {
  const params = useParams();
  const quizId = params.id;

  const fetchQuestion = async () => {
    let response = await getDataQuiz(quizId);
    console.log("check response quiz id: ", response.DT);
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
            console.log("answer: ", item.answers);
          });

          return {
            questionId: key,
            answers: answers,
            questionDescription: questionDescription,
            image: image,
          };
        })
        .value();
      console.log("data: ", data);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, [quizId]);

  return <div className="detail-quiz-container">Quiz Component</div>;
};

export default DetailQuiz;
