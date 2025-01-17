import React, { useState, useEffect } from "react";
import { Button, Typography, Container, Paper, Box } from "@mui/material";
import { useDisfuncionMandibular } from "../../hooks/useDisfuncionMandibular";
import EditDisfuncionMandibularForm from "./EditDisfuncionMandibularForm";
import CreateDisfuncionMandibularForm from "./CreateDisfuncionMandibularForm";

const DisfuncionMandibularDetails = ({ patientId }) => {

  const { disfuncionMandibular, createDisfuncionMandibular, updateDisfuncionMandibular, fetchDisfuncionMandibularByPatientId } = useDisfuncionMandibular();

  useEffect(() => {
    fetchDisfuncionMandibularByPatientId(patientId);
  }, [patientId]);

  return (
  <Container component={Paper} sx={{pt:3, pb:3}}>
    {disfuncionMandibular ? (
        <EditDisfuncionMandibularForm
            patientId={patientId}
            disfuncionMandibular={disfuncionMandibular}
            updateDisfuncionMandibular={updateDisfuncionMandibular}
        />
    ) : (
        <CreateDisfuncionMandibularForm
            patientId={patientId}
            createDisfuncionMandibular={createDisfuncionMandibular}
        />
    )}
  </Container>
);
};

export default DisfuncionMandibularDetails;
