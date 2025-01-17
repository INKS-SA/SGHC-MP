import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import patientsService from '../../services/patients';
import medicalRecordsService from '../../services/medicalRecordsService';
import treatmentPlansService from '../../services/patientTreatmentService';
import evolutionChartService from '../../services/evolutionChartService';
import cirugiaPatologiaService from '../../services/cirugiaPatologiaService';
import endodonticTreatmentService from '../../services/endodonticTreatmentService';
import ortodonciaService from '../../services/ortodonciaService';
import evolucionOrtodonciaService from '../../services/evolucionOrtodonciaService';
import rehabilitacionOralService from '../../services/rehabilitacionOralService';
import disfuncionMandibularService from '../../services/disfuncionMandibularService';
import periodonticTreatmentService from '../../services/periodonticTreatmentService';
import budgetService from '../../services/budgetService';

export const generatePDF = async (patientId) => {

    const formatDate = (date) => {
        if (!date) return 'N/A';
        const d = new Date(date);
        
        // Si la fecha es inválida
        if (isNaN(d.getTime())) return 'Fecha inválida';
        
        // Obtener día, mes y año
        const dia = d.getDate().toString().padStart(2, '0');
        const mes = (d.getMonth() + 1).toString().padStart(2, '0');
        const año = d.getFullYear();
        
        return `${dia}/${mes}/${año}`;
      };

      

    try {
        // Obtener detalles del paciente
        let patient = await patientsService.getPatientById(patientId);

        // Obtener registros médicos del paciente
        let medicalRecord = null;
        try {
            medicalRecord = await medicalRecordsService.getMedicalRecordsByPatientId(patientId);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.warn("Medical record not found for patient ID:", patientId);
            } else {
                console.error("Error fetching medical record:", error);
                throw error;  // Rethrow if it's a different error
            }
        }

        // Obtener planes de tratamiento del paciente
        let treatmentPlans = [];
try {
    // Primero obtenemos los planes
    const plans = await treatmentPlansService.getByPatientId(patientId);
    
    // Luego obtenemos los presupuestos para cada plan
    treatmentPlans = await Promise.all(plans.map(async (plan) => {
        try {
            const budget = await budgetService.getBudgetByTreatment(plan._id);
            return {
                ...plan,
                budget: budget || null
            };
        } catch (error) {
            console.warn(`No budget found for plan ${plan._id}`);
            return {
                ...plan,
                budget: null
            };
        }
    }));

    console.log('Plans with budgets:', treatmentPlans);
} catch (error) {
    if (error.response && error.response.status === 404) {
        console.warn("Treatment plans not found for patient ID:", patientId);
    } else {
        console.error("Error fetching treatment plans:", error);
        throw error;
    }
}

        

        // Obtener planes de tratamiento del paciente
        let evolutionCharts = [];
        try {
            evolutionCharts = await evolutionChartService.getEvolutionChartsByPatientId(patientId);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.warn("Treatment plans not found for patient ID:", patientId);
            } else {
                console.error("Error fetching treatment plans:", error);
                throw error;  // Rethrow if it's a different error
            }
        }

        // Obtener registros médicos del paciente
        let cirugiaPatologia = null;
        try {
            cirugiaPatologia = await cirugiaPatologiaService.getCirugiaPatologiaByPatientId(patientId);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.warn("Cirugia Patologia not found for patient ID:", patientId);
            } else {
                console.error("Error fetching Cirugia Patologia:", error);
                throw error;  // Rethrow if it's a different error
            }
        }

        // Obtener planes de tratamiento del paciente
        let endodonticTreatments = [];
        try {
            endodonticTreatments = await endodonticTreatmentService.getEndodonticTreatmentsByPatientId(patientId);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.warn("endodonticTreatments not found for patient ID:", patientId);
            } else {
                console.error("Error fetching endodonticTreatments:", error);
                throw error;  // Rethrow if it's a different error
            }
        }

       // Obtener ortodoncia del paciente
        let ortodoncia = null;
        try {
            ortodoncia = await ortodonciaService.getOrtodonciasByPatientId(patientId);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.warn("Ortodoncia not found for patient ID:", patientId);
            } else {
                console.error("Error fetching ortodoncia:", error);
                throw error;  // Rethrow if it's a different error
            }
        }

        // Obtener planes de tratamiento del paciente solo si existe la ortodoncia
        let evolucionesOrtodoncia = [];
        if (ortodoncia) {
            try {
                evolucionesOrtodoncia = await evolucionOrtodonciaService.getByOrtodonciaId(ortodoncia._id);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    console.warn("Evoluciones de ortodoncia not found for ortodoncia ID:", ortodoncia._id);
                } else {
                    console.error("Error fetching evoluciones de ortodoncia:", error);
                    throw error;  // Rethrow if it's a different error
                }
            }
        }

        // Obtener ortodoncia del paciente
        let rehabilitacionOral = null;
        try {
            rehabilitacionOral = await rehabilitacionOralService.getRehabilitacionOralByPatientId(patientId);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.warn("rehabilitacionOral not found for patient ID:", patientId);
            } else {
                console.error("Error fetching rehabilitacionOral:", error);
                throw error;  // Rethrow if it's a different error
            }
        }

        // Obtener ortodoncia del paciente
        let disfuncionMandibular = null;
        try {
            disfuncionMandibular = await disfuncionMandibularService.getDisfuncionMandibularByPatientId(patientId);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.warn("rehabilitacionOral not found for patient ID:", patientId);
            } else {
                console.error("Error fetching rehabilitacionOral:", error);
                throw error;  // Rethrow if it's a different error
            }
        }

        // Obtener ortodoncia del paciente
        let periodoncia = null;
        try {
            periodoncia = await periodonticTreatmentService.getPeriodonticTreatmentsByPatientId(patientId);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.warn("periodoncia not found for patient ID:", patientId);
            } else {
                console.error("Error fetching periodoncia:", error);
                throw error;  // Rethrow if it's a different error
            }
        }

        // Crear un nuevo documento PDF
        const doc = new jsPDF();
        let yPos = 20;  // Posición inicial en la página

        // Función para agregar texto y manejar salto de página si es necesario
        const addText = (text, yOffset, centered = false) => {
            const pageWidth = doc.internal.pageSize.getWidth();
            const margin = 10;
            const maxLineWidth = pageWidth - margin * 2;

            //if (!text) return yPos;
            
            // Dividir el texto en líneas que se ajusten al ancho de la página
            const lines = doc.splitTextToSize(text, maxLineWidth);
        
            lines.forEach(line => {
                if (yPos + yOffset > 280) {  // Ajustar este valor según el margen que quieras en el borde inferior
                    doc.addPage();
                    yPos = 20;  // Reiniciar posición para nueva página
                }
                
                // Centrar el texto horizontalmente si el parámetro centered es true
                if (centered) {
                    const textWidth = doc.getTextWidth(line);
                    const x = (pageWidth - textWidth) / 2;
                    doc.text(line, x, yPos);
                } else {
                    doc.text(line, margin, yPos);
                }
                yPos += yOffset;
            });
        };

        // Función para agregar texto con formato
        const addFormattedText = (label, content, yOffset) => {
            doc.setFont('helvetica', 'bold');
            addText(label, yOffset - 4);
            doc.setFont('helvetica', 'normal');
            addText(content, yOffset - 2 );
        }

        // Agregar título
        doc.setFontSize(20);
        addText("MP ESPECIALIDADES ODONTOLÓGICAS", 10, true);

        // Agregar detalles del paciente
        doc.setFontSize(17);
        addText("Detalles del Paciente:", 10, true);

        doc.setFontSize(11);
        addFormattedText("Nombre: ", patient.nombrePaciente, 10);
        addFormattedText("Edad: ", patient.edadPaciente, 10);
        addFormattedText("Fecha de Nacimiento: ", new Date(patient.fechaNacimiento).toLocaleDateString(), 10);
        addFormattedText("Correo: ", patient.correoPaciente, 10);
        addFormattedText("Dirección: ", patient.direccionPaciente, 10);
        addFormattedText("Género: ", patient.generoPaciente, 10);
        addFormattedText("Número de Cédula: ", patient.numeroCedula, 10);
        addFormattedText("Ocupación: ", patient.ocupacion, 10);
        addFormattedText("Teléfono: ", patient.telefono, 10);
        addFormattedText("Teléfono de Contacto de Emergencia: ", patient.telContactoEmergencia, 10);
        addFormattedText("Afinidad de Contacto de Emergencia: ", patient.afinidadContactoEmergencia, 10);

        // Agregar historia clinica si existe
        if (medicalRecord) {
            // Agregar detalles del registro médico
            doc.setFontSize(17);
            addText("Registro Médico:", 10, true);
            doc.setFontSize(11);
            addFormattedText("Fecha: ", new Date(medicalRecord.date).toLocaleDateString(), 10);
            addFormattedText("Antecedentes del Problema: ", medicalRecord.description, 10);
            addFormattedText("Motivo de Consulta: ", medicalRecord.motivoConsulta || 'N/A', 10);
            addFormattedText("Expectativa del Paciente: ", medicalRecord.expectativaPaciente || 'N/A', 10);
            addFormattedText("Enfermedad Sistémica: ", medicalRecord.enfermedadSistemica || 'N/A', 10);
            addFormattedText("Enfermedad Preexistente: ", medicalRecord.enfermedadPreexistente || 'N/A', 10);
            addFormattedText("Médico Tratante: ", medicalRecord.medicoTratante || 'N/A', 10);
            addFormattedText("Teléfono del Médico Tratante: ", medicalRecord.telMedicoTratante || 'N/A', 10);
            addFormattedText("Medicamentos que Consume: ", medicalRecord.medicamentosConsume || 'N/A', 10);
            addFormattedText("Alergia a Medicamentos: ", medicalRecord.alergiaMedicamentos || 'N/A', 10);
            addFormattedText("Hábitos Nocivos: ", medicalRecord.habitosNocivos.join(', ') || 'N/A', 10);
            addFormattedText("Enfermedades Respiratorias: ", medicalRecord.enfermedadesRespiratorias || 'N/A', 10);
            addFormattedText("Enfermedades Hormonales: ", medicalRecord.enfermedadesHormonales || 'N/A', 10);
            addFormattedText("Está Gestando: ", medicalRecord.estaGestando ? 'Sí' : 'No', 10);
            addFormattedText("Mes de Gestación: ", medicalRecord.mesGestacion || 'N/A', 10);
            addFormattedText("Es Menor de Edad: ", medicalRecord.esMenorEdad ? 'Sí' : 'No', 10);
            addFormattedText("Nombre del Representante: ", medicalRecord.nombreRepresentante || 'N/A', 10);
            addFormattedText("Teléfono del Representante: ", medicalRecord.telRepresentante || 'N/A', 10);
            addFormattedText("Última Visita al Dentista: ", medicalRecord.ultimaVisitaDentista || 'N/A', 10);
            addFormattedText("Infiltraciones de Anestesia Previas: ", medicalRecord.infiltracionesAnestesiaPrev ? 'Sí' : 'No', 10);
            addFormattedText("Reacciones Adversas a Infiltraciones: ", medicalRecord.reaccionesAdversasInfiltracion ? 'Sí' : 'No', 10);
            addFormattedText("Qué Reacción: ", medicalRecord.queReaccionInfiltracion || 'N/A', 10);
            addFormattedText("Exodoncia/Cirugía Previas: ", medicalRecord.exodonciaCirugiaPrevias ? 'Sí' : 'No', 10);
            addFormattedText("Complicaciones Luego de Cirugías: ", medicalRecord.complicacionesLuegoCirugias ? 'Sí' : 'No', 10);
            addFormattedText("Qué Complicaciones: ", medicalRecord.queComplicacionesCirugias || 'N/A', 10);
            addFormattedText("Presenta Dificultades: ", medicalRecord.presentaDificultades.join(', ') || 'N/A', 10);
            addFormattedText("Otra Dificultad: ", medicalRecord.otraDificultad || 'N/A', 10);
            addFormattedText("Presenta: ", medicalRecord.presenta.join(', ') || 'N/A', 10);
            addFormattedText("Estado de la Lengua: ", medicalRecord.estadoLengua || 'N/A', 10);
            addFormattedText("Estado de los Labios: ", medicalRecord.estadoLabios || 'N/A', 10);
            addFormattedText("Estado de los Carrillos: ", medicalRecord.estadoCarillos || 'N/A', 10);
            addFormattedText("Estado del Piso de Boca: ", medicalRecord.estadoPisoBoca || 'N/A', 10);
            addFormattedText("Estado Gingivo-Periodontal: ", medicalRecord.estadoGingivoPerio || 'N/A', 10);
            addFormattedText("Estado de Enfermedad Periodontal: ", medicalRecord.estadoEnfermedadPerio || 'N/A', 10);
            addFormattedText("Análisis Oclusal Derecho RM: ", medicalRecord.analisisOclusalDerRM || 'N/A', 10);
            addFormattedText("Análisis Oclusal Derecho RC: ", medicalRecord.analisisOclusalDerRC || 'N/A', 10);
            addFormattedText("Análisis Oclusal Izquierdo RM: ", medicalRecord.analisisOclusalIzqRM || 'N/A', 10);
            addFormattedText("Análisis Oclusal Izquierdo RC: ", medicalRecord.analisisOclusalIzqRC || 'N/A', 10);
            addFormattedText("Condición Esqueletal: ", medicalRecord.condicionEsqueletal || 'N/A', 10);
            addFormattedText("Diagnóstico Oclusal: ", medicalRecord.diagnosticoOclusal || 'N/A', 10);
        }

        // Agregar planes de tratamiento si existen
 
        if (treatmentPlans && treatmentPlans.length > 0) {
            //console.log('Plans found:', treatmentPlans); // Log para debug
            treatmentPlans.forEach((plan, planIndex) => {
                //console.log(`Plan ${planIndex + 1}:`, plan); // Log para debug
                //console.log('Budget:', plan.budget); // Log para debug
                // Título de la planificación
                doc.setFontSize(16);
                addText(`Planificación ${planIndex + 1} - ${plan.especialidad}`, 10, true);
                
                // Presupuesto total si existe
                /*
                if (plan.budget) {
                    doc.setFontSize(12);
                    addText(`Presupuesto Total: $${plan.budget.totalGeneral}`, 10);
                }
                */

                // Sección de actividades planificadas
                doc.setFontSize(14);
                addText("Actividades Planificadas", 10);

                const actividadesData = plan.actividades.map(actividad => [
                    actividad.cita || 'N/A',
                    actividad.actividadPlanTrat || 'N/A',
                    formatDate(actividad.fechaPlanTrat),
                    
                    `$${actividad.montoAbono || 0}`
                ]);

                autoTable(doc, {
                    head: [['Cita', 'Actividad', 'Fecha', 'Abono']],
                    body: actividadesData,
                    startY: yPos,
                    styles: { fontSize: 10 },
                    columnStyles: {
                        0: { cellWidth: 20 },
                        1: { cellWidth: 'auto' },
                        2: { cellWidth: 30 },
                        3: { cellWidth: 30 },
                        4: { cellWidth: 25, halign: 'right' }
                    }
                });

                yPos = doc.lastAutoTable.finalY + 15;

                // Sección de presupuesto
        if (plan.budget && plan.budget.fases) {  // Cambiado de plan.presupuesto a plan.budget
            //console.log('Budget found for plan:', plan.budget); // Log para debug
            
            doc.setFontSize(14);
            addText("Presupuesto", 10);

            plan.budget.fases.forEach((fase, faseIndex) => { 
                //console.log(`Processing fase ${faseIndex}:`, fase); // Log para debug
                
                doc.setFontSize(12);
                addText(fase.nombre, 10);

                const procedimientosData = fase.procedimientos.map(proc => [
                    proc.nombre || 'N/A',
                    proc.numeroPiezas?.toString() || '0',
                    `$${proc.costoPorUnidad || 0}`,
                    `$${proc.costoTotal || 0}`
                ]);

                autoTable(doc, {
                    head: [['Procedimiento', 'N° Piezas', 'Costo Unitario', 'Total']],
                    body: [
                        ...procedimientosData,
                        [{ 
                            content: 'Total Fase:', 
                            colSpan: 3, 
                            styles: { fontStyle: 'bold', halign: 'right' }
                        }, 
                        { 
                            content: `$${fase.total || 0}`,
                            styles: { fontStyle: 'bold', halign: 'right' }
                        }]
                    ],
                    startY: yPos,
                    styles: { fontSize: 10 },
                    columnStyles: {
                        0: { cellWidth: 'auto' },
                        1: { cellWidth: 30, halign: 'right' },
                        2: { cellWidth: 30, halign: 'right' },
                        3: { cellWidth: 30, halign: 'right' }
                    }
                });

                yPos = doc.lastAutoTable.finalY + 10;
            });

            // Total General
            doc.setFontSize(12);
            doc.setFont(undefined, 'bold');
            addText(`Presupuesto Total ${plan.especialidad}: $${plan.budget.totalGeneral}`, 15, true);  
            doc.setFont(undefined, 'normal');
        }

                yPos += 10;  // Espacio entre planes de tratamiento
            });
        }

// Agregar cuadros de evolución si existen
if (evolutionCharts.length > 0) {
    doc.setFontSize(17);
    addText("Cuadro de evolución:", 10, true);

    const tableData = evolutionCharts.map(evolution => [
        formatDate(evolution.fechaCuadEvol),
        evolution.actividadCuadEvol || '',
        evolution.recomendacionCuadEvol || '',
        '', // Espacio para firma del odontólogo
        ''  // Espacio para firma del paciente
    ]);

    autoTable(doc, {
        head: [['Fecha', 'Actividad\nClínica', 'Recomendación', 'Firma\nOd.', 'Firma\nPac.']],
        body: tableData,
        startY: yPos,
        theme: 'grid',
        styles: {
            fontSize: 9,
            cellPadding: 3,
            overflow: 'linebreak',
            lineWidth: 0.1
        },
        columnStyles: {
            0: { cellWidth: 25 },    // Fecha - reducido
            1: { cellWidth: 50 },    // Actividad - aumentado
            2: { cellWidth: 'auto' }, // Recomendación - automático
            3: { cellWidth: 20 },    // Firma Odontólogo - más pequeño
            4: { cellWidth: 20 }     // Firma Paciente - más pequeño
        },
        headStyles: {
            fillColor: [41, 128, 185],
            textColor: 255,
            fontStyle: 'bold',
            halign: 'center',
            valign: 'middle',
            fontSize: 8
        },
        bodyStyles: {
            valign: 'middle',
            halign: 'left'
        },
        didDrawCell: function(data) {
            if (data.section === 'body' && (data.column.index === 3 || data.column.index === 4)) {
                const evolution = evolutionCharts[data.row.index];
                if (evolution) {
                    const url = data.column.index === 3 ? evolution.archivo1Url : evolution.archivo2Url;
                    if (url) {
                        try {
                            // Tamaños más pequeños para las firmas
                            const imgWidth = 15;   // Reducido de 25 a 15
                            const imgHeight = 10;  // Reducido de 15 a 10
                            const xOffset = (data.cell.width - imgWidth) / 2;
                            const yOffset = (data.cell.height - imgHeight) / 2;
                            
                            const img = new Image();
                            img.src = url;
                            doc.addImage(
                                img, 
                                'PNG', 
                                data.cell.x + xOffset,
                                data.cell.y + yOffset,
                                imgWidth,
                                imgHeight
                            );
                        } catch (error) {
                            console.warn('Error al cargar firma:', error);
                        }
                    }
                }
            }
        },
        willDrawCell: function(data) {
            // Altura reducida para las filas
            if (data.section === 'body') {
                data.row.height = Math.max(data.row.height, 15); // Reducido de 20 a 15
            }
        }
    });

    yPos = doc.lastAutoTable.finalY + 10;
}

        // Agregar cirugía patología si existe
        if (cirugiaPatologia) {
            
            //addFormattedText(`Cirugía y Patología Oral ${index + 1}: `, '', 10);
            doc.setFontSize(17);
            addText("Cirugía y Patología Oral", 10, true);
            // Agregar detalles de cada tratamiento de endodoncia
            
            cirugiaPatologia.forEach((cirugiaPatologia, index) => {
            doc.setFontSize(13);
            addFormattedText(`Cirugía y Patología Oral ${index + 1}: `, '', 10);
            doc.setFontSize(11);
            addFormattedText("Antecedentes: ", cirugiaPatologia.antecedentesCirPat, 10);
            addFormattedText("Alergias Médicas: ", cirugiaPatologia.alergiasMedCirPat, 10);
            addFormattedText("Patología de Tejidos Blandos: ", cirugiaPatologia.patologiaTejBland, 10);
            addFormattedText("Patología de Tejidos Duros: ", cirugiaPatologia.patologiaTejDuros, 10);
            addFormattedText("Diagnóstico Radiográfico: ", cirugiaPatologia.diagRadiografico, 10);
            addFormattedText("Localización de la Patología: ", cirugiaPatologia.localizacionPatologia, 10);
            addFormattedText("Archivo RX: ", cirugiaPatologia.archivo1Url, 10);
            addFormattedText("Archivo CS: ", cirugiaPatologia.archivo2Url, 10);
            });
        }

        // Agregar endodoncias si existen
        if (endodonticTreatments) {
            doc.setFontSize(17);
            addText("Tratamientos de Endodoncia", 10, true);
            // Agregar detalles de cada tratamiento de endodoncia
            doc.setFontSize(11);
            endodonticTreatments.forEach((treatment, index) => {
                doc.setFontSize(13);
                addFormattedText(`Tratamiento de Endodoncia ${index + 1}: `, '', 10);
                doc.setFontSize(11);
                addFormattedText("Diente: ", treatment.dienteEnd, 10);
                addFormattedText("Grapa: ", treatment.grapaEnd, 10);
                addFormattedText("Diagnóstico Dental: ", treatment.diagDental, 10);
                addFormattedText("Diagnóstico Pulpar: ", treatment.diagPulpar, 10);
                addFormattedText("Intervención Indicada: ", treatment.intervencionIndicada, 10);
                addFormattedText("Técnica de Obturación: ", treatment.tecnicaObturacion, 10);
                addFormattedText("Número de Conductos: ", treatment.numConductos, 10);
                addFormattedText("Observaciones Anatómicas: ", treatment.obsAnatomicas, 10);
                addFormattedText("Etiología: ", treatment.etiologia.join(', '), 10);
                addFormattedText("Dolor: ", treatment.dolor.join(', '), 10);
                addFormattedText("Pruebas Clínicas: ", treatment.pruebasClinicas.join(', '), 10);
                addFormattedText("Pruebas de Vitalidad: ", treatment.pruebasVitalidad.join(', '), 10);
                addFormattedText("Cámara Pulpar: ", treatment.camaraPulpar.join(', '), 10);
                addFormattedText("Conductos Radiculares: ", treatment.conductosRadiculares.join(', '), 10);
                addFormattedText("Foramen: ", treatment.foramen.join(', '), 10);
                addFormattedText("Ligamento Periodontal: ", treatment.ligamentoPeriodontal.join(', '), 10);
                addFormattedText("Otros Hallazgos: ", treatment.otrosHallazgos, 10);
                addFormattedText("Conductometría Tentativa: ", treatment.conductometriaTentativa, 10);
                addFormattedText("Conductometría Definitiva: ", treatment.conductometriaDefinitiva, 10);
                addFormattedText("Técnica de Instrumentación: ", treatment.tecnicaInstrumentacion, 10);
                addFormattedText("Medicación Intra: ", treatment.medicacionIntra, 10);
                addFormattedText("Archivo RX: ", treatment.archivo1Url, 10);
                addFormattedText("Archivo CS: ", treatment.archivo2Url, 10);
            });
        }
        
        // Agregar ortodoncia si existe
        if (ortodoncia) {
            doc.setFontSize(17);
            addText("Ortodoncia", 10, true);
            // Agregar detalles de cada tratamiento de endodoncia
            doc.setFontSize(11);
            addFormattedText("Diagnóstico: ", ortodoncia.diagnostico, 10);
            addFormattedText("Objetivo: ", ortodoncia.objetivo, 10);
            addFormattedText("Tiempo Aproximado: ", ortodoncia.tiempoAproximado, 10);
            addFormattedText("Tipo de Bracket: ", ortodoncia.tipoBracket, 10);
            addFormattedText("Aparato Ortopédico: ", ortodoncia.aparatoOrtopedico, 10);
            addFormattedText("Observaciones: ", ortodoncia.observaciones, 10);
            addFormattedText("Archivo RX: ", ortodoncia.archivo1Url, 10);
            addFormattedText("Archivo CS: ", ortodoncia.archivo2Url, 10);
            addFormattedText("Archivo C: ", ortodoncia.archivo3Url, 10);
        }

        // Agregar evoluciones de ortodoncia si existen
        if (evolucionesOrtodoncia.length > 0) {
            doc.setFontSize(14);
            addText("Evoluciones Ortodoncia:", 10);
            // Preparar datos para la tabla
            doc.setFontSize(11);
            const tableData = evolucionesOrtodoncia.map(evolucion => [
                new Date(evolucion.fechaEvolucion).toLocaleDateString(),
                evolucion.evolucion,
                evolucion.arcoEvolucion
            ]);

            // Agregar tabla al PDF
            autoTable(doc, {
                head: [['Fecha', 'Evolución', 'Arco']],
                body: tableData,
                startY: yPos
            });
            yPos = doc.lastAutoTable.finalY + 10;  // Ajustar posición después de la tabla
        }

        // Agregar detalles de rehabilitación oral si existe
        if (rehabilitacionOral) {
            doc.setFontSize(17);
            addText("Rehabilitación Oral", 10, true);

            // Agregar detalles de cada campo de rehabilitación oral
            doc.setFontSize(11);
            addFormattedText("Referencias Horizontales: ", rehabilitacionOral.refHorizontal.join(', '), 10);
            addFormattedText("Referencias Verticales: ", rehabilitacionOral.refVertical.join(', '), 10);
            addFormattedText("Longitud del Labio: ", rehabilitacionOral.longitudLabio.join(', '), 10);
            addFormattedText("Forma del Labio: ", rehabilitacionOral.formaLabio.join(', '), 10);
            addFormattedText("Exposición de la Sonrisa: ", rehabilitacionOral.exposicionSonrisa.join(', '), 10);
            addFormattedText("Corredor Bucal: ", rehabilitacionOral.corredorBucal.join(', '), 10);
            addFormattedText("Orientación del Plano Oclusal Anterior: ", rehabilitacionOral.orientacionPlanoOclusalAnt.join(', '), 10);
            addFormattedText("Visibilidad del Borde Superior: ", rehabilitacionOral.visibilidadBordeSup, 10);
            addFormattedText("Orientación del Plano Oclusal Posterior: ", rehabilitacionOral.orientacionPlanoOclusalPost.join(', '), 10);
            addFormattedText("Ancho del Incisivo Central Superior: ", rehabilitacionOral.anchoIncisivoCentalSup, 10);
            addFormattedText("Longitud: ", rehabilitacionOral.longitud, 10);
            addFormattedText("Color de los Dientes: ", rehabilitacionOral.colorDientes, 10);
            addFormattedText("Simetría Gingival: ", rehabilitacionOral.simetriaGingival.join(', '), 10);
            addFormattedText("Biotipo Periodontal: ", rehabilitacionOral.biotipoPeriodental.join(', '), 10);
            addFormattedText("Número de Dientes: ", rehabilitacionOral.numeroDiente.join(', '), 10);
            addFormattedText("Pérdida de Hueso Periodontal: ", rehabilitacionOral.perdidaHuesoPeriodental.join(', '), 10);
            addFormattedText("Otras Patologías Óseas: ", rehabilitacionOral.otrasPatologiasOseas, 10);
            addFormattedText("Restricción de Vías Respiratorias: ", rehabilitacionOral.restriccionViasRespiratorias, 10);
            addFormattedText("Relación Incisal: ", rehabilitacionOral.relacionIncisal.join(', '), 10);
            addFormattedText("Overbite: ", rehabilitacionOral.overbite.join(', '), 10);
            addFormattedText("Overjet: ", rehabilitacionOral.overjet.join(', '), 10);
            addFormattedText("Tinitus: ", rehabilitacionOral.tinitus.join(', '), 10);
            addFormattedText("Puede Repetir la Mordida: ", rehabilitacionOral.puedeRepetirMordida.join(', '), 10);
            
            addFormattedText("Restauraciones Defectuosas: ", rehabilitacionOral.restauracionesDefectuosas ? 'Sí' : 'No', 10);
            if (rehabilitacionOral.restauracionesDefectuosas) {
                addFormattedText("Restauraciones Defectuosas Cuáles: ", rehabilitacionOral.restauracionesDefectuosasCuales, 10);
            }
            addFormattedText("Lesiones Cariosas: ", rehabilitacionOral.lesionesCariosas ? 'Sí' : 'No', 10);
            if (rehabilitacionOral.lesionesCariosas) {
                addFormattedText("Lesiones Cariosas Cuáles: ", rehabilitacionOral.lesionesCariosasCuales, 10);
            }
            addFormattedText("Dientes Faltantes: ", rehabilitacionOral.dientesFaltantes ? 'Sí' : 'No', 10);
            if (rehabilitacionOral.dientesFaltantes) {
                addFormattedText("Dientes Faltantes Cuáles: ", rehabilitacionOral.dientesFaltantesCuales, 10);
            }
            addFormattedText("Corona Dental: ", rehabilitacionOral.coronaDental ? 'Sí' : 'No', 10);
            if (rehabilitacionOral.coronaDental) {
                addFormattedText("Corona Dental Cuáles: ", rehabilitacionOral.coronaDentalCuales, 10);
            }
            addFormattedText("Espigos: ", rehabilitacionOral.espigos ? 'Sí' : 'No', 10);
            if (rehabilitacionOral.espigos) {
                addFormattedText("Espigos Cuáles: ", rehabilitacionOral.espigosCuales, 10);
            }


            addFormattedText("Espigos 2: ", rehabilitacionOral.espigos2.join(', '), 10);
            addFormattedText("Implantes: ", rehabilitacionOral.implantes ? 'Sí' : 'No', 10);
            if (rehabilitacionOral.implantes) {
                addFormattedText("Implantes Cuáles: ", rehabilitacionOral.implantesCuales, 10);
            }
            addFormattedText("Edéntulo Parcial: ", rehabilitacionOral.edentuloParcial.join(', '), 10);
            addFormattedText("Clasificación de Kennedy: ", rehabilitacionOral.clasificacionDeKenedy, 10);
            addFormattedText("Edéntulo Total: ", rehabilitacionOral.edentuloTotal.join(', '), 10);
            addFormattedText("Diagnóstico Oclusal: ", rehabilitacionOral.diagnosticoOclusal, 10);
            addFormattedText("Archivo RX: ", rehabilitacionOral.archivo1Url, 10);
            addFormattedText("Archivo CS: ", rehabilitacionOral.archivo2Url, 10);
            addFormattedText("Archivo C: ", rehabilitacionOral.archivo3Url, 10);
        }

        //Agregar disfuncion mandibular si existe
        if (disfuncionMandibular) {
            doc.setFontSize(17);
            addText("Disfunción Mandibular", 10, true);

            // Agregar detalles de cada campo de disfunción mandibular
            doc.setFontSize(11);
            addFormattedText("Hueso Cortical: ", disfuncionMandibular.huesoCortical ? 'Sí' : 'No', 10);
            addFormattedText("Espacio Articular: ", disfuncionMandibular.espacioArticular ? 'Sí' : 'No', 10);
            addFormattedText("Cóndilo: ", disfuncionMandibular.condillo ? 'Sí' : 'No', 10);
            addFormattedText("Desviación de la Línea Media: ", disfuncionMandibular.desviacionLineaMedia ? 'Sí' : 'No', 10);
            addFormattedText("Con Reducción: ", disfuncionMandibular.conReduccion ? 'Sí' : 'No', 10);
            addFormattedText("Sin Reducción: ", disfuncionMandibular.sinReduccion ? 'Sí' : 'No', 10);
            addFormattedText("Click Articular: ", disfuncionMandibular.clickArticular ? 'Sí' : 'No', 10);
            addFormattedText("Crepitación: ", disfuncionMandibular.crepitacion ? 'Sí' : 'No', 10);
            addFormattedText("Subluxación: ", disfuncionMandibular.subluxacion ? 'Sí' : 'No', 10);
            addFormattedText("Dolor Articular Derecho: ", disfuncionMandibular.dolorArticularDer.join(', '), 10);
            addFormattedText("Dolor Articular Izquierdo: ", disfuncionMandibular.dolorArticularIzq.join(', '), 10);
            addFormattedText("Dolor Muscular Izquierdo: ", disfuncionMandibular.dolorMuscularIzq.join(', '), 10);
            addFormattedText("Dolor Muscular Derecho: ", disfuncionMandibular.dolorMuscularDer.join(', '), 10);
            addFormattedText("Dolor Muscular: ", disfuncionMandibular.dolorMuscular.join(', '), 10);
            addFormattedText("Descripción del Dolor Muscular: ", disfuncionMandibular.dolorMuscularDescripcion, 10);
            addFormattedText("Dolor Orofacial Común Muscular: ", disfuncionMandibular.dolorOrofacialComunMuscular.join(', '), 10);
            addFormattedText("Mallampati: ", disfuncionMandibular.mallampati.join(', '), 10);
            addFormattedText("Dolor Orofacial Común Apnea: ", disfuncionMandibular.dolorOrofacialComunApnea.join(', '), 10);
        }

        // Agregar detalles de periodoncia si existen
        if (periodoncia) {
            doc.setFontSize(17);
            addText("Periodoncia", 10, true);
        
            // Detalles individuales
            doc.setFontSize(11);
            addFormattedText("Diagnóstico: ", periodoncia.diagnosticoPer, 10);
            addFormattedText("Observación: ", periodoncia.observacionPer, 10);
            addFormattedText("Archivo 1: ", periodoncia.archivo1Url, 10);
            addFormattedText("Archivo 2: ", periodoncia.archivo2Url, 10);
        
            yPos += 40; // Ajustar posición después de los textos individuales
            
            doc.setFontSize(16);
            addText('Inferior', 10); // Espacio entre texto y tabla
            // Datos para los campos con 16 columnas
            const fieldsInferior = [
                { label: 'Movilidad', values: periodoncia.movilidadInferior },
                { label: 'Furca', values: periodoncia.furcaInferior },
                { label: 'Margen Gingival', values: periodoncia.mrgGingivalInferiorA },
                { label: 'Profundidad de Sondaje', values: periodoncia.profundidadSondajeInferiorA },
                { label: 'Nivel de Inserción', values: periodoncia.nivelInsercionInferiorA },
                { label: 'Margen Gingival', values: periodoncia.mrgGingivalInferiorB },
                { label: 'Profundidad de Sondaje', values: periodoncia.profundidadSondajeInferiorB },
                { label: 'Nivel de Inserción', values: periodoncia.nivelInsercionInferiorB }
            ];
        
            // Crear datos para la tabla agrupada
            const tableData = fieldsInferior.map(field => {
                const row = [field.label];
                for (let i = 0; i < 16; i++) {
                    row.push(field.values[i] || ''); // Agregar datos o celdas vacías si no hay más datos
                }
                return row;
            });
        
            // Agregar la tabla al PDF
            autoTable(doc, {
                head: [
                    ['', '4.8', '4.7', '4.6', '4.5', '4.4', '4.3', '4.2', '4.1', '3.1', '3.2', '3.3', '3.4', '3.5', '3.6', '3.7', '3.8']
                ],
                body: tableData,
                startY: yPos,
                didDrawPage: function (data) {
                    yPos = data.cursor.y + 10;  // Ajustar posición después de la tabla
                }
            });
            
            const fieldsInferiorEspeciales = [
                { label: 'Sangrado', values: periodoncia.sangradoInferior },
                { label: 'Placa', values: periodoncia.placaInferior },
            ];
            
            // Crear datos para la tabla agrupada
            const tableDataInferiorEspeciales = fieldsInferiorEspeciales.map(field => {
                const row = [field.label];
                const data = field.values;
            
                // Crear filas agrupando los datos en 3 por columna
                for (let i = 0; i < 16; i++) {
                    const index = i * 3;
                    const cellData = [
                        data[index] || '',
                        data[index + 1] || '',
                        data[index + 2] || ''
                    ].join(', '); // Concatenar los tres elementos en una sola cadena
                    row.push(cellData);
                }
            
                return row;
            });
            
            // Agregar la tabla al PDF
            autoTable(doc, {
                head: [
                    ['', '4.8', '4.7', '4.6', '4.5', '4.4', '4.3', '4.2', '4.1', '3.1', '3.2', '3.3', '3.4', '3.5', '3.6', '3.7', '3.8']
                ],
                body: tableDataInferiorEspeciales,
                startY: yPos,
                didDrawPage: function (data) {
                    yPos = data.cursor.y + 10;  // Ajustar posición después de la tabla
                }
            });
            

            doc.setFontSize(16);
            addText('Superior', 10);
            // Datos para los campos con 16 columnas
            const fieldsSuperior = [
                { label: 'Movilidad', values: periodoncia.movilidadSuperior },
                { label: 'Furca', values: periodoncia.furcaSuperior },
                { label: 'Margen Gingival', values: periodoncia.mrgGingivalSuperiorA },
                { label: 'Profundidad de Sondaje', values: periodoncia.profundidadSondajeSuperiorA },
                { label: 'Nivel de Inserción', values: periodoncia.nivelInsercionSuperiorA },
                { label: 'Margen Gingival', values: periodoncia.mrgGingivalSuperiorB },
                { label: 'Profundidad de Sondaje', values: periodoncia.profundidadSondajeSuperiorB },
                { label: 'Nivel de Inserción', values: periodoncia.nivelInsercionSuperiorB }
            ];
        
            // Crear datos para la tabla agrupada
            const tableDataSuperior = fieldsSuperior.map(field => {
                const row = [field.label];
                for (let i = 0; i < 16; i++) {
                    row.push(field.values[i] || ''); // Agregar datos o celdas vacías si no hay más datos
                }
                return row;
            });
        
            // Agregar la tabla al PDF
            autoTable(doc, {
                head: [
                    ['', '4.8', '4.7', '4.6', '4.5', '4.4', '4.3', '4.2', '4.1', '3.1', '3.2', '3.3', '3.4', '3.5', '3.6', '3.7', '3.8']
                ],
                body: tableDataSuperior,
                startY: yPos,
                didDrawPage: function (data) {
                    yPos = data.cursor.y + 10;  // Ajustar posición después de la tabla
                }
            });

            const fieldsSuperiorEspeciales = [
                { label: 'Sangrado', values: periodoncia.sangradoSuperior },
                { label: 'Placa', values: periodoncia.placaSuperior },
            ];
            
            // Crear datos para la tabla agrupada
            const tableDataSuperiorEspeciales = fieldsSuperiorEspeciales.map(field => {
                const row = [field.label];
                const data = field.values;
            
                // Crear filas agrupando los datos en 3 por columna
                for (let i = 0; i < 16; i++) {
                    const index = i * 3;
                    const cellData = [
                        data[index] || '',
                        data[index + 1] || '',
                        data[index + 2] || ''
                    ].join(', '); // Concatenar los tres elementos en una sola cadena
                    row.push(cellData);
                }
            
                return row;
            });
            
            // Agregar la tabla al PDF
            autoTable(doc, {
                head: [
                    ['', '4.8', '4.7', '4.6', '4.5', '4.4', '4.3', '4.2', '4.1', '3.1', '3.2', '3.3', '3.4', '3.5', '3.6', '3.7', '3.8']
                ],
                body: tableDataSuperiorEspeciales,
                startY: yPos,
                didDrawPage: function (data) {
                    yPos = data.cursor.y + 10;  // Ajustar posición después de la tabla
                }
            });
        
            yPos = doc.lastAutoTable.finalY + 10; // Ajustar yPos si la tabla se divide en varias páginas
    
        }
    
        // Guardar el documento PDF
        doc.save(`Patient_Details_${patientId}.pdf`);
    } catch (error) {
        console.error("Error generating PDF:", error);
    }
};
