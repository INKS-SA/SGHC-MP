import { useEffect, useState } from 'react';
import cirugiaPatologiaService from '../services/cirugiaPatologiaService';

export function useCirugiaPatologia() {
  const [cirugiaPatologias, setCirugiaPatologias] = useState([]);
  const [cirugiaPatologia, setCirugiaPatologia] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (localStorage.loggedUserJSON) {
    setLoading(true);
    cirugiaPatologiaService.getAllCirugiaPatologias()
      .then(data => {
        setCirugiaPatologias(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
    }
  }, []);

  const fetchCirugiaPatologiaById = (id) => {
    setLoading(true);
    cirugiaPatologiaService.getCirugiaPatologiaById(id)
      .then(data => {
        setCirugiaPatologia(data);
        setLoading(false);
      })
      .catch(err => {
        setCirugiaPatologia(null);
        setError(err);
        setLoading(false);
      });
  };

  const fetchCirugiaPatologiaByPatientId = (patientId) => {
    setLoading(true);
    cirugiaPatologiaService.getCirugiaPatologiaByPatientId(patientId)
      .then(data => {
        setCirugiaPatologias(data);
        setLoading(false);
      })
      .catch(err => {
        //setCirugiaPatologias(null);
        setError(err);
        setLoading(false);
      });
  };

  const createCirugiaPatologia = async (newCirugiaPatologia, archivo1, archivo2) => {
    try {
      setLoading(true);
      const data = await cirugiaPatologiaService.createCirugiaPatologia(newCirugiaPatologia, archivo1, archivo2);
      setCirugiaPatologias([...cirugiaPatologias, data]);
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      setError(error);
      console.error("Error al crear la cirugía patología:", error);
      throw error; // Propagar el error al llamador
    }
  };
  
  const updateCirugiaPatologia = async (id, updatedCirugiaPatologia, archivo1, archivo2) => {
    try {
      setLoading(true);
      const data = await cirugiaPatologiaService.updateCirugiaPatologia(id, updatedCirugiaPatologia, archivo1, archivo2);
      setCirugiaPatologias(cirugiaPatologias.map(cirugia => cirugia._id === id ? data : cirugia));
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      setError(error);
      console.error("Error al actualizar la cirugía patología:", error);
      throw error; // Propagar el error al llamador
    }
  };
  
  const deleteCirugiaPatologia = (id) => {
    setLoading(true);
    cirugiaPatologiaService.deleteCirugiaPatologia(id)
      .then(() => {
        setCirugiaPatologias(cirugiaPatologias.filter(cirugia => cirugia._id !== id));
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  return {
    cirugiaPatologias,
    cirugiaPatologia,
    loading,
    error,
    fetchCirugiaPatologiaById,
    fetchCirugiaPatologiaByPatientId,
    createCirugiaPatologia,
    updateCirugiaPatologia,
    deleteCirugiaPatologia,
  };
}
