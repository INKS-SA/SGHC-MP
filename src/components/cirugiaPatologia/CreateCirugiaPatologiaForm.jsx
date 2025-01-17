import React, { useState } from "react";
import {
  TextField,
  Typography,
  Grid,
  Box,
  Button,
  Container,
  Paper,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const CreateCirugiaPatologiaForm = ({ patientId, createCirugiaPatologia }) => {
  const [formData, setFormData] = useState({
    antecedentesCirPat: "",
    alergiasMedCirPat: "",
    patologiaTejBland: "",
    patologiaTejDuros: "",
    diagRadiografico: "",
    localizacionPatologia: "",
    extraccionDental: "",
  });
  const [archivo1, setArchivo1] = useState(null);
  const [archivo2, setArchivo2] = useState(null);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const fileName = e.target.files[0]?.name; // Obtener el nombre del archivo subido
    
    if (e.target.name === "archivo1") {
      setArchivo1(e.target.files[0]);
      toast.success(`Archivo 1 (${fileName}) cargado correctamente`, {
        position: "top-right",
        autoClose: 3000,
      });
    } else if (e.target.name === "archivo2") {
      setArchivo2(e.target.files[0]);
      toast.success(`Archivo 2 (${fileName}) cargado correctamente`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newData = {
        ...formData,
        paciente: patientId,
      };
      console.log(newData);
      console.log(archivo1);
      console.log(archivo2);
      await createCirugiaPatologia(newData, archivo1, archivo2);
      setFormData({
        antecedentesCirPat: "",
        alergiasMedCirPat: "",
        patologiaTejBland: "",
        patologiaTejDuros: "",
        diagRadiografico: "",
        localizacionPatologia: "",
        extraccionDental: "",
      });
      setArchivo1(null);
      setArchivo2(null);
      toast.success("Cirugía y patología creada exitosamente", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/patients");
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
    <Container component={Paper} sx={{ padding: 2 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Crear Cirugía y Patología Oral
      </Typography>
      <Grid container spacing={2}>
        {/* Botones de archivo */}
        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <Box mr={2}>
              <label htmlFor="archivo1-input">
                <input
                  id="archivo1-input"
                  name="archivo1"
                  type="file"
                  accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <Button
                  variant="contained"
                  component="span"
                  color="primary"
                  sx={{
                    color: 'white',
                    backgroundColor: "#8ba082",
                    //margin: 2,
                    '&:hover': {
                      backgroundColor: "#5d6c56", 
                    },
                  }}
                  startIcon={<AddCircleIcon />}
                >
                  RX
                </Button>
              </label>
            </Box>
            <Box>
              <label htmlFor="archivo2-input">
                <input
                  id="archivo2-input"
                  name="archivo2"
                  type="file"
                  accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <Button
                  sx={{
                    color: 'white',
                    backgroundColor: "#8ba082",
                    //margin: 2,
                    '&:hover': {
                      backgroundColor: "#5d6c56", 
                    },
                  }}
                  variant="contained"
                  component="span"
                  color="primary"
                  startIcon={<AddCircleIcon />}
                >
                  CS
                </Button>
              </label>
            </Box>
          </Box>
        </Grid>
        {/* Campos de texto */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Antecedentes específicos y generales"
            name="antecedentesCirPat"
            value={formData.antecedentesCirPat}
            onChange={handleInputChange}
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Alergias a medicamentos"
            name="alergiasMedCirPat"
            value={formData.alergiasMedCirPat}
            onChange={handleInputChange}
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Patología tejidos blandos"
            name="patologiaTejBland"
            value={formData.patologiaTejBland}
            onChange={handleInputChange}
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Patología tejidos duros"
            name="patologiaTejDuros"
            value={formData.patologiaTejDuros}
            onChange={handleInputChange}
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Diagnóstico Radiográfico"
            name="diagRadiografico"
            value={formData.diagRadiografico}
            onChange={handleInputChange}
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Localización de la Patología"
            name="localizacionPatologia"
            value={formData.localizacionPatologia}
            onChange={handleInputChange}
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Extracción Dental"
            name="extraccionDental"
            value={formData.extraccionDental}
            onChange={handleInputChange}
            variant="outlined"
            required
          />
        </Grid>
        {/* Botón de enviar */}
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center" mt={2}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              <AddCircleIcon fontSize="large" />
              Crear Cirugía y Patología Oral
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateCirugiaPatologiaForm;
