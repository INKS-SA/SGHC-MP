import axios from "../services/axiosConfig";

const baseUrl = "/api/disfuncion-mandibular";
//const baseUrl = "http://localhost:3001/api/disfuncion-mandibular";

const getAllDisfuncionMandibular = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const getDisfuncionMandibularById = (disfuncionMandibularId) => {
  return axios.get(`${baseUrl}/${disfuncionMandibularId}`).then((response) => response.data);
};

const getDisfuncionMandibularByPatientId = (patientId) => {
  return axios.get(`${baseUrl}/patient/${patientId}`).then((response) => response.data);
};

const createDisfuncionMandibular = (newDisfuncionMandibular) => {
  return axios.post(baseUrl, newDisfuncionMandibular).then((response) => response.data);
};

const updateDisfuncionMandibular = (disfuncionMandibularId, updatedDisfuncionMandibular) => {
  return axios.put(`${baseUrl}/${disfuncionMandibularId}`, updatedDisfuncionMandibular).then((response) => response.data);
};

const deleteDisfuncionMandibular = (disfuncionMandibularId) => {
  return axios.delete(`${baseUrl}/${disfuncionMandibularId}`).then((response) => response.data);
};

export default {
  getAllDisfuncionMandibular,
  getDisfuncionMandibularById,
  getDisfuncionMandibularByPatientId,
  createDisfuncionMandibular,
  updateDisfuncionMandibular,
  deleteDisfuncionMandibular,
};
