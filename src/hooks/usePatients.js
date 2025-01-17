import { useEffect, useState } from 'react';
import patientsService from '../services/patients';

export function usePatients() {
  const [patients, setPatients] = useState([]);
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (localStorage.loggedUserJSON) {
    setLoading(true);
    patientsService.getAllPatients()
      .then(data => {
        setPatients(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
    }
  }, []);

  const fetchPatients = () => {
    setLoading(true);
    patientsService.getAllPatients()
      .then(data => {
        setPatients(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }

  const fetchPatientById = (id) => {
    setLoading(true);
    patientsService.getPatientById(id)
      .then(data => {
        setPatient(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };
/*
  const fetchPatientByCedula = async (numeroCedula) => {
    try {
      setLoading(true);
      const data = await patientsService.getPatientByCedula(numeroCedula);
      setPatient(data);
      setPatients([data]);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
      console.error("Error al buscar:", err);
      throw err;  // Lanzar el error para que pueda ser capturado por el bloque catch en handleCreateSubmit
    }
  };
*/
  const fetchPatientByCedula = async (numeroCedula) => {
    try {
      setLoading(true);
      const data = await patientsService.getPatientByCedula(numeroCedula);
      if (data) {
        setPatient(data);
        setPatients([data]);
        setLoading(false);
        return { success: true, data };
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
      toast.info('No se encontraron presupuestos');
      //return { success: false, error: err.message };
    }
  };
/*
  const fetchPatientByName = async (name) => {
    try {
      setLoading(true);
      const data = await patientsService.getPatientByName(name);
      setPatients(data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
      console.error("Error al buscar:", err);
      throw err;  // Lanzar el error para que pueda ser capturado por el bloque catch en handleCreateSubmit
    }
  };
*/

  const fetchPatientByName = async (name) => {
    try {
      setLoading(true);
      const data = await patientsService.getPatientByName(name);
      if (data) {
        setPatients(Array.isArray(data) ? data : [data]);
        setLoading(false);
        return { success: true, data };
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
      toast.info('No se encontraron presupuestos');
    }
  };

  const createPatient = async (newPatient) => {
    try {
      setLoading(true);
      const data = await patientsService.createPatient(newPatient);
      setPatients([...patients, data]);
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      setError(err);
      console.error("Error al crear:", err);
      throw err;  // Lanzar el error para que pueda ser capturado por el bloque catch en handleCreateSubmit
    }
  };
  

  const updatePatient = async (id, updatedPatient) => {
    try {
      setLoading(true);
      const data = await patientsService.updatePatient(id, updatedPatient);
      setPatients(patients.map(patient => patient.id === id ? data : patient));
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      setError(err);
      throw err; // Lanzar el error para que pueda ser capturado por el bloque catch en el controlador correspondiente
    }
  };
  

  const deletePatient = (id) => {
    setLoading(true);
    patientsService.deletePatient(id)
      .then(() => {
        setPatients(patients.filter(patient => patient.id !== id));
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  return {
    patients,
    patient,
    loading,
    error,
    fetchPatients,
    fetchPatientById,
    fetchPatientByCedula,
    fetchPatientByName,
    createPatient,
    updatePatient,
    deletePatient,
    setPatient
  };
}
