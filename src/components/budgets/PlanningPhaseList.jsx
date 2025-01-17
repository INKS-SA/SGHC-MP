import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Typography,
  Chip
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  PlayCircle as PlayCircleIcon,
  PauseCircle as PauseCircleIcon
} from '@mui/icons-material';

const PlanningPhaseList = ({ fase, treatments, budget, onAddTreatment, onUpdateStatus }) => {
  const [selectedProcedure, setSelectedProcedure] = useState(null);

  const getStatusColor = (status) => {
    const colors = {
      'pendiente': 'default',
      'en-proceso': 'primary',
      'completado': 'success'
    };
    return colors[status] || 'default';
  };

  const getStatusAction = (currentStatus) => {
    if (currentStatus === 'pendiente') return 'en-proceso';
    if (currentStatus === 'en-proceso') return 'completado';
    return currentStatus;
  };

  const handlePlanificar = (procedimiento, index) => {
    setSelectedProcedure({ 
      procedimiento, 
      index,
      budgetId: budget?._id
    });
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="subtitle1" gutterBottom>
        {fase.descripcion}
      </Typography>
      
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Procedimiento</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Fase</TableCell>
              <TableCell>Costo</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fase.procedimientos.map((proc, index) => {
              const treatment = treatments.find(t => 
                t.procedimiento?.index === index
              );

              return (
                <TableRow key={index}>
                  <TableCell>{proc.nombre}</TableCell>
                  <TableCell>
                    {treatment ? new Date(treatment.fechaPlanTrat).toLocaleDateString() : '-'}
                  </TableCell>
                  <TableCell>{fase.nombre}</TableCell>
                  <TableCell>${proc.costoTotal?.toFixed(2)}</TableCell>
                  
                  <TableCell>
                    {treatment ? (
                      <Chip 
                        label={treatment.estado}
                        color={getStatusColor(treatment.estado)}
                        size="small"
                      />
                    ) : (
                      <Chip label="No planificado" size="small" />
                    )}
                  </TableCell>
                  <TableCell>
                    {treatment ? (
                      treatment.estado !== 'completado' && (
                        <IconButton
                          onClick={() => onUpdateStatus(
                            treatment.id,
                            getStatusAction(treatment.estado)
                          )}
                          color="primary"
                        >
                          {treatment.estado === 'pendiente' ? 
                            <PlayCircleIcon /> : 
                            <CheckCircleIcon />}
                        </IconButton>
                      )
                    ) : (
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => onAddTreatment({
                          procedimientoIndex: index,
                          nombre: proc.nombre
                        })}
                      >
                        Planificar
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default PlanningPhaseList;