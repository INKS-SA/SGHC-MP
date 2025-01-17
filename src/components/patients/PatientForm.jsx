import React from 'react';
import { Grid, TextField, Button, Box, Typography, Container, Paper, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';


const PatientForm = ({ newPatient, handleCreateChange, handleCreateSubmit }) => {
  return (
   <Container component={Paper} sx={{my: 2, py: 2}}>
      <Typography variant="h6" align="center" sx = {{ marginBottom: 4 }} gutterBottom>
        Crear Paciente
      </Typography>
      <form onSubmit={handleCreateSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nombre del Paciente"
              name="nombrePaciente"
              value={newPatient.nombrePaciente}
              onChange={handleCreateChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Edad del Paciente"
              name="edadPaciente"
              value={newPatient.edadPaciente}
              onChange={handleCreateChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="date"
              label="Fecha de Nacimiento"
              name="fechaNacimiento"
              value={newPatient.fechaNacimiento}
              onChange={handleCreateChange}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="email"
              label="Correo electrónico"
              name="correoPaciente"
              value={newPatient.correoPaciente}
              onChange={handleCreateChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Dirección"
              name="direccionPaciente"
              value={newPatient.direccionPaciente}
              onChange={handleCreateChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Género"
              name="generoPaciente"
              value={newPatient.generoPaciente}
              onChange={handleCreateChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Número de Cédula"
              name="numeroCedula"
              value={newPatient.numeroCedula}
              onChange={handleCreateChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Ocupación"
              name="ocupacion"
              value={newPatient.ocupacion}
              onChange={handleCreateChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Teléfono"
              name="telefono"
              value={newPatient.telefono}
              onChange={handleCreateChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Teléfono de Contacto de Emergencia"
              name="telContactoEmergencia"
              value={newPatient.telContactoEmergencia}
              onChange={handleCreateChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Afinidad de Contacto de Emergencia"
              name="afinidadContactoEmergencia"
              value={newPatient.afinidadContactoEmergencia}
              onChange={handleCreateChange}
              required
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl component="fieldset" sx={{ margin: 1 }}>
              <FormLabel component="legend">Desea recibir notificaciones al whatsapp?</FormLabel>
              <RadioGroup
                name="notificacionesWpp"
                value={newPatient.notificacionesWpp}
                onChange={handleCreateChange}
                row
              >
                <FormControlLabel value="true" control={<Radio />} label="Sí" />
                <FormControlLabel defaultChecked value="false" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid>

          {newPatient.notificacionesWpp === 'true' && (
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Clave de activación"
                name="apiKey"
                value={newPatient.apiKey}
                onChange={handleCreateChange}
                //required
              />
            </Grid>
          )}

          <Grid item xs={12} sx={{ m: 2 }} style={{ textAlign: 'center',}}>
            <Button type="submit" variant="contained" color="primary">
              Crear Paciente
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
    
  );
};

export default PatientForm;
