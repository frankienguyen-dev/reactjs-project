import './ManageQuiz.scss';
import Select from 'react-select';
import { useState } from 'react';

const options = [
  { value: 'Easy', label: 'Easy' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Hard', label: 'Hard' },
];

const ManageQuiz = (props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('Easy');
  const [image, setImage] = useState(null);

  const handleChangeFile = (event) => {};

  return (
    <div className="quiz-container">
      <div className="title">Manage Quiz</div>
      <hr />

      <div className="add-new">
        <fieldset className="border rounded-3 p-3">
          <legend className="float-none w-auto px-3">Add New Quiz</legend>
          <div className="form-floating mb-3">
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              type="text"
              className="form-control"
              placeholder="Your quiz name"
            />
            <label>Name</label>
          </div>
          <div className="form-floating">
            <input
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              type="password"
              className="form-control"
              placeholder="Description..."
            />
            <label>Description</label>
          </div>

          <div className="my-3">
            <Select
              value={type}
              // onChange={this.handleChange}
              options={options}
              placeholder={'Quiz type...'}
            />
          </div>

          <div className="mode-actions form-group mx-3">
            <label className="">Upload Image:</label>
            <input onChange={(event) => handleChangeFile(event)} type="file" />
          </div>
        </fieldset>
      </div>

      <div className="list-details"></div>
    </div>
  );
};

export default ManageQuiz;
