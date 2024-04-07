import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'enviroment/enviroment.local';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InputsService {
  private apiUrl = `${environment.apiUrl}/v1/ficha`;
  constructor(private http: HttpClient) {}

  public obtenerGruposFichas(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/obtener/grupos');
  }

  public guardarFormulario(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/ficha/nueva', data);
  }
}
