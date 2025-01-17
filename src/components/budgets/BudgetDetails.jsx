import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import {
  Button,
  Typography,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from '@mui/material';
import { PrintOutlined } from '@mui/icons-material';

const BudgetContent = React.forwardRef(({ budget, isPrintMode }, ref) => (
  <div ref={ref} className={isPrintMode ? 'print-mode' : ''}>
    {/* Cabecera */}
    <Box mb={3} className={isPrintMode ? 'print-header' : ''}>
      <Typography variant="h4" gutterBottom align="center">
        Presupuesto Dental
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography><strong>Paciente:</strong> {budget.paciente.nombrePaciente}</Typography>
          <Typography><strong>Cédula:</strong> {budget.paciente.numeroCedula}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} textAlign="right">
          <Typography><strong>Fecha:</strong> {new Date(budget.fecha).toLocaleDateString()}</Typography>
          <Typography><strong>Especialidad:</strong> {budget.especialidad}</Typography>
          
        </Grid>
      </Grid>
    </Box>
    <hr/>

    {/* Fases y Procedimientos */}
    <Box component={Paper} p={3} mb={3} mt={3} elevation={3}> 
    {budget.fases.map((fase, faseIndex) => (
      <Box key={faseIndex} mb={4}>
        <Typography variant="h5" gutterBottom>
          {fase.nombre}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {fase.descripcion}
        </Typography>
        <br/>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="h6">N° de piezas</Typography></TableCell>
                <TableCell><Typography variant="h6">Procedimientos</Typography></TableCell>
                <TableCell align="right"><Typography variant="h6">Costo por unidad</Typography></TableCell>
                <TableCell align="right"><Typography variant="h6">Costo total</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fase.procedimientos.map((proc, procIndex) => (
                <TableRow key={procIndex}>
                  <TableCell>{proc.numeroPiezas}</TableCell>
                  <TableCell>{proc.nombre}</TableCell>
                  <TableCell align="right">
                    ${proc.costoPorUnidad.toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    ${proc.costoTotal.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} align="right">
                  <strong>Total de la fase:</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>${fase.total.toFixed(2)}</strong>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    ))}
</Box>
    {/* Total General */}
    <Box mt={10} mb={1}>
      <Typography variant="h5" align="right">
        <strong>Total General: ${budget.totalGeneral.toFixed(2)}</strong>
      </Typography>
    </Box>

    
  </div>
));

const BudgetDetails = ({ budget }) => {
  const componentRef = useRef();
  const [isPrintMode, setIsPrintMode] = React.useState(false);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onBeforeGetContent: () => setIsPrintMode(true),
    onAfterPrint: () => setIsPrintMode(false),
  });

  return (
    <Box>
      

      <BudgetContent 
        ref={componentRef}
        budget={budget}
        isPrintMode={isPrintMode}
      />

      <style>
        {`
          @media print {
            .print-mode {
              padding: 20px;
            }
            .print-header {
              margin-bottom: 30px;
            }
            .print-footer {
              margin-top: 50px;
              border-top: 1px solid #ddd;
              padding-top: 20px;
            }
          }
        `}
      </style>
    </Box>
  );
};

export default BudgetDetails;