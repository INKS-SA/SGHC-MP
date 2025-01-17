import React, { useEffect, useState } from "react";
import "./Patients.css";
import { usePatients } from "../../hooks/usePatients";
import { useNavigate } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";
import PatientForm from "./PatientForm";
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
  IconButton,
  TextField,
  Container,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { toast } from "react-toastify";

const Patients = ({
  patients,
  patient,
  fetchPatients,
  fetchPatientByCedula,
  fetchPatientByName,
  createPatient,
  setPatient,
}) => {
  useEffect(() => {
    fetchPatients();
  }, []);

  const navigate = useNavigate();

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [searchType, setSearchType] = useState("cedula");
  const [searchName, setSearchName] = useState("");
  const [searchCedula, setSearchCedula] = useState("");
  const [newPatient, setNewPatient] = useState({
    nombrePaciente: "",
    edadPaciente: "",
    fechaNacimiento: "",
    correoPaciente: "",
    direccionPaciente: "",
    generoPaciente: "",
    numeroCedula: "",
    ocupacion: "",
    telefono: "",
    telContactoEmergencia: "",
    afinidadContactoEmergencia: "",
    apiKey:"",
    notificacionesWpp: 'false',
  });

  const [deseaNotificaciones, setDeseaNotificaciones] = useState(false); // Estado local para la opción de notificaciones

  const handleSearchNameChange = (e) => {
    setSearchName(e.target.value);
  };

  const handleSearchCedulaChange = (e) => {
    setSearchCedula(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchType === "name" && searchName) {
      try {
        await fetchPatientByName(searchName);
        toast.success("Paciente encontrado exitosamente", {
          position: "top-right",
          autoClose: 3000,
        });
      } catch (error) {
        toast.error("Error al buscar el paciente.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
      setSearchName("");
    } else if (searchType === "cedula" && searchCedula) {
      try {
        await fetchPatientByCedula(searchCedula);
        toast.success("Paciente encontrado exitosamente", {
          position: "top-right",
          autoClose: 3000,
        });
      } catch (error) {
        toast.error("Error al buscar el paciente.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
      setSearchCedula("");
    }
  };

  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setNewPatient((prevPatient) => ({ ...prevPatient, [name]: value }));
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    try {
      await createPatient(newPatient);
      // Notificación de éxito
      toast.success("Paciente creado exitosamente", {
        position: "top-right",
        autoClose: 3000,
      });

      // Limpiar los campos del formulario
      setNewPatient({
        nombrePaciente: "",
        edadPaciente: "",
        fechaNacimiento: "",
        correoPaciente: "",
        direccionPaciente: "",
        generoPaciente: "",
        numeroCedula: "",
        ocupacion: "",
        telefono: "",
        telContactoEmergencia: "",
        afinidadContactoEmergencia: "",
        apiKey:"",
        notificacionesWpp: 'false',
      });

      setShowCreateForm(false);
      fetchPatients();
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

  const handleNotificacionesChange = (event) => {
    setDeseaNotificaciones(event.target.value === 'true');
  };

  const handleViewPatient = (patient) => {
    window.scrollTo(0, 0); // Scroll to top
    navigate(`/patients/${patient.id}`, { state: { patient } });
    setShowSearchForm(false);
  };

  return (
    <div className="Patients">
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/main-menu")}
        sx={{ m: 2 }}
      >
        Atrás
      </Button>
      <Container>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ marginBottom: 4 }}
        >
          Pacientes
        </Typography>
      </Container>
      <Container>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{ marginBottom: 4 }}
        >
          <Grid item>
            <Button
              variant="outlined"
              startIcon={<PersonAddIcon />}
              onClick={() => {
                setShowCreateForm(!showCreateForm);
                setShowSearchForm(false);
                fetchPatients();
              }}
            >
              {showCreateForm ? "Ocultar Crear Paciente" : "Crear Paciente"}
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              startIcon={<SearchIcon />}
              onClick={() => {
                setShowSearchForm(!showSearchForm);
                setShowCreateForm(false);
                setSearchCedula("");
                setSearchName("");
                setPatient(null);
                fetchPatients();
              }}
            >
              {showSearchForm ? "Ocultar Buscar Paciente" : "Buscar Paciente"}
            </Button>
          </Grid>
        </Grid>
      </Container>
      {/* Formulario de creación */}
      {showCreateForm && (
        <PatientForm
          newPatient={newPatient}
          handleCreateChange={handleCreateChange}
          handleCreateSubmit={handleCreateSubmit}
        />
      )}

      {/* Formulario de búsqueda */}
      {showSearchForm && (
        <>
          <Box
            component="form"
            onSubmit={handleSearchSubmit}
            sx={{ mt: 2, mb: 4 }}
          >
            <Container component={Paper} sx={{ py:1 }}  >
              <Typography
                variant="h6"
                align="center"
                gutterBottom
                sx={{ marginBottom: 4 }}
              >
                Buscar Paciente
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
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
                {searchType === "cedula" ? (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Ingrese Número de Cédula del paciente"
                      value={searchCedula}
                      onChange={handleSearchCedulaChange}
                    />
                  </Grid>
                ) : (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Ingrese Nombre del paciente"
                      value={searchName}
                      onChange={handleSearchNameChange}
                    />
                  </Grid>
                )}
                <Grid item xs={12} container justifyContent="center">
                  <Grid item xs={2}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{ m: 2 }}
                      startIcon={<SearchIcon />}
                      fullWidth
                    >
                      Buscar
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </>
      )}

      {/* Lista de pacientes */}
      <>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
              <TableCell align="center">
                  <Typography variant="h6"></Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Nombre </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Edad</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Fecha de Nacimiento</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Correo</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Dirección</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Género</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Número de Cédula</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Ocupación</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Teléfono</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Tel. Emergencia</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Afinidad Emergencia</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell align="center">
                    <IconButton onClick={() => handleViewPatient(patient)}>
                      <VisibilityIcon />
                    </IconButton>
                    Ver HC
                  </TableCell>
                  <TableCell align="center">{patient.nombrePaciente}</TableCell>
                  <TableCell align="center">{patient.edadPaciente}</TableCell>
                  <TableCell align="center">
                    {patient.fechaNacimiento.split("T")[0]}
                  </TableCell>
                  <TableCell align="center">{patient.correoPaciente}</TableCell>
                  <TableCell align="center">
                    {patient.direccionPaciente}
                  </TableCell>
                  <TableCell align="center">{patient.generoPaciente}</TableCell>
                  <TableCell align="center">{patient.numeroCedula}</TableCell>
                  <TableCell align="center">{patient.ocupacion}</TableCell>
                  <TableCell align="center">{patient.telefono}</TableCell>
                  <TableCell align="center">
                    {patient.telContactoEmergencia}
                  </TableCell>
                  <TableCell align="center">
                    {patient.afinidadContactoEmergencia}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    </div>
  );
};

export default Patients;
