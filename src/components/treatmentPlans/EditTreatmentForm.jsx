import React from "react";
import { TableRow, TableCell, TextField, TextareaAutosize } from "@mui/material";

const EditTreatmentForm = ({
  treatmentData,
}) => {
  return (
    <TableRow>
      <TableCell>
        <TextField
          name="cita"
          value={treatmentData.cita}
          variant="outlined"
          size="small"
          fullWidth
          InputProps={{
            readOnly: true, // Bloquea el campo para que no se pueda editar
          }}
        />
      </TableCell>
      <TableCell>
        <TextareaAutosize
          name="actividadPlanTrat"
          value={treatmentData.actividadPlanTrat}
          readOnly // Bloquea el campo para que no se pueda editar
          minRows={3}
          fullWidth
          style={{ 
            width: "100%", 
            padding: "4px", 
            fontSize: "14px", 
            fontFamily: "Roboto",
            borderRadius: "4px",
          }}
        />
      </TableCell>
      <TableCell>
        <TextField
          name="fechaPlanTrat"
          value={treatmentData.fechaPlanTrat}
          variant="outlined"
          size="small"
          type="date"
          fullWidth
          InputProps={{
            readOnly: true, // Bloquea el campo para que no se pueda editar
          }}
        />
      </TableCell>
      <TableCell>
        <TextField
          name="montoAbono"
          value={treatmentData.montoAbono}
          variant="outlined"
          size="small"
          type="number"
          fullWidth
          InputProps={{
            readOnly: true, // Bloquea el campo para que no se pueda editar
          }}
        />
      </TableCell>
    </TableRow>
  );
};

export default EditTreatmentForm;
