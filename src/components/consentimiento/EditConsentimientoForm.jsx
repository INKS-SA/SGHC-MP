import React, { useState, useEffect } from "react";
import { Typography, Grid, Box, Button, Container, Paper } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DownloadIcon from "@mui/icons-material/Download";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Consentimiento.css";

const EditConsentimientoForm = ({ consentimiento, updateConsentimiento }) => {
  const [formData, setFormData] = useState({
    archivo: null,
  });

  useEffect(() => {
    if (consentimiento) {
      setFormData({
        archivo: consentimiento.archivo,
      });
    }
  }, [consentimiento]);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const fileName = e.target.files[0]?.name; // Obtener el nombre del archivo seleccionado
    
    setFormData({
      ...formData,
      archivo: e.target.files[0],
    });
  
    toast.success(`Archivo (${fileName}) cargado correctamente`, {
      position: "top-right",
      autoClose: 3000,
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedConsentimiento = {
        archivo: formData.archivo,
      };

      await updateConsentimiento(consentimiento._id, updatedConsentimiento);
      toast.success("Consentimiento actualizado exitosamente", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/patients");
    } catch (error) {
      toast.error("Error al actualizar el consentimiento", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <Container component={Paper} sx={{ padding: 2 }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
      >
        Editar Consentimiento
      </Typography>
      <Typography variant="body1" align="justify" gutterBottom>
      CONSENTIMIENTO INFORMADO PARA PROCEDIMIENTOS ODONTOLÓGICOS
      <br/><br/><br/>
      Yo ........................... identificado como aparece al pie de mi firma, en calidad de paciente Y/O representante legal de:........... autorizo a la institución prestadora de servicios de salud y al equipo odontológico que esta disponga, a realizar el tratamiento odontológico:
procedimiento que consiste en:............................
cuyo pronóstico es: 
<br/> 
BUENO          RESERVADO
<br/>
La institución a través de sus profesionales adscritos y demás personal vinculado, me han explicado en forma suficiente y adecuada, en qué consiste el tratamiento y me han indicado así mismo cuales son las consecuencias, ventajas, riesgos, posibles complicaciones o molestias que puedan presentarse y me han permitido hacer las preguntas necesarias, las cuales se me han respondido en forma satisfactoria.
<br/>
Me han señalado como los riesgos más comunes y frecuentes del tratamiento los siguientes:
<br/>

Que la administración de medicamentos, analgésicos ó anestésicos locales, también involucra complicaciones y riesgos que pueden llegar a ser graves e incluso mortales en un bajo número de casos.
<br/>
Entiendo por lo tanto, que en el curso del tratamiento pueden presentarse situaciones especiales e imprevistas que requiera procedimientos adicionales, los cuales me serán informados antes de la realización de los mismos, cuando el profesional tratante considere necesario. Se me informó además, que existe la posibilidad de revocar este consentimiento en cualquier momento del tratamiento, asumiendo las consecuencias de cualquier naturaleza que de ello puedan derivarse.
<br/>
Comprendo las implicaciones del presente consentimiento, me encuentro en capacidad de expresarlo y dejo constancia que los espacios en blanco han sido llenados ante mi firma.
<br/>
Autorizo que obtengan (marque la opción que desee):
<br/>
Fotografías: SI NO
<br/>
Videos: SI NO
<br/>
otros registros gráficos en el pre-intra y pos operatorio: SI NO
<br/>
Autorizo la difusión de registros gráficos de mi tratamiento en revistas médicas y/o ámbitos científicos: SI NO
<br/>
De igual forma me comprometo a seguir las recomendaciones que al final del tratamiento me indique el profesional tratante, las cuales son:
<br/>
<br/>
Parentesco en caso de firma de persona distinta al paciente:
<br/>
El suscrito Dr(a)....................... deja constancia que se explicado la naturaleza, propósitos, ventajas, riesgos y alternativas del tratamiento señalado y que ha respondido todas las preguntas formuladas por el paciente.

<br/>
<br/>
REVOCACIÓN
<br/>
fecha
ante la presencia del médico y un testigo, he decidido revocar mi anterior decisión por lo que cumplo con DESAUTORIZAR EL PROCEDIMIENTO INFORMADO, DESLINDANDO CUALQUIER RESPONSABILIDAD POR PARTE DEL MEDICO Y DE LA INSTITUCIÓN REFERENTE A MI DECISIÓN
<br/>
<br/>
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <label htmlFor="archivo-input">
              <input
                id="archivo-input"
                accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                type="file"
                onChange={handleFileChange}
                style={{ display: "none" }} // Ocultar el input file original
              />
              <Button
                variant="contained"
                component="span"
                color="primary"
                startIcon={<AddCircleIcon />}
                sx={{
                  color: 'white',
                  backgroundColor: "#8ba082",
                  //margin: 2,
                  '&:hover': {
                    backgroundColor: "#5d6c56", 
                  },
                }}
              >
                Editar Archivo
              </Button>
            </label>
            {consentimiento.archivo && (
              <Button
                variant="outlined"
                color="primary"
                startIcon={<DownloadIcon />}
                onClick={() => window.open(consentimiento.archivoUrl, "_blank")}
              >
                Ver Consentimiento
              </Button>
            )}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              <SaveIcon fontSize="large" />
              Editar Consentimiento
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EditConsentimientoForm;
