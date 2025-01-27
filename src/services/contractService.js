import axios from "../services/axiosConfig";

const baseUrl = "/api/contracts";
//const baseUrl = 'http://localhost:3001/api/contracts';

const uploadContract = async (treatmentId, file) => {
  const formData = new FormData();
  formData.append('contractFile', file);
  const response = await axios.post(`${baseUrl}/${treatmentId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

const getContractByTreatment = async (treatmentId) => {
  console.log(`Fetching contract for treatmentId: ${treatmentId}`); // Log para verificar treatmentId

  const response = await axios.get(`${baseUrl}/treatment/${treatmentId}`);
  console.log('Response:', response); // Log para verificar la respuesta del servidor
  
  return response.data;
};

const updateContract = async (treatmentId, file) => {
  try {
    const formData = new FormData();
    formData.append('contractFile', file);
    
    const response = await axios.put(`${baseUrl}/${treatmentId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error updating contract:', error);
    return { success: false, error: error.message };
  }
};

export default { uploadContract, getContractByTreatment, updateContract };