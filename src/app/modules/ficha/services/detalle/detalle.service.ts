import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'enviroment/enviroment';
import { Observable } from 'rxjs';
import { IFichaYDescripcion } from 'src/app/helpers/interface/interface';

@Injectable({
  providedIn: 'root'
})
export class DetalleService {
  private apiUrl = `${environment.apiUrl}/v1/ficha`;

  constructor(private httpClient: HttpClient) {}

  public cargarFichaDetalle(idFicha: number): Observable<IFichaYDescripcion> {
    return this.httpClient.get<IFichaYDescripcion>(`${this.apiUrl}/${idFicha}`);
  }
}
