import React from "react";
import { Typography, Box, Paper, Grid } from "@mui/material";

const TreatmentPlansSummary = ({ patientTreatments }) => {
  const calcularTotalAbonos = (treatment) => {
    return treatment.actividades.reduce((sum, act) => 
      sum + (Number(act.montoAbono) || 0), 0
    );
  };

  const resumenPorEspecialidad = patientTreatments.reduce((acc, treatment) => {
    if (!acc[treatment.especialidad]) {
      acc[treatment.especialidad] = {
        totalAbonos: 0,
        cantidadActividades: 0,
        actividadesCompletadas: 0,
        presupuestoTotal: 0,
        presupuestosPagados: 0,
        cantidadPlanificaciones: 0
      };
    }

    const resumen = acc[treatment.especialidad];
    resumen.totalAbonos += calcularTotalAbonos(treatment);
    resumen.cantidadActividades += treatment.actividades.length;
    resumen.actividadesCompletadas += treatment.actividades.filter(act => 
      act.estado === 'completado'
    ).length;
    resumen.presupuestoTotal += treatment.budget?.totalGeneral || 0;
    resumen.presupuestosPagados += treatment.budget?.totalPagado || 0;
    resumen.cantidadPlanificaciones += 1;

    return acc;
  }, {});

  return (
    <Paper sx={{ mt: 3, p: 2, bgcolor: 'grey.50' }}>
      <Typography variant="h6" align="center" gutterBottom>
        Resumen de Planificaciones
      </Typography>

      {Object.entries(resumenPorEspecialidad).map(([especialidad, datos]) => (
        <Box key={especialidad} sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            {especialidad}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Typography>
                Planificaciones: {datos.cantidadPlanificaciones}
              </Typography>
              <Typography>
                Total Actividades: {datos.cantidadActividades}
              </Typography>
              <Typography>
                Completadas: {datos.actividadesCompletadas}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography>
                Total Abonos: ${datos.totalAbonos.toFixed(2)}
              </Typography>
              <Typography>
                Presupuestado: ${datos.presupuestoTotal.toFixed(2)}
              </Typography>
              <Typography>
                Pagado: ${datos.presupuestosPagados.toFixed(2)}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography>
                % Actividades Completadas: {
                  ((datos.actividadesCompletadas / datos.cantidadActividades) * 100).toFixed(1)
                }%
              </Typography>
              <Typography>
                % Presupuesto Pagado: {
                  datos.presupuestoTotal > 0 
                    ? ((datos.presupuestosPagados / datos.presupuestoTotal) * 100).toFixed(1)
                    : 0
                }%
              </Typography>
            </Grid>
          </Grid>
        </Box>
      ))}

      <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #ddd' }}>
        <Typography variant="h6" align="center">
          Totales Generales
        </Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={4}>
            <Typography>
              Total Planificaciones: {
                Object.values(resumenPorEspecialidad).reduce((sum, datos) => 
                  sum + datos.cantidadPlanificaciones, 0
                )
              }
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography>
              Total Presupuestado: ${
                Object.values(resumenPorEspecialidad).reduce((sum, datos) => 
                  sum + datos.presupuestoTotal, 0
                ).toFixed(2)
              }
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography>
              Total Pagado: ${
                Object.values(resumenPorEspecialidad).reduce((sum, datos) => 
                  sum + datos.presupuestosPagados, 0
                ).toFixed(2)
              }
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default TreatmentPlansSummary;