import axios from "../services/axiosConfig";

const baseUrl = "/api/endodontic-treatment";
//const baseUrl = "http://localhost:3001/api/endodontic-treatment";

const getAllEndodonticTreatments = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};
const getEndodonticTreatmentById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const getEndodonticTreatmentsByPatientId = async (patientId) => {
  const response = await axios.get(`${baseUrl}/patient/${patientId}`);
  return response.data;
};

const createEndodonticTreatment = async (newEndodonticTreatment, archivo1, archivo2) => {
  const formData = new FormData();

  // Agregar campos del formulario
  for (const key in newEndodonticTreatment) {
    const value = newEndodonticTreatment[key];
    if (Array.isArray(value)) {
      if (value.length === 0) {
        formData.append(key, '[]'); // Enviar un marcador de array vacío
      } else {
        value.forEach((item) => formData.append(key, item)); // Agregar cada elemento del array
      }
    } else {
      formData.append(key, value);
    }
  }

  // Agregar archivos si existen
  if (archivo1) {
    formData.append('archivo1', archivo1);
  }

  if (archivo2) {
    formData.append('archivo2', archivo2);
  }

  const response = await axios.post(baseUrl, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};

const updateEndodonticTreatment = async (id, updatedEndodonticTreatment, archivo1, archivo2) => {
  const formData = new FormData();

  // Agregar campos del formulario
  for (const key in updatedEndodonticTreatment) {
    const value = updatedEndodonticTreatment[key];
    if (Array.isArray(value)) {
      if (value.length === 0) {
        formData.append(key, '[]'); // Enviar un marcador de array vacío
      } else {
        value.forEach((item) => formData.append(key, item)); // Agregar cada elemento del array
      }
    } else {
      formData.append(key, value);
    }
  }

  // Agregar archivos si existen
  if (archivo1) {
    formData.append('archivo1', archivo1);
  }

  if (archivo2) {
    formData.append('archivo2', archivo2);
  }

  const response = await axios.put(`${baseUrl}/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};


const deleteEndodonticTreatment = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

export default {
  getAllEndodonticTreatments,
  getEndodonticTreatmentById,
  getEndodonticTreatmentsByPatientId,
  createEndodonticTreatment,
  updateEndodonticTreatment,
  deleteEndodonticTreatment,
};




