import Lightbox from 'react-awesome-lightbox';

const RightContent = (props) => {
  const { dataQuiz } = props;

  return (
    <>
      <div className="main-timer">10:10</div>
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
