import axios from "../services/axiosConfig";

const baseUrl = "/api/users";
//const baseUrl = "http://localhost:3001/api/users";

const registerUser = (user) => {
  return axios.post(baseUrl, user).then((response) => response.data);
};

const getAllUsers = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const getUserById = (userId) => {
  return axios.get(`${baseUrl}/${userId}`).then((response) => response.data);
};

const updateUser = (userId, updatedUser) => {
  return axios.put(`${baseUrl}/${userId}`, updatedUser).then((response) => response.data);
};

const deleteUser = (userId) => {
  return axios.delete(`${baseUrl}/${userId}`).then((response) => response.data);
};

export default {
  registerUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
