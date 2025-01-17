import { useEffect, useState } from 'react';
import evolucionOrtodonciaService from '../services/evolucionOrtodonciaService';

export function useEvolucionOrtodoncia() {
  const [evoluciones, setEvoluciones] = useState([]);
  const [evolucion, setEvolucion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (localStorage.loggedUserJSON) {
    setLoading(true);
    evolucionOrtodonciaService.getAll()
      .then(data => {
        setEvoluciones(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
    }
  }, []);

  const fetchEvolucionById = (id) => {
    setLoading(true);
    evolucionOrtodonciaService.getById(id)
      .then(data => {
        setEvolucion(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  const fetchEvolucionesByOrtodonciaId = (ortodonciaId) => {
    setLoading(true);
    evolucionOrtodonciaService.getByOrtodonciaId(ortodonciaId)
      .then(data => {
        setEvoluciones(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
        setEvoluciones([]);
      });
  };

  const createEvolucion = async (newEvolucion) => {
    try {
      setLoading(true);
      const data = await evolucionOrtodonciaService.create(newEvolucion);
      setEvoluciones([...evoluciones, data]);
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      setError(error);
      console.error("Error al crear la evolución:", error);
      throw error; // Propagar el error al llamador
    }
  };
  

  const updateEvolucion = async (id, updatedEvolucion) => {
    try {
      setLoading(true);
      const data = await evolucionOrtodonciaService.update(id, updatedEvolucion);
      setEvoluciones(evoluciones.map(evolucion => evolucion.id === id ? data : evolucion));
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      setError(error);
      console.error("Error al actualizar la evolución:", error);
      throw error; // Propagar el error al llamador
    }
  };
  

  const deleteEvolucion = (id) => {
    setLoading(true);
    evolucionOrtodonciaService.remove(id)
      .then(() => {
        setEvoluciones(evoluciones.filter(evolucion => evolucion.id !== id));
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  return {
    evoluciones,
    evolucion,
    loading,
    error,
    fetchEvolucionById,
    fetchEvolucionesByOrtodonciaId,
    createEvolucion,
    updateEvolucion,
    deleteEvolucion
  };
}
