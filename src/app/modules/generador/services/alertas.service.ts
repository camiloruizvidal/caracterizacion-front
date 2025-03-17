import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'enviroment/enviroment';
import { Observable } from 'rxjs';
import { IAlertas } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Obtener los grupos de alertas por ficha_id
  public obtenerGrupos(fichaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${fichaId}/grupos/`);
  }

  // Guardar los grupos con sus condiciones
  public guardarGrupos(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/guardar/grupos`, data);
  }
}
