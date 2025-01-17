import React, { useEffect, useState } from 'react';
import {
  Button,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  TextField,
  Box,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  ArrowBack as ArrowBackIcon,
  EventNote as EventNoteIcon
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import budgetService from '../../services/budgetService';

const BudgetList = ({ budgets, loading, error, fetchBudgets, fetchBudgetsByPatient, isPatientView = false }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('cedula');
  const [filteredBudgets, setFilteredBudgets] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [budgetToDelete, setBudgetToDelete] = useState(null);

  useEffect(() => {
    const loadBudgets = async () => {
      try {
        if (isPatientView) {
          // Si estamos en la vista de paciente, extraemos el ID de la URL
          const pathParts = window.location.pathname.split('/');
          const patientId = pathParts[2]; // la ruta es /patients/:patientId/presupuestos
          if (patientId) {
            console.log('Cargando presupuestos para paciente:', patientId);
            await fetchBudgetsByPatient(patientId);
          }
        } else {
          await fetchBudgets();
        }
      } catch (error) {
        console.error('Error al cargar presupuestos:', error);
        toast.error('Error al cargar los presupuestos');
      }
    };
    loadBudgets();
  }, [fetchBudgets, fetchBudgetsByPatient, isPatientView]);

  useEffect(() => {
    if (budgets) {
      setFilteredBudgets(budgets);
    }
  }, [budgets]);

  /*
  const handleSearch = async () => {
    try {
      if (!searchQuery.trim()) {
        await fetchBudgets();
        return;
      }

      let filtered;
      if (searchType === 'cedula') {
        filtered = budgets.filter(budget => 
          budget.paciente.numeroCedula.toLowerCase().includes(searchQuery.toLowerCase())
        );
      } else {
        filtered = budgets.filter(budget =>
          budget.paciente.nombrePaciente.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setFilteredBudgets(filtered);

      if (filtered.length === 0) {
        toast.info('No se encontraron presupuestos');
      }
    } catch (error) {
      toast.error('Error al buscar presupuestos');
    }
  };

  */
  const handleSearch = async () => {
    try {
      if (!searchQuery.trim()) {
        await fetchBudgets();
        return;
      }
  
      let filtered;
      if (searchType === 'cedula') {
        filtered = budgets.filter(budget => 
          budget.paciente?.numeroCedula?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      } else {
        filtered = budgets.filter(budget =>
          budget.paciente?.nombrePaciente?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
  
      setFilteredBudgets(filtered);
  
      if (filtered.length === 0) {
        toast.info('No se encontraron presupuestos');
      }
    } catch (error) {
      toast.error('Error al buscar presupuestos');
    }
  };

  const handleReset = () => {
    setSearchQuery('');
    setSearchType('cedula');
    fetchBudgets();
  };

  const handleDeleteClick = (budget) => {
    setBudgetToDelete(budget);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (!budgetToDelete) return;
      await budgetService.deleteBudget(budgetToDelete._id);
      toast.success('Presupuesto eliminado exitosamente');
      setDeleteDialogOpen(false);
      setBudgetToDelete(null);
      fetchBudgets();
    } catch (error) {
      toast.error('Error al eliminar el presupuesto');
    }
  };

  if (loading) {
    return <Typography align="center">Cargando...</Typography>;
  }

  if (error) {
    return <Typography color="error" align="center">{error}</Typography>;
  }

  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div style={{ backgroundColor: '#f5f1ef', minHeight: '100vh', padding: '20px' }}>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(isPatientView ? "/planificacion" : "/planificacion")}
        sx={{ mb: 2 }}
      >
        Atrás
      </Button>
        
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                  <Typography
                    variant="h4"
                    gutterBottom
                    align="center"
                    sx={{ pt: 2, pb: 1 }}
                  >
                    Presupuestos
                  </Typography>
                  
                </Grid>
                {!isPatientView && (
                  <>
                    <Grid item xs={12} sm={3}>
                      <FormControl fullWidth>
                        <InputLabel>Buscar por</InputLabel>
                        <Select
                          value={searchType}
                          onChange={(e) => setSearchType(e.target.value)}
                          label="Buscar por"
                        >
                          <MenuItem value="cedula">Cédula</MenuItem>
                          <MenuItem value="nombre">Nombre</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label={searchType === 'cedula' ? 'Ingrese cédula' : 'Ingrese nombre'}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={handleSearch}
                      >
                        Buscar
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Button
                        fullWidth
                        variant="outlined"
                        onClick={handleReset}
                      >
                        Restablecer
                      </Button>
                    </Grid>
                  </>
                )}
              </Grid>

              <Grid container spacing={2} sx={{marginTop:2}}>
                <Grid item xs={12} sm={3}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/planificacion/nueva')}
                  >
                    Nueva Planificación
                  </Button>
                </Grid>            
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><Typography variant="h6">Fecha</Typography></TableCell>
                    <TableCell><Typography variant="h6">Paciente</Typography></TableCell>
                    <TableCell><Typography variant="h6">Cédula</Typography></TableCell>
                    <TableCell><Typography variant="h6">Especialidad</Typography></TableCell>
                    <TableCell><Typography variant="h6">Planificación</Typography></TableCell>
                    <TableCell align="right"><Typography variant="h6">Total</Typography></TableCell>
                    <TableCell align="center"><Typography variant="h6">Acciones</Typography></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredBudgets.map((budget) => (
                    <TableRow key={budget._id}>
                      <TableCell>{formatDate(budget.fecha)}</TableCell>
                      <TableCell>
                        {budget.paciente ? budget.paciente.nombrePaciente : 'No disponible'}
                      </TableCell>
                      <TableCell>
                        {budget.paciente ? budget.paciente.numeroCedula : 'No disponible'}
                      </TableCell>
                      <TableCell>{budget.especialidad || 'No definida'}</TableCell>
                      <TableCell>
                        {budget.treatmentPlan ? (
                          <Box>
                            <Typography variant="body2">
                              {budget.treatmentPlan.actividades?.length || 0} actividades
                            </Typography>
                            
                          </Box>
                        ) : (
                          'Sin planificación'
                        )}
                      </TableCell>
                      <TableCell align="right">{formatCurrency(budget.totalGeneral || 0)}</TableCell>
                      <TableCell align="center">
                        <IconButton onClick={() => navigate(`/presupuestos/${budget._id}`)}>
                          <ViewIcon />
                        </IconButton>
                        
                        <IconButton
                          onClick={() => navigate(`/presupuestos/editar/${budget._id}`)}
                          title="Editar"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteClick(budget)}
                          title="Eliminar"
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>

        {/* Diálogo de confirmación para eliminar */}
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
        >
          <DialogTitle>Confirmar Eliminación</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ¿Está seguro que desea eliminar el presupuesto del paciente{' '}
              {budgetToDelete?.paciente.nombrePaciente}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleDeleteConfirm} color="error" autoFocus>
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default BudgetList;