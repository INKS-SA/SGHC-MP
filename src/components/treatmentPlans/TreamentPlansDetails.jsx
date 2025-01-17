import React, { useEffect, useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Divider
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import usePatientTreatments from '../../hooks/usePatientTreatments';
import budgetService from '../../services/budgetService';

const TreamentPlansDetails = ({ patientId }) => {
  const [plansWithBudgets, setPlansWithBudgets] = useState([]);
  const { getPatientTreatmentsByPatientId } = usePatientTreatments();

  useEffect(() => {
    const loadPlansAndBudgets = async () => {
      try {
        const plans = await getPatientTreatmentsByPatientId(patientId);
        
        // Obtener presupuestos para cada plan
        const plansData = await Promise.all(plans.map(async (plan) => {
          const budget = await budgetService.getBudgetByTreatment(plan._id);
          return {
            ...plan,
            budget: budget || null
          };
        }));
        
        setPlansWithBudgets(plansData);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    if (patientId) {
      loadPlansAndBudgets();
    }
  }, [patientId]);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4"
      gutterBottom
      align="center" 
      >
        Planificaciones y Presupuestos del Paciente
      </Typography>

      {plansWithBudgets.map((plan, index) => (
        <Accordion key={plan._id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h5">
                Planificación {index + 1} - {plan.especialidad}
              </Typography>
              
            </Box>
          </AccordionSummary>

          <AccordionDetails>
            {/* Sección de Planificación */}
            <Typography variant="h6" gutterBottom>Actividades Planificadas</Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell> <Typography variant="h6" gutterBottom>Cita</Typography></TableCell>
                    <TableCell><Typography variant="h6" gutterBottom>Actividad</Typography></TableCell>
                    <TableCell align="right"><Typography variant="h6" gutterBottom>Fecha</Typography></TableCell>
                    
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {plan.actividades.map((actividad, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{actividad.cita}</TableCell>
                      <TableCell>{actividad.actividadPlanTrat}</TableCell>
                      <TableCell align="right">
                        {new Date(actividad.fechaPlanTrat).toLocaleDateString()}
                      </TableCell>
                      
                      
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
                  
            {/* Sección de Presupuesto */}
            {plan.budget && (
              <>
              <br/>
              
                <hr/>
                <br/>
                <Typography variant="h6" gutterBottom>Presupuesto</Typography>
                {plan.budget.fases.map((fase, faseIndex) => (
                  <Box key={faseIndex} sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      {fase.nombre}
                    </Typography>
                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell><Typography variant="h6" gutterBottom>Procedimiento</Typography></TableCell>
                            <TableCell align="right"><Typography variant="h6" gutterBottom>N° Piezas</Typography></TableCell>
                            
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {fase.procedimientos.map((proc, procIndex) => (
                            <TableRow key={procIndex}>
                              <TableCell>{proc.nombre}</TableCell>
                              <TableCell align="right">{proc.numeroPiezas}</TableCell>
                              
                            </TableRow>
                          ))}
                          
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                ))}
                <Box sx={{ mt: 2, textAlign: 'right' }}>
                  
                </Box>
              </>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </Paper>
  );
};

export default TreamentPlansDetails;