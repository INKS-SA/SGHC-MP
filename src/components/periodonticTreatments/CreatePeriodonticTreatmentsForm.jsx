import React, { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  TextField,
  Typography,
  Grid,
  Box,
  Button,
  Container,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  TableContainer,
  Table,
  Paper,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "./PeriodonticTreatments.css";

const CreatePeriodonticTreatmentsForm = ({
  patientId,
  createPeriodonticTreatment,
}) => {
  const [formData, setFormData] = useState({
    diagnosticoPer: "",
    observacionPer: "",
    movilidadInferior: Array(16).fill(""), // 16 empty slots for each tooth
    furcaInferior: Array(16).fill(""),
    sangradoInferior: Array(48).fill(""),
    placaInferior: Array(48).fill(""),
    mrgGingivalInferiorA: Array(16).fill(""),
    profundidadSondajeInferiorA: Array(16).fill(""),
    nivelInsercionInferiorA: Array(16).fill(""),
    mrgGingivalInferiorB: Array(16).fill(""),
    profundidadSondajeInferiorB: Array(16).fill(""),
    nivelInsercionInferiorB: Array(16).fill(""),
    movilidadSuperior: Array(16).fill(""),
    furcaSuperior: Array(16).fill(""),
    sangradoSuperior: Array(48).fill(""),
    placaSuperior: Array(48).fill(""),
    mrgGingivalSuperiorA: Array(16).fill(""),
    profundidadSondajeSuperiorA: Array(16).fill(""),
    nivelInsercionSuperiorA: Array(16).fill(""),
    mrgGingivalSuperiorB: Array(16).fill(""),
    profundidadSondajeSuperiorB: Array(16).fill(""),
    nivelInsercionSuperiorB: Array(16).fill(""),
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

  const handleArrayInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedArray = [...formData[name]];
    updatedArray[index] = value;
    setFormData({
      ...formData,
      [name]: updatedArray,
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
      const newPeriodonticTreatmentData = {
        ...formData,
        paciente: patientId,
      };

      await createPeriodonticTreatment(newPeriodonticTreatmentData, archivo1, archivo2);
      // Lógica para limpiar el formulario o mostrar un mensaje de éxito
      setFormData({
        diagnosticoPer: "",
        observacionPer: "",
        movilidadInferior: [],
        furcaInferior: [],
        sangradoInferior: [],
        placaInferior: [],
        mrgGingivalInferiorA: [],
        profundidadSondajeInferiorA: [],
        nivelInsercionInferiorA: [],
        mrgGingivalInferiorB: [],
        profundidadSondajeInferiorB: [],
        nivelInsercionInferiorB: [],
        movilidadSuperior: [],
        furcaSuperior: [],
        sangradoSuperior: [],
        placaSuperior: [],
        mrgGingivalSuperiorA: [],
        profundidadSondajeSuperiorA: [],
        nivelInsercionSuperiorA: [],
        mrgGingivalSuperiorB: [],
        profundidadSondajeSuperiorB: [],
        nivelInsercionSuperiorB: [],
      });

      // Notificación de éxito
      toast.success("Periodoncia actualizada exitosamente", {
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
    <Box component={Paper} sx={{width: '90%', padding:8 }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
      >
        Crear Periodoncia
      </Typography>
      <Grid container spacing={3}>
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
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TextField
            
            fullWidth
            label="Diagnóstico"
            name="diagnosticoPer"
            value={formData.diagnosticoPer}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            
            fullWidth
            label="Observaciones"
            name="observacionPer"
            value={formData.observacionPer}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" align="center" gutterBottom>
            Inferior
          </Typography>
        </Grid>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h7"></Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.8</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.7</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.6</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.5</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.4</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.3</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.2</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.1</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.1</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.2</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.3</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.4</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.5</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.6</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.7</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.8</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h7">Movilidad</Typography>
                </TableCell>
                {formData.movilidadInferior.map((value, index) => (
                  <TableCell key={index}>
                    <TextField
                      name="movilidadInferior"
                      value={value}
                      onChange={(e) => handleArrayInputChange(e, index)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h7">Furca</Typography>
                </TableCell>
                {formData.furcaInferior.map((value, index) => (
                  <TableCell key={index}>
                    <TextField
                      name="furcaInferior"
                      value={value}
                      onChange={(e) => handleArrayInputChange(e, index)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                ))}
              </TableRow>
              {/*Sangrado / Supuración*/}
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h7">Sangrado / Supuración</Typography>
                </TableCell>
                {formData.sangradoInferior.map(
                  (value, index) =>
                    // Asegúrate de que index esté dentro del rango adecuado antes de mostrar los TextField
                    index % 3 === 0 && (
                      <TableCell key={index}>
                        {/* Muestra hasta 3 textfields en la misma celda */}
                        {formData.sangradoInferior
                          .slice(index, index + 3)
                          .map((item, idx) => (
                            <TextField
                              key={idx}
                              name="sangradoInferior"
                              value={item}
                              onChange={(e) =>
                                handleArrayInputChange(e, index + idx)
                              }
                              variant="outlined"
                              size="small"
                              style={{ marginBottom: "8px" }} // Espacio entre TextField
                            />
                          ))}
                      </TableCell>
                    )
                )}
              </TableRow>

              {/*Placa*/}
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h7">Placa</Typography>
                </TableCell>
                {formData.placaInferior.map(
                  (value, index) =>
                    // Asegúrate de que index esté dentro del rango adecuado antes de mostrar los TextField
                    index % 3 === 0 && (
                      <TableCell key={index}>
                        {/* Muestra hasta 3 textfields en la misma celda */}
                        {formData.placaInferior
                          .slice(index, index + 3)
                          .map((item, idx) => (
                            <TextField
                              key={idx}
                              name="placaInferior"
                              value={item}
                              onChange={(e) =>
                                handleArrayInputChange(e, index + idx)
                              }
                              variant="outlined"
                              size="small"
                              style={{ marginBottom: "8px" }} // Espacio entre TextField
                            />
                          ))}
                      </TableCell>
                    )
                )}
              </TableRow>

              <TableRow>
                <TableCell align="center">
                  <Typography variant="h7">Margen Gingival</Typography>
                </TableCell>
                {formData.mrgGingivalInferiorA.map((value, index) => (
                  <TableCell key={index}>
                    <TextField
                      name="mrgGingivalInferiorA"
                      value={value}
                      onChange={(e) => handleArrayInputChange(e, index)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h7">Profundidad de sondaje</Typography>
                </TableCell>
                {formData.profundidadSondajeInferiorA.map((value, index) => (
                  <TableCell key={index}>
                    <TextField
                      name="profundidadSondajeInferiorA"
                      value={value}
                      onChange={(e) => handleArrayInputChange(e, index)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h7">Nivel de inserción</Typography>
                </TableCell>
                {formData.nivelInsercionInferiorA.map((value, index) => (
                  <TableCell key={index}>
                    <TextField
                      name="nivelInsercionInferiorA"
                      value={value}
                      onChange={(e) => handleArrayInputChange(e, index)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                ))}
              </TableRow>
              {/* Add more imgs here */}
              <TableRow>
                <TableCell colSpan={17} style={{ padding: "0px" }}>
                  <Grid container justify="left">
                    <Grid item xs={12}>
                      <img
                        src="/resources/images/periodonciaInferior.png"
                        alt="periodonciaInferior"
                        style={{ width: "100%", aspectRatio: "5 / 1" }}
                      />
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h7">Margen Gingival</Typography>
                </TableCell>
                {formData.mrgGingivalInferiorB.map((value, index) => (
                  <TableCell key={index}>
                    <TextField
                      name="mrgGingivalInferiorB"
                      value={value}
                      onChange={(e) => handleArrayInputChange(e, index)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h7">Profundidad de sondaje</Typography>
                </TableCell>
                {formData.profundidadSondajeInferiorB.map((value, index) => (
                  <TableCell key={index}>
                    <TextField
                      name="profundidadSondajeInferiorB"
                      value={value}
                      onChange={(e) => handleArrayInputChange(e, index)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h7">Nivel de inserción</Typography>
                </TableCell>
                {formData.nivelInsercionInferiorB.map((value, index) => (
                  <TableCell key={index}>
                    <TextField
                      name="nivelInsercionInferiorB"
                      value={value}
                      onChange={(e) => handleArrayInputChange(e, index)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h7"></Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.8</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.7</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.6</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.5</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.4</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.3</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.2</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.1</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.1</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.2</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.3</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.4</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.5</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.6</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.7</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.8</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>

        <Grid item xs={12}>
          <Typography variant="h6" align="center" gutterBottom>
            Superior
          </Typography>
        </Grid>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h7"></Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.8</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.7</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.6</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.5</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.4</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.3</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.2</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.1</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.1</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.2</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.3</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.4</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.5</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.6</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.7</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.8</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h7">Movilidad</Typography>
                </TableCell>
                {formData.movilidadSuperior.map((value, index) => (
                  <TableCell key={index}>
                    <TextField
                      name="movilidadSuperior"
                      value={value}
                      onChange={(e) => handleArrayInputChange(e, index)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h7">Furca</Typography>
                </TableCell>
                {formData.furcaSuperior.map((value, index) => (
                  <TableCell key={index}>
                    <TextField
                      name="furcaSuperior"
                      value={value}
                      onChange={(e) => handleArrayInputChange(e, index)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                ))}
              </TableRow>
              {/*Sangrado / Supuración*/}
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h7">Sangrado / Supuración</Typography>
                </TableCell>
                {formData.sangradoSuperior.map(
                  (value, index) =>
                    // Asegúrate de que index esté dentro del rango adecuado antes de mostrar los TextField
                    index % 3 === 0 && (
                      <TableCell key={index}>
                        {/* Muestra hasta 3 textfields en la misma celda */}
                        {formData.sangradoSuperior
                          .slice(index, index + 3)
                          .map((item, idx) => (
                            <TextField
                              key={idx}
                              name="sangradoSuperior"
                              value={item}
                              onChange={(e) =>
                                handleArrayInputChange(e, index + idx)
                              }
                              variant="outlined"
                              size="small"
                              style={{ marginBottom: "8px" }} // Espacio entre TextField
                            />
                          ))}
                      </TableCell>
                    )
                )}
              </TableRow>

              {/*Placa*/}
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h7">Placa</Typography>
                </TableCell>
                {formData.placaSuperior.map(
                  (value, index) =>
                    // Asegúrate de que index esté dentro del rango adecuado antes de mostrar los TextField
                    index % 3 === 0 && (
                      <TableCell key={index}>
                        {/* Muestra hasta 3 textfields en la misma celda */}
                        {formData.placaSuperior
                          .slice(index, index + 3)
                          .map((item, idx) => (
                            <TextField
                              key={idx}
                              name="placaSuperior"
                              value={item}
                              onChange={(e) =>
                                handleArrayInputChange(e, index + idx)
                              }
                              variant="outlined"
                              size="small"
                              style={{ marginBottom: "8px" }} // Espacio entre TextField
                            />
                          ))}
                      </TableCell>
                    )
                )}
              </TableRow>

              <TableRow>
                <TableCell align="center">
                  <Typography variant="h7">Margen Gingival</Typography>
                </TableCell>
                {formData.mrgGingivalSuperiorA.map((value, index) => (
                  <TableCell key={index}>
                    <TextField
                      name="mrgGingivalSuperiorA"
                      value={value}
                      onChange={(e) => handleArrayInputChange(e, index)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h7">Profundidad de sondaje</Typography>
                </TableCell>
                {formData.profundidadSondajeSuperiorA.map((value, index) => (
                  <TableCell key={index}>
                    <TextField
                      name="profundidadSondajeSuperiorA"
                      value={value}
                      onChange={(e) => handleArrayInputChange(e, index)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h7">Nivel de inserción</Typography>
                </TableCell>
                {formData.nivelInsercionSuperiorA.map((value, index) => (
                  <TableCell key={index}>
                    <TextField
                      name="nivelInsercionSuperiorA"
                      value={value}
                      onChange={(e) => handleArrayInputChange(e, index)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                ))}
              </TableRow>
              {/* Add more imgs here */}
              <TableRow>
                <TableCell colSpan={17} style={{ padding: "0px" }}>
                  <Grid container justify="left">
                    <Grid item xs={12}>
                      <img
                        src="/resources/images/periodonciaSuperior.png"
                        alt="periodonciaSuperior"
                        style={{ width: "100%", aspectRatio: "5 / 1" }}
                      />
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h7">Margen Gingival</Typography>
                </TableCell>
                {formData.mrgGingivalSuperiorB.map((value, index) => (
                  <TableCell key={index}>
                    <TextField
                      name="mrgGingivalSuperiorB"
                      value={value}
                      onChange={(e) => handleArrayInputChange(e, index)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h7">Profundidad de sondaje</Typography>
                </TableCell>
                {formData.profundidadSondajeSuperiorB.map((value, index) => (
                  <TableCell key={index}>
                    <TextField
                      name="profundidadSondajeSuperiorB"
                      value={value}
                      onChange={(e) => handleArrayInputChange(e, index)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h7">Nivel de inserción</Typography>
                </TableCell>
                {formData.nivelInsercionSuperiorB.map((value, index) => (
                  <TableCell key={index}>
                    <TextField
                      name="nivelInsercionSuperiorB"
                      value={value}
                      onChange={(e) => handleArrayInputChange(e, index)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h7"></Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.8</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.7</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.6</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.5</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.4</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.3</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.2</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.1</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.1</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.2</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.3</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.4</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.5</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.6</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.7</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.8</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>

        <Grid item xs={12}>
          <Box display="flex" justifyContent="center">
            <Button sx = {{mb:2}} variant="contained" color="primary" onClick={handleSubmit}>
              <AddCircleIcon fontSize="large" />
              Crear Periodoncia
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreatePeriodonticTreatmentsForm;
