import './QuizQA.scss';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { AiFillMinusCircle } from 'react-icons/ai';
import { v4 as uuidv4 } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import _ from 'lodash';
import Lightbox from 'react-awesome-lightbox';
import { getAllQuizForAdmin, getQuizWithQA } from '../../../../services/apiService';
import {
  postCreateNewAnswerForQuestion,
  postCreateNewQuestionForQuiz,
} from '../../../../services/apiService';
import { toast } from 'react-toastify';

const QuizQA = (props) => {
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const [dataImagePreview, setDataImagePreview] = useState({
    title: '',
    url: '',
  });

  const [listQuiz, setListQuiz] = useState([]);

  const initQuestions = [
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
  ];

  const [questions, setQuestions] = useState(initQuestions);

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

  const handleSubmitQuestion = async () => {
    console.log('question: ', questions, selectedQuiz);
    // todo

    // validate
    if (_.isEmpty(selectedQuiz)) {
      toast.error('Please choose a Quiz!');
      return;
    }

    // validate question

    let isValidQuestion = true;
    let indexQuestion1 = 0;
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].description) {
        isValidQuestion = false;
        indexQuestion1 = i;
      }
    }

    if (isValidQuestion === false) {
      toast.error(`Not Empty Answer: Question: ${+indexQuestion1 + 1} `);
      return;
    }

    // validate answer
    let isValidAnswer = true;
    let indexQuestion = 0;
    let indexAnswer = 0;
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].description) {
          isValidAnswer = false;
          indexAnswer = j;
          break;
        }
      }
      indexQuestion = i;
      if (isValidAnswer === false) break;
    }

    if (isValidAnswer === false) {
      toast.error(`Not Empty Answer: ${+indexAnswer + 1} -  Question: ${+indexQuestion + 1} `);
      return;
    }

    // submit question
    for (const question of questions) {
      const q = await postCreateNewQuestionForQuiz(
        +selectedQuiz.value,
        question.description,
        question.imageFile
      );

      // submit answer
      for (const answer of question.answers) {
        await postCreateNewAnswerForQuestion(answer.description, answer.isCorrect, q.DT.id);
      }
    }
    toast.success('Create Question and Answer Successfully');
    setQuestions(initQuestions);
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

  const fetchQuiz = async () => {
    let response = await getAllQuizForAdmin();
    if (response && response.DT) {
      let newQuiz = response.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.description}`,
        };
      });
      setListQuiz(newQuiz);
    }
  };

  useEffect(() => {
    if (selectedQuiz && selectedQuiz.value) {
      fetchQuizWithQA();
    }
  }, [selectedQuiz]);

  //return a promise that resolves with a File instance
  const urltoFile = (url, filename, mimeType) => {
    return fetch(url)
      .then(function (res) {
        return res.arrayBuffer();
      })
      .then(function (buf) {
        return new File([buf], filename, { type: mimeType });
      });
  };

  const fetchQuizWithQA = async () => {
    let response = await getQuizWithQA(selectedQuiz.value);

    if (response && response.EC === 0) {
      // convert base64 to File object
      let newQA = [];
      for (let i = 0; i < response.DT.qa.length; i++) {
        let q = response.DT.qa[i];
        if (q.imageFile) {
          q.imageName = `Question - ${q.id}`;
          q.imageFile = await urltoFile(
            `data:image/png;base64,${q.imageFile}`,
            `Question - ${q.id}`,
            'image/png'
          );
        }
        newQA.push(q);
      }

      setQuestions(newQA);
      console.log('check qa', newQA);
      console.log('check response ss: ', response.DT);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  return (
    <PerfectScrollbar>
      <div className="question-container">
        <div className="add-new-question">
          <div className="select-question">
            <span>Select Quiz:</span>
            <Select
              className="select-input"
              value={selectedQuiz}
              onChange={setSelectedQuiz}
              options={listQuiz}
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
                <div style={{ marginBottom: 20, fontWeight: 600, fontSize: 20 }}>
                  Question {+index + 1}:
                </div>
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

export default QuizQA;
