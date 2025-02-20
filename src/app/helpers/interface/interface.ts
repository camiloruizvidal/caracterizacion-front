export interface IPagination<T> {
  data: T[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}

export interface IFichaFmiliar {
  id: number;
  version: number;
  usuario_creacion_id: number;
  usuario_creacion: {
    id: number;
    username: string;
    nombrePrimero: string;
    nombreSegundo: string;
    apellidoPrimero: string;
    apellidoSegundo: string;
    documento: string;
    documentoTipoId: number;
    rolId: number;
  };
  codigo: number;
  fecha_registro: Date;
  created_at: Date;
  updated_at: Date;
  tarjetasFamiliares: ITarjetasFamiliares;
  psicosocialPersonas: IPsicosocialPersona[];
}

export interface IFichaYDescripcion {
  ficha: IFichaFmiliar;
  descripcion: IFichaDescripcion[];
}

export interface IFichaDescripcion {
  id: number;
  columnName: string;
  orden: number;
  label: string;
  description: null;
  type: string;
  options: string;
  default: null;
  visibility: string;
  required: string;
  ficha_grupo_id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPsicosocialPersona {
  id: number;
  ustedesRecibieronAyuda: null;
  ustedesRecibieronAyudaDeQuien: null;
  ustedesRecibieronAyudaQueTipo: null;
  principalNecesidad: null;
  desplazamiento: null;
  deQueLugar: null;
  deseosVolver: null;
  despuesDesplazamientoRechazoDiscriminacion: null;
  cambiosDespuesDesplazamiento: null;
  afectadosNegativamenteDesplazamiento: null;
  desplazamientoPositivo: null;
  aGustoEnVivienda: null;
  queLeGustaOMenosGusta: null;
  lugarPreferidoDentroCasa: null;
  consumoAlimentos: null;
  casosMaltratoOViolencia: null;
  ayudaODenuncia: null;
  decisionesImportantesEnFamilia: null;
  correccionDeProblemasEnFamilia: null;
  resolucionProblemasEnComunidad: null;
  necesidadCapacitarse: null;
  enQueOPorqueCapacitarse: null;
  emprenderNegocio: null;
  deQueOPorqueEmprender: null;
  condicionesVidaEnUnAno: null;
  molestiasSalud: null;
  cambiosEnMenores15Anos: null;
  dedicacionTiempoLibre: null;
  felicidadActual: null;
  personaId: number;
  fichaId: number;
  created_at: Date;
  updated_at: Date;
  persona: IPersona;
}

export interface IPersona {
  id: number;
  documento_tipo: string;
  documento_numero: string;
  genero: string;
  nombre_primero: string;
  nombre_segundo: string;
  apellido_primero: string;
  apellido_segundo: string;
  fecha_nacimiento: Date;
  estado_civil: string;
  parentesco: string;
  ocupacion: string;
  aporta_ingresos: string;
  nivel_escolaridad: string;
  tipo_afiliacion_salud: string;
  grupo_atencion_especial: null;
  discapacidad: string;
  created_at: Date;
  updated_at: Date;
}

export interface ITarjetasFamiliares {
  id: number;
  direccion: string;
  barrio: null;
  municipio: string;
  telefono: null;
  participa_organizacion_comunitaria: string;
  participa_organizacion_comunitaria_si: null;
  cuantas_personas_residen_en_la_vivienda: number;
  cuantas_familias_residen_en_esta_vivienda: number;
  ubicacion_gps: UbicacionGps;
  tipo_vivienda: string;
  tipo_vivienda_valor_arriendo: null;
  tipo_vivienda_otro: null;
  lote_legalizado: string;
  estrato_vivienda: null;
  trabajo_en_casa: null;
  trabajo_en_casa_cual: null;
  ingresos_mensuales_familia: string;
  gastos_servicios_publicos: null;
  acceso_facil_vivienda: string;
  desplazamiento_escuela_centro_estudio: null;
  tiempo_promedio_desplazamiento_escuela: null;
  desplazamiento_trabajo: null;
  tiempo_promedio_desplazamiento_trabajo: null;
  desplazamiento_salud: null;
  tiempo_promedio_desplazamiento_salud: null;
  cocina_sitio_preparar_alimentos: null;
  combustible_cocinar: null;
  servicios_basicos_vivienda: null;
  conformidad_servicios: null;
  por_que_no_conformidad: null;
  origen_agua_consumo: null;
  origen_agua_consumo_otro: null;
  regularidad_obtencion_agua: null;
  almacenamiento_agua: null;
  frecuencia_lavado_tanque_recipiente: null;
  ubicacion_tanque_recipiente: null;
  tratamiento_agua: null;
  tratamiento_agua_tiempo_hervir_agua: null;
  tratamiento_agua_otro: null;
  servicio_sanitario: string;
  disposicion_final_basuras: null;
  disposicion_final_basuras_otro: null;
  separacion_residuos_reciclaje: null;
  proteccion_contra_animales_plagas_vectores: null;
  proteccion_contra_animales_plagas_vectores_otros: null;
  guardado_ropa_vivienda: null;
  guardado_ropa_vivienda_otro: null;
  guardado_individual_ropa: null;
  aseo_en_vivienda: null;
  aseo_en_vivienda_otro: null;
  uso_detergentes_desinfectantes_aseo: null;
  uso_final_plaguicidas: null;
  uso_final_plaguicidas_otro: null;
  lavar_verduras_frutas_crudas: null;
  encender_velas_velones: string;
  frecuencia_humo_en_vivienda: string;
  accidente_lesion_ultimo_anio: null;
  tipo_lesion_accidente: null;
  secuelas_accidentes: string;
  accidentes_frecuentes_en_ninos: null;
  hay_ninos_menores_5_anos: string;
  menores_cinco_annos: null;
  morbilidad_agudo: null;
  busqueda_ayuda_enfermedad_ninos: null;
  edad_promedio_lactancia_materna: null;
  esquema_vacunacion_completo_ninos: string;
  esquema_vacunacion_completo_ninos_porque_no: null;
  purgado_ninos_ultimo_anio: string;
  purgado_ninos_ultimo_anio_cuantas_veces: null;
  mayores_cinco_annos: null;
  mayores_cinco_annos_morbilidad_aguda: null;
  otra_enfermedad_ultimo_mes: null;
  sufrimiento_enfermedades: null;
  enfermedades_miembros_familia: null;
  frecuencia_visitas_odontologo: string;
  muerte_familiares_ultimo_cinco_anos_violenta_accidente: null;
  muerte_familiares_ultimo_cinco_anos_violenta_accidente_otro: null;
  tipo_vivienda_repetido: string;
  autoconstruccion_vivienda: string;
  topografia_terreno: null;
  cerca_vivienda: null;
  cerca_zonas_recreativas: null;
  material_piso: null;
  material_paredes: null;
  material_techo: null;
  ambientes_separados: null;
  cuartos_dormitorio: null;
  observe_donde_duerme_personas: null;
  cantidad_camas: null;
  ventilacion_natural_cocina: null;
  elementos_separados_casa: null;
  tipo_alumbrado: null;
  elementos_pertenencias: null;
  disposicion_excretas: null;
  sanitario_letrina_distancia_cercana: null;
  cantidad_inodoros_sanitarios: null;
  ubicacion_sanitario: null;
  lavamanos_cerca_sanitario: null;
  manejo_basura: null;
  recogida_basura: null;
  convivencia_animales: null;
  lugar_preparacion_alimentos: null;
  material_mesa_alimentos: null;
  almacenamiento_alimentos: null;
  almacenamiento_conjunto_productos: null;
  notas: null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UbicacionGps {
  lat: number;
  lng: number;
}

export interface ISelect {
  value: string;
  option: string;
}

export enum ESteperType {
  Address = 'address',
  Calendar = 'calendar',
  Photo = 'photo',
  Check = 'check',
  CheckSiNo = 'checkSiNo',
  Email = 'email',
  Filter = 'filter',
  GPS = 'gps',
  Numbers = 'numbers',
  Phone = 'phone',
  Relationship = 'relationship',
  Select = 'select',
  SelectFilter = 'selectFilter',
  SelectDependiente = 'selectDependiente',
  Text = 'text',
  TextArea = 'textarea',
  Title = 'title',
  SubTitle = 'subtitle',
  Ruta = 'ruta_atencion',
  SelectMultiple = 'select_multiple'
}

export enum EFichaTipo {
  FichaFamliiar = 'grupalNombre',
  FichaPersonal = 'individualNombre'
}

export interface IResultadoGenerarArchivoExcel {
  fileName: string;
  url: string;
}

export enum EFileStatus {
  NOT_STARTED = 'Invalido',
  IN_PROGRESS = 'Procesando',
  COMPLETED = 'Completo'
}

export interface IVersiones {
  version: string;
  grupalNombre: string;
  individualNombre: string;
  nombre: string;
}
