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
  MenuItem
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Search as SearchIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';
import { toast } from 'react-toastify';

const PlanningPatientList = ({ patients, fetchPatients, fetchPatientByCedula, fetchPatientByName }) => {
  const navigate = useNavigate();
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [searchType, setSearchType] = useState("cedula");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      await fetchPatients();
      return;
    }

    try {
      const result = searchType === "name" ? 
        await fetchPatientByName(searchQuery) : 
        await fetchPatientByCedula(searchQuery);

      if (result.success) {
        toast.success("Paciente encontrado");
      }
    } catch (error) {
      toast.error("Error al buscar el paciente");
    }
  };

  const handleReset = () => {
    setSearchQuery("");
    setSearchType("cedula");
    fetchPatients();
  };

  const handleViewPatient = (patient) => {
    navigate(`/treatment-plans/${patient.id || patient._id}`, { state: { patient } });
  };

  return (
    <div style={{ backgroundColor: '#f5f1ef', minHeight: '100vh', padding: '20px' }}>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/planificacion")}
        sx={{ mb: 2 }}
      >
        Atrás
      </Button>

      <Container>
        <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4 }}>
          Pacientes - Planificación
        </Typography>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
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
                label={searchType === "cedula" ? "Ingrese cédula" : "Ingrese nombre"}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleSearch}
                startIcon={<SearchIcon />}
              >
                Buscar
              </Button>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleReset}
              >
                Restablecer
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Cédula</TableCell>
                <TableCell>Correo</TableCell>
                <TableCell>Teléfono</TableCell>
                <TableCell align="center">Planificación</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id || patient._id}>
                  <TableCell>{patient.nombrePaciente}</TableCell>
                  <TableCell>{patient.numeroCedula}</TableCell>
                  <TableCell>{patient.correoPaciente}</TableCell>
                  <TableCell>{patient.telefono}</TableCell>
                  <TableCell align="center">
                    <IconButton 
                      onClick={() => handleViewPatient(patient)}
                      color="primary"
                      title="Ver planificaciones"
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {patients.length === 0 && (
          <Box textAlign="center" mt={3}>
            <Typography variant="subtitle1" color="text.secondary">
              No se encontraron pacientes
            </Typography>
          </Box>
        )}
      </Container>
    </div>
  );
};

export default PlanningPatientList;