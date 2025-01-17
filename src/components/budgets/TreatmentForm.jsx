import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';
import dayjs from "dayjs";

const TreatmentForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    cita: '',
    actividadPlanTrat: '',
    fechaPlanTrat: '',
    montoAbono: '',
    especialidad:''
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

  useEffect(() => {
    if (initialData) {
      setFormData({
        cita: initialData.cita || '',
        actividadPlanTrat: initialData.actividadPlanTrat || '',
        fechaPlanTrat: initialData.fechaPlanTrat.split('T')[0] || '',
        montoAbono: initialData.montoAbono || '',
        especialidad:initialData.especialidad ||''
      });
    }
  }, [initialData]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validaciones
    if (!formData.cita.trim() || !formData.actividadPlanTrat.trim() || 
        !formData.fechaPlanTrat || !formData.montoAbono) {
      toast.error('Todos los campos son requeridos');
      return;
    }

    try {
      if (initialData) {
        await onSubmit(initialData.id, formData);
      } else {
        await onSubmit(formData);
      }
      
      // Limpiar formulario
      setFormData({
        cita: '',
        actividadPlanTrat: '',
        fechaPlanTrat: '',
        montoAbono: '',
        especialidad:''
      });
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
    <Paper sx={{ p: 3, mb: 3, position: 'relative' }}>
      <IconButton 
        onClick={onCancel}
        sx={{ position: 'absolute', right: 8, top: 8 }}
      >
        <CloseIcon />
      </IconButton>

      <Typography variant="h6" gutterBottom>
        {initialData ? 'Editar Tratamiento' : 'Nuevo Tratamiento'}
      </Typography>

      <form onSubmit={handleSubmit}>
      <FormControl fullWidth>
        <InputLabel>Especialidad</InputLabel>
        <Select
          value={formData.especialidad}
          onChange={handleChange}
          name="especialidad"
          required
        >
          {especialidades.map(esp => (
            <MenuItem key={esp} value={esp}>{esp}</MenuItem>
          ))}
        </Select>
      </FormControl>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Cita"
              name="cita"
              value={formData.cita}
              onChange={handleChange}
              required
              placeholder="Ej: Cita 1"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="date"
              label="Fecha"
              name="fechaPlanTrat"
              value={formData.fechaPlanTrat}
              onChange={handleChange}
              required
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

        

        

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Actividad"
              name="actividadPlanTrat"
              value={formData.actividadPlanTrat}
              onChange={handleChange}
              required
              multiline
              rows={3}
              placeholder="Descripción de la actividad a realizar"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Monto Abono"
              name="montoAbono"
              value={formData.montoAbono}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: '$',
                step: "0.01"
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end" gap={2}>
              <Button 
                variant="outlined" 
                onClick={onCancel}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                variant="contained"
              >
                {initialData ? 'Actualizar' : 'Guardar'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default TreatmentForm;