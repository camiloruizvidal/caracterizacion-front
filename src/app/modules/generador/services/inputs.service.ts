import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'enviroment/enviroment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InputsService {
  private apiUrl = `${environment.apiUrl}/v1/ficha`;
  constructor(private http: HttpClient) {}

  public obtenerGruposFichas(
    fichaId: number,
    tipo: 'grupalData' | 'individualData' = 'grupalData'
  ): Observable<any> {
    let params = new HttpParams();

    const tipoData = tipo === 'grupalData' ? 'grupal_data' : 'individual_data';
    params = params.set('tipo', tipoData);
    params = params.set('ficha_id', fichaId);
    return this.http.get<any>(this.apiUrl + '/obtener/grupos', { params });
  }

  public guardarFormulario(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/ficha/nueva', data);
  }

  public obtenerFormularioJson(id: number): Observable<any> {
    return this.http.get(this.apiUrl + '/ficha/obtenerJson/' + id.toString());
  }

  public crearGrupo(data: { title: string; ficha_tipo_id: number }) {
    return this.http.post(this.apiUrl + '/ficha/grupo_nuevo', data);
  }
}
