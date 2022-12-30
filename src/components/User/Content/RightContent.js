import Lightbox from 'react-awesome-lightbox';
import CountDown from './Countdown';

const RightContent = (props) => {
  const { dataQuiz } = props;

  const onTimesUp = () => {
    props.handleFinishQuiz();
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
              <div key={`question - ${index}`} className="question">
                {index + 1}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default RightContent;
