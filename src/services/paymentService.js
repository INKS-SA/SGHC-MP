import axios from "../services/axiosConfig";

const baseUrl = "/api/payments";
//const baseUrl = 'http://localhost:3001/api/payments';

// Obtener resumen de pagos de un presupuesto
const getBudgetPaymentsSummary = (budgetId) => {
  return axios.get(`${baseUrl}/budget/${budgetId}/summary`)
    .then(response => response.data);
};

// Registrar nuevo pago para una fase
const createPayment = (budgetId, faseIndex, paymentData) => {
  return axios.post(
    `${baseUrl}/budget/${budgetId}/fase/${faseIndex}/pago`,
    paymentData
  ).then(response => response.data);
};

const createPaymentForTreatment = (budgetId, faseIndex, treatmentId, paymentData) => {
  return axios.post(
    `${baseUrl}/budget/${budgetId}/fase/${faseIndex}/treatment/${treatmentId}/pago`,
    paymentData
  ).then(response => response.data);
 };

// Anular un pago
const cancelPayment = (budgetId, faseIndex, pagoId, motivo) => {
  return axios.patch(
    `${baseUrl}/budget/${budgetId}/fase/${faseIndex}/pago/${pagoId}/anular`,
    { motivo }
  ).then(response => response.data);
};

// Obtener métodos de pago disponibles
const getPaymentMethods = () => {
  return [
    { id: 'efectivo', label: 'Efectivo' },
    { id: 'transferencia', label: 'Transferencia' },
    { id: 'tarjeta', label: 'Tarjeta' },
    { id: 'cheque', label: 'Cheque' }
  ];
};

// Función auxiliar para formatear montos
const formatAmount = (amount) => {
  return new Intl.NumberFormat('es-EC', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

// Función auxiliar para formatear fechas
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-EC', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Obtener estado de pago formateado
const getPaymentStatus = (status) => {
  const statusMap = {
    pendiente: { label: 'Pendiente', color: 'warning' },
    parcial: { label: 'Parcial', color: 'info' },
    completado: { label: 'Completado', color: 'success' }
  };
  return statusMap[status] || { label: status, color: 'default' };
};

// Validar monto de pago
const validatePaymentAmount = (amount, saldoPendiente) => {
  if (!amount || amount <= 0) {
    return { isValid: false, message: 'El monto debe ser mayor a 0' };
  }
  if (amount > saldoPendiente) {
    return { 
      isValid: false, 
      message: 'El monto no puede ser mayor al saldo pendiente' 
    };
  }
  return { isValid: true };
};

// Calcular resumen de pagos
const calculatePaymentSummary = (pagos) => {
  const pagosValidos = pagos.filter(p => !p.anulado);
  
  return {
    totalPagado: pagosValidos.reduce((sum, p) => sum + p.monto, 0),
    cantidadPagos: pagosValidos.length,
    porMetodo: pagosValidos.reduce((acc, p) => {
      acc[p.metodoPago] = (acc[p.metodoPago] || 0) + p.monto;
      return acc;
    }, {}),
    ultimoPago: pagosValidos[pagosValidos.length - 1]
  };
};

export default {
  getBudgetPaymentsSummary,
  createPayment,
  createPaymentForTreatment,
  cancelPayment,
  getPaymentMethods,
  formatAmount,
  formatDate,
  getPaymentStatus,
  validatePaymentAmount,
  calculatePaymentSummary
};