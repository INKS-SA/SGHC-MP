import axios from "../services/axiosConfig";

const baseUrl = "/api/budgets";
//const baseUrl = 'http://localhost:3001/api/budgets';

// Funciones existentes
const getAllBudgets = () => {
  return axios.get(baseUrl).then((response) => response.data);
};


const getBudgetById = async (id) => {
  try {
    //console.log('Service - Fetching budget with ID:', id);
    
    if (!id) {
      throw new Error('ID no proporcionado');
    }

    const response = await axios.get(`${baseUrl}/${id}`);
    //console.log('Service - Raw response:', response);

    if (!response.data) {
      throw new Error('No se recibieron datos del servidor');
    }

    return response.data;
  } catch (error) {
    console.error('Service - Error in getBudgetById:', error);
    
    if (error.response) {
      // Error de respuesta del servidor
      throw new Error(error.response.data.message || 'Error del servidor al obtener el presupuesto');
    } else if (error.request) {
      // Error de conexión
      throw new Error('Error de conexión al servidor');
    } else {
      // Otros errores
      throw error;
    }
  }
};

const getBudgetsByPatient = async (patientId) => {
  try {
    if (!patientId) {
      throw new Error('ID de paciente no proporcionado');
    }
    console.log('Obteniendo presupuestos para el paciente:', patientId);
    const response = await axios.get(`${baseUrl}/paciente/${patientId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting budgets by patient:', error);
    throw error;
  }
};

const getBudgetByTreatment = async (treatmentId) => {
  const response = await axios.get(`${baseUrl}/treatment/${treatmentId}`);
  return response.data;
};

const createBudget = async (budgetData) => {
  try {
    console.log('createBudget - Datos:', budgetData);
    const response = await axios.post(baseUrl, budgetData);

    if (response.data) {
      return { success: true, data: response.data };
    }
    throw new Error('No se recibieron datos del servidor');
  } catch (error) {
    console.error('Error en createBudget:', error);
    return { 
      success: false, 
      error: error.response?.data?.error || 'Error al crear el presupuesto'
    };
  }
};

const createBudgetForTreatment = async (treatmentId, budgetData) => {
  return axios.post(`${baseUrl}/treatment/${treatmentId}`, budgetData)
    .then(response => response.data);
};

const createBudgetFromTreatment = async (treatmentPlanId) => {
  try {
    const response = await axios.post(
      `${baseUrl}/from-treatment/${treatmentPlanId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error creating budget from treatment:', error);
    throw error;
  }
 };

const updateBudget = (id, updatedBudget) => {
  return axios.put(`${baseUrl}/${id}`, updatedBudget).then((response) => response.data);
};

/*
const updateBudgetStatus = (id, status) => {
  return axios.patch(`${baseUrl}/${id}/estado`, { estado: status })
    .then((response) => response.data);
};
*/

const deleteBudget = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

export default {
  
  getAllBudgets,
  getBudgetById,
  getBudgetsByPatient,
  getBudgetByTreatment,
  createBudget,
  createBudgetForTreatment,
  createBudgetFromTreatment,
  updateBudget,
  //updateBudgetStatus,
  deleteBudget
};