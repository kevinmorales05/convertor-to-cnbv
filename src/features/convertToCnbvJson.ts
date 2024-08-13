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
    let identificador_cliente = ticket["Identificador de Cliente"];
    let identificador_movimiento = ticket["Identificador de Movimiento"];
    let importeRecuperado = ticket["Importe Recupeado"];

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
      importeRecuperado
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
    ticket.quebranto = parseFloat(ticket.quebranto).toFixed(4);
    ticket.importeRecuperado = parseFloat(ticket.importeRecuperado).toFixed(4);
    ticket.importeAbonado = parseFloat(ticket.importeAbonado).toFixed(4);
    ticket.importeRecuperado = parseFloat(ticket.importeRecuperado).toFixed(4);
    ticket.importeMonedaNacional = parseFloat(ticket.importeMonedaNacional).toFixed(4);


    if (ticket.estadoReclamacion === '101') {
      newArray.push({
        identificacionReclamacion: {
          folioReclamacion: `F00000${ticket.idTicket}`,
          estatusReclamacion: ticket.estadoReclamacion,
          fechaActualizacionEstatus: getDate(ticket.lastUpdateHour),
        },
        identificadorClienteCuentaMovimiento: {
          identificadorCliente: ticket.identificador_cliente, ///añadir a freshdesk y propagar aqui
          identificadorCuenta: ticket.cuentaCliente,
          identificadorMovimiento: ticket.identificador_movimiento, ///añadir a freshdesk y propagar aqui
        },
        detalleReclamacion: {
          fechaReclamacion: getDate(ticket.hourOfCreation),
          canalRecepcionReclamacion: ticket.tipoCanal,
          tipoReclamacion: ticket.tipoReclamacion,
          motivoReclamacion: ticket.motivoReclamacion,
          descripcionReclamacion: ticket.asunto,
        },
        detalleEventoOriginaReclamacion: {
          fechaEvento: getDate(ticket.hourOfCreation),
          objetoEvento: ticket.objetoEvento,
          canalOperacionNoReconocida: ticket.canalOperacionNoReconocida,
          importeValorizadoMonedaNacional: ticket.importeMonedaNacional,
        }
      });
    }
    else if (ticket.estadoReclamacion === '102'){
      newArray.push({
        identificacionReclamacion: {
          folioReclamacion: `F00000${ticket.idTicket}`,
          estatusReclamacion: ticket.estadoReclamacion,
          fechaActualizacionEstatus: getDate(ticket.lastUpdateHour),
        },
        detalleResolucion: {
          fechaResolucion:
            ticket.closeHour !== "" ? getDate(ticket.closeHour) : "",
          sentidoResolucion: ticket.sentidoResolucion,
          importeAbonadoCuentaCliente: ticket.importeAbonado,
          fechaAbonoCuentaCliente: "",
          identificadorCuentaInstitucion: ticket.identificadorCuentaReceptora,
          importeRecuperado: ticket.importeRecuperado, //agregar a freshservice
          fechaRecuperacion:
            ticket.fechaRecuperacion !== ""
              ? getDate(ticket.fechaRecuperacion)
              : "",
          identificadorCuentaFideicomisoInstitucion: ticket.identificadorCuentaReceptora,
          quebrantoInstitucion: ticket.quebranto,
        },
      });
    }
    else if (ticket.estadoReclamacion === '103'){
      newArray.push({
        identificacionReclamacion: {
          folioReclamacion: `F00000${ticket.idTicket}`,
          estatusReclamacion: ticket.estadoReclamacion,
          fechaActualizacionEstatus: getDate(ticket.lastUpdateHour),
        },
        detalleReclamacion: {
          fechaReclamacion: getDate(ticket.hourOfCreation),
          canalRecepcionReclamacion: ticket.tipoCanal,
          descripcionReclamacion: ticket.asunto,
        },
      });
    }
    else if (ticket.estadoReclamacion === '104'){
      newArray.push({
        identificacionReclamacion: {
          folioReclamacion: `F00000${ticket.idTicket}`,
          estatusReclamacion: ticket.estadoReclamacion,
          fechaActualizacionEstatus: getDate(ticket.lastUpdateHour),
        },
        detalleResolucion: {
          fechaResolucion:
            ticket.closeHour !== "" ? getDate(ticket.closeHour) : "",
          sentidoResolucion: ticket.sentidoResolucion,
          importeAbonadoCuentaCliente: ticket.importeAbonado,
          fechaAbonoCuentaCliente: "",
          identificadorCuentaInstitucion: ticket.identificadorCuentaReceptora,
          importeRecuperado: ticket.importeRecuperado, //agregar a freshservice
          fechaRecuperacion:
            ticket.fechaRecuperacion !== ""
              ? getDate(ticket.fechaRecuperacion)
              : "",
          identificadorCuentaFideicomisoInstitucion: ticket.identificadorCuentaReceptora,
          quebrantoInstitucion: ticket.quebranto,
        },
      });
    }
    else {
      console.log('error: do not have reclamation status')
    }


    newArray.push({
      identificacionReclamacion: {
        folioReclamacion: `F00000${ticket.idTicket}`,
        estatusReclamacion: ticket.estadoReclamacion,
        fechaActualizacionEstatus: getDate(ticket.lastUpdateHour),
      },
      identificadorClienteCuentaMovimiento: {
        identificadorCliente: ticket.identificador_cliente, ///añadir a freshdesk y propagar aqui
        identificadorCuenta: ticket.cuentaCliente,
        identificadorMovimiento: ticket.identificador_movimiento, ///añadir a freshdesk y propagar aqui
      },
      detalleReclamacion: {
        fechaReclamacion: getDate(ticket.hourOfCreation),
        canalRecepcionReclamacion: ticket.tipoCanal,
        tipoReclamacion: ticket.tipoReclamacion,
        motivoReclamacion: ticket.motivoReclamacion,
        descripcionReclamacion: ticket.asunto,
      },
      detalleEventoOriginaReclamacion: {
        fechaEvento: getDate(ticket.hourOfCreation),
        objetoEvento: ticket.objetoEvento,
        canalOperacion_no_reconocida: ticket.canalOperacionNoReconocida,
        importeValorizadoMonedaNacional: ticket.importeMonedaNacional,
      },
      detalleResolucion: {
        fechaResolucion:
          ticket.closeHour !== "" ? getDate(ticket.closeHour) : "",
        sentidoResolucion: ticket.sentidoResolucion,
        importeAbonadoCuentaCliente: ticket.importeAbonado,
        fechaAbonoCuentaCliente: "",
        identificadorCuentaInstitucion: ticket.identificadorCuentaReceptora,
        importeRecuperado: ticket.importeRecuperado, //agregar a freshservice
        fechaRecuperacion:
          ticket.fechaRecuperacion !== ""
            ? getDate(ticket.fechaRecuperacion)
            : "",
        identificadorCuentaReceptora: ticket.identificadorCuentaReceptora,
        quebrantoInstitucion: ticket.quebranto,
      },
    });

    return true;
  });

  let jsonArray = {
    identificadorReporte: {
      inicioPeriodo: "20240601",
      finPeriodo: "20240831",
      claveInstitucion: "065059",
      reporte: "2701",
    },
    informacionSolicitada: newArray,
  };

  console.log("formato CNBV ", jsonArray);

  return jsonArray;
};

function getDate(fecha: string) {
  let fechaReclamacionRaw = new Date(fecha);
  const ano = fechaReclamacionRaw.getFullYear();
  const mes = (fechaReclamacionRaw.getMonth() + 1).toString().padStart(2, "0"); // Los meses van de 0 a 11
  const dia = fechaReclamacionRaw.getDate().toString().padStart(2, "0");
  console.log("get date ");
  return `${ano}${mes}${dia}`;
}

export default convertoCnbvJson;
