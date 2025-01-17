import axios from "../services/axiosConfig";

const baseUrl = "/api/appointments";
//const baseUrl = 'http://localhost:3001/api/appointments';

const getAllAppointments = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const getAppointmentById = (id) => {
  return axios.get(`${baseUrl}/${id}`).then((response) => response.data);
};

const getAppointmentsByOdontologo = (odontologoId) => {
  return axios.get(`${baseUrl}/odontologo/${odontologoId}`).then((response) => response.data);
};

const getAppointmentsByPaciente = (pacienteId) => {
  return axios.get(`${baseUrl}/paciente/${pacienteId}`).then((response) => response.data);
};

const createAppointment = (newAppointment) => {
  return axios.post(baseUrl, newAppointment).then((response) => response.data);
};

const deleteAppointment = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

const updateAppointment = (id, updatedAppointment) => {
  return axios.put(`${baseUrl}/${id}`, updatedAppointment).then((response) => response.data);
};

const getHorariosOcupados = (odontologoId, fecha) => {
  return axios.get(`${baseUrl}/horarios-ocupados/${odontologoId}/${fecha}`).then((response) => response.data);
};



export default {
  getAllAppointments,
  getAppointmentById,
  getAppointmentsByOdontologo,
  getAppointmentsByPaciente,
  createAppointment,
  deleteAppointment,
  updateAppointment,
  getHorariosOcupados,
};
