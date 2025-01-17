import { useEffect, useState } from 'react';
import rehabilitacionOralService from '../services/rehabilitacionOralService';

export function useRehabilitacionOral() {
  const [rehabilitacionOralList, setRehabilitacionOralList] = useState([]);
  const [rehabilitacionOral, setRehabilitacionOral] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (localStorage.loggedUserJSON) {
    setLoading(true);
    rehabilitacionOralService.getAllRehabilitacionOral()
      .then(data => {
        setRehabilitacionOralList(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
    }
  }, []);

  const fetchRehabilitacionOralById = (id) => {
    setLoading(true);
    rehabilitacionOralService.getRehabilitacionOralById(id)
      .then(data => {
        setRehabilitacionOral(data);
        setLoading(false);
      })
      .catch(err => {
        setRehabilitacionOral(null);
        setError(err);
        setLoading(false);
      });
  };

  const fetchRehabilitacionOralByPatientId = (patientId) => {
    setLoading(true);
    rehabilitacionOralService.getRehabilitacionOralByPatientId(patientId)
      .then(data => {
        setRehabilitacionOral(data);
        setLoading(false);
      })
      .catch(err => {
        setRehabilitacionOral(null);
        setError(err);
        setLoading(false);
      });
  };

  const createRehabilitacionOral = async (newRehabilitacionOral, archivo1, archivo2, archivo3) => {
    try {
      setLoading(true);
      const data = await rehabilitacionOralService.createRehabilitacionOral(newRehabilitacionOral, archivo1, archivo2, archivo3);
      setRehabilitacionOralList([...rehabilitacionOralList, data]);
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      setError(error);
      console.error("Error al crear la rehabilitación oral:", error);
      throw error; // Propagar el error al llamador
    }
  };

  const updateRehabilitacionOral = async (id, updatedRehabilitacionOral, archivo1, archivo2, archivo3) => {
    try {
      setLoading(true);
      const data = await rehabilitacionOralService.updateRehabilitacionOral(id, updatedRehabilitacionOral, archivo1, archivo2, archivo3);
      setRehabilitacionOralList(rehabilitacionOralList.map(item => item.id === id ? data : item));
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      setError(error);
      console.error("Error al actualizar la rehabilitación oral:", error);
      throw error; // Propagar el error al llamador
    }
  };
  

  const deleteRehabilitacionOral = (id) => {
    setLoading(true);
    rehabilitacionOralService.deleteRehabilitacionOral(id)
      .then(() => {
        setRehabilitacionOralList(rehabilitacionOralList.filter(item => item.id !== id));
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  return {
    rehabilitacionOralList,
    rehabilitacionOral,
    loading,
    error,
    fetchRehabilitacionOralById,
    fetchRehabilitacionOralByPatientId,
    createRehabilitacionOral,
    updateRehabilitacionOral,
    deleteRehabilitacionOral,
  };
}
