import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'enviroment/enviroment';

export interface ICargaResponse {
  carga_id: number;
  message: string;
  estado: 'registrado' | 'cancelado' | 'rechazado';
}

@Injectable({
  providedIn: 'root'
})
export class CargasService {
  private apiUrl = `${environment.apiUrl}/v1/cargas`;
  private readonly STORAGE_KEY = 'carga_actual';

  constructor(private http: HttpClient) {}

  public cargarArchivo(
    fichaId: number,
    archivo: File
  ): Observable<ICargaResponse> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('fichaId', fichaId.toString());

    // Simulamos la respuesta del servidor
    return of({
      carga_id: Math.floor(Math.random() * 1000),
      message: 'Archivo subido con éxito. Se está procesando...',
      estado: 'registrado'
    });
  }

  public guardarCargaEnLocalStorage(carga: ICargaResponse): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(carga));
  }

  public obtenerCargaDelLocalStorage(): ICargaResponse | null {
    const cargaStr = localStorage.getItem(this.STORAGE_KEY);
    return cargaStr ? JSON.parse(cargaStr) : null;
  }

  public verificarEstadoCarga(cargaId: number): Observable<ICargaResponse> {
    // Simulamos la verificación del estado
    return of({
      carga_id: cargaId,
      message: 'La carga está en proceso',
      estado: 'registrado'
    });
  }

  public limpiarCargaDelLocalStorage(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
