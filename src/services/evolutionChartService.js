import axios from "../services/axiosConfig";

const baseUrl = "/api/evolution-charts";
//const baseUrl = 'http://localhost:3001/api/evolution-charts'; // Ajusta la ruta base según tu configuración

const getAllEvolutionCharts = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

 const getEvolutionChartById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const getEvolutionChartsByPatientId = async (patientId) => {
  const response = await axios.get(`${baseUrl}/patient/${patientId}`);
  return response.data;
};

const createEvolutionChart = async (newEvolutionChart, archivo1, archivo2) => {
  const formData = new FormData();
  
  for (const key in newEvolutionChart) {
    formData.append(key, newEvolutionChart[key]);
  }
  
  if (archivo1) {
    formData.append('archivo1', archivo1, `firma1_${Date.now()}.png`);
  }
  
  if (archivo2) {
    formData.append('archivo2', archivo2, `firma2_${Date.now()}.png`);
  }

  console.log('FormData contents:');
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

  const response = await axios.post(baseUrl, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

const updateEvolutionChart = async (id, updatedCirugiaPatologia, archivo1, archivo2) => {
  const formData = new FormData();
  
  // Agregar campos del formulario
  for (const key in updatedCirugiaPatologia) {
    formData.append(key, updatedCirugiaPatologia[key]);
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

const deleteEvolutionChart = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
}; 

export default {
  getAllEvolutionCharts,
  getEvolutionChartById,
  getEvolutionChartsByPatientId,
  createEvolutionChart,
  updateEvolutionChart,
  deleteEvolutionChart,
};
