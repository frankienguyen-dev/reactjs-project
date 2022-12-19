import _ from "lodash";

const Question = (props) => {
  const { dataQuiz, currentQuestion, questionDescription } = props;

  if (_.isEmpty(dataQuiz)) {
    return <></>;
  }
  return (
    <>
      <div className="question">
        Question {currentQuestion + 1}: {dataQuiz.questionDescription} ?
      </div>
      {dataQuiz.image !== null && (
        <div className="question-img">
          {/* setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`); */}
          <img src={`data:image/jpeg;base64,${dataQuiz.image}`} />
        </div>
      )}

      <div className="answer">
        {dataQuiz.answers &&
          dataQuiz.answers.length &&
          dataQuiz.answers.map((answer, index) => {
            return (
              <div key={`answer - ${index}`} className="answer-option">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                  />
                  <label className="form-check-label">
                    {answer.description}
                  </label>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Question;
