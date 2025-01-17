import { useState, useCallback } from 'react';
import paymentService from '../services/paymentService';
import { toast } from 'react-toastify';

export function usePayments() {
  const [paymentSummary, setPaymentSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleError = useCallback((err) => {
    console.error('Error en operación de pago:', err);
    setError(err.response?.data?.error || err.message);
    setLoading(false);
    return { success: false, error: err.message };
  }, []);

  // Obtener resumen de pagos de un presupuesto

  const fetchPaymentSummary = useCallback(async (budgetId) => {
    try {
      setLoading(true);
      const data = await paymentService.getBudgetPaymentsSummary(budgetId);
      
      const formattedData = {
        resumenGeneral: {
          totalPresupuesto: data.resumenGeneral.totalPresupuesto,
          totalPagado: data.resumenGeneral.totalPagado || 0,
          saldoPendiente: data.resumenGeneral.totalPresupuesto - (data.resumenGeneral.totalPagado || 0),
          estadoPago: data.resumenGeneral.estadoPago || 'pendiente',
          porcentajePagado: data.resumenGeneral.porcentajePagado || 0
        },
        fases: data.fases.map(fase => ({
          ...fase,
          totalPagado: fase.totalPagado || 0,
          saldoPendiente: fase.totalFase - (fase.totalPagado || 0),
          pagos: fase.pagos || []
        }))
      };
  
      setPaymentSummary(formattedData);
      setLoading(false);
      return formattedData;
    } catch (err) {
      handleError(err);
      return null;
    }
  }, [handleError]);

  // Registrar nuevo pago
  
  const registerPayment = useCallback(async (budgetId, faseIndex, paymentData) => {
    try {
      setLoading(true);
      
      // Validar el monto del pago
      const fase = paymentSummary.fases[faseIndex];
      const validationResult = paymentService.validatePaymentAmount(
        paymentData.monto, 
        fase.saldoPendiente
      );

      if (!validationResult.isValid) {
        toast.error(validationResult.message);
        setLoading(false);
        return { success: false, error: validationResult.message };
      }

      const data = await paymentService.createPayment(budgetId, faseIndex, paymentData);
      
      // Actualizar el resumen local
      await fetchPaymentSummary(budgetId);
      
      setLoading(false);
      toast.success('Pago registrado exitosamente');
      return { success: true, data };
    } catch (err) {
      toast.error('Error al registrar el pago');
      return handleError(err);
    }
  }, [handleError, paymentSummary, fetchPaymentSummary]);

  const registerPaymentForTreatment = useCallback(async (budgetId, faseIndex, treatmentId, paymentData) => {
    try {
      setLoading(true);
      const data = await paymentService.createPaymentForTreatment(budgetId, faseIndex, treatmentId, paymentData);
      await fetchPaymentSummary(budgetId);
      setLoading(false);
      return { success: true, data };
    } catch (err) {
      return handleError(err);
    }
  }, [handleError, fetchPaymentSummary]);
  
/*
  const registerPayment = useCallback(async (budgetId, faseIndex, paymentData) => {
    try {
      setLoading(true);
  
      // Validar el monto del pago
      const fase = paymentSummary.fases[faseIndex];
      const validationResult = paymentService.validatePaymentAmount(
        paymentData.monto,
        fase.saldoPendiente
      );
  
      if (!validationResult.isValid) {
        toast.error(validationResult.message);
        setLoading(false);
        return { success: false, error: validationResult.message };
      }
  
      const data = await paymentService.createPayment(budgetId, faseIndex, paymentData);
  
      // Actualizar el resumen local
      const updatedSummary = await fetchPaymentSummary(budgetId);
      setPaymentSummary(updatedSummary);
  
      setLoading(false);
      toast.success('Pago registrado exitosamente');
      return { success: true, data };
    } catch (err) {
      toast.error('Error al registrar el pago');
      return handleError(err);
    }
  }, [handleError, paymentSummary, fetchPaymentSummary]);
*/

  // Anular pago
  const cancelPayment = useCallback(async (budgetId, faseIndex, pagoId, motivo) => {
    try {
      setLoading(true);
      const data = await paymentService.cancelPayment(budgetId, faseIndex, pagoId, motivo);
      
      // Actualizar el resumen local
      await fetchPaymentSummary(budgetId);
      
      setLoading(false);
      toast.success('Pago anulado exitosamente');
      return { success: true, data };
    } catch (err) {
      toast.error('Error al anular el pago');
      return handleError(err);
    }
  }, [handleError, fetchPaymentSummary]);

  // Obtener métodos de pago disponibles
  const getPaymentMethods = useCallback(() => {
    return paymentService.getPaymentMethods();
  }, []);

  // Utilidades de formateo
  const formatters = {
    amount: paymentService.formatAmount,
    date: paymentService.formatDate,
    status: paymentService.getPaymentStatus
  };

  // Cálculos y validaciones
  const helpers = {
    validatePaymentAmount: paymentService.validatePaymentAmount,
    calculateSummary: paymentService.calculatePaymentSummary
  };

  return {
    paymentSummary,
    loading,
    error,
    fetchPaymentSummary,
    registerPayment,
    registerPaymentForTreatment,
    cancelPayment,
    getPaymentMethods,
    formatters,
    helpers
  };
}