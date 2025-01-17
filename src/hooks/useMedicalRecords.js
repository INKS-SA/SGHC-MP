import { useEffect, useState } from 'react';
import medicalRecordsService from '../services/medicalRecordsService';

export function useMedicalRecords() {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [medicalRecord, setMedicalRecord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (localStorage.loggedUserJSON) {
    setLoading(true);
    medicalRecordsService.getAllMedicalRecords()
      .then(data => {
        setMedicalRecords(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
    }
  }, []);

  const fetchMedicalRecordById = (id) => {
    setLoading(true);
    medicalRecordsService.getMedicalRecordById(id)
      .then(data => {
        setMedicalRecord(data);
        setLoading(false);
      })
      .catch(err => {
        setMedicalRecord(null);
        setError(err);
        setLoading(false);
      });
  };

  const fetchMedicalRecordsByPatientId = (patientId) => {
    setLoading(true);
    medicalRecordsService.getMedicalRecordsByPatientId(patientId)
      .then(data => {
        setMedicalRecord(data);
        setLoading(false);
      })
      .catch(err => {
        setMedicalRecord(null);
        setError(err);
        setLoading(false);
      });
  };

  const createMedicalRecord = async (newMedicalRecord) => {
    try {
      setLoading(true);
      const data = await medicalRecordsService.createMedicalRecord(newMedicalRecord);
      setMedicalRecords([...medicalRecords, data]);
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      setError(err);
      console.error("Error al crear el registro médico:", err);
      throw err; // Lanzar el error para que pueda ser capturado por el bloque catch en el controlador correspondiente
    }
  };
  

  const updateMedicalRecord = async (id, updatedMedicalRecord) => {
    try {
      setLoading(true);
      const data = await medicalRecordsService.updateMedicalRecord(id, updatedMedicalRecord);
      setMedicalRecords(medicalRecords.map(record => record.id === id ? data : record));
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      setError(err);
      console.error("Error al actualizar el registro médico:", err);
      throw err; // Lanzar el error para que pueda ser capturado por el bloque catch en el controlador correspondiente
    }
  };
  

  const deleteMedicalRecord = (id) => {
    setLoading(true);
    medicalRecordsService.deleteMedicalRecord(id)
      .then(() => {
        setMedicalRecords(medicalRecords.filter(record => record.id !== id));
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  return {
    medicalRecords,
    medicalRecord,
    loading,
    error,
    fetchMedicalRecordById,
    fetchMedicalRecordsByPatientId,
    createMedicalRecord,
    updateMedicalRecord,
    deleteMedicalRecord,
  };
}
