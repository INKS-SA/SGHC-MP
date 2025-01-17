import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Tabs,
  Tab,
  Typography,
  Button,
  Paper,
  CircularProgress
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import BudgetDetails from './BudgetDetails';
import PaymentDetails from './PaymentDetails';
import patientTreatmentService from '../../services/patientTreatmentService';
import PlanningDetails from './PlanningDetails';  
import ContractTab from '../contract/ContractTab';
import PrintBudgetReport from './PrintBudgetReport';

function CustomTabPanel({ children, value, index }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`budget-tabpanel-${index}`}
      aria-labelledby={`budget-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `budget-tab-${index}`,
    'aria-controls': `budget-tabpanel-${index}`,
  };
}

const BudgetManagement = ({
  fetchBudgetById,
  paymentSummary,
  fetchPaymentSummary,
  registerPayment,
  cancelPayment,
  formatters,
  helpers
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [treatmentDetails, setTreatmentDetails] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [localBudget, setLocalBudget] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        console.log('Fetching budget with ID:', id);
        const result = await fetchBudgetById(id);
        console.log('Budget data received:', result.data);
        setLocalBudget(result.data);
  
        if (result.data.treatmentPlan) {
          console.log('Treatment Plan completo:', result.data.treatmentPlan);
          try {
           
            const treatmentId = result.data.treatmentPlan._id || result.data.treatmentPlan.id;
            //const treatmentId = result.data.treatmentPlan;
            console.log('ID extraído:', treatmentId);
            const treatmentData = await patientTreatmentService.getById(treatmentId);
            setTreatmentDetails(treatmentData);
          } catch (treatmentError) {
            console.error('Error loading treatment:', treatmentError);
          }
        } else {
          console.log('No treatment plan associated with this budget');
        }
      } catch (err) {
        console.error('Error in loadData:', err);
        setError(err.message || 'Error al cargar datos');
      } finally {
        setLoading(false);
      }
    };
  
    loadData();
  }, [id, fetchBudgetById]);
  

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => navigate("/presupuestos")}
          sx={{ mb: 2 }}
        >
          Volver
        </Button>
        <Paper sx={{ p: 3 }}>
          <Typography color="error" align="center">
            {error}
          </Typography>
        </Paper>
      </Container>
    );
  }

  if (!localBudget) {
    return (
      <Container maxWidth="lg">
        <Typography color="error">Presupuesto no encontrado</Typography>
      </Container>
    );
  }

  return (
    <div style={{ backgroundColor: '#f5f1ef', minHeight: '100vh', padding: '20px' }}>
      <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => navigate("/presupuestos")}
          sx={{ mb: 2 }}
        >
          Volver
        </Button>
        
      <Container maxWidth="lg">
        

        <Paper sx={{ p: 2, mb: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Presupuesto - {localBudget.paciente.nombrePaciente}
            </Typography>

            {treatmentDetails && (
              <Typography variant="subtitle1" color="text.secondary">
                Planificación: {treatmentDetails.especialidad}
              </Typography>           
            )}
            <Box display="flex" justifyContent="flex-end" mb={3}>
              <PrintBudgetReport 
                budget={localBudget}
                treatmentDetails={treatmentDetails}
                paymentSummary={paymentSummary}
                fetchPaymentSummary={fetchPaymentSummary}
              />
            </Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 3 }}>
              <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab label="Planificación" {...a11yProps(0)} />
                <Tab label="Presupuesto" {...a11yProps(1)} />
                <Tab label="Pagos" {...a11yProps(2)} />
                <Tab label="Contrato" {...a11yProps(3)} />
              </Tabs>
            </Box>

            <CustomTabPanel value={tabValue} index={0}>
              <PlanningDetails
                budget={localBudget}
                treatmentDetails={treatmentDetails}
              />
            </CustomTabPanel>

            <CustomTabPanel value={tabValue} index={1}>
              <BudgetDetails
                budget={localBudget}
                treatmentDetails={treatmentDetails}
              />
            </CustomTabPanel>

            <CustomTabPanel value={tabValue} index={2}>
              <PaymentDetails
                budget={localBudget}
                paymentSummary={paymentSummary}
                registerPayment={registerPayment}
                cancelPayment={cancelPayment}
                formatters={formatters}
                helpers={helpers}
                treatmentDetails={treatmentDetails}
                fetchPaymentSummary={fetchPaymentSummary}
              />
            </CustomTabPanel>

            <CustomTabPanel value={tabValue} index={3}>
              <ContractTab treatmentPlan={treatmentDetails} />
            </CustomTabPanel>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default BudgetManagement;