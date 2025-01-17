// PrintBudgetReport.jsx
import React from 'react';
import { Button } from '@mui/material';
import { Print as PrintIcon } from '@mui/icons-material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import paymentService from '../../services/paymentService';
import { toast } from 'react-toastify';

const PrintBudgetReport = ({ budget, treatmentDetails, paymentSummary, fetchPaymentSummary }) => {
  const generatePDF = async () => {
    try {
      let paymentData = null;
      if (budget?._id) {
        console.log('Obteniendo datos de pago para presupuesto:', budget._id);
        const response = await paymentService.getBudgetPaymentsSummary(budget._id);
        console.log('Respuesta del servicio:', response);
        
        if (response) {
          paymentData = response;
        } else {
          console.log('No se encontraron datos de pago');
        }
      }

      const pdf = new jsPDF('p', 'mm', 'a4');
      let yOffset = 20;

      // Encabezado
      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'bold'); 
      pdf.text('Reporte de Tratamiento Dental', pdf.internal.pageSize.width/2, 10, { align: 'center' });
      pdf.setFont('helvetica', 'normal'); 

      // Datos del paciente
      if (budget?.paciente) {
        pdf.setFontSize(12);
        pdf.text(`Paciente: ${budget.paciente.nombrePaciente}`, 20, yOffset);
      }

      if (treatmentDetails) {
        pdf.text(`Especialidad: ${treatmentDetails.especialidad || ''}`, 20, yOffset + 5);
        
        // Tabla de Planificación
        yOffset += 15;
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold'); 
        pdf.text(`Planificación de Tratamiento`, 20, yOffset);
        pdf.setFont('helvetica', 'normal'); 

        if (treatmentDetails.actividades?.length > 0) {
          const planningHeaders = [['Cita', 'Descripción', 'Fecha', 'Estado']];
          const planningData = treatmentDetails.actividades.map(act => [
            `Cita ${act.cita}`,
            act.actividadPlanTrat,
            new Date(act.fechaPlanTrat).toLocaleDateString(),
            act.estado
          ]);

          pdf.autoTable({
            startY: yOffset + 5,
            head: planningHeaders,
            body: planningData,
            theme: 'grid',
            headStyles: { fillColor: [139, 160, 130] },
            styles: { fontSize: 10 }
          });
        }
      }

      // Presupuesto
      if (budget?.fases?.length > 0) {
        yOffset = pdf.lastAutoTable?.finalY + 15 || yOffset + 15;
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold'); 
        pdf.text(`Presupuesto`, 20, yOffset);
        pdf.setFont('helvetica', 'normal'); 

        budget.fases.forEach((fase, index) => {
          pdf.setFontSize(12);
          pdf.text(`Fase ${index + 1}: ${fase.nombre}`, 20, yOffset + 5);

          if (fase.procedimientos?.length > 0) {
            const budgetHeaders = [['Procedimiento', 'N° Piezas', 'Costo Unitario', 'Total']];
            const budgetData = fase.procedimientos.map(proc => [
              proc.nombre,
              proc.numeroPiezas,
              `$${proc.costoPorUnidad}`,
              `$${proc.costoTotal}`
            ]);

            pdf.autoTable({
              startY: yOffset + 10,
              head: budgetHeaders,
              body: budgetData,
              theme: 'striped',
              headStyles: { fillColor: [139, 160, 130] },
              styles: { fontSize: 10 }
            });

            yOffset = pdf.lastAutoTable.finalY + 5;
          }
        });
      }

      // Pagos
      if (paymentData && paymentData.fases && paymentData.fases.length > 0) {
        yOffset = pdf.lastAutoTable?.finalY + 15 || yOffset + 15;
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold'); 
        pdf.text(`Detalle de Pagos`, 20, yOffset);
        pdf.setFont('helvetica', 'normal'); 

        paymentData.fases.forEach((fase, index) => {
          yOffset += 10;
          pdf.setFontSize(12);
          pdf.text(`Fase: ${fase.nombreFase}`, 20, yOffset);
      
          if (fase.pagos && fase.pagos.length > 0) {
            const pagosHeaders = [['Fecha', 'Descripción', 'Método', 'Monto']];
            const pagosData = fase.pagos
              .filter(pago => !pago.anulado)
              .map(pago => [
                new Date(pago.fecha).toLocaleDateString(),
                pago.descripcion,
                pago.metodoPago,
                `$${pago.monto}`
              ]);
      
            pdf.autoTable({
              startY: yOffset + 5,
              head: pagosHeaders,
              body: pagosData,
              theme: 'grid',
              headStyles: { fillColor: [139, 160, 130] },
              styles: { fontSize: 10 },
              columnStyles: {
                3: { halign: 'right' } // Alinear montos a la derecha
              }
            });
            
      
            // Resumen de la fase
            const resumenFaseHeaders = [['Concepto', 'Monto']];
            const resumenFaseData = [
              ['Total pagado en fase', `$${fase.totalPagado}`],
              ['Saldo pendiente', `$${fase.saldoPendiente}`]
            ];

           // pdf.text(`Resumen de la Fase: ${fase.nombreFase}`, 20, yOffset);

            pdf.autoTable({
              
              startY: pdf.lastAutoTable.finalY + 5,
              head: resumenFaseHeaders,
              body: resumenFaseData,
              theme: 'plain',
              headStyles: { fillColor: [139, 160, 130] },
              styles: { fontSize: 10 },
              columnStyles: {
                1: { halign: 'right' }
              }
            });
          }
      
          yOffset = pdf.lastAutoTable.finalY + 15;
        });
      
        // Resumen General
        if (paymentData.resumenGeneral) {
          //startY: yOffset + 10,
          pdf.setFontSize(16);
          pdf.setFont('helvetica', 'bold'); 
          pdf.text(`Resumen General`, 20, yOffset);
          pdf.setFont('helvetica', 'normal'); 
          const resumenGeneralHeaders = [['Concepto', 'Monto']];
          const resumenGeneralData = [
            ['Total Presupuestado', `$${paymentData.resumenGeneral.totalPresupuesto}`],
            ['Total Pagado', `$${paymentData.resumenGeneral.totalPagado}`],
            ['Saldo Pendiente', `$${paymentData.resumenGeneral.saldoPendiente}`]
          ];
      
          pdf.autoTable({
            startY: yOffset + 10,
            head: resumenGeneralHeaders,
            body: resumenGeneralData,
            theme: 'grid',
            headStyles: { fillColor: [139, 160, 130] },
            styles: { fontSize: 10, cellPadding: 3 },
            columnStyles: {
              1: { halign: 'right' }
            }
          });
        }
      
      } else {
        yOffset += 15;
        pdf.setFontSize(12);
        pdf.text('No hay registros de pagos disponibles', 20, yOffset);
      }

      pdf.save(`Reporte-${budget.paciente.nombrePaciente}.pdf`);
    } catch (error) {
      console.error('Error completo:', error);
      toast.error('Error al generar el PDF');
    }
  };

        

  return (
    <Button
      variant="contained"
      onClick={generatePDF}
      startIcon={<PrintIcon />}
    >
      Imprimir Reporte
    </Button>
  );
};

export default PrintBudgetReport;