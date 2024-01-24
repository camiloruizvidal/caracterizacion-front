export interface IUser {
    id: number;
    password: string;
    nombrePrimero: string;
    nombreSegundo?: string;
    apellidoPrimero: string;
    apellidoSegundo?: string;
    documento: string;
    documentoTipoId: number;
}

export interface IUserDetail extends Omit<IUser, 'password'> { }