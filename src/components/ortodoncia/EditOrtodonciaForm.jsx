import React, { useEffect, useState } from "react";
import { TableRow, TableCell, TextField, IconButton, Paper } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { Typography, Grid, Box, Button, Container } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DownloadIcon from "@mui/icons-material/Download";
import { useNavigate } from "react-router";
import EvolucionOrtodonciaDetails from "../evolucionOrtodoncia/EvolucionOrtodonciaDetails";
import { toast } from "react-toastify";

const EditOrtodonciaForm = ({ ortodoncia, updateOrtodoncia, evoluciones, createEvolucion, updateEvolucion }) => {
  const [formData, setFormData] = useState({
    paciente: ortodoncia.paciente?._id || ortodoncia.paciente?.id || "", // Solo el ID
    diagnostico: ortodoncia?.diagnostico || "",
    objetivo: ortodoncia?.objetivo || "",
    tiempoAproximado: ortodoncia?.tiempoAproximado || "",
    tipoBracket: ortodoncia?.tipoBracket || "",
    aparatoOrtopedico: ortodoncia?.aparatoOrtopedico || "",
    observaciones: ortodoncia?.observaciones || ""
  });

  const [archivo1, setArchivo1] = useState(null);
  const [archivo2, setArchivo2] = useState(null);
  const [archivo3, setArchivo3] = useState(null);

  useEffect(() => {
    setFormData({
      paciente: ortodoncia.paciente?._id || ortodoncia.paciente?.id || "", // Solo el ID
      diagnostico: ortodoncia?.diagnostico || "",
      objetivo: ortodoncia?.objetivo || "",
      tiempoAproximado: ortodoncia?.tiempoAproximado || "",
      tipoBracket: ortodoncia?.tipoBracket || "",
      aparatoOrtopedico: ortodoncia?.aparatoOrtopedico || "",
      observaciones: ortodoncia?.observaciones || ""
    });
  }, [ortodoncia]);

  const navigate = useNavigate();

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
      } else if (e.target.name === "archivo3") {
        setArchivo3(e.target.files[0]);
        toast.success(`Archivo 3 (${fileName}) cargado correctamente`, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await updateOrtodoncia(ortodoncia._id, formData, archivo1, archivo2, archivo3);
      // Notificación de éxito
      toast.success("Ortodoncia actualizada exitosamente", {
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

  return (
    <Container component={Paper}>
      <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{ pt: 2, pb: 1 }}
        >
        Editar Ortodoncia
      </Typography>
      <Grid container spacing={2} sx={12}>
        {/* Botones de archivo */}
        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <Box display="flex" alignItems="center" mr={2}>
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
                  RX
                </Button>
              </label>
              {ortodoncia?.archivo1Url && (
                <Button
                  sx={{
                    color: 'white',
                    backgroundColor: "#5d6c56",
                    ml: 2,
                    '&:hover': {
                      backgroundColor: "#8ba082", 
                    },
                  }}  
                  //variant="outlined"
                  color="secondary"
                  onClick={() => window.open(ortodoncia.archivo1Url, "_blank")}
                  startIcon={<DownloadIcon />}
                  
                >
                  RX
                </Button>
              )}
            </Box>
            <Box display="flex" alignItems="center" mr={2}>
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
              {ortodoncia?.archivo2Url && (
                <Button
                  sx={{
                    color: 'white',
                    backgroundColor: "#5d6c56",
                    ml: 2,
                    '&:hover': {
                      backgroundColor: "#8ba082", 
                    },
                  }}
                  //variant="outlined"
                  color="secondary"
                  onClick={() => window.open(ortodoncia.archivo2Url, "_blank")}
                  startIcon={<DownloadIcon />}
                  
                >
                  CS
                </Button>
              )}
            </Box>
            <Box display="flex" alignItems="center" mr={2}>
              <label htmlFor="archivo3-input">
                <input
                  id="archivo3-input"
                  name="archivo3"
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
                  Fotos
                </Button>
              </label>
              {ortodoncia?.archivo3Url && (
                <Button
                  sx={{
                    color: 'white',
                    backgroundColor: "#5d6c56",
                    ml: 2,
                    '&:hover': {
                      backgroundColor: "#8ba082", 
                    },
                  }}  
                  //variant="outlined"
                  color="secondary"
                  onClick={() => window.open(ortodoncia.archivo3Url, "_blank")}
                  startIcon={<DownloadIcon />}
                  
                >
                  Fotos
                </Button>
              )}
            </Box>
          </Box>
        </Grid>
      <Grid item xs={12}>
          <TextField
            fullWidth
            label="Diagnóstico "
            name="diagnostico"
            value={formData.diagnostico}
            onChange={handleInputChange}
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Objetivo"
            name="objetivo"
            value={formData.objetivo}
            onChange={handleInputChange}
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Tiempo Aproximado"
            name="tiempoAproximado"
            value={formData.tiempoAproximado}
            onChange={handleInputChange}
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Tipo de Bracket"
            name="tipoBracket"
            value={formData.tipoBracket}
            onChange={handleInputChange}
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Aparato Ortopédico"
            name="aparatoOrtopedico"
            value={formData.aparatoOrtopedico}
            onChange={handleInputChange}
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Observaciones"
            name="observaciones"
            value={formData.observaciones}
            onChange={handleInputChange}
            variant="outlined"
            required
          />
        </Grid>
        {/* Mostrar cada evolución existente como una fila editable */}
        <EvolucionOrtodonciaDetails
          ortodoncia={ortodoncia}
          evoluciones={evoluciones}
          createEvolucion={createEvolucion}
          updateEvolucion={updateEvolucion}
        />

        <Grid item xs={12}>
          <Box display="flex" justifyContent="center">
            <Button sx = {{mb:2}} variant="contained" color="primary" onClick={handleSubmit}>
              <SaveIcon fontSize="large" />
              Editar HC Ortodoncia
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EditOrtodonciaForm;
