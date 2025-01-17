import axios from "../services/axiosConfig";

const baseUrl = "/api/periodoncia";
//const baseUrl = "http://localhost:3001/api/periodoncia";

const getAllPeriodonticTreatments = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getPeriodonticTreatmentById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const getPeriodonticTreatmentsByPatientId = async (patientId) => {
  const response = await axios.get(`${baseUrl}/patient/${patientId}`);
  return response.data;
};

const createPeriodonticTreatment = async (newPeriodonticTreatment, archivo1, archivo2) => {
  const formData = new FormData();
  
  // Agregar campos del formulario
  for (const key in newPeriodonticTreatment) {
    if (Array.isArray(newPeriodonticTreatment[key])) {
      newPeriodonticTreatment[key].forEach((value, index) => {
        formData.append(`${key}[${index}]`, value);
      });
    } else {
      formData.append(key, newPeriodonticTreatment[key]);
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
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};


const updatePeriodonticTreatment = async (id, updatedPeriodonticTreatment, archivo1, archivo2) => {
  const formData = new FormData();
  
  // Agregar campos del formulario
  for (const key in updatedPeriodonticTreatment) {
    if (Array.isArray(updatedPeriodonticTreatment[key])) {
      updatedPeriodonticTreatment[key].forEach((value, index) => {
        formData.append(`${key}[${index}]`, value);
      });
    } else {
      formData.append(key, updatedPeriodonticTreatment[key]);
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
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};


const deletePeriodonticTreatment = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

export default {
  getAllPeriodonticTreatments,
  getPeriodonticTreatmentById,
  getPeriodonticTreatmentsByPatientId,
  createPeriodonticTreatment,
  updatePeriodonticTreatment,
  deletePeriodonticTreatment,
};
