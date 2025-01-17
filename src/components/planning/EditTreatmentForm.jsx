import React, { useState } from "react";
import { 
  Box,
  Paper,
  Grid,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  IconButton
} from "@mui/material";
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon 
} from '@mui/icons-material';
import { toast } from "react-toastify";

const EditTreatmentForm = ({
  treatmentId,
  treatmentData,
  updatePatientTreatment
}) => {
  const [formData, setFormData] = useState({
    especialidad: treatmentData?.especialidad || "",
    actividades: treatmentData?.actividades || []
  });

  const [editingActivity, setEditingActivity] = useState(null);
  const [editedActivity, setEditedActivity] = useState({
    cita: "",
    actividadPlanTrat: "",
    fechaPlanTrat: "",
    montoAbono: ""
  });

  const especialidades = [
    'Odontología General',
    'Ortodoncia',
    'Endodoncia',
    'Periodoncia',
    'Cirugía Oral',
    'Rehabilitación Oral',
    'Odontopediatría'
  ];

  const handleUpdateActivity = (index, field, value) => {
    const updatedActividades = [...formData.actividades];
    updatedActividades[index] = {
      ...updatedActividades[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      actividades: updatedActividades
    }));
  };

  const handleStartEditing = (activity, index) => {
    setEditingActivity(index);
    setEditedActivity({
      ...activity,
      fechaPlanTrat: activity.fechaPlanTrat.split('T')[0]
    });
  };

  const handleSaveActivity = () => {
    if (editingActivity !== null) {
      handleUpdateActivity(editingActivity, 'cita', editedActivity.cita);
      handleUpdateActivity(editingActivity, 'actividadPlanTrat', editedActivity.actividadPlanTrat);
      handleUpdateActivity(editingActivity, 'fechaPlanTrat', editedActivity.fechaPlanTrat);
      handleUpdateActivity(editingActivity, 'montoAbono', editedActivity.montoAbono);
      setEditingActivity(null);
    }
  };

  const handleDeleteActivity = (index) => {
    if (formData.actividades.length <= 1) {
      toast.error('La planificación debe tener al menos una actividad');
      return;
    }
    
    const updatedActividades = formData.actividades.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      actividades: updatedActividades
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!formData.especialidad) {
        toast.error('La especialidad es requerida');
        return;
      }

      if (formData.actividades.length === 0) {
        toast.error('Debe haber al menos una actividad');
        return;
      }

      await updatePatientTreatment(treatmentId, formData);
      toast.success('Planificación actualizada exitosamente');
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
    <Box>
      <Paper sx={{ p: 2, mb: 3 }}>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Especialidad</InputLabel>
          <Select
            value={formData.especialidad}
            onChange={(e) => setFormData({...formData, especialidad: e.target.value})}
          >
            {especialidades.map(esp => (
              <MenuItem key={esp} value={esp}>{esp}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography variant="h6" gutterBottom>Actividades</Typography>
        <List>
          {formData.actividades.map((actividad, index) => (
            <ListItem
              key={index}
              sx={{ 
                border: '1px solid #e0e0e0', 
                borderRadius: 1,
                mb: 1
              }}
            >
              {editingActivity === index ? (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Cita"
                      value={editedActivity.cita}
                      onChange={(e) => setEditedActivity({
                        ...editedActivity,
                        cita: e.target.value
                      })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="date"
                      label="Fecha"
                      value={editedActivity.fechaPlanTrat}
                      onChange={(e) => setEditedActivity({
                        ...editedActivity,
                        fechaPlanTrat: e.target.value
                      })}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={2}
                      label="Actividad"
                      value={editedActivity.actividadPlanTrat}
                      onChange={(e) => setEditedActivity({
                        ...editedActivity,
                        actividadPlanTrat: e.target.value
                      })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Monto Abono"
                      value={editedActivity.montoAbono}
                      onChange={(e) => setEditedActivity({
                        ...editedActivity,
                        montoAbono: e.target.value
                      })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button 
                      variant="contained" 
                      onClick={handleSaveActivity}
                      sx={{ mr: 1 }}
                    >
                      Guardar
                    </Button>
                    <Button 
                      variant="outlined"
                      onClick={() => setEditingActivity(null)}
                    >
                      Cancelar
                    </Button>
                  </Grid>
                </Grid>
              ) : (
                <>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1">
                        Cita: {actividad.cita}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography>{actividad.actividadPlanTrat}</Typography>
                        <Typography variant="caption">
                          Fecha: {new Date(actividad.fechaPlanTrat).toLocaleDateString()}
                        </Typography>
                        {actividad.montoAbono > 0 && (
                          <Typography>
                            Monto Abono: ${actividad.montoAbono}
                          </Typography>
                        )}
                      </>
                    }
                  />
                  <Box>
                    <IconButton 
                      onClick={() => handleStartEditing(actividad, index)}
                      sx={{ mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      onClick={() => handleDeleteActivity(index)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </>
              )}
            </ListItem>
          ))}
        </List>

        <Button 
          variant="contained" 
          fullWidth 
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          Actualizar Planificación
        </Button>
      </Paper>
    </Box>
  );
};

export default EditTreatmentForm;