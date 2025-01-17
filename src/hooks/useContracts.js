import { useState } from 'react';
import contractService from '../services/contractService';
import { toast } from 'react-toastify';

export function useContracts() {
  const [loading, setLoading] = useState(false);

  const uploadContract = async (treatmentId, file) => {
    try {
      setLoading(true);
      const result = await contractService.uploadContract(treatmentId, file);
      return { success: true, data: result };
    } catch (error) {
      toast.error('Error al cargar el contrato');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const updateContract = async (treatmentId, file) => {
    try {
      setLoading(true);
      const result = await contractService.updateContract(treatmentId, file);
      return { success: true, data: result };
    } catch (error) {
      toast.error('Error al actualizar el contrato');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const getContractByTreatment = async (treatmentId) => {
    try {
      setLoading(true);
      return await contractService.getContractByTreatment(treatmentId);
    } catch (error) {
      console.error('Error:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    uploadContract,
    updateContract,
    getContractByTreatment
  };
}