import { useState, useCallback } from 'react';
import financialReportService from '../services/financialReportService';
import { toast } from 'react-toastify';

export function useFinancialReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleError = useCallback((err) => {
    console.error('Error en operación financiera:', err);
    setError(err.response?.data?.error || err.message);
    setLoading(false);
    return { success: false, error: err.message };
  }, []);

  const getReporteMensual = useCallback(async (mes, año) => {
    try {
      setLoading(true);
      const data = await financialReportService.getReporteMensual(mes, año);
      setLoading(false);
      return { success: true, data };
    } catch (err) {
      return handleError(err);
    }
  }, [handleError]);

  const getReporteAnual = useCallback(async (año) => {
    try {
      setLoading(true);
      const data = await financialReportService.getReporteAnual(año);
      setLoading(false);
      return { success: true, data };
    } catch (err) {
      return handleError(err);
    }
  }, [handleError]);

  const getReportePorRango = useCallback(async (fechaInicio, fechaFin) => {
    try {
      setLoading(true);
      const data = await financialReportService.getReportePorRango(fechaInicio, fechaFin);
      setLoading(false);
      return { success: true, data };
    } catch (err) {
      return handleError(err);
    }
  }, [handleError]);

  const createFinancialReport = useCallback(async (reportData) => {
    try {
      setLoading(true);
      const data = await financialReportService.create(reportData);
      setReports(prev => [...prev, data]);
      setLoading(false);
      toast.success('Reporte financiero creado exitosamente');
      return { success: true, data };
    } catch (err) {
      toast.error('Error al crear el reporte financiero');
      return handleError(err);
    }
  }, [handleError]);

  return {
    reports,
    loading,
    error,
    getReporteMensual,
    getReporteAnual,
    getReportePorRango,
    createFinancialReport
  };
}