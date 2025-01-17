import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
  Button
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { useNavigate } from "react-router-dom";

const TreatmentList = ({ treatments, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const { createBudgetFromTreatment } = useBudgets();

  if (!treatments.length) {
    return (
      <Box textAlign="center" py={3}>
        <Typography variant="body1" color="textSecondary">
          No hay tratamientos registrados
        </Typography>
      </Box>
    );
  }

  const handleDelete = (treatment) => {
    if (window.confirm('¿Está seguro de eliminar este tratamiento?')) {
      onDelete(treatment.id);
    }
  };

  const handleCreateBudget = async (treatmentId) => {
    try {
      const budgetResult = await createBudgetFromTreatment(treatmentId);
      toast.success('Presupuesto creado');
      navigate(`/presupuestos/${budgetResult._id}`);
    } catch (error) {
      toast.error('Error al crear presupuesto');
    }
  };

  return (
    <TableContainer component={Paper}>
      <Button onClick={() => handleCreateBudget(treatment.id)}>
  Crear Presupuesto
</Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><Typography variant="h6">Especialidad</Typography></TableCell>
            <TableCell>
              <Typography variant="subtitle1" fontWeight="bold">
                Cita
              </Typography>
            </TableCell>

            <TableCell>
              <Typography variant="subtitle1" fontWeight="bold">
                Actividad
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1" fontWeight="bold">
                Fecha
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="subtitle1" fontWeight="bold">
                Monto Abono
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle1" fontWeight="bold">
                Acciones
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {treatments.map((treatment) => (
            <TableRow key={treatment.id}>
              <TableCell>{treatment.especialidad}</TableCell>
              <TableCell>{treatment.cita}</TableCell>
              <TableCell 
                style={{ 
                  maxWidth: '300px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {treatment.actividadPlanTrat}
              </TableCell>
              <TableCell>
                {new Date(treatment.fechaPlanTrat).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit'
                })}
              </TableCell>
              <TableCell align="right">
                ${Number(treatment.montoAbono).toFixed(2)}
              </TableCell>
              <TableCell align="center">
                <IconButton
                  onClick={() => onEdit(treatment)}
                  color="primary"
                  title="Editar"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(treatment)}
                  color="error"
                  title="Eliminar"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={3} align="right">
              <Typography variant="subtitle1" fontWeight="bold">
                Total Abonado:
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="subtitle1" fontWeight="bold" color="primary">
                ${treatments.reduce((sum, t) => sum + Number(t.montoAbono), 0).toFixed(2)}
              </Typography>
            </TableCell>
            <TableCell>
        <Button onClick={() => handleCreateBudget(treatments.id)}>
          Crear Presupuesto
        </Button>
      </TableCell>
            <TableCell />
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TreatmentList;