import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useAppointments } from "../../hooks/useAppointment";
import { usePatients } from "../../hooks/usePatients";
import { useOdontologos } from "../../hooks/useOdontologos";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const Appointment = () => {
  const { appointments, createAppointment, fetchAppointmentsByOdontologo, fetchHorariosOcupados } = useAppointments();
  const { patients, fetchPatientByCedula, fetchPatientByName } = usePatients();
  const { odontologos, fetchOdontologos } = useOdontologos();

  const navigate = useNavigate();
  const today = dayjs().format("YYYY-MM-DD");

  const [selectedOdontologo, setSelectedOdontologo] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("cedula");
  const [searched, setSearched] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    paciente: "",
    fecha: "",
    horaInicio: "",
    horaFin: "",
    comentario: "", // Agregar comentario
  });
  const [availableHours, setAvailableHours] = useState([]);
  const [availableEndHours, setAvailableEndHours] = useState([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState(null);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [horariosOcupados, setHorariosOcupados] = useState([]);

  const handleHourClick = (hour) => {
    setNewAppointment((prev) => ({ ...prev, hora: hour }));
    setSelectedHour(hour);
  };

  useEffect(() => {
    fetchOdontologos();
  }, []);

  useEffect(() => {
    if (selectedOdontologo) {
      fetchAppointmentsByOdontologo(selectedOdontologo);
    }
  }, [selectedOdontologo]);

  useEffect(() => {
    if (selectedOdontologo && newAppointment.fecha) {
      loadHorariosOcupados(selectedOdontologo, dayjs(newAppointment.fecha).format("YYYY-MM-DD"));
    }
  }, [selectedOdontologo, newAppointment.fecha]);

  const loadHorariosOcupados = async (odontologoId, fecha) => {
    const result = await fetchHorariosOcupados(odontologoId, fecha);
    if (result.success) {
      setHorariosOcupados(result.data);
    } else {
      console.error("Error al cargar horarios ocupados:", result.error);
    }
  };

  const generateAvailableHours = () => {
    const startTime = dayjs().hour(7).minute(0);
    const endTime = dayjs().hour(20).minute(30);
    const hours = [];
    let time = startTime;

    while (time.isBefore(endTime) || time.isSame(endTime)) {
      hours.push(time.format("HH:mm"));
      time = time.add(15, "minute");
    }

    return hours;
  };

  const handleStartHourChange = (selectedHour) => {
    setNewAppointment((prev) => ({ ...prev, horaInicio: selectedHour }));
    // Generar las horas de fin disponibles basadas en la hora de inicio seleccionada
    const updatedAvailableEndHours = generateAvailableEndHours(selectedHour);
    setAvailableEndHours(updatedAvailableEndHours);
    
    // Asegurarse de que la hora de fin seleccionada esté en las opciones generadas
    setNewAppointment((prev) => ({
      ...prev,
      horaFin: updatedAvailableEndHours.includes(prev.horaFin) ? prev.horaFin : ""
    }));
  };

  const generateAvailableEndHours = (startHour) => {
    console.log("Generating available end hours for", startHour);
    // Create a base date for today and set the time components
    const [hours, minutes] = startHour.split(':').map(Number);
    const startTime = dayjs().hour(hours).minute(minutes);
    const endTime = dayjs().hour(20).minute(30);
    
    const availableHours = [];
    let currentTime = startTime.add(15, 'minute');

    while (currentTime.isBefore(endTime) || currentTime.isSame(endTime)) {
      availableHours.push(currentTime.format('HH:mm'));
      currentTime = currentTime.add(15, 'minute');
    }
    console.log("Available end hours:", availableHours);
    return availableHours;
  };

  const handleEndHourChange = (selectedHour) => {
    setNewAppointment((prev) => ({ ...prev, horaFin: selectedHour }));
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setNewAppointment({ ...newAppointment, fecha: selectedDate });

    const occupiedHours = appointments
      .filter((appointment) => appointment.fecha.split("T")[0] === selectedDate)
      .map((appointment) => appointment.hora);

    const allHours = generateAvailableHours();
    const available = allHours.filter((hour) => !occupiedHours.includes(hour));
    setAvailableHours(available);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      if (searchType === "cedula") {
        await fetchPatientByCedula(searchQuery);
      } else {
        await fetchPatientByName(searchQuery);
      }
      setSearched(true);
    } catch (error) {
      toast.error("Error al buscar el paciente", { autoClose: 3000 });
      setSearched(false);
    }
  };

  const handleCreateAppointment = async () => {
    if (!newAppointment.horaInicio || !newAppointment.horaFin || !newAppointment.fecha) {
      toast.error("Debe seleccionar la fecha, hora de inicio y hora de fin.", { autoClose: 3000 });
      return;
    }
    
    try {
      const appointmentData = {
        paciente: selectedPatient.id,
        odontologo: selectedOdontologo,
        fecha: dayjs(newAppointment.fecha).format("YYYY-MM-DD"),
        horaInicio: newAppointment.horaInicio,
        horaFin: newAppointment.horaFin,
        comentario: newAppointment.comentario // Incluir comentario
      };

      const result = await createAppointment(appointmentData);
      if (result.success) {
        toast.success("Cita creada exitosamente", { autoClose: 3000 });
        navigate("/agendamiento/detalles");
      } else {
        setErrorMessage(result.error || "Error al crear la cita");
        setErrorDialogOpen(true);
      }
    } catch (error) {
      console.error("Error al crear la cita:", error);
      setErrorMessage(error.response?.data?.error || "Error al crear la cita. Por favor, inténtelo de nuevo.");
      setErrorDialogOpen(true);
    }
  };

  const handleCloseErrorDialog = () => {
    setErrorDialogOpen(false);
  };

  const handleConfirmAppointment = () => {
    setConfirmDialogOpen(true);
  };

  const closeConfirmDialog = () => {
    setConfirmDialogOpen(false);
  };

  const confirmCreateAppointment = () => {
    handleCreateAppointment();
    closeConfirmDialog();
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 7; hour < 21; hour++) {
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

  return (
    <div style={{ backgroundColor: '#f5f1ef', minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <Dialog
        open={errorDialogOpen}
        onClose={handleCloseErrorDialog}
        aria-labelledby="error-dialog-title"
        aria-describedby="error-dialog-description"
      >
        <DialogTitle id="error-dialog-title">{"Error al crear la cita"}</DialogTitle>
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
      <Button
        variant="outlined"
        onClick={() => navigate("/agendamiento/detalles")}
        sx={{ m: 2 }}
      >
        Atrás
      </Button>
      <Container style={{align: 'Center', paddingBottom: 4, paddingTop: 4 }}>
        <Grid container spacing={4}>
          {/* Primera columna: Formulario */}
          <Grid item xs={12} md={8}>
            <Typography variant="h4" align="center" gutterBottom>
              Agendar Citas
            </Typography>

            {/* Seleccionar Odontólogo */}
            <Box sx={{ my: 3 }}>
              <Typography variant="h5" gutterBottom>
                Odontólogo
              </Typography>
              <FormControl fullWidth>
                <InputLabel>Seleccionar Odontólogo</InputLabel>
                <Select
                  value={selectedOdontologo || ""}
                  onChange={(e) => setSelectedOdontologo(e.target.value)}
                  label="Seleccionar Odontólogo"
                >
                  {odontologos.map((odontologo) => (
                    <MenuItem key={odontologo.id} value={odontologo.id}>
                      {odontologo.nombreOdontologo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {selectedOdontologo && (
              <>
                <Box component="form" onSubmit={handleSearchSubmit}>
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
                          <MenuItem value="name">Nombre</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label={searchType === "cedula" ? "Ingrese Cédula" : "Ingrese Nombre"}
                        name="searchQuery"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} alignContent={"center"} alignItems={"center"}>
                      <Button type="submit" variant="contained">
                        Buscar Paciente
                      </Button>
                    </Grid>
                  </Grid>
                </Box>

                {searched && patients.length > 0 && (
                  <TableContainer component={Paper} sx={{ mt: 4 }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            <Typography variant="h6" align="center">
                              Nombre
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="h6" align="center">
                              Cédula
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="h6" align="center">
                              Seleccionar
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {patients.map((patient) => (
                          <TableRow key={patient.id}>
                            <TableCell align="center">{patient.nombrePaciente}</TableCell>
                            <TableCell align="center">{patient.numeroCedula}</TableCell>
                            <TableCell align="center">
                              <Button
                                variant="outlined"
                                onClick={() => setSelectedPatient(patient)}
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
              </>
            )}

            {selectedPatient && (
              <>
                <Box component="form" sx={{ mt: 4 }}>
                  <Typography variant="h5" gutterBottom>
                    Seleccionar Fecha para {selectedPatient.nombrePaciente}
                  </Typography>
                  <TextField
                    fullWidth
                    type="date"
                    label="Fecha"
                    name="fecha"
                    InputLabelProps={{ shrink: true }}
                    value={newAppointment.fecha}
                    onChange={handleDateChange}
                    required
                    inputProps={{
                      min: today,
                    }}
                  />
                </Box>

                {newAppointment.fecha && (
                  <>
                    {/* Seleccionar la hora de inicio */}
                    <Grid item xs={12} sm={6} sx={{mt: 2}}>
                      <FormControl fullWidth>
                        <InputLabel>Hora de Inicio</InputLabel>
                        <Select
                          value={newAppointment.horaInicio}
                          onChange={(e) => handleStartHourChange(e.target.value)}
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

                    {/* Seleccionar la hora de fin */}
                    {newAppointment.horaInicio && (
                      <>
                        <Grid item xs={12} sm={6} sx={{mt: 2}}>
                          <FormControl fullWidth>
                            <InputLabel>Hora de Fin</InputLabel>
                            <Select
                              value={newAppointment.horaFin}
                              onChange={(e) => handleEndHourChange(e.target.value)}
                              label="Hora de Fin"
                            >
                              {availableEndHours.map((time) => (
                                <MenuItem 
                                  key={time} 
                                  value={time}
                                  disabled={isTimeOccupied(time) || time <= newAppointment.horaInicio}
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

                        {/* Campo de Comentario que solo aparece después de seleccionar la hora de fin */}
                        {newAppointment.horaFin && (
                          <Grid item xs={12} sx={{mt: 2, mb: 2}}>
                            <TextField
                              fullWidth
                              label="Comentario"
                              name="comentario"
                              value={newAppointment.comentario}
                              onChange={(e) => setNewAppointment({ ...newAppointment, comentario: e.target.value })}
                              multiline
                              rows={4} // Permite que sea un campo de texto largo
                            />
                          </Grid>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </Grid>

          {/* Segunda columna: Resumen */}
          <Grid item xs={12} md={4}>
            {(selectedOdontologo || selectedPatient || newAppointment.fecha || newAppointment.hora) && (
              <Box component={Paper} sx={{ mt: 4, p: 4 }}>
                <Typography variant="h4" align="center" gutterBottom>
                  Resumen de la Cita
                </Typography>
                {selectedOdontologo && (
                  <p style={{ fontFamily: 'Century Gothic' }}>
                    <strong>Odontólogo:</strong> {odontologos.find((o) => o.id === selectedOdontologo)?.nombreOdontologo}
                  </p>
                )}
                {selectedPatient && (
                  <p style={{ fontFamily: 'Century Gothic' }}>
                    <strong>Paciente:</strong> {selectedPatient.nombrePaciente}
                  </p>
                )}
                {newAppointment.fecha && (
                  <p style={{ fontFamily: 'Century Gothic' }}>
                    <strong>Fecha:</strong> {newAppointment.fecha}
                  </p>
                )}
                {newAppointment.horaInicio && (
                  <p style={{ fontFamily: 'Century Gothic' }}>
                    <strong>Hora de Inicio:</strong> {newAppointment.horaInicio}
                  </p>
                )}
                {newAppointment.horaFin && (
                  <p style={{ fontFamily: 'Century Gothic' }}>
                    <strong>Hora de Fin:</strong> {newAppointment.horaFin}
                  </p>
                )}
              </Box>
            )}

            {newAppointment.horaInicio && newAppointment.horaFin && (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleConfirmAppointment}
                  sx={{ mt: 4 }}
                >
                  Confirmar Cita
                </Button>

                <Dialog
                  open={confirmDialogOpen}
                  onClose={closeConfirmDialog}
                  aria-labelledby="confirm-dialog-title"
                  aria-describedby="confirm-dialog-description"
                >
                  <DialogTitle id="confirm-dialog-title">
                    Confirmar Creación de Cita
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="confirm-dialog-description">
                      ¿Está seguro de que desea crear la siguiente cita?
                      <br />
                      <strong>Odontólogo:</strong> {odontologos.find((o) => o.id === selectedOdontologo)?.nombreOdontologo}
                      <br />
                      <strong>Paciente:</strong> {selectedPatient.nombrePaciente}
                      <br />
                      <strong>Fecha:</strong> {newAppointment.fecha}
                      <br />
                      <strong>Hora de Inicio:</strong> {newAppointment.horaInicio}
                      <br />
                      <strong>Hora de Fin:</strong> {newAppointment.horaFin}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={closeConfirmDialog} color="secondary">
                      Cancelar
                    </Button>
                    <Button onClick={confirmCreateAppointment} color="primary" autoFocus>
                      Confirmar
                    </Button>
                  </DialogActions>
                </Dialog>
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Appointment;
