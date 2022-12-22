import axiosClient from '../utils/axiosCustom';

const postCreateNewUser = (email, password, username, role, image) => {
  // submit data
  const data = new FormData();
  data.append('email', email);
  data.append('password', password);
  data.append('username', username);
  data.append('role', role);
  data.append('userImage', image);

  return axiosClient.post('api/v1/participant', data);
};

const getAllUsers = () => {
  return axiosClient.get('api/v1/participant/all');
};

const putUpdateUser = (id, username, role, image) => {
  // submit data
  const data = new FormData();
  data.append('id', id);
  data.append('username', username);
  data.append('role', role);
  data.append('userImage', image);

  return axiosClient.put('api/v1/participant', data);
};

const deleteUser = (userId) => {
  return axiosClient.delete('api/v1/participant', { data: { id: userId } });
};

const getUserWithPaginate = (page, limit) => {
  return axiosClient.get(`api/v1/participant?page=${page}&limit=${limit}`);
};

const postLogin = (userEmail, userPassword) => {
  return axiosClient.post('api/v1/login', {
    email: userEmail,
    password: userPassword,
    delay: 2000,
  });
};

const postRegister = (userEmail, userPassword, userUsername) => {
  return axiosClient.post('api/v1/register', {
    email: userEmail,
    password: userPassword,
    username: userUsername,
  });
};

const getQuizByUser = () => {
  return axiosClient.get('api/v1/quiz-by-participant');
};

const getDataQuiz = (id) => {
  return axiosClient.get(`api/v1/questions-by-quiz?quizId=${id}`);
};

const postSubmitQuiz = (data) => {
  return axiosClient.post('api/v1/quiz-submit', { ...data });
};

const postCreateNewQuiz = (description, name, difficulty, image) => {
  const data = new FormData();
  data.append('description', description);
  data.append('name', name);
  data.append('difficulty', difficulty);
  data.append('quizImage', image);

  return axiosClient.post('api/v1/quiz', data);
};

const getAllQuizForAdmin = () => {
  return axiosClient.get('api/v1/quiz/all');
};

export {
  postCreateNewUser,
  getAllUsers,
  putUpdateUser,
  deleteUser,
  getUserWithPaginate,
  postLogin,
  postRegister,
  getQuizByUser,
  getDataQuiz,
  postSubmitQuiz,
  postCreateNewQuiz,
  getAllQuizForAdmin,
};
