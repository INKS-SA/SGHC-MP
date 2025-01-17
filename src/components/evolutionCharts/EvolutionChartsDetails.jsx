import React from "react";
import EditEvolutionChartForm from "./EditEvolutionChartForm";
import CreateEvolutionChartForm from "./CreateEvolutionChartForm";
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
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import useEvolutionCharts from "../../hooks/useEvolutionCharts";

const EvolutionChartsDetails = ({
  patientId,
  evolutionCharts,
  createEvolutionChart,
  updateEvolutionChart,
  fetchEvolutionChartsByPatientId,
}) => {
  // Cargar los cuadros de evolución del paciente al montar el componente
  React.useEffect(() => {
    fetchEvolutionChartsByPatientId(patientId);
  }, [patientId]);

  return (
    <Container component={Paper} sx={{pt:2, pb:3}}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ pb: 2 }}
      >
        Cuadro de Evolución
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ mb: 1 }}>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Typography variant="h6">Fecha</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6">Actividad Clínica</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6">Recomendación</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6">Firma Odontólogo</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6">Firma Paciente</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6">Acciones</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Mostrar cada cuadro de evolución existente como una fila editable */}
            {evolutionCharts.map((chart) => (
              <EditEvolutionChartForm
                key={chart.id}
                patientId={patientId}
                evolutionChart={chart}
                updateEvolutionChart={updateEvolutionChart}
              />
            ))}

            {/* Fila para crear un nuevo cuadro de evolución */}
            <CreateEvolutionChartForm
              patientId={patientId}
              createEvolutionChart={createEvolutionChart}
            />
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default EvolutionChartsDetails;
