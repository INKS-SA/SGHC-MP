import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginForm } from "./components/user/LoginForm";
import RegistrationForm from "./components/user/RegistrationForm";
import { useUser } from "./hooks/useUser";
import Home from "./components/Home";
import "./App.css";

import Welcome from "./components/Welcome";
import EditUser from "./components/user/EditUser";
import Patients from "./components/patients/Patients";
import PatientAndMedicalRecordDetails from "./components/PatientAndMedicalRecordDetails";
import { usePatients } from "./hooks/usePatients";
import usePatientTreatments from "./hooks/usePatientTreatments";
import useEvolutionCharts from "./hooks/useEvolutionCharts";
import { useEndodonticTreatments } from "./hooks/useEndodonticTreatments";
import { useCirugiaPatologia } from "./hooks/useCirugiaPatologia";
import { useOdontologos } from "./hooks/useOdontologos";
import { useBudgets } from "./hooks/useBudgets";
import { usePayments } from "./hooks/usePayments";
import { useFinancialReports } from "./hooks/useFinancialReports";

import Odontologos from "./components/odontologos/Odontologos";
import Appointment from "./components/appointments/Appointment";
import AppointmentMenu from "./components/appointments/AppointmentMenu";
import EditOdontologo from "./components/odontologos/EditOdontologo";
import AppointmentDetails from "./components/appointments/AppointmentDetails";
import EditAppointment from "./components/appointments/EditAppointment";

import PlanningMenu from "./components/planning/PlanningMenu";
import PlanningPatientList from "./components/planning/PlanningPatientDetails";
import TreatmentPlans from "./components/planning/TreatmentPlans";
import AllTreatmentPlans from "./components/planning/AllTreatmentPlans";
import CreatePlanningForm from "./components/planning/CreatePlanningForm";
import PlanningList from "./components/planning/PlanningList";

// Componentes de presupuestos
import BudgetList from "./components/budgets/BudgetList";
import BudgetForm from "./components/budgets/BudgetForm";
import BudgetDetails from "./components/budgets/BudgetDetails";

// Pagos
import BudgetManagement from "./components/budgets/BudgetManagement";

import PaymentDetails from "./components/budgets/PaymentDetails";

import FinancialReports from "./components/reports/FinancialReports";

function App() {
  const { user, logout, login } = useUser();
  const {
    patients,
    patient,
    fetchPatients,
    fetchPatientByCedula,
    fetchPatientByName,
    createPatient,
    updatePatient,
    setPatient,
  } = usePatients();
  const {
    patientTreatments,
    createPatientTreatment,
    updatePatientTreatment,
    getPatientTreatmentsByPatientId,
  } = usePatientTreatments();
  const {
    evolutionCharts,
    createEvolutionChart,
    updateEvolutionChart,
    fetchEvolutionChartsByPatientId,
  } = useEvolutionCharts();
  const {
    endodonticTreatments,
    createEndodonticTreatment,
    updateEndodonticTreatment,
    fetchEndodonticTreatmentsByPatientId,
  } = useEndodonticTreatments();
  const {
    cirugiaPatologias,
    createCirugiaPatologia,
    updateCirugiaPatologia,
    fetchCirugiaPatologiaByPatientId,
  } = useCirugiaPatologia();
  const {
    odontologos,
    odontologo,
    fetchOdontologos,
    fetchOdontologoById,
    createOdontologo,
    updateOdontologo,
    setOdontologo,
  } = useOdontologos();

  const {
    budgets,
    currentBudget,
    loading,
    error,
    fetchBudgets,
    fetchBudgetsByPatient,
    createBudget,
    updateBudget,
    updateBudgetStatus,
    calculateTotals,
    fetchBudgetById,
  } = useBudgets();

  const {
    paymentSummary,
    fetchPaymentSummary,
    registerPayment,
    cancelPayment,
    formatters,
    helpers,
  } = usePayments();

  const {
    loading: reportsLoading,
    error: reportsError,
    getReporteMensual,
    getReporteAnual,
    getReportePorRango,
  } = useFinancialReports();

  const isLoggedIn = !!user;

  return (
    <div className="app">
      <Router>
        <ToastContainer />
        <div className="content">
          <Routes>
            <Route
              path="/login"
              element={
                isLoggedIn ? <Navigate to="/" /> : <LoginForm login={login} />
              }
            />
            <Route
              path="/patients"
              element={
                isLoggedIn ? (
                  <Patients
                    patients={patients}
                    patient={patient}
                    fetchPatients={fetchPatients}
                    fetchPatientByCedula={fetchPatientByCedula}
                    fetchPatientByName={fetchPatientByName}
                    createPatient={createPatient}
                    updatePatient={updatePatient}
                    setPatient={setPatient}
                  />
                ) : (
                  <Home />
                )
              }
            />

            <Route
              path="/patients/:patientId"
              element={
                <PatientAndMedicalRecordDetails
                  fetchPatients={fetchPatients}
                  updatePatient={updatePatient}
                  patientTreatments={patientTreatments}
                  createPatientTreatment={createPatientTreatment}
                  updatePatientTreatment={updatePatientTreatment}
                  getPatientTreatmentsByPatientId={
                    getPatientTreatmentsByPatientId
                  }
                  evolutionCharts={evolutionCharts}
                  createEvolutionChart={createEvolutionChart}
                  updateEvolutionChart={updateEvolutionChart}
                  fetchEvolutionChartsByPatientId={
                    fetchEvolutionChartsByPatientId
                  }
                  endodonticTreatments={endodonticTreatments}
                  createEndodonticTreatment={createEndodonticTreatment}
                  updateEndodonticTreatment={updateEndodonticTreatment}
                  fetchEndodonticTreatmentsByPatientId={
                    fetchEndodonticTreatmentsByPatientId
                  }
                  cirugiaPatologias={cirugiaPatologias}
                  createCirugiaPatologia={createCirugiaPatologia}
                  updateCirugiaPatologia={updateCirugiaPatologia}
                  fetchCirugiaPatologiaByPatientId={
                    fetchCirugiaPatologiaByPatientId
                  }
                />
              }
            />
            <Route path="/agendamiento" element={<AppointmentMenu />} />
            <Route
              path="/agendamiento/detalles"
              element={<AppointmentDetails />}
            />
            <Route
              path="/agendamiento/cita/editar/:appointmentId"
              element={<EditAppointment />}
            />

            <Route
              path="/odontologos"
              element={
                isLoggedIn ? (
                  <Odontologos
                    odontologos={odontologos}
                    odontologo={odontologo}
                    fetchOdontologos={fetchOdontologos}
                    fetchOdontologoById={fetchOdontologoById}
                    createOdontologo={createOdontologo}
                    updateOdontologo={updateOdontologo}
                    setOdontologo={setOdontologo}
                  />
                ) : (
                  <Home />
                )
              }
            />
            <Route
              path="/odontologos/editar/:odontologoId"
              element={<EditOdontologo />}
            />
            <Route path="/agendamiento/cita" element={<Appointment />} />

            <Route
              path="/presupuestos"
              element={
                isLoggedIn ? (
                  <BudgetList
                    budgets={budgets}
                    fetchBudgets={fetchBudgets}
                    loading={loading}
                    error={error}
                  />
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="/presupuestos/nuevo"
              element={
                isLoggedIn ? (
                  <BudgetForm
                    createBudget={createBudget}
                    calculateTotals={calculateTotals}
                    fetchPatientByCedula={fetchPatientByCedula}
                    fetchPatientByName={fetchPatientByName}
                    treatmentPlan={location?.state?.treatmentPlan}
                    mode="create"
                  />
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            {/* Nueva ruta para gestión de presupuesto */}
            <Route
              path="/presupuestos/:id/*"
              element={
                isLoggedIn ? (
                  <BudgetManagement
                    budget={currentBudget}
                    fetchBudgetById={fetchBudgetById}
                    updateBudgetStatus={updateBudgetStatus}
                    paymentSummary={paymentSummary}
                    fetchPaymentSummary={fetchPaymentSummary}
                    registerPayment={registerPayment}
                    cancelPayment={cancelPayment}
                    formatters={formatters}
                    helpers={helpers}
                  />
                ) : (
                  <Navigate to="/" />
                )
              }
            >
              {/* Sub-rutas para BudgetManagement */}
              <Route index element={<Navigate to="detalles" />} />
              <Route path="detalles" element={<BudgetDetails />} />
              <Route path="pagos" element={<PaymentDetails />} />
            </Route>

            <Route
              path="/presupuestos/editar/:id"
              element={
                isLoggedIn ? (
                  <BudgetForm
                    createBudget={createBudget}
                    updateBudget={updateBudget}
                    fetchBudgetById={fetchBudgetById}
                    fetchPatientByCedula={fetchPatientByCedula}
                    calculateTotals={calculateTotals}
                    mode="edit"
                  />
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            {/* Vista de presupuestos por paciente */}
            <Route
              path="/patients/:patientId/presupuestos"
              element={
                isLoggedIn ? (
                  <BudgetList
                    budgets={budgets}
                    fetchBudgets={fetchBudgets}
                    fetchBudgetsByPatient={fetchBudgetsByPatient}
                    loading={loading}
                    error={error}
                    isPatientView={true}
                  />
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="/reportes-financieros"
              element={
                isLoggedIn ? (
                  <FinancialReports
                    loading={reportsLoading}
                    error={reportsError}
                    getReporteMensual={getReporteMensual}
                    getReporteAnual={getReporteAnual}
                    getReportePorRango={getReportePorRango}
                  />
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route path="/planificacion" element={<PlanningMenu />} />

            <Route
              path="/planificacion/pacientes"
              element={<PlanningPatientList />}
            />
            <Route path="/planificacion" element={<PlanningMenu />} />
            <Route
              path="/planificacion/nueva"
              element={
                isLoggedIn ? (
                  <CreatePlanningForm
                    onSubmit={createPatientTreatment}
                    fetchPatientByCedula={fetchPatientByCedula}
                    fetchPatientByName={fetchPatientByName}
                    treatmentPlan={null}
                  />
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="/planificacion/lista"
              element={isLoggedIn ? <PlanningList /> : <Navigate to="/" />}
            />

            <Route
              path="/planificacion/editar/:id"
              element={
                isLoggedIn ? (
                  <CreatePlanningForm
                    mode="edit"
                    onSubmit={updatePatientTreatment}
                    fetchPatientByCedula={fetchPatientByCedula}
                    fetchPatientByName={fetchPatientByName}
                  />
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="/treatment-plans/:patientId"
              element={
                <TreatmentPlans
                  patientTreatments={patientTreatments}
                  getPatientTreatmentsByPatientId={
                    getPatientTreatmentsByPatientId
                  }
                  createPatientTreatment={createPatientTreatment}
                  updatePatientTreatment={updatePatientTreatment}
                />
              }
            />
            <Route
              path="/planificacion/consolidado"
              element={<AllTreatmentPlans />}
            />

            <Route
              path="/register"
              element={isLoggedIn ? <Navigate to="/" /> : <RegistrationForm />}
            />
            <Route
              path="/edit-user"
              element={isLoggedIn ? <EditUser user={user} /> : <Home />}
            />
            <Route
              path="/main-menu"
              element={
                isLoggedIn ? <Welcome user={user} logout={logout} /> : <Home />
              }
            />
            <Route path="/" element={<Home user={user} logout={logout} />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
