import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
  Grid
} from '@mui/material';
import {
  Add as AddIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import { toast } from 'react-toastify';

const PaymentDetails = ({
  budget,
  paymentSummary,
  registerPayment,
  cancelPayment,
  formatters,
  helpers,
  fetchPaymentSummary,
  treatmentDetails,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFase, setSelectedFase] = useState(null);
  const [paymentData, setPaymentData] = useState({
    descripcion: '',
    monto: '',
    metodoPago: ''
  });
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [cancelReason, setCancelReason] = useState('');

  useEffect(() => {
    const initializePayments = async () => {
      if (budget?._id) {
        try {
          await fetchPaymentSummary(budget._id);
        } catch (error) {
          console.error('Error initializing payments:', error);
          toast.error('Error al cargar los datos de pagos');
        }
      }
    };

    initializePayments();
  }, [budget, fetchPaymentSummary]);

  const initializedPaymentSummary = {
    resumenGeneral: {
      totalPresupuesto: budget?.totalGeneral || 0,
      totalPagado: 0,
      saldoPendiente: budget?.totalGeneral || 0
    },
    fases: budget?.fases.map((fase, index) => ({
      faseIndex: index,
      nombreFase: fase.nombre,
      totalFase: fase.total,
      totalPagado: 0,
      saldoPendiente: fase.total,
      pagos: []
    })) || []
  };

  const currentPaymentSummary = paymentSummary || initializedPaymentSummary;

  const handleOpenDialog = (faseIndex) => {
    setSelectedFase(faseIndex);
    setPaymentData({
      descripcion: '',
      monto: '',
      metodoPago: ''
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedFase(null);
  };

  const handlePaymentSubmit = async () => {
    try {
      if (!paymentData.descripcion || !paymentData.monto || !paymentData.metodoPago) {
        toast.error('Todos los campos son requeridos');
        return;
      }

      const fase = currentPaymentSummary.fases[selectedFase];
      const validation = helpers.validatePaymentAmount(
        parseFloat(paymentData.monto),
        fase.saldoPendiente
      );

      if (!validation.isValid) {
        toast.error(validation.message);
        return;
      }

      await registerPayment(budget._id, selectedFase, {
        ...paymentData,
        monto: parseFloat(paymentData.monto)
      });

      handleCloseDialog();
      await fetchPaymentSummary(budget._id);
    } catch (error) {
      toast.error('Error al registrar el pago');
    }
  };

  const handleOpenCancelDialog = (faseIndex, payment) => {
    setSelectedFase(faseIndex);
    setSelectedPayment(payment);
    setCancelReason('');
    setOpenCancelDialog(true);
  };

  const handleCloseCancelDialog = () => {
    setOpenCancelDialog(false);
    setSelectedPayment(null);
    setSelectedFase(null);
  };

  const handleCancelPayment = async () => {
    try {
      if (!cancelReason.trim()) {
        toast.error('Debe especificar un motivo de anulación');
        return;
      }

      await cancelPayment(
        budget._id,
        selectedFase,
        selectedPayment._id,
        cancelReason
      );

      handleCloseCancelDialog();
      await fetchPaymentSummary(budget._id);
    } catch (error) {
      toast.error('Error al anular el pago');
    }
  };

  const metodosPago = [
    { value: 'efectivo', label: 'Efectivo' },
    { value: 'transferencia', label: 'Transferencia' },
    { value: 'tarjeta', label: 'Tarjeta' },
    { value: 'cheque', label: 'Cheque' }
  ];

  return (
    <Box>
      {/* Resumen General */}
      <Paper sx={{ p: 2, mb: 3 }}>
      <Typography variant="h4" gutterBottom align="center">
        Pagos
      </Typography>
        <Typography variant="h5" gutterBottom>Resumen General</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box>
              <Typography>Total Presupuesto: {formatters.amount(currentPaymentSummary.resumenGeneral.totalPresupuesto)}</Typography>
              <Typography>Total Pagado: {formatters.amount(currentPaymentSummary.resumenGeneral.totalPagado)}</Typography>
              <Typography>Saldo Pendiente: {formatters.amount(currentPaymentSummary.resumenGeneral.saldoPendiente)}</Typography>
            </Box>
          </Grid>
          
        </Grid>
      </Paper>

      {/* Pagos por Fase */}
      {currentPaymentSummary.fases.map((fase, index) => (
        <Paper key={index} sx={{ p: 2, mb: 3, mt: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">{fase.nombreFase}</Typography>
            <br/>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog(index)}
              disabled={fase.saldoPendiente <= 0}
            >
              Registrar Pago
            </Button>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><Typography variant="h6">Descripción</Typography></TableCell>
                  <TableCell><Typography variant="h6">Fecha</Typography></TableCell>
                  <TableCell align="right"><Typography variant="h6">Monto</Typography></TableCell>
                  <TableCell align="right"><Typography variant="h6">Saldo</Typography></TableCell>
                  <TableCell><Typography variant="h6">Método</Typography></TableCell>
                  <TableCell align="center"><Typography variant="h6">Acciones</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fase.pagos.map((pago, pagoIndex) => (
                  <TableRow 
                    key={pagoIndex}
                    sx={pago.anulado ? { backgroundColor: '#ffebee' } : {}}
                  >
                    <TableCell>{pago.descripcion}</TableCell>
                    <TableCell>{formatters.date(pago.fecha)}</TableCell>
                    <TableCell align="right">{formatters.amount(pago.monto)}</TableCell>
                    <TableCell align="right">{formatters.amount(pago.saldo)}</TableCell>
                    <TableCell>{pago.metodoPago}</TableCell>
                    <TableCell align="center">
                      {!pago.anulado && (
                        <IconButton
                          color="error"
                          onClick={() => handleOpenCancelDialog(index, pago)}
                        >
                          <CancelIcon />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
            <Typography sx={{ mr: 2 }}>
              Total Fase: {formatters.amount(fase.totalFase)}
            </Typography>
            <Typography sx={{ mr: 2 }}>
              Pagado: {formatters.amount(fase.totalPagado)}
            </Typography>
            <Typography>
              Pendiente: {formatters.amount(fase.saldoPendiente)}
            </Typography>
          </Box>
          <br/>
        </Paper>
        
      ))}

      {/* Diálogo para nuevo pago */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Registrar Nuevo Pago</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Descripción"
            value={paymentData.descripcion}
            onChange={(e) => setPaymentData({...paymentData, descripcion: e.target.value})}
            margin="normal"
          />
          <TextField
            fullWidth
            type="number"
            label="Monto"
            value={paymentData.monto}
            onChange={(e) => setPaymentData({...paymentData, monto: e.target.value})}
            margin="normal"
          />
          <TextField
            fullWidth
            select
            label="Método de Pago"
            value={paymentData.metodoPago}
            onChange={(e) => setPaymentData({...paymentData, metodoPago: e.target.value})}
            margin="normal"
          >
            {metodosPago.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handlePaymentSubmit} variant="contained">
            Registrar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo para anular pago */}
      <Dialog open={openCancelDialog} onClose={handleCloseCancelDialog}>
        <DialogTitle>Anular Pago</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Motivo de Anulación"
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            margin="normal"
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCancelDialog}>Cancelar</Button>
          <Button onClick={handleCancelPayment} variant="contained" color="error">
            Anular Pago
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PaymentDetails;