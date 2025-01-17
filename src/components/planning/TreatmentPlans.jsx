import React, { useEffect } from "react";
import {
  Grid, 
  Button,
  Typography,
  Container,
  Paper,
  Box,
  List,
  ListItem,
  ListItemText,
  Chip
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';

const TreatmentPlans = ({ 
  patientTreatments,
  getPatientTreatmentsByPatientId,
  createBudgetFromTreatment
}) => {
  const navigate = useNavigate();
  const { patientId } = useParams();

  useEffect(() => {
    const fetchTreatments = async () => {
      if (!patientId) {
        console.error('PatientId undefined:', patientId);
        return;
      }
      
      try {
        await getPatientTreatmentsByPatientId(patientId);
      } catch (error) {
        console.error('Error fetching treatments:', error);
      }
    };
  
    fetchTreatments();
  }, [patientId, getPatientTreatmentsByPatientId]);

  const handleCreateBudget = async (treatmentId) => {
    try {
      const result = await createBudgetFromTreatment(treatmentId);
      if (result.success) {
        toast.success('Presupuesto creado exitosamente');
        navigate(`/presupuestos/${result.data._id}`);
      }
    } catch (error) {
      // Verificar si el error contiene detalles específicos
      if (error.response && error.response.data && error.response.data.errors) {
        error.response.data.errors.forEach((err) => {
          toast.error(err.msg, {
            position: "top-right",
            autoClose: 3000,
          });
        });
      } else {
        toast.error("Error al crear el paciente.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/planificacion/pacientes")}
        sx={{ m: 2 }}
      >
        Atrás
      </Button>

      <Container>
        <Typography variant="h4" gutterBottom>
          Planificaciones
        </Typography>

        {patientTreatments.map((treatment) => (
          <Paper key={treatment.id} sx={{ p: 2, mb: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">
                  Especialidad: {treatment.especialidad}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1">Actividades:</Typography>
                <List>
                  {treatment.actividades?.map((actividad, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={`Cita ${actividad.cita}`}
                        secondary={
                          <Box>
                            <Typography>{actividad.actividadPlanTrat}</Typography>
                            <Typography variant="caption">
                              Fecha: {new Date(actividad.fechaPlanTrat).toLocaleDateString()}
                            </Typography>
                            {actividad.montoAbono > 0 && (
                              <Typography>
                                Monto Abono: ${actividad.montoAbono}
                              </Typography>
                            )}
                          </Box>
                        }
                      />
                      <Chip 
                        label={actividad.estado} 
                        color={actividad.estado === 'pendiente' ? 'default' : 
                               actividad.estado === 'en-proceso' ? 'primary' : 'success'}
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>

              <Grid item xs={12}>
                {!treatment.budget ? (
                  <Button
                    variant="contained"
                    onClick={() => handleCreateBudget(treatment.id)}
                  >
                    Crear Presupuesto
                  </Button>
                ) : (
                  <Box display="flex" gap={2} alignItems="center">
                    <Typography>
                      Presupuesto: ${treatment.budget.totalGeneral}
                    </Typography>
                    <Button
                      variant="outlined"
                      onClick={() => navigate(`/presupuestos/${treatment.budget._id}`)}
                    >
                      Ver Presupuesto
                    </Button>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Paper>
        ))}

        {patientTreatments.length === 0 && (
          <Typography variant="subtitle1" textAlign="center">
            No hay planificaciones registradas
          </Typography>
        )}
      </Container>
    </>
  );
};

export default TreatmentPlans;