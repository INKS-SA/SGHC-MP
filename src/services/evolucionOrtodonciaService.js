import axios from "../services/axiosConfig";

const baseUrl = "/api/evolucion-ortodoncia";
//const baseUrl = 'http://localhost:3001/api/evolucion-ortodoncia';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const getByOrtodonciaId = async (ortodonciaId) => {
  const response = await axios.get(`${baseUrl}/ortodoncia/${ortodonciaId}`);
  return response.data;
};

const create = async (newEvolucion) => {
  const response = await axios.post(baseUrl, newEvolucion);
  return response.data;
};

const update = async (id, updatedEvolucion) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedEvolucion);
  return response.data;
};

const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`);
};

export default { getAll, getById, getByOrtodonciaId, create, update, remove };
