//convertir en un archivo csv segun el formato establecido

import { CsvData, Ticket } from "../types/types";

const convertoCondusefJson = (data: CsvData[], date: string, dateEnd: string,) => {
  console.log('to cnbv ', data[0]);
  

  //depuracion ticket
  let ticketsArray: Array<Ticket> = [];
  data.map((ticket) => {
    //console.log(ticket);
   
  //Campos Freshdesk
    let idTicket = ticket["FOLIO DE RECLAMACIÓN"];
    let estadoReclamacion = ticket["ESTATUS DE LA RECLAMACIÓN"];
    let lastUpdateHour = ticket["FECHA DE ACTUALIZACIÓN"];
    let identificador_cliente = ticket["IDENTIFICADOR DEL CLIENTE"];
    let cuentaCliente = ticket["IDENTIFICADOR DE LA CUENTA"];
    let identificador_movimiento = ticket["IDENTIFICADOR DEL MOVIMIENTO"];
    let hourOfCreation = ticket["FECHA DE RECLAMACIÓN"];
    let tipoCanal = ticket["CANAL DE RECEPCIÓN DE LA RECLAMACIÓN"];
    let tipoReclamacion = ticket["TIPO DE RECLAMACIÓN"];
    let motivoReclamacion = ticket["MOTIVO DE LA RECLAMACIÓN"];
    let asunto = ticket["DESCRIPCIÓN DE LA RECLAMACIÓN"];
    let fechaEvento = ticket["FECHA DEL EVENTO"];
    let objetoEvento = ticket["OBJETO DEL EVENTO"];
    let canalOperacionNoReconocida =ticket["CANAL EN EL CUAL SE REALIZÓ LA OPERACIÓN NO RECONOCIDA"];
    let importeMonedaNacional = ticket["IMPORTE VALORIZADO EN MONEDA NACIONAL"];
    let closeHour = ticket["FECHA DE RESOLUCIÓN"];
    let sentidoResolucion = ticket["SENTIDO DE LA RESOLUCIÓN"];
    let importeAbonado = ticket["IMPORTE ABONADO A LA CUENTA DEL CLIENTE"];
    let fechaAbonoCuentaCliente = ticket["FECHA DE ABONO A LA CUENTA DEL CLIENTE"];
    let identificadorCuentaInstitucion = ticket["IDENTIFICADOR DE LA CUENTA O FIDEICOMISO DE LA INSTUCIÓN"];
    let importeRecuperado = ticket["IMPORTE RECUPERADO"];
    let fechaRecuperacion = ticket["FECHA DE RECUPERACIÓN DE LOS RECURSOS"];
    let identificadorCuentaReceptora = ticket["IDENTIFICADOR DE LA CUENTA O FIDEICOMISO DE LA INSTITUCIÓN DONDE SE RECIBE EL IMPORTE RECUPERADO"];
    let quebranto = ticket["QUEBRANTO PARA LA INSTITUCIÓN"];

//Campos Freshdesk
    let agente = "";
    let state = "";
    let estadoResolucion = "";
    let grupo = "";
    let solutionHour = "";
    let idContacto = "";
    let nombreCompleto = "";
    let origin = "";
    let priority = "";
    let numeroReferencia = "";
    let resultadoEncuesta = "";
    let tiempoPrimeraRespuestaHoras ="";
    let tiempoResolucionHoras = "";
    let tiempoRespuestaInicial = "";
    let tiempoTranscurrido = "";
    let typoCBVV = "";
 
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
      importeRecuperado,
      fechaEvento,
      fechaAbonoCuentaCliente,
      identificadorCuentaInstitucion
    };

    ticketsArray.push(newTicket);
    return true;
  });
  let jsonToSend = buildCNBVTicket(ticketsArray, date, dateEnd);

  //console.log('este es el csv ', csvFile);
  //console.log('to cnbv ', data);
  return jsonToSend;
};
const buildCNBVTicket = (arrayOfTickets: Array<Ticket>, date: string, dateEnd: string) => {
  console.log("Formatted array of tickets", arrayOfTickets);
  let newArray: any[] = [];

  arrayOfTickets.map((ticket) => {
    ticket.quebranto = parseFloat(ticket.quebranto).toFixed(4);
    ticket.importeRecuperado = parseFloat(ticket.importeRecuperado).toFixed(4);
    ticket.importeAbonado = parseFloat(ticket.importeAbonado).toFixed(4);
    ticket.importeRecuperado = parseFloat(ticket.importeRecuperado).toFixed(4);
    ticket.importeMonedaNacional = parseFloat(ticket.importeMonedaNacional).toFixed(4);

    console.log('estado reclamacion ', ticket.estadoReclamacion);
    console.log('fecha evento ', ticket.hourOfCreation);

    if (ticket.estadoReclamacion === '101') {
      newArray.push({
        identificacionReclamacion: {
          folioReclamacion: `${ticket.idTicket}`,
          estatusReclamacion: ticket.estadoReclamacion,
          fechaActualizacionEstatus: ticket.lastUpdateHour,
        },
        identificadorClienteCuentaMovimiento: {
          identificadorCliente: ticket.identificador_cliente, ///añadir a freshdesk y propagar aqui
          identificadorCuenta: ticket.cuentaCliente,
          identificadorMovimiento: ticket.identificador_movimiento, ///añadir a freshdesk y propagar aqui
        },
        detalleReclamacion: {
          fechaReclamacion: ticket.hourOfCreation,
          canalRecepcionReclamacion: ticket.tipoCanal,
          tipoReclamacion: ticket.tipoReclamacion,
          motivoReclamacion: ticket.motivoReclamacion,
          descripcionReclamacion: ticket.asunto,
        },
        detalleEventoOriginaReclamacion: {
          fechaEvento: ticket.fechaEvento,
          objetoEvento: ticket.objetoEvento,
          canalOperacionNoReconocida: ticket.canalOperacionNoReconocida,
          importeValorizadoMonedaNacional: ticket.importeMonedaNacional,
        }
      });
    }
    else if (ticket.estadoReclamacion === '102'){
      newArray.push({
        identificacionReclamacion: {
          folioReclamacion: `${ticket.idTicket}`,
          estatusReclamacion: ticket.estadoReclamacion,
          fechaActualizacionEstatus: ticket.lastUpdateHour,
        },
        detalleResolucion: {
          fechaResolucion:
           ticket.closeHour,
          sentidoResolucion: ticket.sentidoResolucion,
          importeAbonadoCuentaCliente: ticket.importeAbonado,
          fechaAbonoCuentaCliente: ticket.fechaAbonoCuentaCliente,
          identificadorCuentaInstitucion: ticket.identificadorCuentaInstitucion,
          importeRecuperado: ticket.importeRecuperado, //agregar a freshservice
          fechaRecuperacion:
           ticket.fechaRecuperacion,
              
          identificadorCuentaFideicomisoInstitucion: ticket.identificadorCuentaReceptora,
          quebrantoInstitucion: ticket.quebranto,
        },
      });
    }
    else if (ticket.estadoReclamacion === '103'){
      newArray.push({
        identificacionReclamacion: {
          folioReclamacion: `${ticket.idTicket}`,
          estatusReclamacion: ticket.estadoReclamacion,
          fechaActualizacionEstatus: ticket.lastUpdateHour,
        },
        detalleReclamacion: {
          fechaReclamacion: ticket.hourOfCreation,
          canalRecepcionReclamacion: ticket.tipoCanal,
          descripcionReclamacion: ticket.asunto,
        },
      });
    }
    else if (ticket.estadoReclamacion === '104'){
      newArray.push({
        identificacionReclamacion: {
          folioReclamacion: `${ticket.idTicket}`,
          estatusReclamacion: ticket.estadoReclamacion,
          fechaActualizacionEstatus: ticket.lastUpdateHour,
        },
        detalleResolucion: {
          fechaResolucion:
            ticket.closeHour,
          sentidoResolucion: ticket.sentidoResolucion,
          importeAbonadoCuentaCliente: ticket.importeAbonado,
          fechaAbonoCuentaCliente: ticket.fechaAbonoCuentaCliente,

          iidentificadorCuentaInstitucion: ticket.identificadorCuentaInstitucion,

          importeRecuperado: ticket.importeRecuperado, //agregar a freshservice
          fechaRecuperacion:
            ticket.fechaRecuperacion
              ,
          identificadorCuentaFideicomisoInstitucion: ticket.identificadorCuentaReceptora,
          quebrantoInstitucion: ticket.quebranto,
        },
      });
    }
    else {
      console.log('error: do not have reclamation status')
    }

    return true;
  });

  let jsonArray = {
    identificadorReporte: {
      inicioPeriodo: date,
      finPeriodo: dateEnd,
      claveInstitucion: "065059",
      reporte: "2701",
    },
    informacionSolicitada: newArray,
  };

  console.log("formato CNBV ", jsonArray);

  return jsonArray;
};

export default convertoCondusefJson;
