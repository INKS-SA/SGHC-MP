import React, { useEffect, useState } from "react";
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
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DownloadIcon from "@mui/icons-material/Download";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "./PeriodonticTreatments.css";
import { Padding } from "@mui/icons-material";

const EditPeriodonticTreatmentsForm = ({
  periodonticTreatment,
  updatePeriodonticTreatment,
}) => {
  const [formData, setFormData] = useState({
    paciente: periodonticTreatment?.paciente?._id || periodonticTreatment?.paciente?.id || "",
    diagnosticoPer: periodonticTreatment?.diagnosticoPer || "",
    observacionPer: periodonticTreatment?.observacionPer || "",
    movilidadInferior:
      periodonticTreatment?.movilidadInferior || Array(16).fill(""), // 16 empty slots for each tooth
    furcaInferior: periodonticTreatment?.furcaInferior || Array(16).fill(""),
    sangradoInferior: periodonticTreatment?.sangradoInferior || false,
    placaInferior: periodonticTreatment?.placaInferior || false,
    mrgGingivalInferiorA:
      periodonticTreatment?.mrgGingivalInferiorA || Array(16).fill(""),
    profundidadSondajeInferiorA:
      periodonticTreatment?.profundidadSondajeInferiorA || Array(16).fill(""),
    nivelInsercionInferiorA:
      periodonticTreatment?.nivelInsercionInferiorA || Array(16).fill(""),
    mrgGingivalInferiorB:
      periodonticTreatment?.mrgGingivalInferiorB || Array(16).fill(""),
    profundidadSondajeInferiorB:
      periodonticTreatment?.profundidadSondajeInferiorB || Array(16).fill(""),
    nivelInsercionInferiorB:
      periodonticTreatment?.nivelInsercionInferiorB || Array(16).fill(""),
    movilidadSuperior:
      periodonticTreatment?.movilidadSuperior || Array(16).fill(""),
    furcaSuperior: periodonticTreatment?.furcaSuperior || Array(16).fill(""),
    sangradoSuperior: periodonticTreatment?.sangradoSuperior || false,
    placaSuperior: periodonticTreatment?.placaSuperior || false,
    mrgGingivalSuperiorA:
      periodonticTreatment?.mrgGingivalSuperiorA || Array(16).fill(""),
    profundidadSondajeSuperiorA:
      periodonticTreatment?.profundidadSondajeSuperiorA || Array(16).fill(""),
    nivelInsercionSuperiorA:
      periodonticTreatment?.nivelInsercionSuperiorA || Array(16).fill(""),
    mrgGingivalSuperiorB:
      periodonticTreatment?.mrgGingivalSuperiorB || Array(16).fill(""),
    profundidadSondajeSuperiorB:
      periodonticTreatment?.profundidadSondajeSuperiorB || Array(16).fill(""),
    nivelInsercionSuperiorB:
      periodonticTreatment?.nivelInsercionSuperiorB || Array(16).fill(""),
  });
  const [archivo1, setArchivo1] = useState(null);
  const [archivo2, setArchivo2] = useState(null);

  useEffect(() => {
    if (periodonticTreatment) {
      setFormData({
        paciente: periodonticTreatment.paciente?._id || periodonticTreatment.paciente?.id || "",
        diagnosticoPer: periodonticTreatment.diagnosticoPer || "",
        observacionPer: periodonticTreatment.observacionPer || "",
        movilidadInferior: periodonticTreatment.movilidadInferior || Array(16).fill(""),
        furcaInferior: periodonticTreatment.furcaInferior || Array(16).fill(""),
        sangradoInferior: periodonticTreatment.sangradoInferior || false,
        placaInferior: periodonticTreatment.placaInferior || false,
        mrgGingivalInferiorA: periodonticTreatment.mrgGingivalInferiorA || Array(16).fill(""),
        profundidadSondajeInferiorA: periodonticTreatment.profundidadSondajeInferiorA || Array(16).fill(""),
        nivelInsercionInferiorA: periodonticTreatment.nivelInsercionInferiorA || Array(16).fill(""),
        mrgGingivalInferiorB: periodonticTreatment.mrgGingivalInferiorB || Array(16).fill(""),
        profundidadSondajeInferiorB: periodonticTreatment.profundidadSondajeInferiorB || Array(16).fill(""),
        nivelInsercionInferiorB: periodonticTreatment.nivelInsercionInferiorB || Array(16).fill(""),
        movilidadSuperior: periodonticTreatment.movilidadSuperior || Array(16).fill(""),
        furcaSuperior: periodonticTreatment.furcaSuperior || Array(16).fill(""),
        sangradoSuperior: periodonticTreatment.sangradoSuperior || false,
        placaSuperior: periodonticTreatment.placaSuperior || false,
        mrgGingivalSuperiorA: periodonticTreatment.mrgGingivalSuperiorA || Array(16).fill(""),
        profundidadSondajeSuperiorA: periodonticTreatment.profundidadSondajeSuperiorA || Array(16).fill(""),
        nivelInsercionSuperiorA: periodonticTreatment.nivelInsercionSuperiorA || Array(16).fill(""),
        mrgGingivalSuperiorB: periodonticTreatment.mrgGingivalSuperiorB || Array(16).fill(""),
        profundidadSondajeSuperiorB: periodonticTreatment.profundidadSondajeSuperiorB || Array(16).fill(""),
        nivelInsercionSuperiorB: periodonticTreatment.nivelInsercionSuperiorB || Array(16).fill(""),
      });
      setArchivo1(periodonticTreatment?.archivo1);
      setArchivo2(periodonticTreatment?.archivo2);
    }
  }, [periodonticTreatment]);


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
      await updatePeriodonticTreatment(periodonticTreatment._id, formData, archivo1, archivo2);

      // Notificación de éxito
      toast.success("Plan de tratamiento actualizado exitosamente", {
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
    <Box component={Paper} sx={{width: '90%', px:8 }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
      > 
        Editar Historia de Periodoncia
      </Typography>
      <Grid container spacing={3}>
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
              {periodonticTreatment?.archivo1Url && (
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
                  onClick={() => window.open(periodonticTreatment.archivo1Url, "_blank")}
                  startIcon={<DownloadIcon />}
                  
                >
                  RX
                </Button>
              )}
            </Box>
            <Box display="flex" alignItems="center">
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
              {periodonticTreatment?.archivo2Url && (
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
                  onClick={() => window.open(periodonticTreatment.archivo2Url, "_blank")}
                  startIcon={<DownloadIcon />}
                  
                >
                  CS
                </Button>
              )}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TextField
            //className="textFieldNormal"
            fullWidth
            label="Diagnóstico"
            name="diagnosticoPer"
            value={formData.diagnosticoPer}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            //className="textFieldNormal"
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
              <SaveIcon fontSize="large" />
              Guardar Periodoncia
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditPeriodonticTreatmentsForm;
