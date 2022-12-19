import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/apiService";

const DetailQuiz = (props) => {
  const params = useParams();
  const quizId = params.id;

  const fetchQuestion = async () => {
    let response = await getDataQuiz(quizId);
    console.log("check response quiz id: ", response.DT);
  };

  useEffect(() => {
    fetchQuestion();
  }, [quizId]);

  return <div className="detail-quiz-container">Quiz Component</div>;
};

export default DetailQuiz;
