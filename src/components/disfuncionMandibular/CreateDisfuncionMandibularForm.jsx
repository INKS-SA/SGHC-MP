import React, { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";
import {
  TextField,
  Typography,
  Grid,
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Checkbox,
  IconButton,
  FormGroup,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const CreateDisfuncionMandibularForm = ({
  patientId,
  createDisfuncionMandibular,
}) => {
  const [formData, setFormData] = useState({
    huesoCortical: [],
    espacioArticular: [],
    condillo: [],
    desviacionLineaMedia: [],
    desplazamientoLineaMedia: "",
    conReduccion: [],
    sinReduccion: [],
    clickArticular: [],
    crepitacion: [],
    subluxacion: [],
    dolorArticularDer: Array(3).fill(""),
    dolorArticularIzq: Array(3).fill(""),
    dolorMuscularIzq: Array(27).fill(""),
    dolorMuscularDer: Array(27).fill(""),
    dolorMuscular: [],
    dolorMuscularDescripcion: "",
    dolorOrofacialComunMuscular: [],
    otroDolorOrofacialComunMuscular: "",
    mallampati: [],
    dolorOrofacialComunApnea: [],
  });

  const navigate = useNavigate();

  const handleArrayInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedArray = [...formData[name]];
    updatedArray[index] = value;
    setFormData({
      ...formData,
      [name]: updatedArray,
    });
  };

  const handleCheckboxChange = (e, listName) => {
    const { name, checked } = e.target;
    const updatedList = checked
      ? [...formData[listName], name]
      : formData[listName].filter((item) => item !== name);

    setFormData({
      ...formData,
      [listName]: updatedList,
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newData = {
        ...formData,
        paciente: patientId,
      };

      await createDisfuncionMandibular(newData);
      // Lógica para limpiar el formulario o mostrar un mensaje de éxito
      setFormData({
        huesoCortical: [],
        espacioArticular: [],
        condillo: [],
        desviacionLineaMedia: [],
        desplazamientoLineaMedia: "",
        conReduccion: [],
        sinReduccion: [],
        clickArticular: [],
        crepitacion: [],
        subluxacion: [],
        dolorArticularDer: Array(3).fill(""),
        dolorArticularIzq: Array(3).fill(""),
        dolorMuscularIzq: Array(27).fill(""),
        dolorMuscularDer: Array(27).fill(""),
        dolorMuscular: [],
        dolorMuscularDescripcion: "",
        dolorOrofacialComunMuscular: [],
        otroDolorOrofacialComunMuscular: "",
        mallampati: [],
        dolorOrofacialComunApnea: [],
      });
      // Notificación de éxito
      toast.success("Disfunción Mandibular creada exitosamente", {
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
    <Container component={Paper}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
      >
        Crear Disfunción Temporo Mandibular
      </Typography>
      <Grid container spacing={2} sx={12}>
        <Grid item xs={12} sx={{mt:5}}>
          <Typography variant="h6" align="center" gutterBottom>
            Análisis de ATM
          </Typography>
        </Grid>
        <Grid item xs={12}>
          
            <FormLabel component="legend">Erosión de hueso cortical</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Izquierda"
                    checked={formData.huesoCortical.includes("Izquierda")}
                    onChange={(e) => handleCheckboxChange(e, "huesoCortical")}
                  />

                }
                label="Izquierda"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Derecha"
                    checked={formData.huesoCortical.includes("Derecha")}
                    onChange={(e) => handleCheckboxChange(e, "huesoCortical")}
                  />
                }
                label="Derecha"
              />
            </FormGroup>
          
        </Grid>
        <Grid item xs={12}>
          
            <FormLabel component="legend">
              Estrechamiento del espacio articular
            </FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Izquierda"
                    checked={formData.espacioArticular.includes("Izquierda")}
                    onChange={(e) => handleCheckboxChange(e, "espacioArticular")}
                  />
                }
                label="Izquierda"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Derecha"
                    checked={formData.espacioArticular.includes("Derecha")}
                    onChange={(e) => handleCheckboxChange(e, "espacioArticular")}
                  />
                }
                label="Derecha"
              />
            </FormGroup>
          
        </Grid>
        <Grid item xs={12}>
          
            <FormLabel component="legend">
              Espacio anormal del cóndilo
            </FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Izquierda"
                    checked={formData.condillo.includes("Izquierda")}
                    onChange={(e) => handleCheckboxChange(e, "condillo")}
                  />
                }
                label="Izquierda"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Derecha"
                    checked={formData.condillo.includes("Derecha")}
                    onChange={(e) => handleCheckboxChange(e, "condillo")}
                  />
                }
                label="Derecha"
              />
            </FormGroup>
          
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={3}>
          
            <FormLabel component="legend">
              Desviación de la línea media
            </FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Izquierda"
                    checked={formData.desviacionLineaMedia.includes("Izquierda")}
                    onChange={(e) => handleCheckboxChange(e, "desviacionLineaMedia")
                    }
                  />
                }
                label="Izquierda"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Derecha"
                    checked={formData.desviacionLineaMedia.includes("Derecha")}
                    onChange={(e) => handleCheckboxChange(e, "desviacionLineaMedia")
                    }
                  />
                }
                label="Derecha"
              />
            </FormGroup>
          
          </Grid>
          <Grid item xs={3}>
          <TextField
            fullWidth
            label="Desplazamiento de la línea media"
            name="desplazamientoLineaMedia"
            value={formData.desplazamientoLineaMedia}
            onChange={handleInputChange}
            variant="outlined"
          />
          </Grid>
        </Grid>
        <Grid item xs = {12}>
          <Typography variant="h6" align="center" gutterBottom>
            Desplazamiento discal
          </Typography>
        </Grid>
        <Grid item xs={12}>
          
            <FormLabel component="legend">Con reducción</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Izquierda"
                    checked={formData.conReduccion.includes("Izquierda")}
                    onChange={(e) => handleCheckboxChange(e, "conReduccion")}
                  />
                }
                label="Izquierda"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Derecha"
                    checked={formData.conReduccion.includes("Derecha")}
                    onChange={(e) => handleCheckboxChange(e, "conReduccion")}
                  />
                }
                label="Derecha"
              />
            </FormGroup>
        </Grid>
        <Grid item xs={12}>
          
            <FormLabel component="legend">Sin reducción</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Izquierda"
                    checked={formData.sinReduccion.includes("Izquierda")}
                    onChange={(e) => handleCheckboxChange(e, "sinReduccion")}
                  />
                }
                label="Izquierda"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Derecha"
                    checked={formData.sinReduccion.includes("Derecha")}
                    onChange={(e) => handleCheckboxChange(e, "sinReduccion")}
                  />
                }
                label="Derecha"
              />
            </FormGroup>
        </Grid>
        <Grid item xs={12}>
          
            <FormLabel component="legend">Click Articular</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Izquierda"
                    checked={formData.clickArticular.includes("Izquierda")}
                    onChange={(e) => handleCheckboxChange(e, "clickArticular")}
                  />
                }
                label="Izquierda"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Derecha"
                    checked={formData.clickArticular.includes("Derecha")}
                    onChange={(e) => handleCheckboxChange(e, "clickArticular")}
                  />
                }
                label="Derecha"
              />
            </FormGroup>
        </Grid>
        <Grid item xs={12}>
          
            <FormLabel component="legend">Crepitación</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Izquierda"
                    checked={formData.crepitacion.includes("Izquierda")}
                    onChange={(e) => handleCheckboxChange(e, "crepitacion")}
                  />
                }
                label="Izquierda"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Derecha"
                    checked={formData.crepitacion.includes("Derecha")}
                    onChange={(e) => handleCheckboxChange(e, "crepitacion")}
                  />
                }
                label="Derecha"
              />
            </FormGroup>
        </Grid>
        <Grid item xs={12}>
          
            <FormLabel component="legend">Subluxación</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Izquierda"
                    checked={formData.subluxacion.includes("Izquierda")}
                    onChange={(e) => handleCheckboxChange(e, "subluxacion")}
                  />
                }
                label="Izquierda"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Derecha"
                    checked={formData.subluxacion.includes("Derecha")}
                    onChange={(e) => handleCheckboxChange(e, "subluxacion")}
                  />
                }
                label="Derecha"
              />
            </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" align="center" gutterBottom>
            Dolor Articular
          </Typography>
        </Grid>
        <Grid item xs={12} container justifyContent="center" alignItems="center" sx={{mb:3}}>
          <img
            src="/resources/images/dolorArticular.png"
            alt="dolor articular"
            style={{ width: "40%", display: "block", margin: "auto" }}
          />
        </Grid>

        <Grid item xs={4}>
          <Typography variant="h7" gutterBottom>
            Izquierda
          </Typography>
        </Grid>
        {formData.dolorArticularIzq.map((value, index) => (
          <Grid item xs={2} key={index}>
            <TextField
              name="dolorArticularIzq"
              label={index + 1}
              value={value}
              onChange={(e) => handleArrayInputChange(e, index)}
              variant="outlined"
              size="small"
            />
          </Grid>
        ))}

        <Grid item xs={4}>
          <Typography variant="h7" gutterBottom>
            Derecha
          </Typography>
        </Grid>
        {formData.dolorArticularDer.map((value, index) => (
          <Grid item xs={2} key={index}>
            <TextField
              name="dolorArticularDer"
              label={index + 1}
              value={value}
              onChange={(e) => handleArrayInputChange(e, index)}
              variant="outlined"
              size="small"
            />
          </Grid>
        ))}

        <Grid item xs={12} sx={{mt:3}}>
          <Typography variant="h6" align="center" gutterBottom>
            Dolor Muscular
          </Typography>
        </Grid>

        <Grid container align="center">
        <Grid item xs={6}>
          <img
            src="/resources/images/dolorMuscularIzq.png"
            alt="dolor muscular izquierda"
            style={{ width: "90%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <img
            src="/resources/images/dolorMuscularDer.png"
            alt="dolor muscular derecha"
            style={{ width: "90%" }}
          />
        </Grid>


        <Grid container align="center" sx={{mt:3}}>
          <Grid item xs = {6}>
            <Grid item xs={12}>
              <Typography variant="h6" align="left" gutterBottom>
                Izquierda
              </Typography>
            </Grid>
            <Grid
              container
              spacing={2}
              item
              xs={8}
              style={{ display: "flex", flexWrap: "wrap" }}
            >
              {formData.dolorMuscularIzq.map((value, index) => (
                <Grid item xs={2} key={index}>
                  <TextField
                    name="dolorMuscularIzq"
                    label={index + 1}
                    value={value}
                    onChange={(e) => handleArrayInputChange(e, index)}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
              ))}
            </Grid>
        </Grid>
        <Grid item xs = {6}>
        <Grid item xs={12}>
          <Typography variant="h6" align="left" gutterBottom>
            Derecha
          </Typography>
        </Grid>

        <Grid
          container
          spacing={2}
          item
          xs={8}
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          {formData.dolorMuscularDer.map((value, index) => (
            <Grid item xs={2} key={index}>
              <TextField
                name="dolorMuscularDer"
                label={index + 1}
                value={value}
                onChange={(e) => handleArrayInputChange(e, index)}
                variant="outlined"
                size="small"
              />
            </Grid>
          ))}
          </Grid>
          </Grid>
        </Grid>
        </Grid>


        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend"></FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Mialguia local (aguda)"
                    checked={formData.dolorMuscular.includes(
                      "Mialguia local (aguda)"
                    )}
                    onChange={(e) => handleCheckboxChange(e, "dolorMuscular")}
                  />
                }
                label="Mialguia local (aguda)"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Dolor miofacial con derivación"
                    checked={formData.dolorMuscular.includes(
                      "Dolor miofacial con derivación"
                    )}
                    onChange={(e) => handleCheckboxChange(e, "dolorMuscular")}
                  />
                }
                label="Dolor miofacial con derivación"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Espasmo muscular"
                    checked={formData.dolorMuscular.includes(
                      "Espasmo muscular"
                    )}
                    onChange={(e) => handleCheckboxChange(e, "dolorMuscular")}
                  />
                }
                label="Espasmo muscular"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Artralgia"
                    checked={formData.dolorMuscular.includes("Artralgia")}
                    onChange={(e) => handleCheckboxChange(e, "dolorMuscular")}
                  />
                }
                label="Artralgia"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sx={{ marginRight: 0 }}>
          <TextField
            fullWidth
            label="Descripción"
            name="dolorMuscularDescripcion"
            value={formData.dolorMuscularDescripcion}
            onChange={handleInputChange}
            variant="outlined"
          />
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={7}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Dolor Orofacial Común</FormLabel>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="Dolor Tensional"
                      checked={formData.dolorOrofacialComunMuscular.includes(
                        "Dolor Tensional"
                      )}
                      onChange={(e) =>
                        handleCheckboxChange(e, "dolorOrofacialComunMuscular")
                      }
                    />
                  }
                  label="Dolor Tensional"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="Dolor Neuropático"
                      checked={formData.dolorOrofacialComunMuscular.includes(
                        "Dolor Neuropático"
                      )}
                      onChange={(e) =>
                        handleCheckboxChange(e, "dolorOrofacialComunMuscular")
                      }
                    />
                  }
                  label="Dolor Neuropático"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="Migraña"
                      checked={formData.dolorOrofacialComunMuscular.includes(
                        "Migraña"
                      )}
                      onChange={(e) =>
                        handleCheckboxChange(e, "dolorOrofacialComunMuscular")
                      }
                    />
                  }
                  label="Migraña"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="Dolor psicógeno"
                      checked={formData.dolorOrofacialComunMuscular.includes(
                        "Dolor psicógeno"
                      )}
                      onChange={(e) =>
                        handleCheckboxChange(e, "dolorOrofacialComunMuscular")
                      }
                    />
                  }
                  label="Dolor psicógeno"
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Otro"
              name="otroDolorOrofacialComunMuscular"
              value={formData.otroDolorOrofacialComunMuscular}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" align="center" gutterBottom>
            Apnea Obstructiva del Sueño
          </Typography>
          <Typography variant="h7" align="left" gutterBottom>
            Clasificación Mallampati
          </Typography>
        </Grid>

        <Grid item xs={12} container justifyContent="center" alignItems="center">
          <img
            src="/resources/images/mallampati.png"
            alt="dolor articular"
            style={{ width: "40%", display: "block", margin: "auto" }}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend"></FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Clase 1"
                    checked={formData.mallampati.includes("Clase 1")}
                    onChange={(e) => handleCheckboxChange(e, "mallampati")}
                  />
                }
                label="Clase 1"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Clase 2"
                    checked={formData.mallampati.includes("Clase 2")}
                    onChange={(e) => handleCheckboxChange(e, "mallampati")}
                  />
                }
                label="Clase 2"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Clase 3"
                    checked={formData.mallampati.includes("Clase 3")}
                    onChange={(e) => handleCheckboxChange(e, "mallampati")}
                  />
                }
                label="Clase 3"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Clase 4"
                    checked={formData.mallampati.includes("Clase 4")}
                    onChange={(e) => handleCheckboxChange(e, "mallampati")}
                  />
                }
                label="Clase 4"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Dolor Orofacial Común</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Arco Estrecho"
                    checked={formData.dolorOrofacialComunApnea.includes(
                      "Arco Estrecho"
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorOrofacialComunApnea")
                    }
                  />
                }
                label="Arco Estrecho"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Bóveda palatina estrecha"
                    checked={formData.dolorOrofacialComunApnea.includes(
                      "Bóveda palatina estrecha"
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorOrofacialComunApnea")
                    }
                  />
                }
                label="Bóveda palatina estrecha"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Festoneado de la lengua"
                    checked={formData.dolorOrofacialComunApnea.includes(
                      "Festoneado de la lengua"
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorOrofacialComunApnea")
                    }
                  />
                }
                label="Festoneado de la lengua"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Amígdalas agrandadas"
                    checked={formData.dolorOrofacialComunApnea.includes(
                      "Amígdalas agrandadas"
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorOrofacialComunApnea")
                    }
                  />
                }
                label="Amígdalas agrandadas"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" justifyContent="center">
            <Button sx = {{mb:2}} variant="contained" color="primary" onClick={handleSubmit}>
              <AddCircleIcon fontSize="large" />
              Crear Disfunción Mandibular
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateDisfuncionMandibularForm;
