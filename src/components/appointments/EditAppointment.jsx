import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  Grid,
  TextField,
  Container,
  Paper,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { toast } from "react-toastify";
import { useAppointments } from "../../hooks/useAppointment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Configurar dayjs para manejar zonas horarias
dayjs.extend(utc);
dayjs.extend(timezone);

const EditAppointment = () => {
  const { appointmentId } = useParams();
  const { fetchAppointmentById, updateAppointment, fetchHorariosOcupados } = useAppointments();
  const navigate = useNavigate();

  const [appointment, setAppointment] = useState(null);
  const [newDate, setNewDate] = useState(null);
  const [newTimeStart, setNewTimeStart] = useState("");
  const [newTimeEnd, setNewTimeEnd] = useState("");
  const [comentario, setComentario] = useState("");
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [horariosOcupados, setHorariosOcupados] = useState([]);

  useEffect(() => {
    const loadAppointment = async () => {
      try {
        setLoading(true);
        const result = await fetchAppointmentById(appointmentId);
        if (result.success) {
          setAppointment(result.data);
          
          // Extraer solo la fecha del string UTC y crear una nueva fecha local
          const dateOnly = result.data.fecha.split('T')[0];
          const appointmentDate = dayjs(dateOnly);
          
          console.log('Fecha original:', result.data.fecha);
          console.log('Fecha extraída:', dateOnly);
          console.log('Fecha convertida:', appointmentDate.format('YYYY-MM-DD'));
          
          setNewDate(appointmentDate);
          setNewTimeStart(result.data.horaInicio);
          setNewTimeEnd(result.data.horaFin);
          setComentario(result.data.comentario || "");
          
          await loadHorariosOcupados(
            result.data.odontologo.id, 
            appointmentDate.format("YYYY-MM-DD")
          );
        } else {
          setErrorMessage(result.error || "Error al cargar la cita");
          setErrorDialogOpen(true);
        }
      } catch (error) {
        console.error("Error al cargar la cita:", error);
        setErrorMessage("Error al cargar la cita");
        setErrorDialogOpen(true);
      } finally {
        setLoading(false);
      }
    };
    loadAppointment();
  }, [appointmentId, fetchAppointmentById]);

  useEffect(() => {
    const updateHorarios = async () => {
      if (appointment && newDate) {
        await loadHorariosOcupados(
          appointment.odontologo.id, 
          newDate.format("YYYY-MM-DD")
        );
      }
    };
    updateHorarios();
  }, [newDate, appointment]);

  const loadHorariosOcupados = async (odontologoId, fecha) => {
    try {
      const result = await fetchHorariosOcupados(odontologoId, fecha);
      if (result.success) {
        setHorariosOcupados(result.data);
      } else {
        console.error("Error al cargar horarios ocupados:", result.error);
      }
    } catch (error) {
      console.error("Error al cargar horarios ocupados:", error);
    }
  };

  const handleDateChange = async (date) => {
    // Asegurarse de trabajar solo con la fecha, sin tiempo
    const dateOnly = date.format('YYYY-MM-DD');
    const newLocalDate = dayjs(dateOnly);
    setNewDate(newLocalDate);
    setNewTimeStart("");
    setNewTimeEnd("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!appointment) return;
    
    try {
      // Usar solo la fecha sin tiempo
      const dateToSubmit = newDate.format("YYYY-MM-DD");
      
      const updatedAppointmentData = {
        paciente: appointment.paciente.id,
        odontologo: appointment.odontologo.id,
        fecha: dateToSubmit,
        horaInicio: newTimeStart,
        horaFin: newTimeEnd,
        comentario,
      };

      console.log("Datos de la cita a actualizar:", updatedAppointmentData);

      const result = await updateAppointment(appointmentId, updatedAppointmentData);

      if (result.success) {
        toast.success("Cita actualizada exitosamente");
        navigate("/agendamiento/detalles");
      } else {
        setErrorMessage(result.error || "Error al actualizar la cita");
        setErrorDialogOpen(true);
      }
    } catch (error) {
      console.error("Error al actualizar la cita:", error);
      setErrorMessage(error.response?.data?.error || "Error al actualizar la cita. Por favor, inténtelo de nuevo.");
      setErrorDialogOpen(true);
    }
  };

  const handleCloseErrorDialog = () => {
    setErrorDialogOpen(false);
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const time = dayjs().hour(hour).minute(minute).format("HH:mm");
        options.push(time);
      }
    }
    return options;
  };

  const isTimeOccupied = (time) => {
    return horariosOcupados.some(horario => 
      time >= horario.horaInicio && time < horario.horaFin
    );
  };

  const timeOptions = generateTimeOptions();

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (!appointment) {
    return (
      <Container>
        <Typography>No se pudo cargar la información de la cita.</Typography>
      </Container>
    );
  }

  return (
    <div style={{ backgroundColor: '#f5f1ef', minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/agendamiento/detalles")}
        sx={{ mx: 2, my: 2 }}
      >
        Atrás
      </Button>
      <Container >
        <Typography variant="h4" align="center" gutterBottom>
          Editar Cita
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Container component={Paper} sx={{ p: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Paciente"
                  name="paciente"
                  value={appointment.paciente?.nombrePaciente || ""}
                  InputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Odontólogo"
                  name="odontologo"
                  value={appointment.odontologo?.nombreOdontologo || ""}
                  InputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Fecha"
                    value={newDate}
                    onChange={handleDateChange}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth required />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="hora-inicio-label">Hora de Inicio</InputLabel>
                  <Select
                    labelId="hora-inicio-label"
                    value={newTimeStart}
                    onChange={(e) => setNewTimeStart(e.target.value)}
                    label="Hora de Inicio"
                  >
                    {timeOptions.map((time) => (
                      <MenuItem 
                        key={time} 
                        value={time}
                        disabled={isTimeOccupied(time)}
                        style={{
                          backgroundColor: isTimeOccupied(time) ? 'rgba(255, 0, 0, 0.1)' : 'inherit'
                        }}
                      >
                        {time}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="hora-fin-label">Hora de Fin</InputLabel>
                  <Select
                    labelId="hora-fin-label"
                    value={newTimeEnd}
                    onChange={(e) => setNewTimeEnd(e.target.value)}
                    label="Hora de Fin"
                  >
                    {timeOptions.map((time) => (
                      <MenuItem 
                        key={time} 
                        value={time}
                        disabled={isTimeOccupied(time)}
                        style={{
                          backgroundColor: isTimeOccupied(time) ? 'rgba(255, 0, 0, 0.1)' : 'inherit'
                        }}
                      >
                        {time}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Comentario"
                  name="comentario"
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Actualizar Cita
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Container>

      <Dialog
        open={errorDialogOpen}
        onClose={handleCloseErrorDialog}
        aria-labelledby="error-dialog-title"
        aria-describedby="error-dialog-description"
      >
        <DialogTitle id="error-dialog-title">{"Error"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="error-dialog-description">
            {errorMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseErrorDialog} color="primary" autoFocus>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditAppointment;