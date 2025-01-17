import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";
import CreateMedicalRecordForm from "./CreateMedicalRecordForm";
import { useMedicalRecords } from "../../hooks/useMedicalRecords";
import MedicalRecordForm from "./MedicalRecordForm";
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
} from "@mui/material";

const MedicalRecordDetails = ({ patientId }) => {
  const { medicalRecord, fetchMedicalRecordsByPatientId, createMedicalRecord, updateMedicalRecord } =
    useMedicalRecords();

  useEffect(() => {
    fetchMedicalRecordsByPatientId(patientId);
  }, [patientId]);

  return (
    <Container component={Paper} sx={{pt:2, pb:2}}>
      {medicalRecord ? (
        <MedicalRecordForm
          patientId={patientId}
          patientMedicalRecord={medicalRecord}
          updateMedicalRecord={updateMedicalRecord}
        />
      ) : (
        <CreateMedicalRecordForm
          patientId={patientId}
          createMedicalRecord={createMedicalRecord}
        />
      )}
    </Container>
  );
};

export default MedicalRecordDetails;
