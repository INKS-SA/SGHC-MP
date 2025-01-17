import React, { useEffect, useState } from "react";
import CreatePeriodonticTreatmentsForm from "./CreatePeriodonticTreatmentsForm";
import EditPeriodonticTreatmentsForm from "./EditPeriodonticTreatmentsForm";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import { usePeriodonticTreatments } from "../../hooks/usePeriodonticTreatments";

const PeriodonticTreatmentsDetails = ({ patientId }) => {
  const {
    periodonticTreatment,
    createPeriodonticTreatment,
    updatePeriodonticTreatment,
    fetchPeriodonticTreatmentsByPatientId
  } = usePeriodonticTreatments();

  useEffect(() => {
    fetchPeriodonticTreatmentsByPatientId(patientId);
  }, [patientId]);

  return (
    <Box component={Paper} container align="center" sx={{pt:3, pb:3, width: '100%', maxWidth: 'none', m:0, pr:0, pl:0}}>
      {periodonticTreatment ? (
        <EditPeriodonticTreatmentsForm
          periodonticTreatment={periodonticTreatment}
          updatePeriodonticTreatment={updatePeriodonticTreatment}
        />
      ) : (
        <CreatePeriodonticTreatmentsForm
          patientId={patientId}
          createPeriodonticTreatment={createPeriodonticTreatment}
        />
      )}
    </Box>
  );
};

export default PeriodonticTreatmentsDetails;
