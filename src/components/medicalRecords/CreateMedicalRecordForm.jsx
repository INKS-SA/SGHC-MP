import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  Container,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Button,
  Grid,
  Box,
  Paper
} from "@mui/material";
import { toast } from "react-toastify";

const CreateMedicalRecordForm = ({ patientId, createMedicalRecord }) => {
  const [newMedicalRecord, setNewMedicalRecord] = useState({
    date: "",
    description: "",
    paciente: patientId,
    motivoConsulta: "",
    expectativaPaciente: "",
    enfermedadSistemica: "",
    enfermedadPreexistente: "",
    medicoTratante: "",
    telMedicoTratante: "",
    medicamentosConsume: "",
    alergiaMedicamentos: "",
    habitosNocivos: [],
    enfermedadesRespiratorias: "",
    enfermedadesHormonales: "",
    estaGestando: false,
    mesGestacion: "",
    esMenorEdad: false,
    nombreRepresentante: "",
    telRepresentante: "",
    ultimaVisitaDentista: "",
    infiltracionesAnestesiaPrev: false,
    reaccionesAdversasInfiltracion: false,
    queReaccionInfiltracion: "",
    exodonciaCirugiaPrevias: false,
    complicacionesLuegoCirugias: false,
    queComplicacionesCirugias: "",
    presentaDificultades: [],
    otraDificultad: "",
    presenta: [],
    estadoLengua: "",
    estadoLabios: "",
    estadoCarillos: "",
    estadoPisoBoca: "",
    estadoGingivoPerio: "",
    estadoEnfermedadPerio: "",
    analisisOclusalDerRM: "",
    analisisOclusalDerRC: "",
    analisisOclusalIzqRM: "",
    analisisOclusalIzqRC: "",
    condicionEsqueletal: "",
    diagnosticoOclusal: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewMedicalRecord((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await createMedicalRecord(newMedicalRecord);
      // Notificación de éxito
      toast.success("Detalle Médico creado exitosamente", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate('/patients');

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
    }
  };

  const handleCheckboxChange = (e, listName) => {
    const { name, checked } = e.target;
    const updatedList = checked
      ? [...newMedicalRecord[listName], name]
      : newMedicalRecord[listName].filter(item => item !== name);

    setNewMedicalRecord({
      ...newMedicalRecord,
      [listName]: updatedList,
    });
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setNewMedicalRecord(prevRecord => ({
      ...prevRecord,
      [name]: value === 'true'
    }));
  };

  return (
    <Container component={Paper} sx = {{mt:2, mb: 2}}>
      <Typography variant="h5" align="center" gutterBottom sx = {{ marginTop: 2, marginBottom: 4}}>
        Crear Historia Clínica
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={5}>
            <TextField
              fullWidth
              type="date"
              label="Fecha"
              name="date"
              value={newMedicalRecord.date}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
              sx = {{ margin: 1 }}
            />
          </Grid>
          <Grid item xs={7}>
            <TextField
              fullWidth
              label="Antecedentes del problema:"
              name="description"
              value={newMedicalRecord.description}
              onChange={handleChange}
              multiline
              required
              sx = {{ margin: 1 }}
            />
          </Grid>

          <Grid item xs={12}>
            <Grid container justifyContent="center">
              <Typography variant="h6" gutterBottom>
                Motivo y Expectativa
              </Typography>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Motivo Consulta"
                  name="motivoConsulta"
                  value={newMedicalRecord.motivoConsulta}
                  onChange={handleChange}
                  multiline
                  required
                  sx={{ margin: 1 }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Expectativa Paciente"
                  name="expectativaPaciente"
                  value={newMedicalRecord.expectativaPaciente}
                  onChange={handleChange}
                  multiline
                  required
                  sx={{ margin: 1 }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container justifyContent="center">
              <Typography variant="h6" gutterBottom>
                Riesgos y Enfermedades Sistémicas
              </Typography>
            </Grid>
            <TextField
              fullWidth
              label="Enfermedad Sistémica"
              name="enfermedadSistemica"
              value={newMedicalRecord.enfermedadSistemica}
              onChange={handleChange}
              sx={{ margin: 1 }}
            />
            <TextField
              fullWidth
              label="Enfermedad Preexistente"
              name="enfermedadPreexistente"
              value={newMedicalRecord.enfermedadPreexistente}
              onChange={handleChange}
              sx={{ margin: 1 }}
            />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Médico Tratante"
                  name="medicoTratante"
                  value={newMedicalRecord.medicoTratante}
                  onChange={handleChange}
                  sx={{ margin: 1 }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Teléfono Médico Tratante"
                  name="telMedicoTratante"
                  value={newMedicalRecord.telMedicoTratante}
                  onChange={handleChange}
                  sx={{ margin: 1 }}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Medicamentos que Consume"
                  name="medicamentosConsume"
                  value={newMedicalRecord.medicamentosConsume}
                  onChange={handleChange}
                  multiline
                  sx={{ margin: 1 }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Alergia a Medicamentos"
                  name="alergiaMedicamentos"
                  value={newMedicalRecord.alergiaMedicamentos}
                  onChange={handleChange}
                  multiline
                  sx={{ margin: 1 }}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} container spacing={2}>

              <FormLabel component="legend" sx={{ margin: 3 }}> Hábitos Nocivos:</FormLabel>

              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="tabaco"
                      checked={newMedicalRecord.habitosNocivos.includes('tabaco')}
                      onChange={(e) => handleCheckboxChange(e, 'habitosNocivos')}
                    />
                  }
                  label="Tabaco"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="alcohol"
                      checked={newMedicalRecord.habitosNocivos.includes('alcohol')}
                      onChange={(e) => handleCheckboxChange(e, 'habitosNocivos')}
                    />
                  }
                  label="Alcohol"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="drogas"
                      checked={newMedicalRecord.habitosNocivos.includes('drogas')}
                      onChange={(e) => handleCheckboxChange(e, 'habitosNocivos')}
                    />
                  }
                  label="Drogas"
                />
              </FormGroup>
            </Grid>
            <TextField
              fullWidth
              label="Enfermedades Respiratorias"
              name="enfermedadesRespiratorias"
              value={newMedicalRecord.enfermedadesRespiratorias}
              onChange={handleChange}
              multiline
              sx={{ margin: 1 }}
            />
            <TextField
              fullWidth
              label="Enfermedades Hormonales"
              name="enfermedadesHormonales"
              value={newMedicalRecord.enfermedadesHormonales}
              onChange={handleChange}
              multiline
              sx={{ margin: 1 }}
            />
            <Grid item xs={12} container spacing={2} sx={{ margin: 1 }}>
              <FormControl component="fieldset" sx={{ marginTop: 1 , marginRight: 5, marginLeft: 1}}>
                <FormLabel component="legend">¿Está gestando?</FormLabel>
                <RadioGroup
                  name="estaGestando"
                  value={String(newMedicalRecord.estaGestando)}
                  onChange={handleRadioChange}
                  row
                >
                  <FormControlLabel value="true" control={<Radio />} label="Sí" />
                  <FormControlLabel value="false" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
              <Grid item xs={4} sx={{ marginLeft: 1 }}>

                {newMedicalRecord.estaGestando && (
                  <TextField
                    fullWidth
                    label="Mes de Gestación"
                    name="mesGestacion"
                    value={newMedicalRecord.mesGestacion}
                    onChange={handleChange}
                  />
                )}
              </Grid>
            </Grid>

            <Grid item xs={12} container spacing={2} sx={{ margin: 1 }}>
              <FormControl component="fieldset" sx={{ margin: 1 }}>
                <FormLabel component="legend">¿Es menor de edad?</FormLabel>
                <RadioGroup
                  name="esMenorEdad"
                  value={String(newMedicalRecord.esMenorEdad)}
                  onChange={handleRadioChange}
                  row
                >
                  <FormControlLabel value="true" control={<Radio />} label="Sí" />
                  <FormControlLabel value="false" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            
              <Grid item xs={6} sx={{ marginLeft: 1 }}>
                {newMedicalRecord.esMenorEdad && (
                  <>
                    <TextField
                      fullWidth
                      label="Nombre del Representante"
                      name="nombreRepresentante"
                      value={newMedicalRecord.nombreRepresentante}
                      onChange={handleChange}
                      sx={{ margin: 1 }}
                    />  
                  </>
                )}
                </Grid>
                <Grid item xs={4}>
                {newMedicalRecord.esMenorEdad && (
                  <>
                    <TextField
                      fullWidth
                      label="Teléfono del Representante"
                      name="telRepresentante"
                      value={newMedicalRecord.telRepresentante}
                      onChange={handleChange}
                      sx={{ margin: 1 }}
                    />
                  </>
                )}
                </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container justifyContent="center" >
              <Typography variant="h6" gutterBottom>
                Estomatológico
              </Typography>
            </Grid>
            <TextField
              fullWidth
              label="Última Visita al Dentista"
              name="ultimaVisitaDentista"
              value={newMedicalRecord.ultimaVisitaDentista}
              onChange={handleChange}
              multiline
              sx={{ margin: 1 }}
            />
            <Grid container spacing={2} sx = {{ margin: 1}}>
              <FormControl component="fieldset" sx={{ margin: 1 }}>
                <FormLabel component="legend">Infiltraciones de anestesia previas?:</FormLabel>
                <RadioGroup
                  name="infiltracionesAnestesiaPrev"
                  value={String(newMedicalRecord.infiltracionesAnestesiaPrev)}
                  onChange={handleRadioChange}
                  row
                >
                  <FormControlLabel value="true" control={<Radio />} label="Sí" />
                  <FormControlLabel value="false" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>

              
              <FormControl component="fieldset" sx={{ margin: 1 }}>
                <FormLabel component="legend">Reacciones adversas a la infiltración de anestesia?:</FormLabel>
                <RadioGroup
                  name="reaccionesAdversasInfiltracion"
                  value={String(newMedicalRecord.reaccionesAdversasInfiltracion)}
                  onChange={handleRadioChange}
                  row
                >
                  <FormControlLabel value="true" control={<Radio />} label="Sí" />
                  <FormControlLabel value="false" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>

              <Grid item xs={4}>
                {newMedicalRecord.reaccionesAdversasInfiltracion && (
                  <TextField
                    fullWidth
                    label="¿Qué reacción a la infiltración?:"
                    name="queReaccionInfiltracion"
                    value={newMedicalRecord.queReaccionInfiltracion}
                    onChange={handleChange}
                    
                  />
                )}
              </Grid>
            </Grid>
            <Grid container spacing={2} sx = {{ margin: 1}}>
              <Grid item xs={3} sx ={{ marginLeft: -1, marginRight: 2 }}>

                <FormControl component="fieldset" > 
                  <FormLabel component="legend">Exodoncia o cirugías bucales o maxilares previas?:</FormLabel>
                  <RadioGroup
                    name="exodonciaCirugiaPrevias"
                    value={String(newMedicalRecord.exodonciaCirugiaPrevias)}
                    onChange={handleRadioChange}
                    row
                  >
                    <FormControlLabel value="true" control={<Radio />} label="Sí" />
                    <FormControlLabel value="false" control={<Radio />} label="No" />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={3} sx = {{ marginLeft: -3, marginRight: 5}}>
                <FormControl component="fieldset"> 
                  <FormLabel component="legend">Ha tenido complicaciones luego de las cirugías?:</FormLabel>
                  <RadioGroup
                    name="complicacionesLuegoCirugias"
                    value={String(newMedicalRecord.complicacionesLuegoCirugias)}
                    onChange={handleRadioChange}
                    row
                  >
                    <FormControlLabel value="true" control={<Radio />} label="Sí" />
                    <FormControlLabel value="false" control={<Radio />} label="No" />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={4} sx = {{ marginLeft: 10, marginTop: 2 }}>
                {newMedicalRecord.complicacionesLuegoCirugias && (
                  <TextField
                    fullWidth
                    label="¿Qué complicaciones luego de las cirugías?:"
                    name="queComplicacionesCirugias"
                    value={newMedicalRecord.queComplicacionesCirugias}
                    onChange={handleChange}
                    
                  />
                )}
              </Grid>
          </Grid>

          
          <Grid container spacing={2} sx = {{ margin: 1 }}>  
            <FormControl component="fieldset" sx={{ margin: 1 }}>
              <FormLabel component="legend">¿Presenta dificultades para?:</FormLabel>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="masticar"
                      checked={newMedicalRecord.presentaDificultades.includes('masticar')}
                      onChange={(e) => handleCheckboxChange(e, 'presentaDificultades')}
                    />
                  }
                  label="Masticar"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="hablar"
                      checked={newMedicalRecord.presentaDificultades.includes('hablar')}
                      onChange={(e) => handleCheckboxChange(e, 'presentaDificultades')}
                    />
                  }
                  label="Hablar"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="abrirBoca"
                      checked={newMedicalRecord.presentaDificultades.includes('abrirBoca')}
                      onChange={(e) => handleCheckboxChange(e, 'presentaDificultades')}
                    />
                  }
                  label="Abrir la boca"
                />
              </FormGroup>
            </FormControl>
            <Grid item xs={3} sx = {{ marginLeft: 2}}>
              <TextField
                fullWidth
                label="Otra Dificultad"
                name="otraDificultad"
                value={newMedicalRecord.otraDificultad}
                onChange={handleChange}
                multiline
                sx={{ margin: 1 }}
              />
              </Grid>
          </Grid>

            <FormControl component="fieldset" sx={{ marginLeft: 2 }}>
              <FormLabel component="legend">¿Presenta?:</FormLabel>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="supuracion"
                      checked={newMedicalRecord.presenta.includes('supuracion')}
                      onChange={(e) => handleCheckboxChange(e, 'presenta')}
                    />
                  }
                  label="Supuración"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="sangrado"
                      checked={newMedicalRecord.presenta.includes('sangrado')}
                      onChange={(e) => handleCheckboxChange(e, 'presenta')}
                    />
                  }
                  label="Sangrado"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="movilidadDental"
                      checked={newMedicalRecord.presenta.includes('movilidadDental')}
                      onChange={(e) => handleCheckboxChange(e, 'presenta')}
                    />
                  }
                  label="Movilidad Dental"
                />
              </FormGroup>
            </FormControl>

          </Grid>

          <Grid item xs={12}>
            <Grid container justifyContent="center">
              <Typography variant="h6" gutterBottom>
                Estado de Tejidos Blandos
              </Typography>
            </Grid>
            <Grid container spacing={2}>

              <Grid item xs={4.5} sx = {{ marginRight: 12}}>
                <TextField
                  fullWidth
                  label="Estado de la Lengua:"
                  name="estadoLengua"
                  value={newMedicalRecord.estadoLengua}
                  onChange={handleChange}
                  multiline
                  sx = {{margin: 1}}
                />
              </Grid>

              <Grid item xs={4.5} sx = {{ marginLeft: 12}}>
                <TextField
                  fullWidth
                  label="Estado de los Labios:"
                  name="estadoLabios"
                  value={newMedicalRecord.estadoLabios}
                  onChange={handleChange}
                  multiline
                  sx = {{margin: 1}}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={4.5} sx = {{ marginRight: 12}}>
                <TextField
                  fullWidth
                  label="Estado de los Carrillos:"
                  name="estadoCarillos"
                  value={newMedicalRecord.estadoCarillos}
                  onChange={handleChange}
                  multiline
                  sx={{ margin: 1 }}
                />
              </Grid>
              <Grid item xs={4.5} sx = {{ marginLeft: 12}}>
                <TextField
                  fullWidth
                  label="Estado del Piso de la Boca:"
                  name="estadoPisoBoca"
                  value={newMedicalRecord.estadoPisoBoca}
                  onChange={handleChange}
                  multiline
                  sx={{ margin: 1 }}
                />
                </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={4.5} sx = {{ marginRight: 12}}>
                <TextField
                  fullWidth
                  label="Estado Gingivo-Periodontal:"
                  name="estadoGingivoPerio"
                  value={newMedicalRecord.estadoGingivoPerio}
                  onChange={handleChange}
                  multiline
                  sx={{ margin: 1 }}
                />
                </Grid>
                <Grid item xs={4.5} sx = {{ marginLeft: 12}}>
                <TextField
                  fullWidth
                  label="Estado de Enfermedad Periodontal:"
                  name="estadoEnfermedadPerio"
                  value={newMedicalRecord.estadoEnfermedadPerio}
                  onChange={handleChange}
                  multiline
                  sx={{ margin: 1 }}
                />
                </Grid>
            </Grid> 
          </Grid>

          <Grid item xs={12}>
            <Grid container justifyContent="center">
              <Typography variant="h6" gutterBottom>
                Análisis Oclusal
              </Typography>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label="Análisis Oclusal Derecho RM"
                  name="analisisOclusalDerRM"
                  value={newMedicalRecord.analisisOclusalDerRM}
                  onChange={handleChange}
                  multiline
                  sx={{ margin: 1 }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label="Análisis Oclusal Derecho RC"
                  name="analisisOclusalDerRC"
                  value={newMedicalRecord.analisisOclusalDerRC}
                  onChange={handleChange}
                  multiline
                  sx={{ margin: 1 }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label="Análisis Oclusal Izquierdo RC"
                  name="analisisOclusalIzqRC"
                  value={newMedicalRecord.analisisOclusalIzqRC}
                  onChange={handleChange}
                  multiline
                  sx={{ margin: 1 }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label="Análisis Oclusal Izquierdo RM"
                  name="analisisOclusalIzqRM"
                  value={newMedicalRecord.analisisOclusalIzqRM}
                  onChange={handleChange}
                  multiline
                  sx={{ margin: 1 }}
                />
              </Grid>
              
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Condición Esqueletal:"
                name="condicionEsqueletal"
                value={newMedicalRecord.condicionEsqueletal}
                onChange={handleChange}
                multiline
                sx={{ margin: 1 }}
              />
              <TextField
                fullWidth
                label="Diagnóstico Oclusal:"
                name="diagnosticoOclusal"
                value={newMedicalRecord.diagnosticoOclusal}
                onChange={handleChange}
                multiline
                sx={{ margin: 1 }}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} sx={{ margin: 2 }} container justifyContent="center">
            <Button type="submit" variant="contained" color="primary">
            <AddCircleIcon fontSize="large" />
              Crear Historia Clínica
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CreateMedicalRecordForm;