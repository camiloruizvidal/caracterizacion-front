export interface IRespuesta<T> {
  code: number;
  msj: string;
  data: T;
}
