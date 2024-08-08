//convertir en un archivo csv segun el formato establecido

import { CsvData, Ticket } from "../types/types";

const convertoCnbvJson = (data: CsvData[]) => {
  //console.log('to cnbv ', data[0]);

  //depuracion ticket
  let ticketsArray: Array<Ticket> = [];
  data.map((ticket) => {
    console.log(ticket);
    let agente = ticket["Agente"];
    let asunto = ticket["Asunto"];
    let canalOperacionNoReconocida =
      ticket["Canal de Operación No Reconocida"].split("-")[0];
    let cuentaCliente = ticket["Cuenta Cliente"];
    //let a2 = ticket["El estado de cada respuesta"];
    let state = ticket["Estado"];
    //let a4 = ticket["Estado de primera respuesta"];
    let estadoResolucion = ticket["Estado de resolución"];
    let fechaRecuperacion = ticket["Fecha Recuperación"];
    let grupo = ticket["Grupo"];
    let closeHour = ticket["Hora de cierre"];
    let hourOfCreation = ticket["Hora de creación"];
    let solutionHour = ticket["Hora de resolución"];
    let lastUpdateHour = ticket["Hora de última actualización"];
    let idContacto = ticket["ID del contacto"];
    let idTicket = ticket["ID del ticket"];
    let identificadorCuentaReceptora = ticket["Identificador Cuenta Receptora"];
    let importeAbonado = ticket["Importe Abonado"];
    let importeMonedaNacional = ticket["Importe Moneda Nacional"];
    //let a17 = ticket["Interacciones del agente"];
    //let a18 = ticket["Interacciones del cliente"];
    let motivoReclamacion = ticket["Motivo Reclamación"].split("-")[0];
    let nombreCompleto = ticket["Nombre completo"];
    let objetoEvento = ticket["Objeto del evento"].split("-")[0];
    let origin = ticket["Origen"].split("-")[0];
    let priority = ticket["Prioridad"];
    let quebranto = ticket["Quebranto Institución"].split("-")[0];
    let numeroReferencia = ticket["Reference Number"];
    let resultadoEncuesta = ticket["Resultados de la encuesta"];
    let sentidoResolucion = ticket["Sentido de la Resolución"].split("-")[0];
    let tiempoPrimeraRespuestaHoras =
      ticket["Tiempo de primera respuesta (en horas)"];
    let tiempoResolucionHoras = ticket["Tiempo de resolución (en horas)"];
    let tiempoRespuestaInicial = ticket["Tiempo de respuesta inicial"];
    //let a31 = ticket["Tiempo de vencimiento"];
    let tiempoTranscurrido = ticket["Tiempo transcurrido"];
    let typoCBVV = ticket["Tipo"];
    let tipoReclamacion = ticket["Tipo Reclamación"].split("-")[0];
    let tipoCanal = ticket["Tipo de Canal"].split("-")[0];
    let estadoReclamacion = ticket["Estado Reclamación"].split("-")[0];
    //nuevos campos
  let identificador_cliente = ticket['Identificador de Cliente'];
  let identificador_movimiento = ticket['Identificador de Movimiento'];

    //construyo ticket de acuerdo al formato
    let newTicket: Ticket = {
      idTicket,
      asunto,
      state,
      priority,
      origin,
      typoCBVV,
      agente,
      grupo,
      hourOfCreation,
      solutionHour,
      closeHour,
      lastUpdateHour,
      tiempoRespuestaInicial,
      tiempoTranscurrido,
      tiempoPrimeraRespuestaHoras,
      tiempoResolucionHoras,
      estadoResolucion,
      resultadoEncuesta,
      numeroReferencia,
      tipoReclamacion,
      motivoReclamacion,
      objetoEvento,
      canalOperacionNoReconocida,
      sentidoResolucion,
      quebranto,
      cuentaCliente,
      importeMonedaNacional,
      importeAbonado,
      identificadorCuentaReceptora,
      fechaRecuperacion,
      nombreCompleto,
      idContacto,
      tipoCanal,
      estadoReclamacion,
      identificador_cliente,
      identificador_movimiento,
    };

    ticketsArray.push(newTicket);
    return true;
  });
  let jsonToSend = buildCNBVTicket(ticketsArray);

  //console.log('este es el csv ', csvFile);
  //console.log('to cnbv ', data);
  return jsonToSend;
};
const buildCNBVTicket = (arrayOfTickets: Array<Ticket>) => {
  console.log("Formatted array of tickets", arrayOfTickets);
  let newArray: any[] = [];
  arrayOfTickets.map((ticket) => {
 
        newArray.push({
            seccion_identificador_reporte : {
                inicio_periodo: "",
                fin_periodo: "",
                clave_institucion: "065059",
                reporte: "2701"
            },
            seccion_identificador_reclamacion: {
                folio_reclamacion: ticket.idTicket,
                estatus_reclamacion: ticket.estadoReclamacion,
                fecha_actualizacion_status: getDate(ticket.lastUpdateHour),       
              },
            seccion_identificacion_cliente: {
                identificador_cliente: ticket.identificador_cliente,  ///añadir a freshdesk y propagar aqui
                identificador_cuenta: ticket.cuentaCliente,
                identificador_movimiento:ticket.identificador_movimiento ///añadir a freshdesk y propagar aqui
            },
            seccion_detalle_reclamacion: {
                fecha_reclamacion: getDate(ticket.hourOfCreation),
                canal_recepcion_reclamacion: ticket.tipoCanal,
                tipo_reclamacion: ticket.tipoReclamacion,
                motivo_reclamacion: ticket.motivoReclamacion,
                descripcion_reclamacion: ticket.asunto,
                //estado_reclamacion: ticket.estadoReclamacion,
                //tipo_Canal: ticket.tipoCanal
              },
              seccion_detalle_evento_origen_reclamacion: {
                fecha_evento: getDate(ticket.hourOfCreation),
                objeto_evento: ticket.objetoEvento,
                canal_operacion_no_reconocida: ticket.canalOperacionNoReconocida,
                importe_moneda_nacional: ticket.importeMonedaNacional,
              },
              section_detalle_resolucion: {
                fecha_resolucion:
                  ticket.closeHour !== "" ? getDate(ticket.closeHour) : "",
                sentido_resolucion: ticket.sentidoResolucion,
                importe_abonado_cuenta_cliente: ticket.importeAbonado,
                fecha_abono_cuenta_cliente : "",
                identificador_cuenta_institucion:
                  ticket.identificadorCuentaReceptora,
                importe_recuperado: "", //agregar a freshservice
                fecha_recuperacion:
                  ticket.fechaRecuperacion !== ""
                    ? getDate(ticket.fechaRecuperacion)
                    : "",
                identificador_cuenta_receptora: ticket.identificadorCuentaReceptora,
                quebranto_institucion: ticket.quebranto,
              },


            
            //fecha abono cuenta cliente
            // identificador_cliente: "",
            //     identificador_cuenta: "",
            //     identificador_movimiento:""


        });

    return true;
  });

  console.log("formato CNBV ", newArray);

  return newArray;
};

function getDate(fecha: string) {
  let fechaReclamacionRaw = new Date(fecha);
  const ano = fechaReclamacionRaw.getFullYear();
  const mes = (fechaReclamacionRaw.getMonth() + 1).toString().padStart(2, "0"); // Los meses van de 0 a 11
  const dia = fechaReclamacionRaw.getDate().toString().padStart(2, "0");
  console.log('get date ')
  return `${ano}${mes}${dia}`;
}



export default convertoCnbvJson;
