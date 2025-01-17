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
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
import { useOdontologos } from "../../hooks/useOdontologos";

const Odontologos = () => {
  const {
    odontologos,
    fetchOdontologos,
    fetchOdontologoByName,
    fetchOdontologoByEspecialidad,
    createOdontologo,
    setOdontologo,
    deleteOdontologo,
  } = useOdontologos();

  useEffect(() => {
    fetchOdontologos();
  }, []);

  const navigate = useNavigate();

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [searchType, setSearchType] = useState("name"); // Cambiado para búsqueda por nombre o especialidad
  const [searchName, setSearchName] = useState("");
  const [searchEspecialidad, setSearchEspecialidad] = useState("");
  const [newOdontologo, setNewOdontologo] = useState({
    nombreOdontologo: "",
    edadOdontologo: "",
    correoOdontologo: "",
    direccionOdontologo: "",
    generoOdontologo: "",
    especialidad: "",
    telefono: "",
  });

  const handleSearchNameChange = (e) => {
    setSearchName(e.target.value);
  };

  const handleSearchEspecialidadChange = (e) => {
    setSearchEspecialidad(e.target.value);
  };

  const handleDeleteOdontologo = async (odontologoId) => {
    if (
      window.confirm("¿Estás seguro de que deseas eliminar este odontólogo?")
    ) {
      try {
        await deleteOdontologo(odontologoId);
        toast.success("Odontólogo eliminado exitosamente");
        fetchOdontologos();
      } catch (error) {
        toast.error("Error al eliminar el odontólogo");
      }
    }
  };

  const handleEditOdontologo = (odontologoId) => {
    navigate(`/odontologos/editar/${odontologoId}`);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      if (searchType === "name" && searchName) {
        await fetchOdontologoByName(searchName);
        toast.success("Odontólogo(s) encontrado(s) exitosamente", {
          position: "top-right",
          autoClose: 3000,
        });
      } else if (searchType === "especialidad" && searchEspecialidad) {
        await fetchOdontologoByEspecialidad(searchEspecialidad);
        toast.success("Odontólogo(s) encontrado(s) exitosamente", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("Error al buscar el odontólogo.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
    setSearchName("");
    setSearchEspecialidad("");
  };

  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setNewOdontologo((prevOdontologo) => ({
      ...prevOdontologo,
      [name]: value,
    }));
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    try {
      await createOdontologo({
        nombreOdontologo: newOdontologo.nombreOdontologo,
        edadOdontologo: newOdontologo.edadOdontologo,
        correoOdontologo: newOdontologo.correoOdontologo,
        direccionOdontologo: newOdontologo.direccionOdontologo,
        generoOdontologo: newOdontologo.generoOdontologo,
        especialidad: newOdontologo.especialidad,
        telefono: newOdontologo.telefono,
      });
      toast.success("Odontólogo creado exitosamente", {
        position: "top-right",
        autoClose: 3000,
      });

      // Limpiar formulario
      setNewOdontologo({
        nombreOdontologo: "",
        edadOdontologo: "",
        correoOdontologo: "",
        direccionOdontologo: "",
        generoOdontologo: "",
        especialidad: "",
        telefono: "",
      });

      setShowCreateForm(false);
      fetchOdontologos();
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

  const handleViewOdontologo = (odontologo) => {
    navigate(`/odontologos/${odontologo.id}`, { state: { odontologo } });
    setShowSearchForm(false);
  };

  return (
    <div className="Odontologos" style={{backgroundColor: '#f5f1ef', minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/agendamiento")}
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
          Odontólogos
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
                fetchOdontologos();
              }}
            >
              {showCreateForm ? "Ocultar Crear Odontólogo" : "Crear Odontólogo"}
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              startIcon={<SearchIcon />}
              onClick={() => {
                setShowSearchForm(!showSearchForm);
                setShowCreateForm(false);
                setSearchName("");
                setSearchEspecialidad("");
                setOdontologo(null);
                fetchOdontologos();
              }}
            >
              {showSearchForm
                ? "Ocultar Buscar Odontólogo"
                : "Buscar Odontólogo"}
            </Button>
          </Grid>
        </Grid>
      </Container>

      {/* Formulario de creación */}
      {showCreateForm && (
        <Box
          component="form"
          onSubmit={handleCreateSubmit}
          sx={{ mt: 2, mb: 4 }}
        >
          <Container component={Paper} sx={{ py: 1 }}>
            <Typography variant="h6" gutterBottom align="center">
              Crear Odontólogo
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nombre"
                  name="nombreOdontologo"
                  value={newOdontologo.nombreOdontologo}
                  onChange={handleCreateChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Edad"
                  name="edadOdontologo"
                  value={newOdontologo.edadOdontologo}
                  onChange={handleCreateChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Correo"
                  name="correoOdontologo"
                  value={newOdontologo.correoOdontologo}
                  onChange={handleCreateChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Dirección"
                  name="direccionOdontologo"
                  value={newOdontologo.direccionOdontologo}
                  onChange={handleCreateChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Género"
                  name="generoOdontologo"
                  value={newOdontologo.generoOdontologo}
                  onChange={handleCreateChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Especialidad"
                  name="especialidad"
                  value={newOdontologo.especialidad}
                  onChange={handleCreateChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Teléfono"
                  name="telefono"
                  value={newOdontologo.telefono}
                  onChange={handleCreateChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Crear Odontólogo
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}

      {/* Formulario de búsqueda */}
      {showSearchForm && (
        <Box
          component="form"
          onSubmit={handleSearchSubmit}
          sx={{ mt: 2, mb: 4 }}
        >
          <Container component={Paper} sx={{ py: 1 }}>
            <Typography
              variant="h6"
              align="center"
              gutterBottom
              sx={{ marginBottom: 4 }}
            >
              Buscar Odontólogo
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
                    <MenuItem value="name">Nombre</MenuItem>
                    <MenuItem value="especialidad">Especialidad</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {searchType === "name" ? (
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Ingrese Nombre"
                    value={searchName}
                    onChange={handleSearchNameChange}
                  />
                </Grid>
              ) : (
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Ingrese Especialidad"
                    value={searchEspecialidad}
                    onChange={handleSearchEspecialidadChange}
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
      )}

      {/* Lista de odontólogos */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Typography variant="h6">Nombre </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6">Edad</Typography>
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
                <Typography variant="h6">Especialidad</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6">Teléfono</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6">Acciones</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {odontologos.map((odontologo) => (
              <TableRow key={odontologo.id}>
                <TableCell align="center">
                  {odontologo.nombreOdontologo}
                </TableCell>
                <TableCell align="center">
                  {odontologo.edadOdontologo}
                </TableCell>
                <TableCell align="center">
                  {odontologo.correoOdontologo}
                </TableCell>
                <TableCell align="center">
                  {odontologo.direccionOdontologo}
                </TableCell>
                <TableCell align="center">
                  {odontologo.generoOdontologo}
                </TableCell>
                <TableCell align="center">{odontologo.especialidad}</TableCell>
                <TableCell align="center">{odontologo.telefono}</TableCell>
                <TableCell align="center">
                  {/*<IconButton onClick={() => handleViewOdontologo(odontologo)}>
                    <VisibilityIcon />
                  </IconButton>*/}
                  <IconButton
                    onClick={() => handleEditOdontologo(odontologo.id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteOdontologo(odontologo.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Odontologos;
