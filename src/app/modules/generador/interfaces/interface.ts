export type typeRule = '=' | 'rangoFecha';

export interface IGruposFicha {
  id: number;
  title: string;
  subtitle?: string | null;
  orden: number;
  ficha_tipo_id?: number;
}

//Formulario
export interface IFamilyCard {
  isFinish: boolean;
  version?: string;
  dateLastVersion?: Date;
  grupalNombre: string;
  individualNombre: string;
  grupalData: IStepers[];
  individualData: IStepers[];
}

export interface IStepers {
  id?: number | string;
  orden?: number;
  title: string;
  subtitle?: string | null;
  table?: string;
  ficha_tipo_id?: string | number;
  values?: ISteperValues[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface ISteperValues {
  id?: number;
  columnName?: string;
  orden?: number;
  label: string;
  description?: string | null;
  type: ESteperType | string;
  options: IOptionsCheck | IOptionsSelect[] | IOptionsSelectFilter | null | any;
  default: boolean | string | null;
  visibility: IOptionsVisibility | boolean | null;
  required: IOptionsRequired | boolean | null;
  value?: any;
  ficha_grupo_id?: string | number | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export enum ESteperType {
  Address = 'address',
  Calendar = 'calendar',
  Photo = 'photo',
  Check = 'check',
  Email = 'email',
  Filter = 'filter',
  GPS = 'gps',
  Numbers = 'numbers',
  Phone = 'phone',
  Relationship = 'relationship',
  Select = 'select',
  SelectFilter = 'selectFilter',
  Text = 'text',
  TextArea = 'textarea',
  Title = 'title',
  SubTitle = 'subtitle',
  Ruta = 'ruta_atencion',
  selectMultiple = 'select_multiple'
}

export interface IOptionsCheck {
  valueTrue: string;
  valueFalse: string;
}

export interface IOptionsSelect {
  value: string;
  option: any;
}

export interface IOptionsRequired {
  isDepend: boolean;
  rules: any;
  required: boolean;
}

export interface IOptionsVisibility {
  isDepent: boolean;
  rules: IOptionsRule[] | null;
  isShow: boolean;
}

export interface IOptionsRule {
  columnDepend: string;
  rule: typeRule;
  value: string;
}
export interface ICodes {
  id?: number;
  user_id?: number;
  start: number;
  finish: number;
}

export interface IOptionsSelectFilter {
  label: string;
  tabla_destino: string;
  item_busqueda: string;
  relaciones: IOptionsSelectFilterRelaciones[];
  formato_listado_mostrar: string;
  create_new: boolean;
  label_no_exist?: string;
}

export interface IOptionsSelectFilterRelaciones {
  origen: string;
  destino: string;
}

export type TipoForm = 'grupalNombre' | 'individualNombre';
export type TipoDataForm = 'grupalData' | 'individualData';

export enum EConditions {
  MAYOR_QUE = '>',
  MAYOR_O_IGUAL_QUE = '>=',
  MENOR_QUE = '<',
  MENOR_O_IGUAL_QUE = '<=',
  IGUAL_QUE = '===',
  DIFERENTE_QUE = '!==',
  VACIO = 'null'
}
export interface ICondiciones {
  text: string;
  condition: string;
}

export const condiciones: ICondiciones[] = [
  { condition: EConditions.MAYOR_QUE, text: 'Mayor que' },
  { condition: EConditions.MAYOR_O_IGUAL_QUE, text: 'Mayor O igual que' },
  { condition: EConditions.MENOR_QUE, text: 'Menor que' },
  { condition: EConditions.MENOR_O_IGUAL_QUE, text: 'Menor O Igual que' },
  { condition: EConditions.IGUAL_QUE, text: 'Igual que' },
  { condition: EConditions.DIFERENTE_QUE, text: 'Diferente que' },
  { condition: EConditions.VACIO, text: 'Vacio' }
];
