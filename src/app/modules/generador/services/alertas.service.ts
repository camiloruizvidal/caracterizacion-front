import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'enviroment/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {
  private apiUrl = `${environment.apiUrl}/v1/alertas`;

  constructor(private http: HttpClient) {}

  // Obtener todas las alertas
  public obtenerAlertas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // Obtener los grupos de alertas por ficha_id
  public obtenerGrupos(fichaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${fichaId}/grupos/`);
  }

  // Guardar los grupos con sus condiciones
  public guardarGrupos(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/guardar/grupos`, data);
  }
}
