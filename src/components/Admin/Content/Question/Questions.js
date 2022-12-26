import './Questions.scss';
import Select from 'react-select';
import { useState } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { AiFillMinusCircle } from 'react-icons/ai';

const Questions = (props) => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  const [selected, setSelected] = useState({});
  return (
    <div className="question-container">
      <div className="title">Manage Questions</div>

      <div className="add-new-question">
        <div className="select-question">
          <span>Select Quiz:</span>
          <Select
            className="select-input"
            value={selected}
            onChange={setSelected}
            options={options}
          />
        </div>
      </div>

      <div className="question-title">
        <span>Add Question:</span>
      </div>

      <div>
        <div className="question-content">
          <div className="form-question">
            <input type="text" placeholder="Description" />
          </div>

          <div className="upload-file">
            <label>Upload Image</label>
            <input type={'file'} hidden />
            <span>0 file is uploaded</span>
          </div>

          <div className="btn-upload">
            <span>
              <AiFillPlusCircle className="btn-plus" />
            </span>

            <span>
              <AiFillMinusCircle className="btn-minus" />
            </span>
          </div>
        </div>

        <div className="answer-content">
          <input className="form-check-input isCorrected" type="checkbox" />

          <div className="form-answer">
            <input type="text" placeholder="Answer 1" />
          </div>

          <div className="btn-upload">
            <span>
              <AiFillPlusCircle className="btn-plus" />
            </span>

            <span>
              <AiFillMinusCircle className="btn-minus" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
