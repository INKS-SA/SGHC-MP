import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useFinancialReports } from '../../hooks/useFinancialReports';
import ExportReportButton from './ExportReportButton';
import DateSelector from './DateSelector';

export default function FinancialReports() {
  const navigate = useNavigate();
  const { loading, getReporteMensual } = useFinancialReports();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [reportData, setReportData] = useState(null);

  const months = [
    { value: 1, label: 'Enero' },
    { value: 2, label: 'Febrero' },
    { value: 3, label: 'Marzo' },
    { value: 4, label: 'Abril' },
    { value: 5, label: 'Mayo' },
    { value: 6, label: 'Junio' },
    { value: 7, label: 'Julio' },
    { value: 8, label: 'Agosto' },
    { value: 9, label: 'Septiembre' },
    { value: 10, label: 'Octubre' },
    { value: 11, label: 'Noviembre' },
    { value: 12, label: 'Diciembre' }
  ];

  useEffect(() => {
    fetchReportData();
  }, [selectedMonth, selectedYear]);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const fetchReportData = async () => {
    if (selectedMonth && selectedYear) {
      const result = await getReporteMensual(selectedMonth, selectedYear);
      if (result.success) {
        setReportData(result.data);
      }
    }
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-EC', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatMethodName = (method) => {
    const methods = {
      'efectivo': 'Efectivo',
      'transferencia': 'Transferencia',
      'tarjeta': 'Tarjeta',
      'cheque': 'Cheque'
    };
    return methods[method] || method;
  };

  return (
    <div style={{ backgroundColor: '#f5f1ef', minHeight: '100vh', padding: '20px' }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
          <ArrowBack
            onClick={() => navigate('/planificacion')}
            sx={{ cursor: 'pointer' }}
          />
          <Typography variant="h5">Reportes Financieros</Typography>
        </Box>

        <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
            <Grid item xs={12} md={9}>
              <DateSelector
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
                onMonthChange={handleMonthChange}
                onYearChange={handleYearChange}
                months={months}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <ExportReportButton 
                reportData={reportData}
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
                months={months}
              />
            </Grid>
            <Grid item xs={12} md={3}>
  </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 2, bgcolor: 'primary.light', color: 'white' }}>
                <Typography variant="h6" gutterBottom>
                  Total del Periodo
                </Typography>
                <Typography variant="h4">
                  ${reportData?.reporte?.reduce((sum, item) => sum + item.totalMonto, 0)?.toFixed(2) || '0.00'}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Paper>

        {/* Resumen por Método de Pago */}
        {reportData?.reporte && (
          <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Método de Pago</strong></TableCell>
                  <TableCell align="center"><strong>Cantidad de Transacciones</strong></TableCell>
                  <TableCell align="right"><strong>Total</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reportData.reporte.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{formatMethodName(item._id)}</TableCell>
                    <TableCell align="center">
                      {item.cantidadTransacciones}
                    </TableCell>
                    <TableCell align="right">
                      ${item.totalMonto.toFixed(2)}
                    </TableCell>
                    
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <br></br>
        <hr></hr>
        {/* Detalles por Método de Pago */}
        {reportData?.reporte && reportData.reporte.map(metodo => (
          <Box key={metodo._id} sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2, color: 'primary.main' }}>
              Detalle de {formatMethodName(metodo._id)}
            </Typography>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Fecha</strong></TableCell>
                    <TableCell><strong>Paciente</strong></TableCell>
                    <TableCell><strong>Cédula</strong></TableCell>
                    <TableCell><strong>Concepto</strong></TableCell>
                    <TableCell align="right"><strong>Monto</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {metodo.transacciones.map((transaccion, index) => (
                    <TableRow key={index}>
                      <TableCell>{formatDate(transaccion.fecha)}</TableCell>
                      <TableCell>{transaccion.paciente.nombrePaciente}</TableCell>
                      <TableCell>{transaccion.paciente.numeroCedula}</TableCell>
                      <TableCell>{transaccion.conceptoPago}</TableCell>
                      <TableCell align="right">${transaccion.monto.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={4} align="right" sx={{ fontWeight: 'bold' }}>
                      Total {formatMethodName(metodo._id)}:
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                      ${metodo.totalMonto.toFixed(2)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ))}

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Typography>Cargando...</Typography>
          </Box>
        )}
      </Container>
    </div>
  );
}