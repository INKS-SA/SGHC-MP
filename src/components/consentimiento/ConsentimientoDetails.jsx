import React, { useEffect } from "react";
import { Typography, Container, Paper } from "@mui/material";
import { useConsentimiento } from "../../hooks/useConsentimiento";
import EditConsentimientoForm from "./EditConsentimientoForm";
import CreateConsentimientoForm from "./CreateConsentimientoForm";
import "./Consentimiento.css";

const ConsentimientoDetails = ({ patientId }) => {
  const { consentimiento, fetchConsentimientoByPatientId, createConsentimiento, updateConsentimiento } = useConsentimiento();

  useEffect(() => {
    fetchConsentimientoByPatientId(patientId);
  }, [patientId]);

  return (
    <Container component={Paper} sx={{ padding: 2 }}>
      {consentimiento ? (
        <EditConsentimientoForm
          consentimiento={consentimiento}
          patientId={patientId}
          updateConsentimiento={updateConsentimiento}
        />
      ) : (
        <CreateConsentimientoForm patientId={patientId} 
          createConsentimiento={createConsentimiento}
        />
      )}
    </Container>
  );
};

export default ConsentimientoDetails;
