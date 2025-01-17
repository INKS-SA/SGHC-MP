import { useEffect, useState } from 'react';
import disfuncionMandibularService from '../services/disfuncionMandibularService';

export function useDisfuncionMandibular() {
  const [disfuncionMandibularList, setDisfuncionMandibularList] = useState([]);
  const [disfuncionMandibular, setDisfuncionMandibular] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (localStorage.loggedUserJSON) {
    setLoading(true);
    disfuncionMandibularService.getAllDisfuncionMandibular()
      .then(data => {
        setDisfuncionMandibularList(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
    }
  }, []);

  const fetchDisfuncionMandibularById = (id) => {
    setLoading(true);
    disfuncionMandibularService.getDisfuncionMandibularById(id)
      .then(data => {
        setDisfuncionMandibular(data);
        setLoading(false);
      })
      .catch(err => {
        setDisfuncionMandibular(null);
        setError(err);
        setLoading(false);
      });
  };

  const fetchDisfuncionMandibularByPatientId = (patientId) => {
    setLoading(true);
    disfuncionMandibularService.getDisfuncionMandibularByPatientId(patientId)
      .then(data => {
        setDisfuncionMandibular(data);
        setLoading(false);
      })
      .catch(err => {
        setDisfuncionMandibular(null);
        setError(err);
        setLoading(false);
      });
  };

  const createDisfuncionMandibular = async (newDisfuncionMandibular) => {
    try {
      setLoading(true);
      const data = await disfuncionMandibularService.createDisfuncionMandibular(newDisfuncionMandibular);
      setDisfuncionMandibularList([...disfuncionMandibularList, data]);
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      setError(error);
      console.error("Error al crear la disfunción mandibular:", error);
      throw error; // Propagar el error al llamador
    }
  };
  
  const updateDisfuncionMandibular = async (id, updatedDisfuncionMandibular) => {
    try {
      setLoading(true);
      const data = await disfuncionMandibularService.updateDisfuncionMandibular(id, updatedDisfuncionMandibular);
      setDisfuncionMandibularList(disfuncionMandibularList.map(item => item.id === id ? data : item));
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      setError(error);
      console.error("Error al actualizar la disfunción mandibular:", error);
      throw error; // Propagar el error al llamador
    }
  };
  

  const deleteDisfuncionMandibular = (id) => {
    setLoading(true);
    disfuncionMandibularService.deleteDisfuncionMandibular(id)
      .then(() => {
        setDisfuncionMandibularList(disfuncionMandibularList.filter(item => item.id !== id));
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  return {
    disfuncionMandibularList,
    disfuncionMandibular,
    loading,
    error,
    fetchDisfuncionMandibularById,
    fetchDisfuncionMandibularByPatientId,
    createDisfuncionMandibular,
    updateDisfuncionMandibular,
    deleteDisfuncionMandibular,
  };
}
