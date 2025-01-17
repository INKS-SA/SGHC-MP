import axios from "../services/axiosConfig";

const baseUrl = "/api/treatment-plans";	
//const baseUrl = 'http://localhost:3001/api/treatment-plans';

// Obtener todos los tratamientos
const getAll = async () => {
  try {
    console.log('Solicitando planificaciones al servidor');
    const response = await axios.get(baseUrl);
    console.log('Datos recibidos del servidor:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error en getAll:', error.response || error);
    throw error;
  }
};

// Obtener tratamientos por paciente
const getByPatientId = async (patientId) => {
  try {
    console.log('Service - Fetching treatments for patient:', patientId);
    const response = await axios.get(`${baseUrl}/patient/${patientId}`);
    console.log('Service - Treatments received:', response.data);
    return response.data;
  } catch (error) {
    console.error('Service - Error fetching treatments:', error);
    throw error;
  }
};

const getByPatient = async (patientId) => {
  try{
    if (!patientId) throw new Error('ID de paciente no proporcionado');
    const response = await axios.get(`${baseUrl}/paciente/${patientId}`);
    return response.data;
  }catch(error){
    console.error('Error al obtener tratamientos por paciente:', error);
    throw error;
  }
}

// Obtener un tratamiento específico
const getById = async (id) => {
  try {
    console.log('Service - Fetching treatment with ID:', id);
    if (!id) throw new Error('ID no proporcionado');
    
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Service - Error fetching treatment:', error);
    throw error;
  }
};

// Crear nuevo tratamiento
const create = async (newTreatment) => {
  console.log('Creating treatment with data:', JSON.stringify(newTreatment));
  try {
    const response = await axios.post(baseUrl, newTreatment);
    return response.data;
  } catch (error) {
    console.error('Full error details:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url
    });
    throw error;
  }
};

const addActivity = async (treatmentId, activityData) => {
  const response = await axios.post(`${baseUrl}/${treatmentId}/actividades`, activityData);
  return response.data;
};

const updateActivityStatus = async (treatmentId, activityIndex, estado) => {
  const response = await axios.patch(
    `${baseUrl}/${treatmentId}/actividades/${activityIndex}/estado`,
    { estado }
  );
  return response.data;
};

// Actualizar tratamiento
const update = async (id, treatmentData) => {
  try {
    if (!id) {
      throw new Error('ID no proporcionado para actualizar');
    }
    console.log('Updating treatment:', { id, data: treatmentData });
    const response = await axios.put(`${baseUrl}/${id}`, treatmentData);
    return response.data;
  } catch (error) {
    console.error('Error updating treatment:', error.response?.data);
    throw error;
  }
};

// Eliminar tratamiento
const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

export default {
  getAll,
  getByPatientId,
  getByPatient,
  getById,
  create,
  addActivity,
  updateActivityStatus,
  update,
  remove
};