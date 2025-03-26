import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'enviroment/enviroment';

export enum EEstadoCargaEnum {
  INGRESADO = 'ingresado',
  PROCESANDO = 'procesando',
  CARGADO = 'cargado',
  ERROR = 'error'
}

export interface ICargaResponse {
  code: number;
  msj: string;
  data: {
    id: number;
    estado: EEstadoCargaEnum;
    cantidad_registros: number;
    mensaje_error: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class CargasService {
  private apiUrl = `${environment.apiUrl}/v1/carga`;
  private readonly STORAGE_KEY = 'carga_actual';

  constructor(private http: HttpClient) {}

  public cargarArchivo(
    fichaId: number,
    archivo: File
  ): Observable<ICargaResponse> {
    const formData = new FormData();
    formData.append('excel', archivo);
    formData.append('fichaId', fichaId.toString());

    return this.http.post<ICargaResponse>(this.apiUrl, formData);
  }

  public verificarEstadoCarga(cargaId: number): Observable<ICargaResponse> {
    return this.http.get<ICargaResponse>(`${this.apiUrl}/${cargaId}`);
  }

  public guardarCargaEnLocalStorage(carga: ICargaResponse): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(carga));
  }

  public obtenerCargaDelLocalStorage(): ICargaResponse | null {
    const cargaStr = localStorage.getItem(this.STORAGE_KEY);
    return cargaStr ? JSON.parse(cargaStr) : null;
  }

  public limpiarCargaDelLocalStorage(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
