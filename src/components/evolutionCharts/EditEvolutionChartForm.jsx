import React, { useEffect, useState, useRef } from "react";
import {
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Box,
  Button,
  TextareaAutosize,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DownloadIcon from "@mui/icons-material/Download";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import SignatureCanvas from "react-signature-canvas";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const EditEvolutionChartForm = ({ patientId, evolutionChart, updateEvolutionChart }) => {
  const [formData, setFormData] = useState({
    paciente: evolutionChart.paciente?._id || evolutionChart.paciente?.id || "", // Solo el ID
    fechaCuadEvol: evolutionChart?.fechaCuadEvol.split("T")[0] || "",
    actividadCuadEvol: evolutionChart?.actividadCuadEvol || "",
    recomendacionCuadEvol: evolutionChart?.recomendacionCuadEvol || "",
  });
  const [archivo1, setArchivo1] = useState(null);
  const [archivo2, setArchivo2] = useState(null);
  const [signature1, setSignature1] = useState(null);
  const [signature2, setSignature2] = useState(null);

  const sigCanvas1 = useRef(null);
  const sigCanvas2 = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (evolutionChart) {
      setFormData({
        fechaCuadEvol: evolutionChart.fechaCuadEvol.split("T")[0] || "",
        actividadCuadEvol: evolutionChart.actividadCuadEvol || "",
        recomendacionCuadEvol: evolutionChart.recomendacionCuadEvol || "",
      });
      setSignature1(evolutionChart.archivo1Url);
      setSignature2(evolutionChart.archivo2Url);
    }
  }, [evolutionChart]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const saveSignature = (sigCanvas, setArchivo) => {
    const dataURL = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
    const file = dataURLtoFile(dataURL, `firma_${Date.now()}.png`);
    setArchivo(file);
  };

  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newData = {
        ...formData,
        paciente: patientId,
      };
      await updateEvolutionChart(
        evolutionChart._id,
        newData,
        archivo1,
        archivo2
      );
      // Notificación de éxito
      toast.success("Cuadro de evolución actualizado exitosamente", {
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
    <TableRow>
      <TableCell>
        <TextField
          name="fechaCuadEvol"
          value={formData.fechaCuadEvol}
          onChange={handleInputChange}
          variant="outlined"
          size="small"
          type="date"
        />
      </TableCell>
      <TableCell>
        <TextareaAutosize
          name="actividadCuadEvol"
          value={formData.actividadCuadEvol}
          onChange={handleInputChange}
          minRows={3}
          style={{
            width: "100%",
            padding: "4px",
            fontSize: "14px",
            fontFamily: "Roboto",
            borderRadius: "4px",
          }}
          size="large"
        />
      </TableCell>
      <TableCell>
        <TextareaAutosize
          name="recomendacionCuadEvol"
          value={formData.recomendacionCuadEvol}
          onChange={handleInputChange}
          minRows={3}
          style={{
            width: "100%",
            padding: "4px",
            fontSize: "14px",
            fontFamily: "Roboto",
            borderRadius: "4px",
          }}
          size="large"
        />
      </TableCell>
      <TableCell>
        <Box>
          {signature1 ? (
            <img
              src={signature1}
              alt="Firma Odontólogo"
              style={{
                border: "1px solid #ccc",
                width: "200px",
                height: "100px",
              }}
            />
          ) : (
            <>
              <SignatureCanvas
                ref={sigCanvas1}
                penColor="black"
                canvasProps={{
                  width: 200,
                  height: 100,
                  className: "sigCanvas",
                  style: { border: "1px solid #ccc" },
                }}
              />
              <Box display="flex" justifyContent="center" mt={1}>
                <IconButton
                  onClick={() => saveSignature(sigCanvas1, setArchivo1)}
                >
                  <SaveIcon />
                </IconButton>
                <IconButton onClick={() => sigCanvas1.current.clear()}>
                  <ClearIcon />
                </IconButton>
              </Box>
            </>
          )}
        </Box>
      </TableCell>
      <TableCell>
        <Box>
          {signature2 ? (
            <img
              src={signature2}
              alt="Firma Paciente"
              style={{
                border: "1px solid #ccc",
                width: "200px",
                height: "100px",
              }}
            />
          ) : (
            <>
              <SignatureCanvas
                ref={sigCanvas2}
                penColor="black"
                canvasProps={{
                  width: 200,
                  height: 100,
                  className: "sigCanvas",
                  style: { border: "1px solid #ccc" },
                }}
              />
              <Box display="flex" justifyContent="center" mt={1}>
                <IconButton
                  onClick={() => saveSignature(sigCanvas2, setArchivo2)}
                >
                  <SaveIcon />
                </IconButton>
                <IconButton onClick={() => sigCanvas2.current.clear()}>
                  <ClearIcon />
                </IconButton>
              </Box>
            </>
          )}
        </Box>
      </TableCell>
      <TableCell align="center">
        <IconButton onClick={handleSubmit}>
          <SaveIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default EditEvolutionChartForm;
