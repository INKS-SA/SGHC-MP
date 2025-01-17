import React from 'react';
import { Button, Tooltip } from '@mui/material';
import { FileDownload as FileDownloadIcon } from '@mui/icons-material';
import { utils as XLSXUtils, writeFile as writeXLSXFile } from 'xlsx';

const ExportReportButton = ({ reportData, selectedMonth, selectedYear, months }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-EC', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatMethodName = (method) => {
    const methods = {
      'efectivo': 'Efectivo',
      'transferencia': 'Transferencia',
      'tarjeta': 'Tarjeta',
      'cheque': 'Cheque'
    };
    return methods[method] || method;
  };

  const exportToExcel = () => {
    if (!reportData?.reporte) return;

    // Crear hoja de resumen
    const resumenData = reportData.reporte.map(item => ({
      'Método de Pago': formatMethodName(item._id),
      'Cantidad de Transacciones': item.cantidadTransacciones,
      'Total': `$${item.totalMonto.toFixed(2)}`
    }));

    // Crear hoja de detalles
    const detallesData = reportData.reporte.flatMap(metodo => 
      metodo.transacciones.map(trans => ({
        'Método de Pago': formatMethodName(metodo._id),
        'Fecha': formatDate(trans.fecha),
        'Paciente': trans.paciente.nombrePaciente,
        'Cédula': trans.paciente.numeroCedula,
        'Concepto': trans.conceptoPago,
        'Monto': `$${trans.monto.toFixed(2)}`
      }))
    );

    // Crear workbook con múltiples hojas
    const wb = XLSXUtils.book_new();

    // Agregar hoja de resumen
    const wsResumen = XLSXUtils.json_to_sheet(resumenData);
    XLSXUtils.book_append_sheet(wb, wsResumen, "Resumen");

    // Agregar hoja de detalles
    const wsDetalles = XLSXUtils.json_to_sheet(detallesData);
    XLSXUtils.book_append_sheet(wb, wsDetalles, "Detalles");

    // Obtener nombre del mes
    const monthName = months.find(m => m.value === selectedMonth)?.label || '';
    
    // Generar archivo
    writeXLSXFile(wb, `Reporte_Financiero_${monthName}_${selectedYear}.xlsx`);
  };

  return (
    <Tooltip title="Exportar reporte a Excel">
      <Button
        fullWidth
        variant="contained"
        startIcon={<FileDownloadIcon />}
        onClick={exportToExcel}
        disabled={!reportData?.reporte}
        sx={{ 
          height: '56px',
          backgroundColor: '#8ba082',
          '&:hover': {
            backgroundColor: '#5d6c56',
          }
        }}
      >
        Exportar a Excel
      </Button>
    </Tooltip>
  );
};

export default ExportReportButton;