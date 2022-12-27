import './ManageQuiz.scss';
import Select from 'react-select';
import { useState } from 'react';
import { postCreateNewQuiz } from '../../../../services/apiService';
import { toast } from 'react-toastify';
import TableQuiz from './TableQuiz';
import Accordion from 'react-bootstrap/Accordion';
import PerfectScrollbar from 'react-perfect-scrollbar';

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

  const handleChangeFile = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleClickSubmitQuiz = async () => {
    // validate
    if (!name && !description) {
      toast.error('Name and Description is required');
      return;
    }

    // call api
    let response = await postCreateNewQuiz(description, name, type?.value, image);
    if (response && response.EC === 0) {
      toast.success(response.EM);
      setName('');
      setDescription('');
    } else {
      toast.error(response.EM);
    }
  };

  return (
    <PerfectScrollbar>
      <div className="quiz-container">
        <Accordion defaultActiveKey="0" className="mb-5">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Manage Quiz</Accordion.Header>
            <Accordion.Body>
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
                      type="text"
                      className="form-control"
                      placeholder="Description..."
                    />
                    <label>Description</label>
                  </div>

                  <div className="my-3">
                    <Select
                      defaultValue={type}
                      onChange={setType}
                      options={options}
                      placeholder={'Quiz type...'}
                    />
                  </div>

                  <div className="mode-actions form-group mx-3">
                    <label className="">Upload Image:</label>
                    <input onChange={(event) => handleChangeFile(event)} type="file" />
                  </div>

                  <div className="button-save">
                    <button onClick={() => handleClickSubmitQuiz()}>Save</button>
                  </div>
                </fieldset>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <div className="list-details">
          <TableQuiz />
        </div>
      </div>
    </PerfectScrollbar>
  );
};

export default ManageQuiz;
