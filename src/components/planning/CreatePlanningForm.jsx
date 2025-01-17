import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import { useNavigate, useParams } from "react-router-dom";
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { ArrowBack } from '@mui/icons-material';
import { toast } from 'react-toastify';
import patientTreatmentService from '../../services/patientTreatmentService';


const CreatePlanningForm = ({ 
  mode = 'create', 
  onSubmit, 
  fetchPatientByCedula,
  fetchPatientByName,
  treatmentPlan = null  
}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    especialidad: '',
    actividades: [{
      cita: '',
      actividadPlanTrat: '',
      fechaPlanTrat: '',
      montoAbono: '',
      estado: 'pendiente'
    }]
  });

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchType, setSearchType] = useState("cedula");
  const [searchQuery, setSearchQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [patients, setPatients] = useState([]);

  const [showDialog, setShowDialog] = useState(false);
  const [createdTreatmentId, setCreatedTreatmentId] = useState(null);

  const especialidades = [
    'Odontología General',
    'Ortodoncia',
    'Endodoncia',
    'Periodoncia',
    'Cirugía Oral',
    'Rehabilitación Oral',
    'Odontopediatría'
  ];

  // Agregar la función handleSearch justo después de las declaraciones de estado
const handleSearch = async () => {
  try {
    let result;
    console.log('Buscando paciente:', { tipo: searchType, query: searchQuery });
    
    if (searchType === "cedula") {
      result = await fetchPatientByCedula(searchQuery);
    } else {
      result = await fetchPatientByName(searchQuery);
    }

    if (result.success) {
      setPatients(Array.isArray(result.data) ? result.data : [result.data]);
      setSearched(true);
    } else {
      toast.error(result.error || "No se encontró el paciente");
    }
  } catch (error) {
    console.error('Error en búsqueda:', error);
    toast.error("Error al buscar el paciente");
  }
};

useEffect(() => {
  if (mode === 'edit' && id) {
    const loadTreatment = async () => {
      setLoading(true);
      try {
        console.log('Loading treatment with ID:', id); // Debug
        const treatment = await patientTreatmentService.getById(id);
        
        if (!treatment) {
          throw new Error('No se encontró la planificación');
        }

        setFormData({
          especialidad: treatment.especialidad,
          actividades: treatment.actividades.map(act => ({
            cita: act.cita,
            actividadPlanTrat: act.actividadPlanTrat,
            fechaPlanTrat: act.fechaPlanTrat.split('T')[0],
            montoAbono: act.montoAbono || '',
            estado: act.estado || 'pendiente'
          }))
        });
        
        setSelectedPatient(treatment.paciente);
      } catch (error) {
        console.error('Error loading treatment:', error);
        toast.error('Error al cargar la planificación');
        navigate('/planificacion/lista');
      } finally {
        setLoading(false);
      }
    };

    loadTreatment();
  }
}, [mode, id, navigate]);

  const addActivity = () => {
    setFormData(prev => ({
      ...prev,
      actividades: [...prev.actividades, {
        cita: '',
        actividadPlanTrat: '',
        fechaPlanTrat: '',
        montoAbono: '',
        estado: 'pendiente'
      }]
    }));
  };

  const removeActivity = (index) => {
    setFormData(prev => ({
      ...prev,
      actividades: prev.actividades.filter((_, i) => i !== index)
    }));
  };

  const updateActivity = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      actividades: prev.actividades.map((act, i) => 
        i === index ? { ...act, [field]: value } : act
      )
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedPatient || !formData.especialidad) return toast.error('Campos requeridos incompletos');
  
    const treatmentData = {
      paciente: selectedPatient.id || selectedPatient._id,
      especialidad: formData.especialidad,
      actividades: formData.actividades.map(act => ({
        ...act,
        fechaPlanTrat: new Date(act.fechaPlanTrat).toISOString(),
        montoAbono: parseFloat(act.montoAbono) || 0,
        estado: 'pendiente'
      }))
    };
  
    try {
      if (mode === 'edit') {
        await onSubmit(id, treatmentData);
        toast.success('Planificación actualizada');
        navigate('/planificacion');
      } else {
        const response = await onSubmit(treatmentData);
        console.log('Planificación creada:', response); // Debug
        if (response && response._id) {
          setCreatedTreatmentId(response._id);
          setShowDialog(true);
        } else {
          throw new Error('No se recibió ID de planificación');
        }
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

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div style={{ backgroundColor: '#f5f1ef', minHeight: '100vh', padding: '20px' }}>
    <Box sx={{ mb: 4 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => navigate('/planificacion/lista')}
        >
          Volver
        </Button>
      </Box>

    <Container>
      
  
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5"  gutterBottom>
          {mode === 'edit' ? 'Editar Planificación' : 'Nueva Planificación'}
        </Typography>
  
        {/* Búsqueda de Paciente */}
        {mode === 'create' && !treatmentPlan && (
  <Box component={Paper} sx={{ p: 2, mb: 3 }}>
    <Box component="form" onSubmit={(e) => {
      e.preventDefault();
      handleSearch();
    }}>
      <Typography variant="h6" gutterBottom>Buscar Paciente</Typography>
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
        <Grid item xs={12} sm={5}>
          <TextField
            fullWidth
            label={searchType === "cedula" ? "Cédula" : "Nombre"}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
          >
            Buscar
          </Button>
        </Grid>
      </Grid>
    </Box>

    {/* Resultados de búsqueda */}
    {searched && patients.length > 0 && (
      <TableContainer sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Cédula</TableCell>
              <TableCell>Acciones</TableCell>
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
                      setFormData(prev => ({
                        ...prev,
                        paciente: patient._id || patient.id
                      }));
                      console.log('Paciente seleccionado:', patient);
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

    

  </Box>
)}
  <hr/>
        {/* Formulario de Planificación */}
        <form onSubmit={handleSubmit}>
          {selectedPatient && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1">
                <strong>Paciente:</strong> {selectedPatient.nombrePaciente}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Cédula:</strong> {selectedPatient.numeroCedula}
              </Typography>
            </Box>
          )}
          <hr/>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Especialidad</InputLabel>
            <Select
              value={formData.especialidad}
              onChange={(e) => setFormData({ ...formData, especialidad: e.target.value })}
              label="Especialidad"
              required
            >
              {especialidades.map((esp) => (
                <MenuItem key={esp} value={esp}>{esp}</MenuItem>
              ))}
            </Select>
          </FormControl>
  
          {/* Lista de Actividades */}
          {formData.actividades.map((actividad, index) => (
            <Paper key={index} elevation={2} sx={{ p: 2, mb: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} display="flex" justifyContent="space-between">
                  <Typography variant="h6">Actividad {index + 1}</Typography>
                  <IconButton 
                    color="error" 
                    onClick={() => removeActivity(index)}
                    disabled={formData.actividades.length === 1}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Cita"
                    value={actividad.cita}
                    onChange={(e) => updateActivity(index, 'cita', e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Fecha"
                    value={actividad.fechaPlanTrat}
                    onChange={(e) => updateActivity(index, 'fechaPlanTrat', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    label="Descripción de la Actividad"
                    value={actividad.actividadPlanTrat}
                    onChange={(e) => updateActivity(index, 'actividadPlanTrat', e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Monto Abono"
                    value={actividad.montoAbono}
                    onChange={(e) => updateActivity(index, 'montoAbono', e.target.value)}
                    InputProps={{ inputProps: { min: 0 } }}
                  />
                </Grid>
              </Grid>
            </Paper>
          ))}
  
          <Box sx={{ mb: 3 }}>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={addActivity}
            >
              Agregar Actividad
            </Button>
          </Box>
  
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!selectedPatient || loading}
          >
            {loading ? <CircularProgress size={24} /> : 
              mode === 'edit' ? 'Actualizar Planificación' : 'Crear Planificación'}
          </Button>
        </form>
      </Paper>
      <Dialog open={showDialog}>
  <DialogTitle>Planificación Creada Exitosamente</DialogTitle>
  <DialogContent>
    <DialogContentText>
      ¿Desea crear un presupuesto para esta planificación?
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => {
      setShowDialog(false);
      navigate('/planificacion');
    }}>
      No
    </Button>
    <Button 
      variant="contained"
      onClick={() => {
        // Verificar que tenemos el ID correctamente
        console.log('ID de planificación a enviar:', createdTreatmentId);
        navigate(`/presupuestos/nuevo`, {
          state: { 
            treatmentPlanId: createdTreatmentId,
            fromPlanning: true // flag para indicar que viene de planificación
          
          }
        });
      }}>
      Sí
    </Button>
  </DialogActions>
</Dialog>
    </Container>
     </div> 
  );
};

export default CreatePlanningForm;