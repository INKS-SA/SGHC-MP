import { useEffect, useState } from 'react';
import ortodonciaService from '../services/ortodonciaService';

export function useOrtodoncia() {
  const [ortodoncias, setOrtodoncias] = useState([]);
  const [ortodoncia, setOrtodoncia] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (localStorage.loggedUserJSON) {
    setLoading(true);
    ortodonciaService.getAllOrtodoncias()
      .then(data => {
        setOrtodoncias(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
    }
  }, []);

  const fetchOrtodonciaById = (id) => {
    setLoading(true);
    ortodonciaService.getOrtodonciaById(id)
      .then(data => {
        setOrtodoncia(data);
        setLoading(false);
      })
      .catch(err => {
        setOrtodoncia(null);
        setError(err);
        setLoading(false);
      });
  };

  const fetchOrtodonciasByPatientId = (patientId) => {
    setLoading(true);
    ortodonciaService.getOrtodonciasByPatientId(patientId)
      .then(data => {
        setOrtodoncia(data);
        setLoading(false);
      })
      .catch(err => {
        setOrtodoncia(null);
        setError(err);
        setLoading(false);
      });
  };

  const createOrtodoncia = async (newOrtodoncia, archivo1, archivo2, archivo3) => {
    try {
      setLoading(true);
      const data = await ortodonciaService.createOrtodoncia(newOrtodoncia, archivo1, archivo2, archivo3);
      setOrtodoncias([...ortodoncias, data]);
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      setError(error);
      console.error("Error al crear la ortodoncia:", error);
      throw error; // Propagar el error al llamador
    }
  };
  

  const updateOrtodoncia = async (id, updatedOrtodoncia, archivo1, archivo2, archivo3) => {
    try {
      setLoading(true);
      const data = await ortodonciaService.updateOrtodoncia(id, updatedOrtodoncia, archivo1, archivo2, archivo3);
      setOrtodoncias(ortodoncias.map(ortodoncia => ortodoncia.id === id ? data : ortodoncia));
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      setError(error);
      console.error("Error al actualizar la ortodoncia:", error);
      throw error; // Propagar el error al llamador
    }
  };
  

  const deleteOrtodoncia = (id) => {
    setLoading(true);
    ortodonciaService.deleteOrtodoncia(id)
      .then(() => {
        setOrtodoncias(ortodoncias.filter(ortodoncia => ortodoncia.id !== id));
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  return {
    ortodoncias,
    ortodoncia,
    loading,
    error,
    fetchOrtodonciaById,
    fetchOrtodonciasByPatientId,
    createOrtodoncia,
    updateOrtodoncia,
    deleteOrtodoncia,
  };
}
