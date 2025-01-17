import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  Button, Typography, Grid, TextField, Container, Paper, IconButton,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Box, FormControl, InputLabel, Select, MenuItem, List, ListItem, ListItemText, Chip
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import patientTreatmentService from '../../services/patientTreatmentService';

const BudgetForm = ({ 
  createBudget, 
  treatmentPlan,
  updateBudget, 
  fetchBudgetById, 
  fetchPatientByName,
  fetchPatientByCedula,
  calculateTotals,
  
  mode = 'create' 
}) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const initialFaseState = {
    nombre: '',
    descripcion: '',
    procedimientos: []
  };

  const [budget, setBudget] = useState({
    paciente: '',
    especialidad: '',
    fases: [{
      nombre: 'Fase Inicial',
      descripcion: '',
      procedimientos: []
    }]
  });

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [newProcedimientos, setNewProcedimientos] = useState({});
  const [searchType, setSearchType] = useState('cedula');
  const [searchQuery, setSearchQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [patients, setPatients] = useState([]);
  const location = useLocation();

  const especialidades = [
    'Odontología General',
    'Ortodoncia',
    'Endodoncia',
    'Periodoncia',
    'Cirugía Oral',
    'Rehabilitación Oral',
    'Odontopediatría'
  ];

/*
  useEffect(() => {
    const loadData = async () => {
      try {
        // Caso 1: Editar presupuesto existente
        if (mode === 'edit' && id) {
          const result = await fetchBudgetById(id);
          if (!result.success) {
            throw new Error(result.error || 'Error al cargar el presupuesto');
          }
          setBudget({
            ...result.data,
            paciente: result.data.paciente.id || result.data.paciente
          });
          setSelectedPatient(result.data.paciente);
        } 
        // Caso 2: Crear presupuesto desde planificación
        else if (location?.state?.treatmentPlanId) {
          console.log('Cargando planificación:', location.state.treatmentPlanId);
          const treatmentData = await patientTreatmentService.getById(location.state.treatmentPlanId);
          
          // Asegurar que todos los campos necesarios estén presentes
          const newBudget = {
            paciente: treatmentData.paciente._id || treatmentData.paciente.id,
            especialidad: treatmentData.especialidad,
            treatmentPlan: location.state.treatmentPlanId,
            fases: [{
              nombre: 'Fase Principal',
              descripcion: 'Basado en planificación',
              procedimientos: treatmentData.actividades.map(act => ({
                nombre: act.actividadPlanTrat,
                numeroPiezas: 1,
                costoPorUnidad: act.montoAbono || 0
              }))
            }]
          };
  
          console.log('Setting budget state:', newBudget); // Debug
          setBudget(newBudget);
          setSelectedPatient(treatmentData.paciente);
        }
      } catch (error) {
        console.error('Error cargando datos:', error);
        toast.error('Error al cargar datos');
        navigate('/presupuestos');
      }
    };
  
    loadData();
  }, [mode, id, location?.state?.treatmentPlanId, fetchBudgetById, navigate]);
  
  */

  useEffect(() => {
    const loadData = async () => {
      try {
        // Caso 1: Editar presupuesto existente
        if (mode === 'edit' && id) {
          const result = await fetchBudgetById(id);
          if (!result.success) {
            throw new Error(result.error || 'Error al cargar el presupuesto');
          }
          setBudget({
            ...result.data,
            paciente: result.data.paciente.id || result.data.paciente
          });
          setSelectedPatient(result.data.paciente);
          setSearched(false);
        } 
        if (location?.state?.treatmentPlanId) {
          const treatmentData = await patientTreatmentService.getById(location.state.treatmentPlanId);
          
          const newBudget = {
            paciente: treatmentData.paciente._id,
            especialidad: '', // Permitir que sea editable
            treatmentPlan: location.state.treatmentPlanId,
            fases: [{
              nombre: 'Fase Principal',
              descripcion: 'Basado en planificación',
              procedimientos: [] // Iniciar vacío para que el doctor lo llene
            }]
          };
  
          setBudget(newBudget);
          setSelectedPatient(treatmentData.paciente);
          // Deshabilitar la búsqueda de paciente si venimos de planificación
          setSearched(false);
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Error al cargar datos');
        navigate('/presupuestos');
      }
    };
  
    loadData();
  }, [location?.state?.treatmentPlanId]);
  
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const result = await (searchType === "cedula" ? 
        fetchPatientByCedula(searchQuery) : 
        fetchPatientByName(searchQuery));

      if (result.success) {
        setPatients(Array.isArray(result.data) ? result.data : [result.data]);
        setSearched(true);
      }
    } catch (error) {
      toast.error("Error al buscar el paciente");
    }
  };

  const handleAddProcedimiento = (faseIndex) => {
    const procedimiento = newProcedimientos[faseIndex] || {
      nombre: '',
      numeroPiezas: '',
      costoPorUnidad: ''
    };

    if (!procedimiento.nombre || !procedimiento.numeroPiezas || !procedimiento.costoPorUnidad) {
      toast.error('Todos los campos del procedimiento son requeridos');
      return;
    }

    const procedimientoToAdd = {
      ...procedimiento,
      numeroPiezas: parseInt(procedimiento.numeroPiezas),
      costoPorUnidad: parseFloat(procedimiento.costoPorUnidad),
      costoTotal: parseInt(procedimiento.numeroPiezas) * parseFloat(procedimiento.costoPorUnidad)
    };

    setBudget(prevBudget => {
      const newFases = [...prevBudget.fases];
      newFases[faseIndex] = {
        ...newFases[faseIndex],
        procedimientos: [...newFases[faseIndex].procedimientos, procedimientoToAdd]
      };
      return {
        ...prevBudget,
        fases: newFases
      };
    });

    setNewProcedimientos(prev => ({
      ...prev,
      [faseIndex]: { nombre: '', numeroPiezas: '', costoPorUnidad: '' }
    }));
  };

  const handleDeleteProcedimiento = (faseIndex, procIndex) => {
    setBudget(prevBudget => {
      const newFases = [...prevBudget.fases];
      newFases[faseIndex].procedimientos.splice(procIndex, 1);
      return { ...prevBudget, fases: newFases };
    });
  };

  const handleAddFase = () => {
    setBudget(prevBudget => ({
      ...prevBudget,
      fases: [...prevBudget.fases, { ...initialFaseState }]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { fases, totalGeneral } = calculateTotals(budget.fases);
      const budgetToSave = {
        ...budget,
        paciente: budget.paciente || selectedPatient?.id, // Backup con selectedPatient
        fases,
        totalGeneral
      };
  
      console.log('Budget to save:', budgetToSave); // Debug
      const result = await createBudget(budgetToSave);
      
      if (result.success) {
        toast.success('Presupuesto creado exitosamente');
        navigate('/presupuestos');
      } else {
        toast.error(result.error || 'Error al crear el presupuesto');
      }
    } catch (error) {
      console.error('Error submitting budget:', error);
      toast.error(error.response?.data?.error || 'Error al crear el presupuesto');
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
    <div style={{ backgroundColor: '#f5f1ef', minHeight: '100vh', padding: '20px' }}>
      <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/presupuestos")}
          sx={{ mb: 2 }}
        >
          Volver
        </Button>

      <Container maxWidth="lg">
        
  
        {/* Búsqueda de paciente */}
        { !treatmentPlan && !location?.state?.fromPlanning && (
          <Box component={Paper} style={{padding: '20px', marginBottom: '30px'}}> 
            <Box component="form" onSubmit={handleSearch}>
              <Typography variant="h5" gutterBottom>
                Paciente
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>Tipo de Búsqueda</InputLabel>
                    <Select
                      value={searchType}
                      onChange={(e) => setSearchType(e.target.value)}
                      label="Tipo de Búsqueda"
                    >
                      <MenuItem value="cedula">Cédula</MenuItem>
                      <MenuItem value="nombre">Nombre</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label={searchType === "cedula" ? "Ingrese Cédula" : "Ingrese Nombre"}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button type="submit" variant="contained">
                    Buscar Paciente
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        )}
  
        {/* Información de Planificación */}
        {treatmentPlan && (
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Planificación Asociada
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Cita</TableCell>
                    <TableCell>Actividad</TableCell>
                    <TableCell>Fecha</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {treatmentPlan.actividades.map((actividad, index) => (
                    <TableRow key={index}>
                      <TableCell>{actividad.cita}</TableCell>
                      <TableCell>{actividad.actividadPlanTrat}</TableCell>
                      <TableCell>
                        {new Date(actividad.fechaPlanTrat).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
  
        {/* Resultados de búsqueda de paciente */}
        {!treatmentPlan && searched && patients.length > 0 && (
          <TableContainer component={Paper} sx={{ mt: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Cédula</TableCell>
                  <TableCell>Seleccionar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>{patient.nombrePaciente}</TableCell>
                    <TableCell>{patient.numeroCedula}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setSelectedPatient(patient);
                          setBudget(prev => ({ ...prev, paciente: patient.id }));
                        }}
                      >
                        Seleccionar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
  
        {/* Información del paciente seleccionado */}
        {selectedPatient && (
          <Box component={Paper} mt={2} p={2}>
            <Typography variant="h6" gutterBottom>Paciente seleccionado</Typography>
            <Typography>Nombre: {selectedPatient.nombrePaciente}</Typography>
            <Typography>Cédula: {selectedPatient.numeroCedula}</Typography>
          </Box>
        )}
  
        {/* Formulario de Presupuesto */}
        <Paper sx={{ p: 3, mb: 3, mt: 3 }}>
          <Typography variant="h5" gutterBottom>
            {mode === 'edit' ? 'Editar Presupuesto' : 'Nuevo Presupuesto'}
            {treatmentPlan && ' - Basado en Planificación'}
          </Typography>
  
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Especialidad */}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Especialidad</InputLabel>
                  <Select
                    value={budget.especialidad}
                    onChange={(e) => setBudget({ ...budget, especialidad: e.target.value })}
                    label="Especialidad"
                    required
                  >
                    {especialidades.map((esp) => (
                      <MenuItem key={esp} value={esp}>
                        {esp}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
  
              {/* Fases */}
              {budget.fases.map((fase, faseIndex) => (
                <Grid item xs={12} key={faseIndex}>
                  <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Fase {faseIndex + 1}
                    </Typography>
                    
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Nombre de la fase"
                          value={fase.nombre}
                          onChange={(e) => {
                            const newFases = [...budget.fases];
                            newFases[faseIndex].nombre = e.target.value;
                            setBudget({ ...budget, fases: newFases });
                          }}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Descripción"
                          value={fase.descripcion}
                          onChange={(e) => {
                            const newFases = [...budget.fases];
                            newFases[faseIndex].descripcion = e.target.value;
                            setBudget({ ...budget, fases: newFases });
                          }}
                          required
                        />
                      </Grid>
                    </Grid>
  
                    {/* Tabla de Procedimientos */}
                    <TableContainer sx={{ mt: 2 }}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Procedimiento</TableCell>
                            <TableCell>N° de piezas</TableCell>
                            <TableCell>Costo por unidad</TableCell>
                            <TableCell>Costo total</TableCell>
                            <TableCell>Acciones</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {fase.procedimientos.map((proc, procIndex) => (
                            <TableRow key={procIndex}>
                              <TableCell>{proc.nombre}</TableCell>
                              <TableCell>{proc.numeroPiezas}</TableCell>
                              <TableCell>${proc.costoPorUnidad}</TableCell>
                              <TableCell>${proc.costoTotal}</TableCell>
                              <TableCell>
                                <IconButton
                                  onClick={() => handleDeleteProcedimiento(faseIndex, procIndex)}
                                  color="error"
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                          {/* Fila para nuevo procedimiento */}
                          <TableRow>
                            <TableCell>
                              <TextField
                                fullWidth
                                size="small"
                                value={newProcedimientos[faseIndex]?.nombre || ''}
                                onChange={(e) => setNewProcedimientos(prev => ({
                                  ...prev,
                                  [faseIndex]: {
                                    ...prev[faseIndex],
                                    nombre: e.target.value
                                  }
                                }))}
                                placeholder="Nombre del procedimiento"
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                size="small"
                                type="number"
                                value={newProcedimientos[faseIndex]?.numeroPiezas || ''}
                                onChange={(e) => setNewProcedimientos(prev => ({
                                  ...prev,
                                  [faseIndex]: {
                                    ...prev[faseIndex],
                                    numeroPiezas: e.target.value
                                  }
                                }))}
                                placeholder="N° piezas"
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                size="small"
                                type="number"
                                value={newProcedimientos[faseIndex]?.costoPorUnidad || ''}
                                onChange={(e) => setNewProcedimientos(prev => ({
                                  ...prev,
                                  [faseIndex]: {
                                    ...prev[faseIndex],
                                    costoPorUnidad: e.target.value
                                  }
                                }))}
                                placeholder="Costo"
                              />
                            </TableCell>
                            <TableCell>
                              {newProcedimientos[faseIndex]?.numeroPiezas && 
                               newProcedimientos[faseIndex]?.costoPorUnidad ? 
                                `$${(newProcedimientos[faseIndex].numeroPiezas * 
                                     newProcedimientos[faseIndex].costoPorUnidad).toFixed(2)}` : 
                                '-'
                              }
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="contained"
                                size="small"
                                onClick={() => handleAddProcedimiento(faseIndex)}
                              >
                                Agregar
                              </Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                </Grid>
              ))}
  
              {/* Botones de acción */}
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={handleAddFase}
                >
                  Agregar Fase
                </Button>
              </Grid>
  
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                >
                  {mode === 'edit' ? 'Actualizar Presupuesto' : 'Guardar Presupuesto'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default BudgetForm;