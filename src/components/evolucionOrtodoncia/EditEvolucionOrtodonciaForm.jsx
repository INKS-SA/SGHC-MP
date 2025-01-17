import React, { useState } from "react";
import { TableRow, TableCell, TextField, IconButton, TextareaAutosize } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { toast } from "react-toastify";

const EditEvolucionOrtodonciaForm = ({
  ortodonciaId,
  evolucionId,
  evolucionData,
  updateEvolucion,
}) => {
  const [formData, setFormData] = useState({
    fechaEvolucion: evolucionData?.fechaEvolucion || "",
    evolucion: evolucionData?.evolucion || "",
    arcoEvolucion: evolucionData?.arcoEvolucion || ""
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
      const newEvolucionData = {
        ...formData,
        ortodoncia: ortodonciaId,
      };
      await updateEvolucion(evolucionId, newEvolucionData);
      // Notificación de éxito
      toast.success("Evolución Ortodoncia actualizada exitosamente", {
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
          name="fechaEvolucion"
          value={formData.fechaEvolucion}
          onChange={handleInputChange}
          variant="outlined"
          size="small"
          type="date"
        />
      </TableCell>
      <TableCell>
        <TextareaAutosize
          name="evolucion"
          value={formData.evolucion}
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
          name="arcoEvolucion"
          value={formData.arcoEvolucion}
          onChange={handleInputChange}
          variant="outlined"
          size="small"
        />
      </TableCell>
      <TableCell align='center'>
        <IconButton onClick={handleSubmit}>
          <SaveIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default EditEvolucionOrtodonciaForm;
