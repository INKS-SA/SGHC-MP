import { useState, useCallback } from 'react';
import patientTreatmentService from '../services/patientTreatmentService';
import { toast } from 'react-toastify';

export function  usePatientTreatments  ()  {
  const [patientTreatments, setPatientTreatments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleError = useCallback((err) => {
    console.error('Error en operación de presupuesto:', err);
    setError(err.response?.data?.error || err.message);
    setLoading(false);
    return { success: false, error: err.message };
  }, []);
  
  const getAllPatientTreatments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await patientTreatmentService.getAll();
      if (Array.isArray(data)) {
        setPatientTreatments(data);
        return data; // Retornar los datos
      } else {
        console.error('Los datos recibidos no son un array:', data);
        setPatientTreatments([]);
        return [];
      }
    } catch (error) {
      console.error('Hook - Error getting treatments:', error);
      setError(error.message);
      setPatientTreatments([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getPatientTreatmentsByPatientId = async (id) => {
    try {
      setLoading(true);
      const data = await patientTreatmentService.getByPatientId(id);
      setPatientTreatments(data || []); // Asegurar que siempre tengamos un array
      setLoading(false);
      return data || []; // Retornar array vacío si no hay datos
    } catch (error) {
      setError(error.message);
      setLoading(false);
      toast.error('Error al obtener los tratamientos del paciente');
      return []; // Retornar array vacío en caso de error
    }
  };

const createPatientTreatment = async (treatmentData) => {
  try {
    console.log('Datos recibidos en hook:', treatmentData);
    const data = await patientTreatmentService.create(treatmentData);
    setPatientTreatments(prev => [...prev, data]);
    toast.success('Planificación creada exitosamente');
    return data;
  } catch (error) {
    console.error('Error en hook:', error);
    throw error;
  }
};

  // Agregar nuevas actividades
  const addActivity = async (treatmentId, activityData) => {
    try {
      setLoading(true);
      const updatedTreatment = await patientTreatmentService.addActivity(treatmentId, activityData);
      setPatientTreatments(prevTreatments => 
        prevTreatments.map(t => t.id === treatmentId ? updatedTreatment : t)
      );
      setLoading(false);
      toast.success('Actividad agregada exitosamente');
    } catch (error) {
      setError(error.message);
      setLoading(false);
      toast.error('Error al agregar actividad');
    }
  };


  const updatePatientTreatment = async (id, treatmentData) => {
    try {
      setLoading(true);
      console.log('Hook - Updating treatment:', { id, data: treatmentData });
      const updatedTreatment = await patientTreatmentService.update(id, treatmentData);
      setPatientTreatments(prev => 
        prev.map(treatment => treatment.id === id ? updatedTreatment : treatment)
      );
      setLoading(false);
      toast.success('Planificación actualizada exitosamente');
      return updatedTreatment;
    } catch (error) {
      setError(error.message);
      setLoading(false);
      toast.error('Error al actualizar la planificación');
      throw error;
    }
  };

  const deletePatientTreatment = async (id) => {
    try {
      setLoading(true);
      await patientTreatmentService.remove(id);
      setPatientTreatments(prevTreatments => 
        prevTreatments.filter(treatment => treatment.id !== id)
      );
      setLoading(false);
      toast.success('Tratamiento eliminado exitosamente');
    } catch (error) {
      setError(error.message);
      setLoading(false);
      toast.error('Error al eliminar el tratamiento');
    }
  };

  const fecthPatientTreatmentsByPatient = useCallback(async (patientId) => {
    try{
      setLoading(true);
      setError(null);
      const data = await patientTreatmentService.getByPatientId(patientId);
      setPatientTreatments(data);
      setLoading(false);
      return { success: true, data };
    }catch (err){
      return handleError(err);
    }
  }, [handleError]);

  return {
    patientTreatments,
    loading,
    error,
    getAllPatientTreatments,
    getPatientTreatmentsByPatientId,
    createPatientTreatment,
    addActivity,
    updatePatientTreatment,
    deletePatientTreatment,
    fecthPatientTreatmentsByPatient,
  };
};

export default usePatientTreatments;