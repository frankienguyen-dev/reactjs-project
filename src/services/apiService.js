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

export { postCreateNewUser, getAllUsers, putUpdateUser };