import Lightbox from 'react-awesome-lightbox';
import CountDown from './Countdown';
import { useRef } from 'react';

const RightContent = (props) => {
  const { dataQuiz } = props;
  const refDiv = useRef([]);

  const onTimesUp = () => {
    props.handleFinishQuiz();
  };

  const getClassQuestion = (index, question) => {
    // check answer
    if (question && question.answers.length > 0) {
      let isAnswered = question.answers.find((answer) => answer.isSelected === true);
      if (isAnswered) {
        return 'question selected';
      }
    }
    return 'question';
  };

  const handleClickQuestion = (question, index) => {
    props.setCurrentQuestion(index);
    if (refDiv.current) {
      refDiv.current.forEach((item) => {
        if (item && item.className === 'question clicked') {
          item.className = 'question';
        }
      });
    }

    if (question && question.answers.length > 0) {
      let isAnswered = question.answers.find((answer) => answer.isSelected === true);
      if (isAnswered) {
        return;
      }
    }
    refDiv.current[index].className = 'question clicked';
  };

  return (
    <>
      <div className="main-timer">
        <CountDown onTimesUp={onTimesUp} />
      </div>
      <hr />

      <div className="main-question">
        {dataQuiz &&
          dataQuiz.length > 0 &&
          dataQuiz.map((item, index) => {
            return (
              <div
                onClick={() => handleClickQuestion(item, index)}
                key={`question - ${index}`}
                className={getClassQuestion(index, item)}
                ref={(element) => (refDiv.current[index] = element)}
              >
                {index + 1}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default RightContent;
