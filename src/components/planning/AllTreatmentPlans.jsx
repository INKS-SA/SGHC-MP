import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Chip,
  CircularProgress,
  Box
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import dayjs from "dayjs";

const AllTreatmentPlans = ({ 
  patientTreatments, 
  getAllPatientTreatments,
  createBudgetFromTreatment 
}) => {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState("");
  const [filteredTreatments, setFilteredTreatments] = useState([]);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await getAllPatientTreatments();
      setIsLoading(false);
    };

    fetchData();
  }, [getAllPatientTreatments]);

  useEffect(() => {
    filterTreatmentsByMonth();
  }, [selectedMonth, patientTreatments]);

  const filterTreatmentsByMonth = () => {
    if (!selectedMonth) {
      setFilteredTreatments(patientTreatments);
      return;
    }

    const filtered = patientTreatments.filter(treatment => {
      return treatment.actividades.some(actividad => {
        const actividadMonth = dayjs(actividad.fechaPlanTrat).format("MM");
        return actividadMonth === selectedMonth;
      });
    });
    setFilteredTreatments(filtered);
  };

  const getPaymentStatusColor = (status) => {
    const colors = {
      pendiente: 'warning',
      parcial: 'info',
      completado: 'success'
    };
    return colors[status] || 'default';
  };

  const handleCreateBudget = async (treatmentId) => {
    try {
      const result = await createBudgetFromTreatment(treatmentId);
      if (result.success) {
        toast.success('Presupuesto creado exitosamente');
        navigate(`/presupuestos/${result.data._id}`);
      }
    } catch (error) {
      toast.error('Error al crear el presupuesto');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/planificacion")}
        sx={{ m: 2 }}
      >
        Atrás
      </Button>

      <Container>
        <Typography variant="h4" gutterBottom>
          Consolidado de Planificaciones
        </Typography>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Filtrar por Mes</InputLabel>
          <Select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            label="Filtrar por Mes"
          >
            <MenuItem value="">Todos los meses</MenuItem>
            {[...Array(12)].map((_, i) => {
              const month = (i + 1).toString().padStart(2, '0');
              const monthName = new Date(2024, i).toLocaleString('es', { month: 'long' });
              return (
                <MenuItem key={month} value={month}>
                  {monthName.charAt(0).toUpperCase() + monthName.slice(1)}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Paciente</TableCell>
                <TableCell>Especialidad</TableCell>
                <TableCell>Actividades</TableCell>
                <TableCell>Presupuesto</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTreatments.map((treatment) => (
                <TableRow key={treatment.id}>
                  <TableCell>{treatment.paciente.nombrePaciente}</TableCell>
                  <TableCell>{treatment.especialidad}</TableCell>
                  <TableCell>
                    <List dense>
                      {treatment.actividades.map((act, index) => (
                        <ListItem key={index}>
                          <ListItemText
                            primary={act.cita}
                            secondary={
                              <>
                                {act.actividadPlanTrat}
                                <br />
                                {new Date(act.fechaPlanTrat).toLocaleDateString()}
                              </>
                            }
                          />
                          <Chip
                            size="small"
                            label={act.estado}
                            color={act.estado === 'completado' ? 'success' : 
                                  act.estado === 'en-proceso' ? 'primary' : 'default'}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </TableCell>
                  <TableCell>
                    {treatment.budget ? (
                      <Box>
                        <Typography>
                          ${treatment.budget.totalGeneral}
                        </Typography>
                        <Chip
                          size="small"
                          label={treatment.budget.estadoPagoGeneral}
                          color={getPaymentStatusColor(treatment.budget.estadoPagoGeneral)}
                        />
                        <Button
                          variant="outlined"
                          size="small"
                          sx={{ ml: 1 }}
                          onClick={() => navigate(`/presupuestos/${treatment.budget._id}`)}
                        >
                          Ver
                        </Button>
                      </Box>
                    ) : (
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleCreateBudget(treatment.id)}
                      >
                        Crear Presupuesto
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {filteredTreatments.length === 0 && (
          <Typography variant="subtitle1" textAlign="center" sx={{ mt: 3 }}>
            No se encontraron planificaciones
            {selectedMonth && " para el mes seleccionado"}
          </Typography>
        )}
      </Container>
    </>
  );
};

export default AllTreatmentPlans;