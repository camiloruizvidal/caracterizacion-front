export interface IUser {
  id: number;
  password: string;
  nombrePrimero: string;
  nombreSegundo?: string;
  apellidoPrimero: string;
  apellidoSegundo?: string;
  documento: string;
  documentoTipoId: number;
  rolId: number;
  rol: any;
}

export interface IUserDetail extends Omit<IUser, 'password'> {
  username?: string;
  codigoInicial?: string;
  codigoFinal?: string;
}

export interface IRols {
  id: number;
  type: string;
}

export interface IDocumentType {
  id: number;
  prefijo: string;
  tipoDocumento: string;
  nombre: string;
}
