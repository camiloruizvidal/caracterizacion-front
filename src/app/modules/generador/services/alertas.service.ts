import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'enviroment/enviroment';
import { Observable, of } from 'rxjs';
import { IAlertas } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {
  private apiUrl = `${environment.apiUrl}/v1/alertas`;
  constructor(private http: HttpClient) {}

  public obtenerAlertas(): Observable<IAlertas[]> {
    return this.http.get<IAlertas[]>(this.apiUrl);
  }
}
