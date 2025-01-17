import { useState, useCallback } from 'react';
import appointmentsService from '../services/appointmentsService';

export function useAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleError = useCallback((err) => {
    console.error('Error in appointment operation:', err);
    setError(err.response?.data?.error || err.message || 'An unexpected error occurred');
    setLoading(false);
  }, []);

  const fetchAppointments = useCallback(async () => {
    try {
      setLoading(true);
      const data = await appointmentsService.getAllAppointments();
      setAppointments(data);
      setLoading(false);
      return { success: true, data };
    } catch (err) {
      handleError(err);
      return { success: false, error: err.response?.data?.error || 'Error fetching appointments' };
    }
  }, [handleError]);

  const fetchAppointmentById = useCallback(async (id) => {
    try {
      setLoading(true);
      const data = await appointmentsService.getAppointmentById(id);
      setLoading(false);
      return { success: true, data };
    } catch (err) {
      handleError(err);
      return { success: false, error: err.response?.data?.error || 'Error fetching appointment' };
    }
  }, [handleError]);

  const fetchAppointmentsByOdontologo = useCallback(async (odontologoId) => {
    try {
      setLoading(true);
      const data = await appointmentsService.getAppointmentsByOdontologo(odontologoId);
      setAppointments(data);
      setLoading(false);
      return { success: true, data };
    } catch (err) {
      handleError(err);
      return { success: false, error: err.response?.data?.error || 'Error fetching appointments by odontólogo' };
    }
  }, [handleError]);

  const fetchAppointmentsByPaciente = useCallback(async (pacienteId) => {
    try {
      setLoading(true);
      const data = await appointmentsService.getAppointmentsByPaciente(pacienteId);
      setAppointments(data);
      setLoading(false);
      return { success: true, data };
    } catch (err) {
      handleError(err);
      return { success: false, error: err.response?.data?.error || 'Error fetching appointments by paciente' };
    }
  }, [handleError]);

  const createAppointment = useCallback(async (newAppointment) => {
    try {
      setLoading(true);
      const data = await appointmentsService.createAppointment(newAppointment);
      setAppointments(prevAppointments => [...prevAppointments, data]);
      setLoading(false);
      return { success: true, data };
    } catch (err) {
      handleError(err);
      throw err; //REVISAR BIEN PORQUE NO FUNCIONA CON LA LÓGICA CON EL RETURN
      
      //return { success: false, error: err.response?.data?.error || 'Error creating appointment' }; 
    }
  }, [handleError]);

  const deleteAppointment = useCallback(async (id) => {
    try {
      setLoading(true);
      await appointmentsService.deleteAppointment(id);
      setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment.id !== id));
      setLoading(false);
      return { success: true };
    } catch (err) {
      handleError(err);
      return { success: false, error: err.response?.data?.error || 'Error deleting appointment' };
    }
  }, [handleError]);

  const updateAppointment = useCallback(async (id, updatedAppointment) => {
    try {
      setLoading(true);
      const data = await appointmentsService.updateAppointment(id, updatedAppointment);
      setAppointments(prevAppointments => 
        prevAppointments.map(appointment => appointment.id === id ? data : appointment)
      );
      setLoading(false);
      return { success: true, data };
    } catch (err) {
      handleError(err);
      return { success: false, error: err.response?.data?.error || 'Error updating appointment' };
    }
  }, [handleError]);
  
  const fetchHorariosOcupados = useCallback(async (odontologoId, fecha) => {
    try {
      setLoading(true);
      const data = await appointmentsService.getHorariosOcupados(odontologoId, fecha);
      setLoading(false);
      return { success: true, data };
    } catch (err) {
      handleError(err);
      return { success: false, error: err.response?.data?.error || 'Error fetching horarios ocupados' };
    }
  }, [handleError]);

  return {
    appointments,
    loading,
    error,
    fetchAppointments,
    fetchAppointmentById,
    fetchAppointmentsByOdontologo,
    fetchAppointmentsByPaciente,
    createAppointment,
    deleteAppointment,
    updateAppointment,
    fetchHorariosOcupados,
  };
}