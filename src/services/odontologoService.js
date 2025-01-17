import axios from "../services/axiosConfig";

const baseUrl = "/api/odontologos";
//const baseUrl = 'http://localhost:3001/api/odontologos';

const getAllOdontologos = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const getOdontologoById = (odontologoId) => {
  return axios.get(`${baseUrl}/${odontologoId}`).then((response) => response.data);
};

const getOdontologoByName = (nombreOdontologo) => {
  return axios.get(`${baseUrl}/nombre/${nombreOdontologo}`).then((response) => response.data);
};

const getOdontologoByLicencia = (numeroLicencia) => {
  return axios.get(`${baseUrl}/licencia/${numeroLicencia}`).then((response) => response.data);
};

const getOdontologoByEspecialidad = (especialidad) => {
    return axios.get(`${baseUrl}/especialidad/${especialidad}`).then((response) => response.data);
    };

const createOdontologo = (newOdontologo) => {
  return axios.post(baseUrl, newOdontologo).then((response) => response.data);
};

const updateOdontologo = (odontologoId, updatedOdontologo) => {
  return axios.put(`${baseUrl}/${odontologoId}`, updatedOdontologo).then((response) => response.data);
};

const deleteOdontologo = (odontologoId) => {
  return axios.delete(`${baseUrl}/${odontologoId}`).then((response) => response.data);
};

export default {
  getAllOdontologos,
  getOdontologoById,
  getOdontologoByName,
  getOdontologoByLicencia,
    getOdontologoByEspecialidad,
  createOdontologo,
  updateOdontologo,
  deleteOdontologo,
};
