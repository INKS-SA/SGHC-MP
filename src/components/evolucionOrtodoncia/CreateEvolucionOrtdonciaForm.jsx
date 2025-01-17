import React, { useState } from "react";
import { IconButton, TableRow, TableCell, TextField, TextareaAutosize } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { toast } from "react-toastify";

const CreateEvolucionOrtodonciaForm = ({
  ortodonciaId,
  createEvolucion,
}) => {
  const [formData, setFormData] = useState({
    fechaEvolucion: "",
    evolucion: "",
    arcoEvolucion: ""
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
      await createEvolucion(newEvolucionData);
      // Lógica para limpiar el formulario o mostrar un mensaje de éxito
      setFormData({
        fechaEvolucion: "",
        evolucion: "",
        arcoEvolucion: ""
      });
      // Notificación de éxito
      toast.success("Evolución Ortodoncia creada exitosamente", {
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
          <AddCircleIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default CreateEvolucionOrtodonciaForm;
