// usePeriodonticTreatments.js
import { useEffect, useState } from 'react';
import periodonticTreatmentService from '../services/periodonticTreatmentService';

export function usePeriodonticTreatments() {
  const [periodonticTreatments, setPeriodonticTreatments] = useState([]);
  const [periodonticTreatment, setPeriodonticTreatment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (localStorage.loggedUserJSON) {
    setLoading(true);
    periodonticTreatmentService.getAllPeriodonticTreatments()
      .then(data => {
        setPeriodonticTreatments(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
    }
  }, []);

  const fetchPeriodonticTreatmentById = (id) => {
    setLoading(true);
    periodonticTreatmentService.getPeriodonticTreatmentById(id)
      .then(data => {
        setPeriodonticTreatment(data);
        setLoading(false);
      })
      .catch(err => {
        setPeriodonticTreatment(null);
        setError(err);
        setLoading(false);
      });
  };

  const fetchPeriodonticTreatmentsByPatientId = (patientId) => {
    setLoading(true);
    periodonticTreatmentService.getPeriodonticTreatmentsByPatientId(patientId)
      .then(data => {
        setPeriodonticTreatment(data);
        setLoading(false);
      })
      .catch(err => {
        setPeriodonticTreatment(null);
        setError(err);
        setLoading(false);
      });
  };

  const createPeriodonticTreatment = async (newPeriodonticTreatment, archivo1, archivo2) => {
    try {
      setLoading(true);
      const data = await periodonticTreatmentService.createPeriodonticTreatment(newPeriodonticTreatment, archivo1, archivo2);
      setPeriodonticTreatments([...periodonticTreatments, data]);
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      setError(error);
      console.error("Error al crear el tratamiento periodontal:", error);
      throw error; // Propagar el error al llamador
    }
  };
  

  const updatePeriodonticTreatment = async (id, updatedPeriodonticTreatment, archivo1, archivo2) => {
    try {
      setLoading(true);
      const data = await periodonticTreatmentService.updatePeriodonticTreatment(id, updatedPeriodonticTreatment, archivo1, archivo2);
      setPeriodonticTreatments(periodonticTreatments.map(treatment => treatment.id === id ? data : treatment));
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      setError(error);
      console.error("Error al actualizar el tratamiento periodontal:", error);
      throw error; // Propagar el error al llamador
    }
  };
  

  const deletePeriodonticTreatment = (id) => {
    setLoading(true);
    periodonticTreatmentService.deletePeriodonticTreatment(id)
      .then(() => {
        setPeriodonticTreatments(periodonticTreatments.filter(treatment => treatment.id !== id));
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  return {
    periodonticTreatments,
    periodonticTreatment,
    loading,
    error,
    fetchPeriodonticTreatmentById,
    fetchPeriodonticTreatmentsByPatientId,
    createPeriodonticTreatment,
    updatePeriodonticTreatment,
    deletePeriodonticTreatment,
  };
}
