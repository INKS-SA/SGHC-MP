import React, { useEffect, useState } from "react";
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
  TextField,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppointments } from "../../hooks/useAppointment";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";

const AppointmentDetails = () => {
  const { appointments, fetchAppointments, deleteAppointment } = useAppointments();
  const navigate = useNavigate();

  const [searchType, setSearchType] = useState("patient"); // Búsqueda por paciente, odontólogo o fecha
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // Estado para el diálogo de confirmación
  const [appointmentToDelete, setAppointmentToDelete] = useState(null); // Cita seleccionada para eliminar

  useEffect(() => {
    const loadAppointments = async () => {
      await fetchAppointments();
    };

    loadAppointments();
  }, []);

  useEffect(() => {
    if (appointments.length > 0) {
      // Ordenar por fecha y hora descendente
      const sortedAppointments = [...appointments].sort((a, b) => {
        const dateA = new Date(`${a.fecha}T${a.hora}`);
        const dateB = new Date(`${b.fecha}T${b.hora}`);
        return dateB - dateA; // Orden descendente
      });
      setFilteredAppointments(sortedAppointments);
    }
  }, [appointments]);

  // Filtrar citas por el nombre del paciente, odontólogo o fecha
  const handleSearch = () => {
    let filtered = [];

    if (searchType === "patient") {
      filtered = appointments.filter((appointment) =>
        appointment.paciente.nombrePaciente
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    } else if (searchType === "odontologo") {
      filtered = appointments.filter((appointment) =>
        appointment.odontologo.nombreOdontologo
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    } else if (searchType === "date") {
      filtered = appointments.filter(
        (appointment) => appointment.fecha.split("T")[0] === searchQuery
      );
    }

    if (filtered.length === 0) {
      toast.error("No existen citas", { autoClose: 3000 });
    } else {
      // Ordenar los resultados filtrados
      const sortedFiltered = [...filtered].sort((a, b) => {
        const dateA = new Date(`${a.fecha}T${a.hora}`);
        const dateB = new Date(`${b.fecha}T${b.hora}`);
        return dateB - dateA; // Orden descendente
      });
      setFilteredAppointments(sortedFiltered);
    }
  };

  // Función para restablecer el formulario y la lista de citas a su estado inicial
  const handleReset = () => {
    setSearchQuery(""); // Limpiar el campo de búsqueda
    setFilteredAppointments(appointments); // Restablecer la lista completa de citas
  };

  // Manejar la apertura del diálogo de confirmación para eliminar cita
  const handleDeleteDialogOpen = (appointmentId) => {
    setAppointmentToDelete(appointmentId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setAppointmentToDelete(null);
  };

  // Manejar la eliminación de una cita
  const handleDeleteAppointment = async () => {
    try {
      await deleteAppointment(appointmentToDelete);
      toast.success("Cita eliminada exitosamente", { autoClose: 3000 });
      // Actualizar la lista de citas
      setFilteredAppointments(
        filteredAppointments.filter((appointment) => appointment.id !== appointmentToDelete)
      );
      handleDeleteDialogClose();
    } catch (error) {
      toast.error("Error al eliminar la cita", { autoClose: 3000 });
    }
  };

  // Manejar la actualizacion de la cita
  const handleUpdateAppointment = (appointmentId) => {
    navigate(`/agendamiento/cita/editar/${appointmentId}`);
  };

  return (
    <div style={{ backgroundColor: "#f5f1ef", minHeight: "100vh", justifyContent: "center", alignItems: "center" }}>
      {/* Botón de atrás */}
      <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/agendamiento")}
          sx={{ mx: 2, my: 2 }}
        >
          Atrás
        </Button>
      <Container sx={{ m: "auto", paddingBottom: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Lista de Citas
        </Typography>
        {/* Botón para agendar nueva cita */}
        <Grid container justifyContent="center" sx={{ mt: 4, mb: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/agendamiento/cita")}
          >
            Agendar Nueva Cita
          </Button>
        </Grid>

        {/* Formulario de búsqueda */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={2}>
            <FormControl fullWidth>
              <InputLabel>Buscar por</InputLabel>
              <Select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                label="Buscar por"
              >
                <MenuItem value="patient">Paciente</MenuItem>
                <MenuItem value="odontologo">Odontólogo</MenuItem>
                <MenuItem value="date">Fecha</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            {searchType === "date" ? (
              <TextField
                fullWidth
                type="date"
                label="Seleccione la fecha"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            ) : (
              <TextField
                fullWidth
                label={
                  searchType === "patient"
                    ? "Ingrese el nombre del paciente"
                    : "Ingrese el nombre del odontólogo"
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            )}
          </Grid>

          <Grid item xs={12} sm={2}>
            <Button variant="contained" fullWidth onClick={handleSearch}>
              Buscar
            </Button>
          </Grid>

          <Grid item xs={12} sm={2}>
            <Button variant="contained" fullWidth onClick={handleReset}>
              Restablecer
            </Button>
          </Grid>
        </Grid>

        {/* Tabla de citas filtradas */}
        {filteredAppointments.length > 0 && (
          <TableContainer component={Paper} sx={{ mt: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h6" align="center">
                      Paciente
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" align="center">
                      Odontólogo
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" align="center">
                      Fecha
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" align="center">
                      Hora de Inicio
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" align="center">
                      Hora de Fin
                    </Typography>
                  </TableCell>
                  <TableCell>
                  <Typography variant="h6" align="center">
                    Comentario
                  </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6" align="center">
                      Acciones
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell align="center">{appointment.paciente.nombrePaciente}</TableCell>
                    <TableCell align="center">{appointment.odontologo.nombreOdontologo}</TableCell>
                    <TableCell align="center">{appointment.fecha.split("T")[0]}</TableCell>
                    <TableCell align="center">{appointment.horaInicio}</TableCell>
                    <TableCell align="center">{appointment.horaFin}</TableCell>
                    <TableCell align="center">{appointment.comentario}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => handleUpdateAppointment(appointment.id)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteDialogOpen(appointment.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Diálogo de confirmación para eliminar una cita */}
        <Dialog
          open={deleteDialogOpen}
          onClose={handleDeleteDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Confirmar Eliminación</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              ¿Está seguro que desea eliminar esta cita?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteDialogClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleDeleteAppointment} color="error" autoFocus>
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default AppointmentDetails;
