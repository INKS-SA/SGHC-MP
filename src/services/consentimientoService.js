import axios from "../services/axiosConfig";

const baseUrl = "/api/consentimiento";
//const baseUrl = 'http://localhost:3001/api/consentimiento';

const getAllConsentimientos = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const getConsentimientoById = (consentimientoId) => {
  return axios.get(`${baseUrl}/${consentimientoId}`).then((response) => response.data);
};

const getConsentimientoByPatientId = (patientId) => {
  return axios.get(`${baseUrl}/patient/${patientId}`).then((response) => response.data);
};

const createConsentimiento = (newConsentimiento) => {
  const formData = new FormData();
  formData.append('archivo', newConsentimiento.archivo);
  formData.append('paciente', newConsentimiento.paciente);

  return axios.post(baseUrl, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then((response) => response.data);
};

const updateConsentimiento = (consentimientoId, updatedConsentimiento) => {
  const formData = new FormData();
  if (updatedConsentimiento.archivo) {
    formData.append('archivo', updatedConsentimiento.archivo);
  }
  if (updatedConsentimiento.paciente) {
    formData.append('paciente', updatedConsentimiento.paciente);
  }

  return axios.put(`${baseUrl}/${consentimientoId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then((response) => response.data);
};  

const deleteConsentimiento = (consentimientoId) => {
  return axios.delete(`${baseUrl}/${consentimientoId}`).then((response) => response.data);
};

export default {
  getAllConsentimientos,
  getConsentimientoById,
  getConsentimientoByPatientId,
  createConsentimiento,
  updateConsentimiento,
  deleteConsentimiento,
};
