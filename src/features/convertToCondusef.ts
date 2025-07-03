import { CsvData} from "../types/types";

const convertoCondusefJson = (
  data: CsvData[],
  trimestre: string,
  tipo: string
) => {
  console.log("to cnbv ", data[0]);

  //depuracion ticket
  let ticketsArray: Array<any> = [];
  data.map((ticket) => {
    let denominacion = ticket["DENOMINACION"];
    let sector = ticket["SECTOR"];
    let trimestre = ticket["TRIMESTRE"];
    let numero = ticket["NUMERO"];
    let folioReclamacion = ticket["FOLIO"];
    let estadoReclamacion = ticket["ESTATUS DE LA RECLAMACION"];
    let fechaReclamacion = ticket["FECHA DE RECLAMACION"];
    let codEstado = ticket["CODESTADO"];
    let medioRecepcionCanal = ticket["MEDIORECEPCIONCANAL"];
    let producto = ticket["PRODUCTO"];
    let causa = ticket["CAUSA"];
    let codPostal = ticket["CODPOSTAL"];
    let municipio = ticket["MUNICIPIO"];
    let localidad = ticket["LOCALIDAD"];
    let colonia = ticket["COLONIA"];
    let nivelAtencion = ticket["NIVELATENCION"];
    let pori = ticket["PORI"];
    let tipoC = ticket["CONDUSEFTIPO"];

    //construyo ticket de acuerdo al formato
    let newTicket: any = {
      denominacion,
      sector,
      trimestre,
      numero,
      folioReclamacion,
      estadoReclamacion,
      fechaReclamacion,
      codEstado,
      medioRecepcionCanal,
      producto,
      causa,
      codPostal,
      municipio,
      localidad,
      colonia,
      nivelAtencion,
      pori,
      tipoC ,
    };
    
    if (tipoC === "2") {
      //campos que solo traen las reclamaciones
      let importeAbonado = ticket["IMPORTEABONADO"];
      let fechaAbonoImporte = ticket["FECHAABONOIMPORTE"];
      let sentidoResolucion = ticket["SENTIDORESOLUCION"];

      newTicket.importeAbonado = importeAbonado;
      newTicket.fechaAbonoImporte = fechaAbonoImporte;
      newTicket.sentidoResolucion = sentidoResolucion;

      //console.log('ticket with new atributes ', ticket);
    }

    if (tipoC === "3") {
      //campos que solo traen las aclaraciones
      let operacionExtranjero = ticket["OPERACIONEXTRANJERO"];
      newTicket.operacionExtranjero = operacionExtranjero;
    }

    if (tipoC  === "2" || tipoC  === "3") {
      // campos que comparten aclaraciones y reclamaciones
      let fechaActualizacion = ticket["FECHA DE ACTUALIZACIÓN"];
      let fechaResolucion = ticket["FECHA DE RESOLUCIÓN"];
      let monetario = ticket["MONETARIO"];
      let montoReclamado = ticket["MONTORECLAMADO"];
      let tipoPersona = ticket["TIPOPERSONA"];
      let sexo = ticket["SEXO"];
      let edad = ticket["EDAD"];
      let folioCondusef = ticket["FOLIOCONDUSEF"] === "" ? null : ticket["FOLIOCONDUSEF"] ;
      let reversa = ticket["REVERSA"] === "" ? null : ticket["REVERSA"];

      newTicket.fechaActualizacion = fechaActualizacion;
      newTicket.fechaResolucion = fechaResolucion;
      newTicket.monetario = monetario;
      newTicket.montoReclamado = montoReclamado;
      newTicket.tipoPersona = tipoPersona;
      newTicket.sexo = sexo;
      newTicket.edad = edad;
      newTicket.folioCondusef = folioCondusef;
      newTicket.reversa = reversa;
    }
    //add the new ticket
    console.log('ticket processed ', newTicket);
    ticketsArray.push(newTicket);
    return true;
  });
  console.log('array before send ', ticketsArray);
  let jsonToSend = buildCondusefTicket(ticketsArray, trimestre, tipo);

  console.log("este es el json to send ", jsonToSend);
  console.log("tipo condusef ", tipo);

  return jsonToSend;
};

const buildCondusefTicket = (
  arrayOfTickets: Array<any>,
  trimestre: string,
  tipo: string
) => {
  console.log("Formatted array of tickets", arrayOfTickets);
  let newArray: any[] = [];

  arrayOfTickets.map((ticket) => {
    console.log("this is the ticket",ticket);
    if (tipo === "1") {
      newArray.push({
        //InstitucionClave: ticket.denominacion,
        InstitucionClave: "Quantum Pay, S.A. de C.V., Institución de Fondos de Pago Electrónico",
        //Sector: ticket.sector,
        Sector: "Instituciones de Fondos de Pago Electrónico",
        ConsultasTrim: parseInt(trimestre, 10),
        NumConsultas: parseInt(ticket.numero,10),
        ConsultasFolio: ticket.folioReclamacion,
        ConsultasEstatusCon: parseInt( ticket.estadoReclamacion,10),
        ConsultasFecAten: ticket.fechaReclamacion,
        EstadosId: parseInt(ticket.codEstado,10),
        ConsultasFecRecepcion: ticket.fechaReclamacion,
        MediosId: parseInt(ticket.medioRecepcionCanal,10),
        Producto: ticket.producto,
        CausaId: ticket.causa,
        ConsultasCP: parseInt( ticket.codPostal,10),
        ConsultasMpioId: parseInt( ticket.municipio,10),
        ConsultasLocId: parseInt( ticket.localidad,10),
        ConsultasColId: parseInt(ticket.colonia,10),
        ConsultascatnivelatenId: parseInt(ticket.nivelAtencion,10),
        ConsultasPori: ticket.pori,
      });
      console.log('va por este json ', newArray);
    }
    if (tipo === "2") {
      console.log('va por aqui, tipo 2')
      newArray.push({
        RecDenominacion: ticket.denominacion,
        RecSector: ticket.sector,
        RecTrimestre: parseInt(trimestre, 10),
        RecNumero: parseInt(ticket.numero,10),
        RecFolioAtencion: ticket.folioReclamacion,
        RecEstadoConPend: parseInt( ticket.estadoReclamacion,10),
        RecFechaReclamacion: ticket.fechaReclamacion,
        RecFechaAtencion: ticket.fechaActualizacion,
        RecMedioRecepcionCanal: parseInt(ticket.medioRecepcionCanal,10),
        RecProductoServicio: ticket.producto,
        RecCausaMotivo: ticket.causa,
        RecFechaResolucion: ticket.fechaResolucion,
        RecFechaNotifiUsuario: ticket.fechaResolucion,
        RecEntidadFederativa: parseInt(ticket.codEstado,10),
        RecCodigoPostal: parseInt( ticket.codPostal,10),
        RecMunicipioAlcaldia: parseInt( ticket.municipio,10),
        RecLocalidad: parseInt( ticket.localidad,10),
        RecColonia: parseInt(ticket.colonia,10),
        RecMonetario: ticket.monetario,
       
//converir a double
        RecMontoReclamado: parseFloat(ticket.montoReclamado),
        RecImporteAbonado: parseFloat(ticket.importeAbonado),

        RecFechaAbonoImporte: ticket.fechaAbonoImporte,
        RecPori: ticket.pori,
        RecTipoPersona: parseInt(ticket.tipoPersona,10),
        RecSexo: ticket.sexo,
        RecEdad: parseInt(ticket.edad,10),
        RecSentidoResolucion: parseInt(ticket.sentidoResolucion,10),
        RecNivelAtencion: parseInt(ticket.nivelAtencion,10),
        RecFolioCondusef: ticket.folioCondusef,
        RecReversa:ticket.reversa,
      });
    }
    if (tipo === "3") {
      newArray.push({
        AclaracionDenominacion: ticket.denominacion,
        AclaracionSector: ticket.sector,
        AclaracionTrimestre: parseInt(trimestre, 10),
        AclaracionNumero: parseInt(ticket.numero,10),
        AclaracionFolioAtencion: ticket.folioReclamacion,
        AclaracionEstadoConPend: parseInt( ticket.estadoReclamacion,10),
        AclaracionFechaAclaracion: ticket.fechaReclamacion,
        AclaracionFechaAtencion: ticket.fechaActualizacion,
        AclaracionMedioRecepcionCanal: parseInt(ticket.medioRecepcionCanal,10),
        AclaracionProductoServicio: ticket.producto,
        AclaracionCausaMotivo: ticket.causa,
        AclaracionFechaResolucion: ticket.fechaResolucion,
        AclaracionFechaNotifiUsuario: ticket.fechaResolucion,
        AclaracionEntidadFederativa: parseInt(ticket.codEstado,10),
        AclaracionCodigoPostal: parseInt( ticket.codPostal,10),
        AclaracionMunicipioAlcaldia: parseInt( ticket.municipio,10),
        AclaracionLocalidad: parseInt( ticket.localidad,10),
        AclaracionColonia: parseInt(ticket.colonia,10),
        AclaracionMonetario: ticket.monetario,
        AclaracionMontoReclamado: parseFloat(ticket.montoReclamado),
        AclaracionPori: ticket.pori,
        AclaracionTipoPersona: parseInt(ticket.tipoPersona,10),
        AclaracionSexo: ticket.sexo,
        AclaracionEdad: parseInt(ticket.edad,10),
        AclaracionNivelAtencion: parseInt(ticket.nivelAtencion,10),
        AclaracionFolioCondusef: ticket.folioCondusef,
        AclaracionReversa: ticket.reversa,
        AclaracionOperacionExtranjero: ticket.operacionExtranjero,
      });
    }

    return true;
  });
console.log('tipo ', tipo);
console.log('trimestre');
console.log(trimestre);
console.log('json ', newArray);
  return newArray;
};

export default convertoCondusefJson;
