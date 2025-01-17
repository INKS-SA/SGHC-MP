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

const CreateRehabilitacionOralForm = ({
  patientId,
  createRehabilitacionOral,
}) => {
  const [formData, setFormData] = useState({
    refHorizontal: [],
    refVertical: [],
    longitudLabio: [],
    formaLabio: [],
    exposicionSonrisa: [],
    corredorBucal: [],
    orientacionPlanoOclusalAnt: [],
    visibilidadBordeSup: "",
    orientacionPlanoOclusalPost: [],
    anchoIncisivoCentalSup: "",
    longitud: "",
    colorDientes: "",
    simetriaGingival: [],
    biotipoPeriodental: [],
    numeroDiente: [],
    perdidaHuesoPeriodental: [],
    otrasPatologiasOseas: "",
    restriccionViasRespiratorias: "",
    relacionIncisal: [],
    overbite: [],
    overjet: [],
    tinitus: [],
    puedeRepetirMordida: "",
    restauracionesDefectuosas: false,
    restauracionesDefectuosasCuales: "",
    lesionesCariosas: false,
    lesionesCariosasCuales: "",
    dientesFaltantes: false,
    dientesFaltantesCuales: "",
    coronaDental: false,
    coronaDentalCuales: "",
    espigos: false,
    espigosCuales: "",
    espigos2: [],
    implantes: false,
    implantesCuales: "",
    edentuloParcial: [],
    clasificacionDeKenedy: "",
    edentuloTotal: "",
    diagnosticoOclusal: "",
  });
  const [archivo1, setArchivo1] = useState(null);
  const [archivo2, setArchivo2] = useState(null);
  const [archivo3, setArchivo3] = useState(null);

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

  const handleCheckboxChange = (e, listName) => {
    const { name, checked } = e.target;
  
    setFormData((prevFormData) => {
      const currentList = prevFormData[listName] || [];
      const updatedList = checked
        ? [...currentList, name] // Agrega el elemento si está marcado
        : currentList.filter((item) => item !== name); // Elimina el elemento si se desmarca
  
      return {
        ...prevFormData,
        [listName]: updatedList,
      };
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData(formData => ({
      ...formData,
      [name]: value === 'true'
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    try {
      const newData = {
        ...formData,
        paciente: patientId,
      };
      console.log("NEW Datos enviados:", newData);
      await createRehabilitacionOral(newData, archivo1, archivo2, archivo3);
      // Lógica para limpiar el formulario o mostrar un mensaje de éxito
      setFormData({
        refHorizontal: [],
        refVertical: [],
        longitudLabio: [],
        formaLabio: [],
        exposicionSonrisa: [],
        corredorBucal: [],
        orientacionPlanoOclusalAnt: [],
        visibilidadBordeSup: "",
        orientacionPlanoOclusalPost: [],
        anchoIncisivoCentalSup: "",
        longitud: "",
        colorDientes: "",
        simetriaGingival: [],
        biotipoPeriodental: [],
        numeroDiente: [],
        perdidaHuesoPeriodental: [],
        otrasPatologiasOseas: "",
        restriccionViasRespiratorias: "",
        relacionIncisal: [],
        overbite: [],
        overjet: [],
        tinitus: [],
        puedeRepetirMordida: "",
        restauracionesDefectuosas: false,
        restauracionesDefectuosasCuales: "",
        lesionesCariosas: false,
        lesionesCariosasCuales: "",
        dientesFaltantes: false,
        dientesFaltantesCuales: "",
        coronaDental: false,
        coronaDentalCuales: "",
        espigos: false,
        espigosCuales: "",
        espigos2: [],
        implantes: false,
        implantesCuales: "",
        edentuloParcial: [],
        clasificacionDeKenedy: "",
        edentuloTotal: "",
        diagnosticoOclusal: "",
      });
      setArchivo1(null);
      setArchivo2(null);
      setArchivo3(null);
      // Notificación de éxito
      toast.success("Rehabilitación Oral creada exitosamente", {
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
      <Typography variant="h5" align="center" gutterBottom>
        Crear Rehabilitación Oral
      </Typography>
      <Grid container spacing={2} xs={12}>
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
            <Box>
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
                    ml: 2,
                    '&:hover': {
                      backgroundColor: "#5d6c56", 
                    },
                  }}
                  variant="contained"
                  component="span"
                  color="primary"
                  
                  startIcon={<AddCircleIcon />}
                >
                  C
                </Button>
              </label>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sx={{mt:5}}>
          <Typography variant="h6" align="center" gutterBottom>
            Examen Extra Oral
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Referencia horizontal:</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="pupilas"
                    checked={formData.refHorizontal.includes("pupilas")}
                    onChange={(e) => handleCheckboxChange(e, "refHorizontal")}
                  />
                }
                label="Bipupilar"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="labios"
                    checked={formData.refHorizontal.includes("labios")}
                    onChange={(e) => handleCheckboxChange(e, "refHorizontal")}
                  />
                }
                label="Labios"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="otro"
                    checked={formData.refHorizontal.includes("otro")}
                    onChange={(e) => handleCheckboxChange(e, "refHorizontal")}
                  />
                }
                label="Otro"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Referencia vertical:</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="línea media facial"
                    checked={formData.refVertical.includes(
                      "línea media facial"
                    )}
                    onChange={(e) => handleCheckboxChange(e, "refVertical")}
                  />
                }
                label="Línea media facial"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="otros"
                    checked={formData.refVertical.includes("otros")}
                    onChange={(e) => handleCheckboxChange(e, "refVertical")}
                  />
                }
                label="Otros"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sx={{mt:5}}>
          <Typography variant="h6" align="center" gutterBottom>
            Análisis de sonrisa:
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Longitud del labio:</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Corto"
                    checked={formData.longitudLabio.includes("Corto")}
                    onChange={(e) => handleCheckboxChange(e, "longitudLabio")}
                  />
                }
                label="Corto"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="Largo"
                    checked={formData.longitudLabio.includes("Largo")}
                    onChange={(e) => handleCheckboxChange(e, "longitudLabio")}
                  />
                }
                label="Largo"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="Promedio"
                    checked={formData.longitudLabio.includes("Promedio")}
                    onChange={(e) => handleCheckboxChange(e, "longitudLabio")}
                  />
                }
                label="Promedio"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Forma del labio:</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Delgado"
                    checked={formData.formaLabio.includes("Delgado")}
                    onChange={(e) => handleCheckboxChange(e, "formaLabio")}
                  />
                }
                label="Delgado"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="Grueso"
                    checked={formData.formaLabio.includes("Grueso")}
                    onChange={(e) => handleCheckboxChange(e, "formaLabio")}
                  />
                }
                label="Grueso"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Exposición de la sonrisa:</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Bajo"
                    checked={formData.exposicionSonrisa.includes("Bajo")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "exposicionSonrisa")
                    }
                  />
                }
                label="Bajo"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Media"
                    checked={formData.exposicionSonrisa.includes("Media")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "exposicionSonrisa")
                    }
                  />
                }
                label="Media"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Alta"
                    checked={formData.exposicionSonrisa.includes("Alta")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "exposicionSonrisa")
                    }
                  />
                }
                label="Alta"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Labio hipermovil"
                    checked={formData.exposicionSonrisa.includes(
                      "Labio hipermovil"
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(e, "exposicionSonrisa")
                    }
                  />
                }
                label="Labio hipermovil"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Corredor bucal:</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Presente"
                    checked={formData.corredorBucal.includes("Presente")}
                    onChange={(e) => handleCheckboxChange(e, "corredorBucal")}
                  />
                }
                label="Presente"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="No presente"
                    checked={formData.corredorBucal.includes("No presente")}
                    onChange={(e) => handleCheckboxChange(e, "corredorBucal")}
                  />
                }
                label="No presente"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">
              Orientación del plano oclusal anterior:
            </FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Ideal"
                    checked={formData.orientacionPlanoOclusalAnt.includes(
                      "Ideal"
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(e, "orientacionPlanoOclusalAnt")
                    }
                  />
                }
                label="Ideal"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Canteado"
                    checked={formData.orientacionPlanoOclusalAnt.includes(
                      "Canteado"
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(e, "orientacionPlanoOclusalAnt")
                    }
                  />
                }
                label="Canteado"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sx={{mt:5}}>      
          <Typography variant="h6" align="center" gutterBottom>
            Análisis dentolabial:
          </Typography>
        </Grid>        
        <Grid item xs={12} sx={{ marginRight: 0 }}>
          <TextField
            fullWidth
            label="Visibilidad Borde Superior"
            name="visibilidadBordeSup"
            value={formData.visibilidadBordeSup}
            onChange={handleInputChange}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">
              Orientación del plano oclusal posterior:
            </FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Aceptable"
                    checked={formData.orientacionPlanoOclusalPost.includes(
                      "Aceptable"
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(e, "orientacionPlanoOclusalPost")
                    }
                  />
                }
                label="Aceptable"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Extrucción dental"
                    checked={formData.orientacionPlanoOclusalPost.includes(
                      "Extrucción dental"
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(e, "orientacionPlanoOclusalPost")
                    }
                  />
                }
                label="Extrucción dental"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item xs={5} sx={{ marginRight: 0 }}>
          <TextField
            fullWidth
            label="Ancho del incisivo central superior:"
            name="anchoIncisivoCentalSup"
            value={formData.anchoIncisivoCentalSup}
            onChange={handleInputChange}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={5} sx={{ marginRight: 0 }}>
          <TextField
            fullWidth
            label="Longitud:"
            name="longitud"
            value={formData.longitud}
            onChange={handleInputChange}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} sx={{ marginRight: 0 }}>
          <TextField
            fullWidth
            label="Color de dientes:"
            name="colorDientes"
            value={formData.colorDientes}
            onChange={handleInputChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sx={{mt:5}}>
          <Typography variant="h6" align="center" gutterBottom>
            Análisis Gingival
          </Typography>
        </Grid>  
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">
              Simetría de los cenit gingival:
            </FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Simétrico"
                    checked={formData.simetriaGingival.includes("Simétrico")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "simetriaGingival")
                    }
                  />
                }
                label="Simétrico"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Asimétrico"
                    checked={formData.simetriaGingival.includes("Asimétrico")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "simetriaGingival")
                    }
                  />
                }
                label="Asimétrico"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Biotipo peridontal:</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Delgado"
                    checked={formData.biotipoPeriodental.includes("Delgado")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "biotipoPeriodental")
                    }
                  />
                }
                label="Delgado"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Normal"
                    checked={formData.biotipoPeriodental.includes("Normal")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "biotipoPeriodental")
                    }
                  />
                }
                label="Normal"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Grueso"
                    checked={formData.biotipoPeriodental.includes("Grueso")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "biotipoPeriodental")
                    }
                  />
                }
                label="Grueso"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sx={{mt:5}}>
          <Typography variant="h6" align="center" gutterBottom>
            Análisis Radiográficos
          </Typography>
        </Grid>  
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Número de Diente:</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Caries"
                    checked={formData.numeroDiente.includes("Caries")}
                    onChange={(e) => handleCheckboxChange(e, "numeroDiente")}
                  />
                }
                label="Caries"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Lesión Periapical"
                    checked={formData.numeroDiente.includes(
                      "Lesión Periapical"
                    )}
                    onChange={(e) => handleCheckboxChange(e, "numeroDiente")}
                  />
                }
                label="Lesión Periapical"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">
              Perdida de hueso periodontal:
            </FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Localizado"
                    checked={formData.perdidaHuesoPeriodental.includes(
                      "Localizado"
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(e, "perdidaHuesoPeriodental")
                    }
                  />
                }
                label="Localizado"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Generalizado"
                    checked={formData.perdidaHuesoPeriodental.includes(
                      "Generalizado"
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(e, "perdidaHuesoPeriodental")
                    }
                  />
                }
                label="Generalizado"
              />
            </FormGroup>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Volumen óseo regeneración"
                    checked={formData.perdidaHuesoPeriodental.includes(
                      "Volumen óseo regeneración"
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(e, "perdidaHuesoPeriodental")
                    }
                  />
                }
                label="Volumen óseo regeneración"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Óptimo"
                    checked={formData.perdidaHuesoPeriodental.includes(
                      "Óptimo"
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(e, "perdidaHuesoPeriodental")
                    }
                  />
                }
                label="Óptimo"
              />
            </FormGroup>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Seno neumatizado izquierdo"
                    checked={formData.perdidaHuesoPeriodental.includes(
                      "Seno neumatizado izquierdo"
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(e, "perdidaHuesoPeriodental")
                    }
                  />
                }
                label="Seno neumatizado izquierdo"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Seno neumatizado derecho"
                    checked={formData.perdidaHuesoPeriodental.includes(
                      "Seno neumatizado derecho"
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(e, "perdidaHuesoPeriodental")
                    }
                  />
                }
                label="Seno neumatizado derecho"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12} sx={{ marginRight: 0 }}>
          <TextField
            fullWidth
            label="Otras patologías óseas"
            name="otrasPatologiasOseas"
            value={formData.otrasPatologiasOseas}
            onChange={handleInputChange}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} sx={{ marginRight: 0 }}>
          <TextField
            fullWidth
            label="Restricción de las vías respiratorias"
            name="restriccionViasRespiratorias"
            value={formData.restriccionViasRespiratorias}
            onChange={handleInputChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sx={{mt:5}}>
          <Typography variant="h6" align="center" gutterBottom>
            Análisis Oclusión
          </Typography>
        </Grid>  
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Relación Incisal:</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Clase 1"
                    checked={formData.relacionIncisal.includes("Clase 1")}
                    onChange={(e) => handleCheckboxChange(e, "relacionIncisal")}
                  />
                }
                label="Clase 1"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Clase 2"
                    checked={formData.relacionIncisal.includes("Clase 2")}
                    onChange={(e) => handleCheckboxChange(e, "relacionIncisal")}
                  />
                }
                label="Clase 2"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Clase 3"
                    checked={formData.relacionIncisal.includes("Clase 3")}
                    onChange={(e) => handleCheckboxChange(e, "relacionIncisal")}
                  />
                }
                label="Clase 3"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Overbite:</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Menor a 2 mm"
                    checked={formData.overbite.includes("Menor a 2 mm")}
                    onChange={(e) => handleCheckboxChange(e, "overbite")}
                  />
                }
                label="Menor a 2 mm"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="2-4 mm"
                    checked={formData.overbite.includes("2-4 mm")}
                    onChange={(e) => handleCheckboxChange(e, "overbite")}
                  />
                }
                label="2-4 mm"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Mayor a 4 mm"
                    checked={formData.overbite.includes("Mayor a 4 mm")}
                    onChange={(e) => handleCheckboxChange(e, "overbite")}
                  />
                }
                label="Mayor a 4 mm"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Overjet:</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Menor a 0 mm"
                    checked={formData.overjet.includes("Menor a 0 mm")}
                    onChange={(e) => handleCheckboxChange(e, "overjet")}
                  />
                }
                label="Menor a 0 mm"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="0-3 mm"
                    checked={formData.overjet.includes("0-3 mm")}
                    onChange={(e) => handleCheckboxChange(e, "overjet")}
                  />
                }
                label="0-3 mm"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Mayor a 3 mm"
                    checked={formData.overjet.includes("Mayor a 3 mm")}
                    onChange={(e) => handleCheckboxChange(e, "overjet")}
                  />
                }
                label="Mayor a 3 mm"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Tinitus:</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Si"
                    checked={formData.tinitus.includes("Si")}
                    onChange={(e) => handleCheckboxChange(e, "tinitus")}
                  />
                }
                label="Si"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="No"
                    checked={formData.tinitus.includes("No")}
                    onChange={(e) => handleCheckboxChange(e, "tinitus")}
                  />
                }
                label="No"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Puede repetir mordida:</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Si"
                    checked={formData.puedeRepetirMordida.includes("Si")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "puedeRepetirMordida")
                    }
                  />
                }
                label="Si"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="No"
                    checked={formData.puedeRepetirMordida.includes("No")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "puedeRepetirMordida")
                    }
                  />
                }
                label="No"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sx={{mt:5}}>
          <Typography variant="h6" align="center" gutterBottom>
            Condición Dental
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Restauraciones defectuosas</FormLabel>
            <RadioGroup
              row
              aria-label="restauracionesDefectuosas"
              name="restauracionesDefectuosas"
              value={formData.restauracionesDefectuosas}
              onChange={handleRadioChange}
            >
              <FormControlLabel value="true" control={<Radio />} label="Si" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>

          {formData.restauracionesDefectuosas && (
            <TextField
              fullWidth
              label="Cuales"
              name="restauracionesDefectuosasCuales"
              value={formData.restauracionesDefectuosasCuales}
              onChange={handleInputChange}
            />
          )}

        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Lesiones cariosas</FormLabel>
            <RadioGroup
              row
              aria-label="lesionesCariosas"
              name="lesionesCariosas"
              value={formData.lesionesCariosas}
              onChange={handleRadioChange}
            >
              <FormControlLabel value="true" control={<Radio />} label="Si" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          {formData.lesionesCariosas && (
            <TextField
              fullWidth
              label="Cuales"
              name="lesionesCariosasCuales"
              value={formData.lesionesCariosasCuales}
              onChange={handleInputChange}
            />
          )}
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Dientes Faltantes</FormLabel>
            <RadioGroup
              row
              aria-label="dientesFaltantes"
              name="dientesFaltantes"
              value={formData.dientesFaltantes}
              onChange={handleRadioChange}
            >
              <FormControlLabel value="true" control={<Radio />} label="Si" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          {formData.dientesFaltantes && (
            <TextField
              fullWidth
              label="Cuales"
              name="dientesFaltantesCuales"
              value={formData.dientesFaltantesCuales}
              onChange={handleInputChange}
            />
          )}
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">
              Colocación de corona dental
            </FormLabel>
            <RadioGroup
              row
              aria-label="coronaDental"
              name="coronaDental"
              value={formData.coronaDental}
              onChange={handleRadioChange}
            >
              <FormControlLabel value="true" control={<Radio />} label="Si" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          {formData.coronaDental && (
            <TextField
              fullWidth
              label="Cuales"
              name="coronaDentalCuales"
              value={formData.coronaDentalCuales}
              onChange={handleInputChange}
            />
          )}
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Colocación de espigos</FormLabel>
            <RadioGroup
              row
              aria-label="espigos"
              name="espigos"
              value={formData.espigos}
              onChange={handleRadioChange}
            >
              <FormControlLabel value="true" control={<Radio />} label="Si" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          {formData.espigos && (
            <TextField
              fullWidth
              label="Cuales"
              name="espigosCuales"
              value={formData.espigosCuales}
              onChange={handleInputChange}
            />
          )}
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend"></FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Erosión"
                    checked={formData.espigos2.includes("Erosión")}
                    onChange={(e) => handleCheckboxChange(e, "espigos2")}
                  />
                }
                label="Erosión"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Abfracción"
                    checked={formData.espigos2.includes("Abfracción")}
                    onChange={(e) => handleCheckboxChange(e, "espigos2")}
                  />
                }
                label="Abfracción"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Atrición"
                    checked={formData.espigos2.includes("Atrición")}
                    onChange={(e) => handleCheckboxChange(e, "espigos2")}
                  />
                }
                label="Atrición"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">
              Colocación de implantes en dientes
            </FormLabel>
            <RadioGroup
              row
              aria-label="implantes"
              name="implantes"
              value={formData.implantes}
              onChange={handleRadioChange}
            >
              <FormControlLabel value="true" control={<Radio />} label="Si" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          {formData.implantes && (
            <TextField
              fullWidth
              label="Cuales"
              name="implantesCuales"
              value={formData.implantesCuales}
              onChange={handleInputChange}
            />
          )}
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Edentulo parcial:</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Superior"
                    checked={formData.edentuloParcial.includes("Superior")}
                    onChange={(e) => handleCheckboxChange(e, "edentuloParcial")}
                  />
                }
                label="Superior"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Inferior"
                    checked={formData.edentuloParcial.includes("Inferior")}
                    onChange={(e) => handleCheckboxChange(e, "edentuloParcial")}
                  />
                }
                label="Inferior"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12} sx={{ marginRight: 0 }}>
          <TextField
            fullWidth
            label="Clasificación de Kenedy"
            name="clasificacionDeKenedy"
            value={formData.clasificacionDeKenedy}
            onChange={handleInputChange}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Edéntulo total:</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Superior"
                    checked={formData.edentuloTotal.includes("Superior")}
                    onChange={(e) => handleCheckboxChange(e, "edentuloTotal")}
                  />
                }
                label="Superior"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Inferior"
                    checked={formData.edentuloTotal.includes("Inferior")}
                    onChange={(e) => handleCheckboxChange(e, "edentuloTotal")}
                  />
                }
                label="Inferior"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12} sx={{ marginRight: 0 }}>
          <TextField
            fullWidth
            label="Diagnóstico oclusal"
            name="diagnosticoOclusal"
            value={formData.diagnosticoOclusal}
            onChange={handleInputChange}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" justifyContent="center">
            <Button sx = {{mb:2}} variant="contained" color="primary" onClick={handleSubmit}>
              <SaveIcon fontSize="large" />
              Guardar
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateRehabilitacionOralForm;
