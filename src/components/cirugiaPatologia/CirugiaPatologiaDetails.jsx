import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Button, Typography, Container, Paper } from "@mui/material";
import { useCirugiaPatologia } from "../../hooks/useCirugiaPatologia";
import EditCirugiaPatologiaForm from "./EditCirugiaPatologiaForm";
import CreateCirugiaPatologiaForm from "./CreateCirugiaPatologiaForm";

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

const CirugiaPatologiaDetails = ({ 
  patientId,
  cirugiaPatologias,
  createCirugiaPatologia,
  updateCirugiaPatologia,
  fetchCirugiaPatologiaByPatientId
}) => {

  useEffect(() => {
    fetchCirugiaPatologiaByPatientId(patientId);
  }, [patientId]);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Container component={Paper}>
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{ pt: 2, pb: 1 }}
        >
          Cirugías y Patologías
        </Typography>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{ borderBottom: 1, borderColor: "divider", overflow: "auto" }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="cirugia patologia tabs"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Crear Cirugía/Patología" {...a11yProps(0)} />
              {cirugiaPatologias.map((patologia, index) => (
                <Tab
                  label={`Cirugía/Patología ${index + 1}`}
                  {...a11yProps(index + 1)}
                  key={patologia.id}
                />
              ))}
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <CreateCirugiaPatologiaForm
              patientId={patientId}
              createCirugiaPatologia={createCirugiaPatologia}
            />
          </CustomTabPanel>
          {cirugiaPatologias.map((patologia, index) => (
            <CustomTabPanel value={value} index={index + 1} key={patologia.id}>
              <EditCirugiaPatologiaForm
                cirugiaPatologia={patologia}
                updateCirugiaPatologia={updateCirugiaPatologia}
              />
            </CustomTabPanel>
          ))}
        </Box>
      </Container>
    </>
  );
};

export default CirugiaPatologiaDetails;
