import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import EditEndodonticTreatmentsForm from "./EditEndodonticTreatmentsForm";
import CreateEndodonticTreatmentsForm from "./CreateEndodonticTreatmentsForm";
import { Button, Typography, Container, Paper } from "@mui/material";
import { useEndodonticTreatments } from "../../hooks/useEndodonticTreatments";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

const EndodonticTreatmentsDetails = ({
  patientId,
  endodonticTreatments,
  createEndodonticTreatment,
  updateEndodonticTreatment,
  fetchEndodonticTreatmentsByPatientId,
}) => {
  // Cargar los tratamientos de endodoncia del paciente al montar el componente
  useEffect(() => {
    fetchEndodonticTreatmentsByPatientId(patientId);
  }, [patientId]);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Container component={Paper} sx={{pb:3}}>
      <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{ pt: 2, pb: 1 }}
        >
          Endodoncias
        </Typography>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{ borderBottom: 1, borderColor: "divider", overflow: "auto" }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="endodontic treatments tabs"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Crear Endodoncia" {...a11yProps(0)} />
              {endodonticTreatments.map((treatment, index) => (
                <Tab
                  label={`Endodoncia ${index + 1}`}
                  {...a11yProps(index + 1)}
                  key={treatment.id}
                />
              ))}
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <CreateEndodonticTreatmentsForm
              patientId={patientId}
              createEndodonticTreatment={createEndodonticTreatment}
            />
          </CustomTabPanel>
          {endodonticTreatments.map((treatment, index) => (
            <CustomTabPanel value={value} index={index + 1} key={treatment.id}>
              <EditEndodonticTreatmentsForm
                patientId={patientId}
                endodonticTreatment={treatment}
                updateEndodonticTreatments={updateEndodonticTreatment}
              />
            </CustomTabPanel>
          ))}
        </Box>
      </Container>
    </>
  );
};

export default EndodonticTreatmentsDetails;
