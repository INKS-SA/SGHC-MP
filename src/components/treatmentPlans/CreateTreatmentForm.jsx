import React, { useState } from "react";
import { IconButton, TableRow, TableCell, TextField, TextareaAutosize } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { toast } from "react-toastify";

const CreateTreatmentForm = ({
  patientId,
  createPatientTreatment,
}) => {
  const [formData, setFormData] = useState({
    cita: "",
    actividadPlanTrat: "",
    fechaPlanTrat: "",
    montoAbono: "",
  });

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
      const newTreatmentData = {
        ...formData,
        paciente: patientId,
      };
      await createPatientTreatment(newTreatmentData);
      // Lógica para limpiar el formulario o mostrar un mensaje de éxito
      setFormData({
        cita: "",
        actividadPlanTrat: "",
        fechaPlanTrat: "",
        montoAbono: "",
      });
      // Notificación de éxito
      toast.success("Plan de tratamiento creado exitosamente", {
        position: "top-right",
        autoClose: 3000,
      });

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
          name="cita"
          value={formData.cita}
          onChange={handleInputChange}
          variant="outlined"
          size="small"
        />
      </TableCell>
      <TableCell>
        <TextareaAutosize
          name="actividadPlanTrat"
          value={formData.actividadPlanTrat}
          onChange={handleInputChange}
          //variant="outlined"
          minRows={3}
          style={{ 
            width: '100%', 
            padding: '4px', 
            fontSize: '14px', 
            fontFamily: 'Roboto',
            borderRadius: '4px',
          }}
          size="large"
        />
      </TableCell>
      <TableCell>
        <TextField
          name="fechaPlanTrat"
          value={formData.fechaPlanTrat}
          onChange={handleInputChange}
          variant="outlined"
          size="small"
          type="date"
        />
      </TableCell>
      <TableCell>
        <TextField
          name="montoAbono"
          value={formData.montoAbono}
          onChange={handleInputChange}
          variant="outlined"
          size="small"
          type="number"
        />
      </TableCell>
      <TableCell align='center'>
        <IconButton onClick={handleSubmit}>
          <AddCircleIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default CreateTreatmentForm;
