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
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const CreateEndodonticTreatmentsForm = ({
  patientId,
  createEndodonticTreatment,
}) => {
  const [formData, setFormData] = useState({
    dienteEnd: "",
    grapaEnd: "",
    diagDental: "",
    diagPulpar: "",
    intervencionIndicada: "",
    tecnicaObturacion: "",
    numConductos: "",
    obsAnatomicas: "",
    etiologia: [],
    dolor: [],
    pruebasClinicas: [],
    pruebasVitalidad: [],
    camaraPulpar: [],
    conductosRadiculares: [],
    foramen: [],
    ligamentoPeriodontal: [],
    otrosHallazgos: "",
    conductometriaTentativa: "",
    conductometriaDefinitiva: "",
    tecnicaInstrumentacion: "",
    medicacionIntra: "",
  });
  const [archivo1, setArchivo1] = useState(null);
  const [archivo2, setArchivo2] = useState(null);
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
    }
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
      const newEndodonticTreatmentData = {
        ...formData,
        paciente: patientId,
      };

      await createEndodonticTreatment(
        newEndodonticTreatmentData,
        archivo1,
        archivo2
      );
      // Lógica para limpiar el formulario o mostrar un mensaje de éxito
      setFormData({
        dienteEnd: "",
        grapaEnd: "",
        diagDental: "",
        diagPulpar: "",
        intervencionIndicada: "",
        tecnicaObturacion: "",
        numConductos: "",
        obsAnatomicas: "",
        etiologia: [],
        dolor: [],
        pruebasClinicas: [],
        pruebasVitalidad: [],
        camaraPulpar: [],
        conductosRadiculares: [],
        foramen: [],
        ligamentoPeriodontal: [],
        otrosHallazgos: "",
        conductometriaTentativa: "",
        conductometriaDefinitiva: "",
        tecnicaInstrumentacion: "",
        medicacionIntra: "",
      });
      setArchivo1(null);
      setArchivo2(null);
      // Notificación de éxito
      toast.success("Endodoncia creada exitosamente", {
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
    <Container>
      <Typography variant="h5" align="center" gutterBottom>
        Crear Historia de Endodoncia
      </Typography>
      <Grid container spacing={2} sx={{ margin: 2 }}>
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
          </Box>
        </Grid>
        <Grid container spacing={2} sx={{ marginTop: 1 }}>
          <Grid item xs={3} sx={{ marginRight: 0 }}>
            <TextField
              fullWidth
              label="Diente"
              name="dienteEnd"
              value={formData.dienteEnd}
              onChange={handleInputChange}
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={3} sx={{ marginLeft: 35 }}>
            <TextField
              fullWidth
              label="Grapa"
              name="grapaEnd"
              value={formData.grapaEnd}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Diagnóstico dental"
              name="diagDental"
              value={formData.diagDental}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Diagnóstico pulpar"
              name="diagPulpar"
              value={formData.diagPulpar}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Intervención indicada"
              name="intervencionIndicada"
              value={formData.intervencionIndicada}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Técnica de obturación"
              name="tecnicaObturacion"
              value={formData.tecnicaObturacion}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Número de conductos"
              name="numConductos"
              value={formData.numConductos}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Observaciones anatómicas"
              name="obsAnatomicas"
              value={formData.obsAnatomicas}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Etiología</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="caries"
                    checked={formData.etiologia.includes("caries")}
                    onChange={(e) => handleCheckboxChange(e, "etiologia")}
                  />
                }
                label="Caries"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="traumatismo"
                    checked={formData.etiologia.includes("traumatismo")}
                    onChange={(e) => handleCheckboxChange(e, "etiologia")}
                  />
                }
                label="Traumatismo"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="obturacion"
                    checked={formData.etiologia.includes("obturacion")}
                    onChange={(e) => handleCheckboxChange(e, "etiologia")}
                  />
                }
                label="Obturación"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="abrasion"
                    checked={formData.etiologia.includes("abrasion")}
                    onChange={(e) => handleCheckboxChange(e, "etiologia")}
                  />
                }
                label="Abrasión"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="iatropatogenia"
                    checked={formData.etiologia.includes("iatropatogenia")}
                    onChange={(e) => handleCheckboxChange(e, "etiologia")}
                  />
                }
                label="Iatropatogenia"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="idiopatico"
                    checked={formData.etiologia.includes("idiopatico")}
                    onChange={(e) => handleCheckboxChange(e, "etiologia")}
                  />
                }
                label="Idiopático"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="otro"
                    checked={formData.etiologia.includes("otro")}
                    onChange={(e) => handleCheckboxChange(e, "etiologia")}
                  />
                }
                label="Otro"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" align="center" gutterBottom>
            Examen Clínico
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Dolor</FormLabel>

            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="ninguno"
                    checked={formData.dolor.includes("ninguno")}
                    onChange={(e) => handleCheckboxChange(e, "dolor")}
                  />
                }
                label="Ninguno"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="localizado"
                    checked={formData.dolor.includes("localizado")}
                    onChange={(e) => handleCheckboxChange(e, "dolor")}
                  />
                }
                label="Localizado"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="agudo"
                    checked={formData.dolor.includes("agudo")}
                    onChange={(e) => handleCheckboxChange(e, "dolor")}
                  />
                }
                label="Agudo"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="espontaneo"
                    checked={formData.dolor.includes("espontaneo")}
                    onChange={(e) => handleCheckboxChange(e, "dolor")}
                  />
                }
                label="Espontáneo"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="evoCorta"
                    checked={formData.dolor.includes("evoCorta")}
                    onChange={(e) => handleCheckboxChange(e, "dolor")}
                  />
                }
                label="Evolución Corta"
              />
            </FormGroup>

            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="irradiado"
                    checked={formData.dolor.includes("irradiado")}
                    onChange={(e) => handleCheckboxChange(e, "dolor")}
                  />
                }
                label="Irradiado"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="cronico"
                    checked={formData.dolor.includes("cronico")}
                    onChange={(e) => handleCheckboxChange(e, "dolor")}
                  />
                }
                label="Crónico"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="provocado"
                    checked={formData.dolor.includes("provocado")}
                    onChange={(e) => handleCheckboxChange(e, "dolor")}
                  />
                }
                label="Provocado"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="evoLarga"
                    checked={formData.dolor.includes("evoLarga")}
                    onChange={(e) => handleCheckboxChange(e, "dolor")}
                  />
                }
                label="Evolución Larga"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Pruebas clínicas</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="percusion"
                    checked={formData.pruebasClinicas.includes("percusion")}
                    onChange={(e) => handleCheckboxChange(e, "pruebasClinicas")}
                  />
                }
                label="Percusión"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="masticacion"
                    checked={formData.pruebasClinicas.includes("masticacion")}
                    onChange={(e) => handleCheckboxChange(e, "pruebasClinicas")}
                  />
                }
                label="Masticación"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="fractura"
                    checked={formData.pruebasClinicas.includes("fractura")}
                    onChange={(e) => handleCheckboxChange(e, "pruebasClinicas")}
                  />
                }
                label="Fractura"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="movilidad"
                    checked={formData.pruebasClinicas.includes("movilidad")}
                    onChange={(e) => handleCheckboxChange(e, "pruebasClinicas")}
                  />
                }
                label="Movilidad"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="fistula"
                    checked={formData.pruebasClinicas.includes("fistula")}
                    onChange={(e) => handleCheckboxChange(e, "pruebasClinicas")}
                  />
                }
                label="Fístula"
              />
            </FormGroup>

            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="palpacion"
                    checked={formData.pruebasClinicas.includes("palpacion")}
                    onChange={(e) => handleCheckboxChange(e, "pruebasClinicas")}
                  />
                }
                label="Palpación"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="exploDolorosa"
                    checked={formData.pruebasClinicas.includes("exploDolorosa")}
                    onChange={(e) => handleCheckboxChange(e, "pruebasClinicas")}
                  />
                }
                label="Exploración Dolorosa"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="tumefaccion"
                    checked={formData.pruebasClinicas.includes("tumefaccion")}
                    onChange={(e) => handleCheckboxChange(e, "pruebasClinicas")}
                  />
                }
                label="Tumefacción"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="recesionGingival"
                    checked={formData.pruebasClinicas.includes(
                      "recesionGingival"
                    )}
                    onChange={(e) => handleCheckboxChange(e, "pruebasClinicas")}
                  />
                }
                label="Recesión Gingival"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Pruebas de vitalidad</FormLabel>

            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="frio"
                    checked={formData.pruebasVitalidad.includes("frio")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "pruebasVitalidad")
                    }
                  />
                }
                label="Frío"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="calor"
                    checked={formData.pruebasVitalidad.includes("calor")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "pruebasVitalidad")
                    }
                  />
                }
                label="Calor"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="dulce"
                    checked={formData.pruebasVitalidad.includes("dulce")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "pruebasVitalidad")
                    }
                  />
                }
                label="Dulce"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" align="center" gutterBottom>
            Examen Radiológico
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Cámara pulpar</FormLabel>

            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="amplia"
                    checked={formData.camaraPulpar.includes("amplia")}
                    onChange={(e) => handleCheckboxChange(e, "camaraPulpar")}
                  />
                }
                label="Amplia"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="estrecha"
                    checked={formData.camaraPulpar.includes("estrecha")}
                    onChange={(e) => handleCheckboxChange(e, "camaraPulpar")}
                  />
                }
                label="Estrecha"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="normal"
                    checked={formData.camaraPulpar.includes("normal")}
                    onChange={(e) => handleCheckboxChange(e, "camaraPulpar")}
                  />
                }
                label="Normal"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Conductos radiculares</FormLabel>

            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="curvos"
                    checked={formData.conductosRadiculares.includes("curvos")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "conductosRadiculares")
                    }
                  />
                }
                label="Curvos"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="calcificados"
                    checked={formData.conductosRadiculares.includes(
                      "calcificados"
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(e, "conductosRadiculares")
                    }
                  />
                }
                label="Calcificados"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="bifurcado"
                    checked={formData.conductosRadiculares.includes(
                      "bifurcado"
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(e, "conductosRadiculares")
                    }
                  />
                }
                label="Bifurcado"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="amplios"
                    checked={formData.conductosRadiculares.includes("amplios")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "conductosRadiculares")
                    }
                  />
                }
                label="Amplios"
              />
            </FormGroup>

            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="rectos"
                    checked={formData.conductosRadiculares.includes("rectos")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "conductosRadiculares")
                    }
                  />
                }
                label="Rectos"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="obturados"
                    checked={formData.conductosRadiculares.includes(
                      "obturados"
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(e, "conductosRadiculares")
                    }
                  />
                }
                label="Obturados"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="estrechos"
                    checked={formData.conductosRadiculares.includes(
                      "estrechos"
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(e, "conductosRadiculares")
                    }
                  />
                }
                label="Estrechos"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Foramen</FormLabel>

            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="visible"
                    checked={formData.foramen.includes("visible")}
                    onChange={(e) => handleCheckboxChange(e, "foramen")}
                  />
                }
                label="Visible"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="noVisible"
                    checked={formData.foramen.includes("noVisible")}
                    onChange={(e) => handleCheckboxChange(e, "foramen")}
                  />
                }
                label="No Visible"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="resorcion"
                    checked={formData.foramen.includes("resorcion")}
                    onChange={(e) => handleCheckboxChange(e, "foramen")}
                  />
                }
                label="Con Resorción"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="incompleto"
                    checked={formData.foramen.includes("incompleto")}
                    onChange={(e) => handleCheckboxChange(e, "foramen")}
                  />
                }
                label="Incompleto"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Ligamento periodontal</FormLabel>

            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="ensanchado"
                    checked={formData.ligamentoPeriodontal.includes(
                      "ensanchado"
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(e, "ligamentoPeriodontal")
                    }
                  />
                }
                label="Ensanchado"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="discontinuo"
                    checked={formData.ligamentoPeriodontal.includes(
                      "discontinuo"
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(e, "ligamentoPeriodontal")
                    }
                  />
                }
                label="Discontinuo"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="normal"
                    checked={formData.ligamentoPeriodontal.includes("normal")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "ligamentoPeriodontal")
                    }
                  />
                }
                label="Normal"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Otros Hallazgos"
            name="otrosHallazgos"
            value={formData.otrosHallazgos}
            onChange={handleInputChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sx={{ margin: 2 }}>
          <Typography variant="h6" align="center" gutterBottom>
            Preparación Mecánica del Conducto
          </Typography>
        </Grid>
        <Grid container spacing={2} sx={{ marginLeft: 0 }}>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Conductometría tentativa (CT)"
              name="conductometriaTentativa"
              value={formData.conductometriaTentativa}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Conductometría definitiva (CD)"
              name="conductometriaDefinitiva"
              value={formData.conductometriaDefinitiva}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Técnica de instrumentación y sustancia irrigante"
            name="tecnicaInstrumentacion"
            value={formData.tecnicaInstrumentacion}
            onChange={handleInputChange}
            variant="outlined"
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Medicación intraconducto"
            name="medicacionIntra"
            value={formData.medicacionIntra}
            onChange={handleInputChange}
            variant="outlined"
            multiline
            rows={4}
          />
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" justifyContent="center">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              <AddCircleIcon fontSize="large" />
              Crear HC Endodoncia
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateEndodonticTreatmentsForm;
