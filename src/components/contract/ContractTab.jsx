import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  CircularProgress
} from '@mui/material';
import { 
  CloudUpload,
  Edit as EditIcon,
  Margin,
  Visibility as ViewIcon 
} from '@mui/icons-material';
import { useContracts } from '../../hooks/useContracts';
import { toast } from 'react-toastify';

const ContractTab = ({ treatmentPlan }) => {
  const [contract, setContract] = useState(null);
  const { loading, uploadContract, getContractByTreatment, updateContract } = useContracts();

  useEffect(() => {
    if (treatmentPlan?._id) {
      loadContract();
    }
  }, [treatmentPlan]);

  const loadContract = async () => {
    const data = await getContractByTreatment(treatmentPlan._id);
    setContract(data);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    toast.success("Archivo seleccionado:", file);
    if (file) {
      if (contract) {
        // Actualizar contrato existente
        const result = await updateContract(treatmentPlan._id, file);
        if (result.success) {
          toast.success('Contrato actualizado exitosamente');
          loadContract();
        }
      } else {
        // Crear nuevo contrato
        const result = await uploadContract(treatmentPlan._id, file);
        if (result.success) {
          toast.success('Contrato cargado exitosamente');
          loadContract();
        }
      }
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h5">
              {contract ? <b>Contrato de Planificación</b>:<b>Cargar Contrato</b>}
            </Typography>
            
            <input
              type="file"
              accept=".pdf"
              style={{ display: 'none' }}
              id="contract-file"
              onChange={handleFileUpload}
            />
            
            <Box display="flex" gap={2}>
              {contract && (
                <Button
                  variant="outlined"
                  startIcon={<ViewIcon />}
                  onClick={() => window.open(contract.contractFileUrl, "_blank")}
                >
                  Ver Contrato
                </Button>
              )}
              
              <label htmlFor="contract-file">
                <Button
                  variant="contained"
                  component="span"
                  startIcon={contract ? <EditIcon /> : <CloudUpload />}
                >
                  {contract ? 'Actualizar Contrato' : 'Cargar Contrato'}
                </Button>
              </label>
            </Box>
          </Box>

          {contract && (
            <Typography variant="body2" color="text.secondary">
              Última actualización: {new Date(contract.updatedAt).toLocaleString()}
            </Typography>
          )}
        </Box>
        
      )}

      <Box component={Paper} style ={{fontFamily: 'Century Gothic', padding:'20px', marginTop:'20px'}}>
      <br/>
        
      <br/>
        <b>El primer abono corresponde al 30 % del abono protésico, los otros abonos se manejarán en el trascurso del tratamiento.</b>
        <br/><br/>
        <li>
          El turno de las semanas estipuladas se coordinará en conjunto, con anticipación
        </li>
        <li>
          Es importante respetar los tiempos biológicos de cicatrización de los tejidos blandos y duros (hueso) para lograr un tratamiento exitoso.
        </li>

        <li>
          En la etapa definitiva puede haber variaciones de los tiempos laboratoriales al momento de la conformación de la prótesis definitiva.
        </li>
        <li>
          El tratamiento rehabilitador integral cuenta con varias fases, las cuales se recomienda seguir de manera Multidisciplinaria con los especialistas en cada área en este caso: Rehabilitación y endodoncia.
        </li>
        <li>
          El tiempo de tratamiento dependerá, de la coordinación de horarios y citas periódicas de una a dos veces por semana, tiempo estimado del tratamiento 2 meses y medio a tres.
        </li>
        <li>
          Cualquier duda estaré gustoso en contestar.
        </li>
        <br/> <br/>
        Yo  ......................................... , declaro haber sido comunicado de las alternativa (s) para mi caso clínico (o de mi menor hijo) y haber seleccionado la alternativa, " ................................. " o el tratamiento en el caso de que solo exista una alternativa, así mismo haber aceptado el presupuesto, teniendo pleno conocimiento que este puede variar por razones de orden clínico o en cuyo caso asumo las diferencias presupuestales que así fueran planteadas en su debida oportunidad.
        <br/>
        <br/>
     
        * No se instalará ningún trabajo definitivo si este falta cancelar 
        <br/><br/>
        <br/>
        <br/>
     
        Cotacachi, ................................. del 2024 
        <br/><br/>
        <br/>

        Firma del Paciente: ..............................................
        <br/>
        Cédula del Paciente: .............................................
        <br/>
        <br/>
        <br/>
        <br/>
        <b>Dr. Pedro Padilla Proaño</b>
        <br/>
        <b>Rehabilitación Oral de Alta Complejidad</b>
        <br/>
        <b>Teléfono celular: 0997916711</b>
        <br/>
      </Box>


    </Paper>
  );
};

export default ContractTab;