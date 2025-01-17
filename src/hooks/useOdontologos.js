import { useEffect, useState } from 'react';
import odontologosService from '../services/odontologoService';

export function useOdontologos() {
  const [odontologos, setOdontologos] = useState([]);
  const [odontologo, setOdontologo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (localStorage.loggedUserJSON) {
    setLoading(true);
    odontologosService.getAllOdontologos()
      .then(data => {
        setOdontologos(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
    }
  }, []);

  const fetchOdontologos = () => {
    setLoading(true);
    odontologosService.getAllOdontologos()
      .then(data => {
        setOdontologos(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  const fetchOdontologoById = async (id) => {
  try {
    setLoading(true);
    const response = await odontologosService.getOdontologoById(id);
    setOdontologo(response); // Asegúrate de que se devuelven los datos correctamente
    setLoading(false);
    return response;
  } catch (err) {
    setError(err);
    setLoading(false);
    throw err;
  }
};

  const fetchOdontologoByName = async (nombreOdontologo) => {
    try {
      setLoading(true);
      const data = await odontologosService.getOdontologoByName(nombreOdontologo);
      setOdontologos(data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  const fetchOdontologoByLicencia = async (numeroLicencia) => {
    try {
      setLoading(true);
      const data = await odontologosService.getOdontologoByLicencia(numeroLicencia);
      setOdontologo(data);
      setOdontologos([data]);   
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  const fetchOdontologoByEspecialidad = async (especialidad) => {
    try {
      setLoading(true);
      const data = await odontologosService.getOdontologoByEspecialidad(especialidad);
      setOdontologos(data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  }

  const createOdontologo = async (newOdontologo) => {
    try {
      setLoading(true);
      const data = await odontologosService.createOdontologo(newOdontologo);
      setOdontologos([...odontologos, data]);
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      setError(err);
      throw err;
    }
  };

  const updateOdontologo = async (id, updatedOdontologo) => {
    try {
      setLoading(true);
      const data = await odontologosService.updateOdontologo(id, updatedOdontologo);
      setOdontologos(odontologos.map(o => o.id === id ? data : o));
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      setError(err);
      throw err;
    }
  };

  const deleteOdontologo = (id) => {
    setLoading(true);
    odontologosService.deleteOdontologo(id)
      .then(() => {
        setOdontologos(odontologos.filter(o => o.id !== id));
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  return {
    odontologos,
    odontologo,
    loading,
    error,
    fetchOdontologos,
    fetchOdontologoById,
    fetchOdontologoByName,
    fetchOdontologoByLicencia,
    fetchOdontologoByEspecialidad,
    createOdontologo,
    updateOdontologo,
    deleteOdontologo,
    setOdontologo
  };
}
