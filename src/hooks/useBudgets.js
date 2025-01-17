import { useState, useCallback } from 'react';
import budgetService from '../services/budgetService';
import { toast } from 'react-toastify';

export function useBudgets() {
  const [budgets, setBudgets] = useState([]);
  const [currentBudget, setCurrentBudget] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleError = useCallback((err) => {
    console.error('Error en operación de presupuesto:', err);
    setError(err.response?.data?.error || err.message);
    setLoading(false);
    return { success: false, error: err.message };
  }, []);

  const fetchBudgets = useCallback(async () => {
    try {
      setLoading(true);
      const data = await budgetService.getAllBudgets();
      setBudgets(data);
      setLoading(false);
      return { success: true, data };
    } catch (err) {
      return handleError(err);
    }
  }, [handleError]);
  

  const fetchBudgetsByPatient = useCallback(async (patientId) => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching budgets for patient:', patientId);
      const data = await budgetService.getBudgetsByPatient(patientId);
      setBudgets(data);
      setLoading(false);
      return { success: true, data };
    } catch (err) {
      return handleError(err);
    }
  }, [handleError]);

  const fetchBudgetById = useCallback(async (budgetId) => {
    try {
      setLoading(true);
      setError(null);
      
      if (!budgetId) {
        throw new Error('ID de presupuesto no proporcionado');
      }
  
      const response = await budgetService.getBudgetById(budgetId);
      setCurrentBudget(response);
      setLoading(false);
  
      return { success: true, data: response };
    } catch (err) {
      return handleError(err);
    }
  }, [handleError]);

  const createBudget = useCallback(async (budgetData) => {
    try {
      setLoading(true);
      /*
      if (budgetData.treatmentPlan) {
        const existingBudget = await budgetService.getBudgetByTreatment(budgetData.treatmentPlan);
        if (existingBudget) {
          throw new Error('Ya existe un presupuesto para esta planificación');
        }
      }
        */
      const data = await budgetService.createBudget(budgetData);
      setBudgets(prev => [...prev, data]);
      setLoading(false);
      toast.success('Presupuesto creado exitosamente');
      return { success: true, data };
    } catch (err) {
      toast.error(err.message || 'Error al crear el presupuesto');
      return handleError(err);
    }
  }, [handleError]);

  const createBudgetFromTreatment = useCallback(async (treatmentPlanId) => {
    try {
      setLoading(true);
      const data = await budgetService.createBudgetFromTreatment(treatmentPlanId);
      setBudgets(prev => [...prev, data]);
      setLoading(false);
      toast.success('Presupuesto creado exitosamente desde planificación');
      return { success: true, data };
    } catch (err) {
      toast.error('Error al crear el presupuesto desde planificación');
      return handleError(err);
    }
  }, [handleError]);

  const updateBudget = useCallback(async (budgetId, budgetData) => {
    try {
      setLoading(true);
      const data = await budgetService.updateBudget(budgetId, budgetData);
      setBudgets(prev => prev.map(budget => 
        budget._id === budgetId ? data : budget
      ));
      setLoading(false);
      toast.success('Presupuesto actualizado exitosamente');
      return { success: true, data };
    } catch (err) {
      toast.error('Error al actualizar el presupuesto');
      return handleError(err);
    }
  }, [handleError]);

  const calculateTotals = useCallback((fases) => {
    let totalGeneral = 0;
    const fasesCalculated = fases.map(fase => {
      let totalFase = 0;
      const procedimientosCalculated = fase.procedimientos.map(proc => {
        const costoTotal = proc.numeroPiezas * proc.costoPorUnidad;
        totalFase += costoTotal;
        return { ...proc, costoTotal };
      });
      totalGeneral += totalFase;
      return { ...fase, procedimientos: procedimientosCalculated, total: totalFase };
    });
    return { fases: fasesCalculated, totalGeneral };
  }, []);

  return {
    budgets,
    currentBudget,
    loading,
    error,
    fetchBudgets,
    fetchBudgetsByPatient,
    fetchBudgetById,
    createBudget,
    createBudgetFromTreatment,
    updateBudget,
    calculateTotals,
    setCurrentBudget
  };
}