import React, { useEffect, useState } from 'react';
import {
  Button,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Box,
  IconButton,
  Chip,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  ReceiptLong as ReceiptLongIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import usePatientTreatments from '../../hooks/usePatientTreatments'; 
import budgetService from '../../services/budgetService';


const PlanningList = () => { 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('cedula');
  const [filteredTreatments, setFilteredTreatments] = useState([]);
  const [treatmentsWithBudget, setTreatmentsWithBudget] = useState({});
  const { 
    patientTreatments, 
    getAllPatientTreatments, 
    deletePatientTreatment 
  } = usePatientTreatments();

  const loadTreatments = async () => {
    try {
      setLoading(true);
      await getAllPatientTreatments();
      setFilteredTreatments(patientTreatments || []);
    } catch (error) {
      console.error('Error loading treatments:', error);
      toast.error('Error al cargar las planificaciones');
      setFilteredTreatments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTreatments();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const treatments = await getAllPatientTreatments();
        setFilteredTreatments(treatments || []); // Asegurar que sea array
      } catch (error) {
        console.error('Error loading treatments:', error);
        toast.error('Error al cargar las planificaciones');
        setFilteredTreatments([]); // En caso de error, setear array vacío
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [getAllPatientTreatments]);

  useEffect(() => {
    if (patientTreatments) {
      setFilteredTreatments(patientTreatments);
    }
  }, [patientTreatments]);

  useEffect(() => {
    const loadTreatmentsWithBudgetInfo = async () => {
      try {
        setLoading(true);
        const treatments = await getAllPatientTreatments();
        
        if (!treatments || !Array.isArray(treatments)) {
          setFilteredTreatments([]);
          return;
        }
  
        const treatmentsWithBudgetInfo = await Promise.all(
          treatments.map(async (treatment) => {
            try {
              const budget = await budgetService.getBudgetByTreatment(treatment._id);
              return {
                ...treatment,
                hasBudget: true,
                budgetId: budget._id
              };
            } catch (error) {
              return {
                ...treatment,
                hasBudget: false,
                budgetId: null
              };
            }
          })
        );
  
        setFilteredTreatments(treatmentsWithBudgetInfo);
      } catch (error) {
        console.error('Error loading treatments:', error);
        toast.error('Error al cargar las planificaciones');
        setFilteredTreatments([]);
      } finally {
        setLoading(false);
      }
    };
  
    loadTreatmentsWithBudgetInfo();
  }, [getAllPatientTreatments]);

// Función para verificar presupuestos
const checkBudgetStatus = async (treatmentId) => {
  try {
    const budget = await budgetService.getBudgetByTreatment(treatmentId);
    return budget ? budget._id : null;
  } catch (error) {
    return null;
  }
};

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar esta planificación?')) {
      try {
        await deletePatientTreatment(id);
        await getAllPatientTreatments();
        toast.success('Planificación eliminada exitosamente');
      } catch (error) {
        toast.error('Error al eliminar la planificación. \nVerifique que no existan Presupuestos asignados para este Plan de Tratamientos');
      }
    }
  };

  const handleSearch = async () => {
    try {
      if (!searchQuery.trim()) {
        loadTreatments();
        return;
      }

      const treatmentsToSearch = patientTreatments || [];
      let filtered;
      
      if (searchType === 'cedula') {
        filtered = treatmentsToSearch.filter(treatment => 
          treatment.paciente?.numeroCedula?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      } else {
        filtered = treatmentsToSearch.filter(treatment =>
          treatment.paciente?.nombrePaciente?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setFilteredTreatments(filtered);

      if (filtered.length === 0) {
        toast.info('No se encontraron planificaciones');
      }
    } catch (error) {
      console.error('Error en búsqueda:', error);
      toast.error('Error al buscar planificaciones');
    }
  };


  const handleCreateBudget = async (treatment) => {
    if (!treatment || !treatment._id) {
      toast.error('Información de tratamiento inválida');
      return;
    }
  
    try {
      if (treatment.hasBudget && treatment.budgetId) {
        // Si ya sabemos que tiene presupuesto y tenemos el ID
        navigate(`/presupuestos/editar/${treatment.budgetId}`);
      } else {
        // Si no tiene presupuesto, crear uno nuevo
        navigate('/presupuestos/nuevo', { 
          state: { treatmentPlanId: treatment._id }
        });
      }
    } catch (error) {
      console.error('Error al gestionar presupuesto:', error);
      toast.error('Error al gestionar presupuesto');
    }
  };

  const handleReset = () => {
    setSearchQuery('');
    setSearchType('cedula');
    loadTreatments();
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }


  if (!patientTreatments || patientTreatments.length === 0) {
    return (
      <Box textAlign="center" p={3}>
        <Typography>No hay planificaciones disponibles</Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/planificacion/nueva')}
          sx={{ mt: 2 }}
        >
          Crear Nueva Planificación
        </Button>
      </Box>
    );
  }

  return (
    <div style={{ backgroundColor: '#f5f1ef', minHeight: '100vh', padding: '20px' }}>
      <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/planificacion")}
          sx={{ mb: 2 }}
        >
          Volver
        </Button>
      
      <Container maxWidth="lg">
        

        <Paper sx={{ p: 3, mb: 3 }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={12} sm={12} sx={{ mb: 4 }}>
              <Typography
                variant="h4"
                gutterBottom
                align="center"
                sx={{ pt: 2, pb: 1 }}
              >
                Planificaciones
              </Typography>
            </Grid>
            <br/>
            <Grid item xs={12} sm={3}>
              
        <FormControl fullWidth>
          <InputLabel>Buscar por</InputLabel>
          <Select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            label="Buscar por"
          >
            <MenuItem value="cedula">Cédula</MenuItem>
            <MenuItem value="nombre">Nombre</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          label={searchType === 'cedula' ? 'Ingrese cédula' : 'Ingrese nombre'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <Button
          fullWidth
          variant="contained"
          onClick={handleSearch}
        >
          Buscar
        </Button>
      </Grid>

      <Grid item xs={12} sm={2}>
  <Button
    fullWidth
    variant="outlined"
    onClick={handleReset}
  >
    Restablecer
  </Button>
</Grid>
    
            <Grid item xs={12} sm={12} sx={{ mt: 4}}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => navigate('/planificacion/nueva')}
              >
                Nueva Planificación
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="h6">Paciente</Typography></TableCell>
                <TableCell><Typography variant="h6">Especialidad</Typography></TableCell>
                <TableCell><Typography variant="h6">Actividades</Typography></TableCell>
                <TableCell align="center"><Typography variant="h6">Acciones</Typography></TableCell>
              </TableRow>
            </TableHead>
            {!loading && filteredTreatments.length > 0 ? (
            <TableBody>
              {filteredTreatments.map((treatment) => (
                
                <TableRow key={treatment._id}>
                  <TableCell>{treatment.paciente.nombrePaciente}</TableCell>
                  <TableCell>{treatment.especialidad}</TableCell>
                  <TableCell>
                    {treatment.actividades.length} actividades
                    
                  </TableCell>
                  
                  <TableCell align="center">
                    <IconButton 
                      onClick={() => handleCreateBudget(treatment)}
                      title={treatment.hasBudget ? "Ver Presupuesto" : "Crear Presupuesto"}
                    >
                      <ReceiptLongIcon color={treatment.hasBudget ? "primary" : "inherit"}  />
                    </IconButton>
                    <IconButton
                      onClick={() => navigate(`/planificacion/editar/${treatment._id}`)}
                      title="Editar"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(treatment._id)}
                      title="Eliminar"
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
             ) : (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    {loading ? 'Cargando...' : 'No hay planificaciones disponibles'}
                  </TableCell>
                </TableRow>
              </TableBody>
             )}
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default PlanningList;