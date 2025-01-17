import axios from "../services/axiosConfig";

const baseUrl = "/api/medical-records";
//const baseUrl = "http://localhost:3001/api/medical-records";

const getAllMedicalRecords = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const getMedicalRecordById = (medicalRecordId) => {
  return axios.get(`${baseUrl}/${medicalRecordId}`).then((response) => response.data);
};

const getMedicalRecordsByPatientId = (patientId) => {
  return axios.get(`${baseUrl}/patient/${patientId}`).then((response) => response.data);
};

const createMedicalRecord = (newMedicalRecord) => {
  return axios.post(baseUrl, newMedicalRecord).then((response) => response.data);
};

const updateMedicalRecord = (medicalRecordId, updatedMedicalRecord) => {
  return axios.put(`${baseUrl}/${medicalRecordId}`, updatedMedicalRecord).then((response) => response.data);
};

const deleteMedicalRecord = (medicalRecordId) => {
  return axios.delete(`${baseUrl}/${medicalRecordId}`).then((response) => response.data);
};

export default {
  getAllMedicalRecords,
  getMedicalRecordById,
  getMedicalRecordsByPatientId,
  createMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord,
};
