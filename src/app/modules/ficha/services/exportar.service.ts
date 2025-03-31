import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'enviroment/enviroment';
import { Observable } from 'rxjs';

interface IRespuestaExportacion {
  code: number;
  msj: string;
  data: {
    url: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ExportarService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  exportarFicha(version: string): Observable<IRespuestaExportacion> {
    return this.http.get<IRespuestaExportacion>(
      `${this.apiUrl}/v1/ficha/formato/${version}`
    );
  }
}
