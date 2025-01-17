import axios from "../services/axiosConfig";

const baseUrl = "/api/patients";
//const baseUrl = 'http://localhost:3001/api/patients';

const getAllPatients = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const getPatientById = (patientId) => {
  return axios.get(`${baseUrl}/${patientId}`).then((response) => response.data);
};

const getPatientByCedula = (numeroCedula) => {
  return axios.get(`${baseUrl}/cedula/${numeroCedula}`).then((response) => response.data);
};

const getPatientByName = (name) => {
  return axios.get(`${baseUrl}/nombre/${name}`).then((response) => response.data);
};

const createPatient = (newPatient) => {
  return axios.post(baseUrl, newPatient).then((response) => response.data);
};

const updatePatient = (patientId, updatedPatient) => {
  return axios.put(`${baseUrl}/${patientId}`, updatedPatient).then((response) => response.data);
};

const deletePatient = (patientId) => {
  return axios.delete(`${baseUrl}/${patientId}`).then((response) => response.data);
};

export default {
  getAllPatients,
  getPatientById,
  getPatientByCedula,
  getPatientByName,
  createPatient,
  updatePatient,
  deletePatient,
};
