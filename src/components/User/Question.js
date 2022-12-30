/* eslint-disable jsx-a11y/alt-text */
import _ from 'lodash';
import { useState } from 'react';
import Lightbox from 'react-awesome-lightbox';

const Question = (props) => {
  const { dataQuiz, currentQuestion, questionDescription } = props;
  const [isPreviewImage, setIsPreviewImage] = useState(false);

  if (_.isEmpty(dataQuiz)) {
    return <></>;
  }

  const handleCheckBox = (event, answerId, questionId) => {
    props.handleCheckBox(answerId, questionId);
  };
  return (
    <>
      <div className="question">
        Question {currentQuestion + 1}: {dataQuiz.questionDescription} ?
      </div>
      {dataQuiz.image ? (
        <div className="question-img">
          <img
            style={{ cursor: 'pointer' }}
            onClick={() => setIsPreviewImage(true)}
            src={`data:image/jpeg;base64,${dataQuiz.image}`}
          />
          {isPreviewImage === true && (
            <Lightbox
              onClose={() => setIsPreviewImage(false)}
              image={`data:image/jpeg;base64,${dataQuiz.image}`}
              title={'Question Image'}
            />
          )}
        </div>
      ) : (
        <div className="question-img"></div>
      )}

      <div className="answer">
        {dataQuiz.answers &&
          dataQuiz.answers.length &&
          dataQuiz.answers.map((answer, index) => {
            return (
              <div key={`answer - ${index}`} className="answer-option">
                <div className="form-check">
                  <input
                    onChange={(event) => handleCheckBox(event, answer.id, dataQuiz.questionId)}
                    className="form-check-input"
                    type="checkbox"
                    checked={answer.isSelected}
                  />
                  <label className="form-check-label">{answer.description}</label>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Question;
