import React from "react";
import EditEvolucionOrtodonciaForm from "./EditEvolucionOrtodonciaForm";
import CreateEvolucionOrtodonciaForm from "./CreateEvolucionOrtdonciaForm";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


const EvolucionOrtodonciaDetails = ({
  ortodoncia,
  evoluciones,
  createEvolucion,
  updateEvolucion
}) => {

  // Función para manejar la creación de un nuevo tratamiento
  const handleCreateEvolucion = async (formData) => {
    const newTreatmentData = {
      ...formData,
      ortodoncia: ortodoncia._id,
    };
    await createEvolucion(newTreatmentData);
    
  };

  // Función para manejar la actualización de un tratamiento existente
  const handleUpdateEvolucion = async (id, formData) => {
    await updateEvolucion(id, formData);
  };

  return (
    <Container component={Paper} sx={{m:2, mt:4}}>
      <TableContainer >
    <Table>
      <TableHead>
        <TableRow>
          <TableCell align='center'><Typography variant='h6'>Fecha</Typography></TableCell>
          <TableCell align='center'><Typography variant='h6'>Evolución</Typography></TableCell>
          <TableCell align='center'><Typography variant='h6'>Arco</Typography></TableCell>
          <TableCell align='center'><Typography variant='h6'>Acción</Typography></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {/* Mostrar cada tratamiento existente como una fila editable */}
        {evoluciones.map((evolucion) => (
          <EditEvolucionOrtodonciaForm
            ortodonciaId={ortodoncia._id}
            key={evolucion.id}
            evolucionId={evolucion.id}
            evolucionData={{
              fechaEvolucion: evolucion.fechaEvolucion.split("T")[0],
              evolucion: evolucion.evolucion,
              arcoEvolucion: evolucion.arcoEvolucion
            }}
            updateEvolucion ={handleUpdateEvolucion}
          />
        ))}

        {/* Fila para crear un nuevo tratamiento */}
        <CreateEvolucionOrtodonciaForm
          ortodonciaId={ortodoncia._id}
          createEvolucion={handleCreateEvolucion}
        />
      </TableBody>
    </Table>
  </TableContainer>
    </Container>
  );
};

export default EvolucionOrtodonciaDetails;
