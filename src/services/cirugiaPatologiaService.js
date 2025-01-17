import axios from "../services/axiosConfig";

const baseUrl = "/api/cirugia-patologia";
//const baseUrl = 'http://localhost:3001/api/cirugia-patologia';

// Obtiene todas las cirugías patológicas
const getAllCirugiaPatologias = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

// Obtiene una cirugía patológica por su ID
const getCirugiaPatologiaById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

// Obtiene una cirugía patológica por el ID del paciente
const getCirugiaPatologiaByPatientId = async (patientId) => {
  const response = await axios.get(`${baseUrl}/patient/${patientId}`);
  return response.data;
};

// Crea una nueva cirugía patológica
const createCirugiaPatologia = async (newCirugiaPatologia, archivo1, archivo2) => {
  const formData = new FormData();

  // Agregar campos del formulario
  for (const key in newCirugiaPatologia) {
    const value = newCirugiaPatologia[key];
    if (Array.isArray(value)) {
      // Si el valor es un array, agregar cada elemento individualmente
      value.forEach((item) => formData.append(key, item));
    } else {
      // Si no es un array, agregar el valor directamente
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

// Actualiza una cirugía patológica por su ID
const updateCirugiaPatologia = async (id, updatedCirugiaPatologia, archivo1, archivo2) => {
  const formData = new FormData();

  // Agregar campos del formulario
  for (const key in updatedCirugiaPatologia) {
    const value = updatedCirugiaPatologia[key];
    if (Array.isArray(value)) {
      if (value.length === 0) {
        formData.append(key, '[]'); // Enviar un marcador para arrays vacíos
      } else {
        value.forEach((item) => formData.append(key, item));
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

// Elimina una cirugía patológica por su ID
const deleteCirugiaPatologia = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

export default {
  getAllCirugiaPatologias,
  getCirugiaPatologiaById,
  getCirugiaPatologiaByPatientId,
  createCirugiaPatologia,
  updateCirugiaPatologia,
  deleteCirugiaPatologia
};
