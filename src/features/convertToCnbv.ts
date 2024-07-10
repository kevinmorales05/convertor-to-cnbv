//convertir en un archivo csv segun el formato establecido

import { CsvData, Reclamacion, Ticket } from "../types/types";

const convertoCnbv = (data: CsvData[]) => {
  //console.log('to cnbv ', data[0]);

  //depuracion ticket
  let ticketsArray: Array<Ticket> = [];
  data.map((ticket) => {
    //console.log(ticket);
    let agente = ticket["Agente"];
    let asunto = ticket["Asunto"];
    let canalOperacionNoReconocida = ticket["Canal de Operación No Reconocida"].split('-')[0];
    let cuentaCliente = ticket["Cuenta Cliente"];
    //let a2 = ticket["El estado de cada respuesta"];
    let state = ticket["Estado"];
    //let a4 = ticket["Estado de primera respuesta"];
    let  estadoResolucion = ticket["Estado de resolución"];
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
    let motivoReclamacion = ticket["Motivo Reclamación"].split('-')[0];
    let nombreCompleto = ticket["Nombre completo"];
    let objetoEvento = ticket["Objeto del evento"].split('-')[0];
    let origin = ticket["Origen"].split('-')[0];
    let priority = ticket["Prioridad"];
    let quebranto = ticket["Quebranto Institución"].split('-')[0];
    let numeroReferencia = ticket["Reference Number"];
    let resultadoEncuesta = ticket["Resultados de la encuesta"];
    let sentidoResolucion = ticket["Sentido de la Resolución"];
    let  tiempoPrimeraRespuestaHoras = ticket["Tiempo de primera respuesta (en horas)"];
    let tiempoResolucionHoras = ticket["Tiempo de resolución (en horas)"];
    let tiempoRespuestaInicial = ticket["Tiempo de respuesta inicial"];
    //let a31 = ticket["Tiempo de vencimiento"];
    let tiempoTranscurrido = ticket["Tiempo transcurrido"];
    let typoCBVV = ticket["Tipo"];
    let tipoReclamacion = ticket["Tipo Reclamación"].split('-')[0];
  
    
    //construyo ticket de acuerdo al formato
    let newTicket: Ticket = {
      idTicket,
      asunto ,
      state,
      priority ,
      origin ,
      typoCBVV ,
      agente,
      grupo,
      hourOfCreation,
      solutionHour ,
      closeHour ,
      lastUpdateHour,
      tiempoRespuestaInicial,
      tiempoTranscurrido,
      tiempoPrimeraRespuestaHoras,
      tiempoResolucionHoras,
      estadoResolucion ,
      resultadoEncuesta ,
      numeroReferencia,
      tipoReclamacion,
      motivoReclamacion,
      objetoEvento,
      canalOperacionNoReconocida,
      sentidoResolucion,
      quebranto,
      cuentaCliente,
      importeMonedaNacional,
      importeAbonado ,
      identificadorCuentaReceptora ,
      fechaRecuperacion,
      nombreCompleto,
      idContacto
    };

    ticketsArray.push(newTicket);

  });
  buildTicket(ticketsArray);
  //console.log('to cnbv ', data);
};
const buildTicket = (arrayOfTickets: Array<Ticket>) => {
  
    console.log(arrayOfTickets);
    let newArray: Reclamacion[] = [];



  arrayOfTickets.map((ticket) => {
    let fechaReclamacionRaw = new Date(ticket.hourOfCreation);
    

    const horas = fechaReclamacionRaw.getHours();
    const minutos = fechaReclamacionRaw.getMinutes();
    const segundos = fechaReclamacionRaw.getSeconds();
    const ano = fechaReclamacionRaw.getFullYear();
    const mes = (fechaReclamacionRaw.getMonth() + 1).toString().padStart(2, '0'); // Los meses van de 0 a 11
    const dia = fechaReclamacionRaw.getDate().toString().padStart(2, '0');
    let fechaReclamacion = `${ano}-${mes}-${dia}`;

// Formatear la hora como una cadena
    let horaTexto = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

console.log(horaTexto);
console.log('fecha reclamacion ', fechaReclamacion);


//validate date of ticket close
let fechaResolucion = '';
if(ticket.closeHour !== ''){
    let fechaResolucionRaw = new Date(ticket.hourOfCreation);
    

    const horas = fechaResolucionRaw.getHours();
    const minutos = fechaResolucionRaw.getMinutes();
    const segundos = fechaResolucionRaw.getSeconds();
    const ano = fechaResolucionRaw.getFullYear();
    const mes = (fechaResolucionRaw.getMonth() + 1).toString().padStart(2, '0'); // Los meses van de 0 a 11
    const dia = fechaResolucionRaw.getDate().toString().padStart(2, '0');
    fechaResolucion = `${ano}-${mes}-${dia}`;

// Formatear la hora como una cadena
    let horaResolucion = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

console.log(horaResolucion);
console.log('fecha resolucion ', fechaResolucion);

}

    newArray.push({
      id: ticket.idTicket,
      sections: {
        section_identificador_reclamacion: {
          folio: ticket.idTicket,
          estatus_reclamacion: ticket.state,
          fecha_actualizacion: "",
        },
        section_id_cliente: {
          identificador_cliente: ticket.contactId,
          identificador_cuenta: "",
          identificador_movimiento: "",
        },
        section_detalle_reclamacion: {
          fecha_reclamacion: fechaReclamacion,
          canal_recepcion_reclamacion: "",
          tipo_reclamacion: "",
          motivo_reclamacion: "",
          descripcion_reclamacion: ticket.asunto,
        },
        section_detalle_evento_origen_reclamacion: {
          fecha_evento: fechaReclamacion,
          objeto_evento: "",
          canal_operacion_no_reconocida: "",
          importe_moneda_nacional: "",
        },
        section_detalle_resolucion: {
          fecha_resolucion: fechaResolucion,
          sentido_resolucion: "",
          importe_abonado: "",
          identificador_cuenta_institucion: "",
          importe_recuperado: "",
          fecha_recuperacion: "",
          identificador_cuenta_receptora: "",
          quebranto_institucion: "0",
        },
      },
    });
  });
};

export default convertoCnbv;
