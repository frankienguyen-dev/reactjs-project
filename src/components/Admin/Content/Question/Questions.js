import './Questions.scss';
import Select from 'react-select';
import { useState } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { AiFillMinusCircle } from 'react-icons/ai';
import { v4 as uuidv4 } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import _ from 'lodash';
import Lightbox from 'react-awesome-lightbox';

const Questions = (props) => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const [dataImagePreview, setDataImagePreview] = useState({
    title: '',
    url: '',
  });

  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      description: '',
      imageFile: '',
      imageName: '',
      answers: [
        {
          id: uuidv4(),
          description: '',
          isCorrect: false,
        },
      ],
    },
  ]);

  const handleAddRemoveQuestion = (type, id) => {
    if (type === 'ADD') {
      const newQuestion = {
        id: uuidv4(),
        description: '',
        imageFile: '',
        imageName: '',
        answers: [
          {
            id: uuidv4(),
            description: '',
            isCorrect: false,
          },
        ],
      };

      setQuestions([...questions, newQuestion]);
    }

    if (type === 'REMOVE') {
      let questionsClone = _.cloneDeep(questions);
      questionsClone = questionsClone.filter((item) => item.id !== id);
      setQuestions(questionsClone);
    }
  };

  const handleAddRemoveAnswer = (type, questionId, answerId) => {
    let questionsClone = _.cloneDeep(questions);
    if (type === 'ADD') {
      const newAnswer = {
        id: uuidv4(),
        description: '',
        isCorrect: false,
      };

      let index = questionsClone.findIndex((item) => item.id === questionId);
      questionsClone[index].answers.push(newAnswer);
      setQuestions(questionsClone);
    }

    if (type === 'REMOVE') {
      let index = questionsClone.findIndex((item) => item.id === questionId);
      questionsClone[index].answers = questionsClone[index].answers.filter(
        (item) => item.id !== answerId
      );
      setQuestions(questionsClone);
    }
  };

  const handleOnChange = (type, questionId, value) => {
    if (type === 'QUESTION') {
      let questionsClone = _.cloneDeep(questions);
      let index = questionsClone.findIndex((item) => item.id === questionId);
      if (index > -1) {
        questionsClone[index].description = value;
        setQuestions(questionsClone);
      }
    }
  };

  const handleOnChangeFileQuestion = (questionId, event) => {
    let questionsClone = _.cloneDeep(questions);

    let index = questionsClone.findIndex((item) => item.id === questionId);
    if (index > -1 && event.target && event.target.files && event.target.files[0]) {
      questionsClone[index].imageFile = event.target.files[0];
      questionsClone[index].imageName = event.target.files[0].name;
      setQuestions(questionsClone);
    }
  };

  const handleAnswerQuestion = (type, questionId, answerId, value) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId);
    if (index > -1) {
      questionsClone[index].answers = questionsClone[index].answers.map((answer) => {
        if (answer.id === answerId) {
          if (type === 'CHECKBOX') {
            answer.isCorrect = value;
          }

          if (type === 'INPUT') {
            answer.description = value;
          }
        }
        return answer;
      });
      setQuestions(questionsClone);
    }
  };

  const handleSubmitQuestion = () => {
    console.log('check question: ', questions);
  };

  const handlePreviewImage = (questionId) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId);
    if (index > -1) {
      setDataImagePreview({
        url: URL.createObjectURL(questionsClone[index].imageFile),
        title: questionsClone[index].imageName,
      });
      setIsPreviewImage(true);
    }
  };

  return (
    <PerfectScrollbar>
      <div className="question-container">
        <div className="title">Manage Questions</div>
        <hr />

        <div className="add-new-question">
          <div className="select-question">
            <span>Select Quiz:</span>
            <Select
              className="select-input"
              value={selectedQuiz}
              onChange={setSelectedQuiz}
              options={options}
            />
          </div>
        </div>

        <div className="question-title">
          <span>Add Question:</span>
        </div>

        {questions &&
          questions.length > 0 &&
          questions.map((question, index) => {
            return (
              <div key={question.id} className="question-main">
                <div className="question-content">
                  <div className="form-question">
                    <input
                      value={question.description}
                      type="text"
                      placeholder={`Question ${index + 1}`}
                      onChange={(event) =>
                        handleOnChange('QUESTION', question.id, event.target.value)
                      }
                    />
                  </div>

                  <div className="upload-file">
                    <label htmlFor={question.id}>Upload Image</label>
                    <input
                      id={question.id}
                      onChange={(event) => handleOnChangeFileQuestion(question.id, event)}
                      type={'file'}
                      hidden
                    />
                    <span className="file-description">
                      {question.imageName ? (
                        <span
                          onClick={() => handlePreviewImage(question.id)}
                          style={{ cursor: 'pointer' }}
                        >
                          {question.imageName}
                        </span>
                      ) : (
                        '0 file is uploaded'
                      )}
                    </span>
                  </div>

                  <div className="btn-upload">
                    <span onClick={() => handleAddRemoveQuestion('ADD', '')}>
                      <AiFillPlusCircle className="btn-plus" />
                    </span>

                    {questions && questions.length > 1 ? (
                      <span onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}>
                        <AiFillMinusCircle className="btn-minus" />
                      </span>
                    ) : null}
                  </div>
                </div>

                {question.answers &&
                  question.answers.length > 0 &&
                  question.answers.map((answer, index) => {
                    return (
                      <div key={answer.id} className="answer-content">
                        <input
                          className="form-check-input isCorrect"
                          type="checkbox"
                          checked={answer.isCorrect}
                          onChange={(event) =>
                            handleAnswerQuestion(
                              'CHECKBOX',
                              question.id,
                              answer.id,
                              event.target.checked
                            )
                          }
                        />

                        <div className="form-answer">
                          <input
                            value={answer.description}
                            type="text"
                            placeholder={`Answer ${index + 1}`}
                            onChange={(event) =>
                              handleAnswerQuestion(
                                'INPUT',
                                question.id,
                                answer.id,
                                event.target.value
                              )
                            }
                          />
                        </div>

                        <div className="btn-upload">
                          <span onClick={() => handleAddRemoveAnswer('ADD', question.id, '')}>
                            <AiFillPlusCircle className="btn-plus" />
                          </span>

                          {question.answers && question.answers.length > 1 ? (
                            <span
                              onClick={() =>
                                handleAddRemoveAnswer('REMOVE', question.id, answer.id)
                              }
                            >
                              <AiFillMinusCircle className="btn-minus" />
                            </span>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                <hr></hr>
              </div>
            );
          })}

        {questions && questions.length > 0 && (
          <div className="text-center">
            <button onClick={() => handleSubmitQuestion()} className=" btn btn-warning">
              Save Question
            </button>
          </div>
        )}

        {isPreviewImage === true && (
          <Lightbox
            onClose={() => setIsPreviewImage(false)}
            image={dataImagePreview.url}
            title={dataImagePreview.title}
          />
        )}
      </div>
    </PerfectScrollbar>
  );
};

export default Questions;
