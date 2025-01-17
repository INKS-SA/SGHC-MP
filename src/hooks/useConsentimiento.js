import { useEffect, useState } from 'react';
import consentimientoService from '../services/consentimientoService';

export function useConsentimiento() {
  const [consentimientos, setConsentimientos] = useState([]);
  const [consentimiento, setConsentimiento] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (localStorage.loggedUserJSON) {
    setLoading(true);
    consentimientoService.getAllConsentimientos()
      .then(data => {
        setConsentimientos(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
    }
  }, []);
  

  const fetchConsentimientoById = (id) => {
    setLoading(true);
    consentimientoService.getConsentimientoById(id)
      .then(data => {
        setConsentimiento(data);
        setLoading(false);
      })
      .catch(err => {
        setConsentimiento(null);
        setError(err);
        setLoading(false);
      });
  };

  const fetchConsentimientoByPatientId = (patientId) => {
    setLoading(true);
    consentimientoService.getConsentimientoByPatientId(patientId)
      .then(data => {
        if (data) {
          setConsentimiento(data);
        } else {
          setConsentimiento(null);
        }
        setLoading(false);
      })
      .catch(err => {
        setConsentimiento(null);
        setError(err);
        setLoading(false);
      });
  };

  const createConsentimiento = async (newConsentimiento) => {
    try {
      setLoading(true);
      const data = await consentimientoService.createConsentimiento(newConsentimiento);
      setConsentimientos([...consentimientos, data]);
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      setError(err);
      console.error("Error al crear el consentimiento:", err);
      throw err; // Lanzar el error para que pueda ser capturado por el bloque catch en el componente
    }
  };

  const updateConsentimiento = async (id, updatedConsentimiento) => {
    try {
      setLoading(true);
      const data = await consentimientoService.updateConsentimiento(id, updatedConsentimiento);
      setConsentimientos(consentimientos.map(cons => cons._id === id ? data : cons));
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      setError(err);
      console.error("Error al actualizar el consentimiento:", err);
      throw err; // Lanzar el error para que pueda ser capturado por el bloque catch en el componente
    }
  };

  const deleteConsentimiento = (id) => {
    setLoading(true);
    consentimientoService.deleteConsentimiento(id)
      .then(() => {
        setConsentimientos(consentimientos.filter(cons => cons._id !== id));
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  return {
    consentimientos,
    consentimiento,
    loading,
    error,
    fetchConsentimientoById,
    fetchConsentimientoByPatientId,
    createConsentimiento,
    updateConsentimiento,
    deleteConsentimiento,
  };
}
