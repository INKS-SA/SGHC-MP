// endodonticTreatmentService.js
import { useEffect, useState } from 'react';
import endodonticTreatmentService from '../services/endodonticTreatmentService';

export function useEndodonticTreatments() {
  const [endodonticTreatments, setEndodonticTreatments] = useState([]);
  const [endodonticTreatment, setEndodonticTreatment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (localStorage.loggedUserJSON) {
    setLoading(true);
    endodonticTreatmentService.getAllEndodonticTreatments()
      .then(data => {
        setEndodonticTreatments(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
    }
  }, []);

  const fetchEndodonticTreatmentById = (id) => {
    setLoading(true);
    endodonticTreatmentService.getEndodonticTreatmentById(id)
      .then(data => {
        setEndodonticTreatment(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  const fetchEndodonticTreatmentsByPatientId = (patientId) => {
    setLoading(true);
    endodonticTreatmentService.getEndodonticTreatmentsByPatientId(patientId)
      .then(data => {
        setEndodonticTreatments(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  const createEndodonticTreatment = async (newEndodonticTreatment, archivo1, archivo2) => {
    try {
      setLoading(true);
      const data = await endodonticTreatmentService.createEndodonticTreatment(newEndodonticTreatment, archivo1, archivo2);
      setEndodonticTreatments([...endodonticTreatments, data]);
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      setError(error);
      console.error("Error al crear el tratamiento endodóntico:", error);
      throw error; // Propagar el error al llamador
    }
  };
  

  const updateEndodonticTreatment = async (id, updatedEndodonticTreatment, archivo1, archivo2) => {
    try {
      setLoading(true);
      const data = await endodonticTreatmentService.updateEndodonticTreatment(id, updatedEndodonticTreatment, archivo1, archivo2);
      setEndodonticTreatments(endodonticTreatments.map(treatment => treatment.id === id ? data : treatment));
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      setError(error);
      console.error("Error al actualizar el tratamiento endodóntico:", error);
      throw error; // Propagar el error al llamador
    }
  };
  

  const deleteEndodonticTreatment = (id) => {
    setLoading(true);
    endodonticTreatmentService.deleteEndodonticTreatment(id)
      .then(() => {
        setEndodonticTreatments(endodonticTreatments.filter(treatment => treatment.id !== id));
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  return {
    endodonticTreatments,
    endodonticTreatment,
    loading,
    error,
    fetchEndodonticTreatmentById,
    fetchEndodonticTreatmentsByPatientId,
    createEndodonticTreatment,
    updateEndodonticTreatment,
    deleteEndodonticTreatment,
  };
}
