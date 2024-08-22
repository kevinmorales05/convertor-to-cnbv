interface CsvData {
  [key: string]: string;
}

interface Reclamacion {
  clave_de_instituacion: string,
  id: string;
  sections: Sections;
}

interface Sections {
  section_identificador_reclamacion: SectionIdentificadorReclamacion;
  section_id_cliente: SectionIdCliente;
  section_detalle_reclamacion: SectionDetalleReclamacion;
  section_detalle_evento_origen_reclamacion: SectionDetalleEventoOrigenReclamacion;
  section_detalle_resolucion: SectionDetalleResolucion;
}

interface SectionIdentificadorReclamacion {
  folio: string;
  estatus_reclamacion: string;
  fecha_actualizacion: string;
}

interface SectionIdCliente {
  identificador_cliente: string;
  identificador_cuenta: string;
  identificador_movimiento: string;
}

interface SectionDetalleReclamacion {
  fecha_reclamacion: string;
  canal_recepcion_reclamacion: string;
  tipo_reclamacion: string;
  motivo_reclamacion: string;
  descripcion_reclamacion: string;
  estado_reclamacion: string;
  tipo_Canal: string;
}

interface SectionDetalleEventoOrigenReclamacion {
  fecha_evento: string;
  objeto_evento: string;
  canal_operacion_no_reconocida: string;
  importe_moneda_nacional: string;
}

interface SectionDetalleResolucion {
  fecha_resolucion: string;
  sentido_resolucion: string;
  importe_abonado: string;
  identificador_cuenta_institucion: string;
  importe_recuperado: string;
  fecha_recuperacion: string;
  identificador_cuenta_receptora: string;
  quebranto_institucion: string;
}


interface Ticket {
  idTicket: string;
  asunto: string;
  state: string;
  priority: string;
  origin: string;
  typoCBVV: string;
  agente: string;
  grupo: string;
  hourOfCreation: string;
  solutionHour: string;
  closeHour: string;
  lastUpdateHour: string;
  tiempoRespuestaInicial: string;
  tiempoTranscurrido: string;
  tiempoPrimeraRespuestaHoras: string;
  tiempoResolucionHoras: string;
  estadoResolucion: string;
  resultadoEncuesta: string;
  numeroReferencia: string;
  tipoReclamacion: string;
  motivoReclamacion: string;
  objetoEvento: string;
  canalOperacionNoReconocida: string;
  sentidoResolucion: string;
  quebranto: string;
  cuentaCliente: string;
  importeMonedaNacional: string;
  importeAbonado: string;
  identificadorCuentaReceptora: string;
  fechaRecuperacion: string;
  nombreCompleto: string;
  idContacto: string;
  tipoCanal: string;
  estadoReclamacion: string;
  identificador_cliente: string;
  identificador_movimiento: string;
  importeRecuperado: string;
  fechaEvento: string;
  fechaAbonoCuentaCliente: string;
  identificadorCuentaInstitucion: string;
};

interface ConsultaReune {
    InstitucionClave: string;
    Sector: string;
    ConsultasTrim: number;
    NumConsultas: number,
    ConsultasFolio: string;
    ConsultasEstatusCon: number,
    ConsultasFecAten: string;
    EstadosId: number,
    ConsultasFecRecepcion: string;
    MediosId: number,
    Producto: string;
    CausaId: string;
    ConsultasCP: number,
    ConsultasMpioId: number,
    ConsultasLocId: number,
    ConsultasColId: number,
    ConsultascatnivelatenId: number,
    ConsultasPori: string; 
}

interface ReclamacionReune {
		RecDenominacion:string;
		RecSector:string;
		RecTrimestre:number;
		RecNumero:number;
		RecFolioAtencion:string;
		RecEstadoConPend:number;
		RecFechaReclamacion:string;
		RecFechaAtencion:string;
		RecMedioRecepcionCanal:number;
		RecProductoServicio:string;
		RecCausaMotivo:string;
		RecFechaResolucion:string;
		RecFechaNotifiUsuario:string;
		RecEntidadFederativa:number;
		RecCodigoPostal:number;
		RecMunicipioAlcaldia:number;
		RecLocalidad:number;
		RecColonia:null | string;
		RecMonetario:string;
		RecMontoReclamado: number;
		RecImporteAbonado:number;
		RecFechaAbonoImporte:string;
		RecPori:string;
		RecTipoPersona:number;
		RecSexo:string;
		RecEdad:number;
		RecSentidoResolucion:number;
		RecNivelAtencion:number;
		RecFolioCondusef:null | string;
		RecReversa:null | string;
}

interface AclaracionesReune {
  AclaracionDenominacion: string;
    AclaracionSector: string;
    AclaracionTrimestre: number;
    AclaracionNumero: number;
    AclaracionFolioAtencion: string;
    AclaracionEstadoConPend: number;
    AclaracionFechaAclaracion: string;
    AclaracionFechaAtencion: string;
    AclaracionMedioRecepcionCanal: 5;
    AclaracionProductoServicio: string;
    AclaracionCausaMotivo: string;
    AclaracionFechaResolucion: string;
    AclaracionFechaNotifiUsuario: string;
    AclaracionEntidadFederativa: number;    
    AclaracionCodigoPostal: number;
    AclaracionMunicipioAlcaldia: number;
    AclaracionLocalidad: number;
    AclaracionColonia: null | string;
    AclaracionMonetario: string;
    AclaracionMontoReclamado: null | string;
    AclaracionPori: string;
    AclaracionTipoPersona: number;
    AclaracionSexo: string;
    AclaracionEdad: number;
    AclaracionNivelAtencion: number;
    AclaracionFolioCondusef: null | string;
    AclaracionReversa: null | string;
    AclaracionOperacionExtranjero: string;
}

interface UserReune {
  username: string;
  password: string;
}
export { CsvData, Reclamacion, Ticket, ConsultaReune, ReclamacionReune, AclaracionesReune, UserReune };
