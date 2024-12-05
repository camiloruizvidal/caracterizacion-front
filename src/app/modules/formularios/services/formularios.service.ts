import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'enviroment/enviroment';
import { Observable } from 'rxjs';
import {
  EFileStatus,
  IFichaFmiliar,
  IPagination,
  IResultadoGenerarArchivoExcel
} from 'src/app/helpers/interface/interface';

@Injectable({
  providedIn: 'root'
})
export class FormulariosService {
  private apiUrl = `${environment.apiUrl}/v1/ficha`;

  constructor(private http: HttpClient) {}

  public obtenerFormularios(
    page: number = 1,
    pageSize: number = 10
  ): Observable<IPagination<any>> {
    const params = { page: page.toString(), pageSize: pageSize.toString() };
    return this.http.get<IPagination<any>>(this.apiUrl + '/backup', { params });
  }

  public procesarTarjetasUltimaVersion(): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/procesar', {});
  }

  public obtenerDatosFicha(filtro: {
    fechaInicio?: string;
    fechaFin?: string;
    usuarioId?: string;
    municipio?: string;
    page?: number;
    pageSize?: number;
  }): Observable<IPagination<IFichaFmiliar>> {
    const params = new HttpParams()
      .set('page', filtro.page ?? 1)
      .set('pageSize', filtro.pageSize ?? 10)
      .set('fechaInicio', filtro.fechaInicio ?? '')
      .set('fechaFin', filtro.fechaFin ?? '')
      .set('usuarioId', filtro.usuarioId ?? '')
      .set('municipio', filtro.municipio ?? '');

    return this.http.get<IPagination<IFichaFmiliar>>(this.apiUrl + '/detalle', {
      params
    });
  }

  public generarExcelTarjetasProcesadas(): Observable<IResultadoGenerarArchivoExcel> {
    return this.http.get<IResultadoGenerarArchivoExcel>(
      this.apiUrl + '/informecompleto'
    );
  }

  public validarEstadoExcel(
    fileName: string
  ): Observable<{ estado: EFileStatus }> {
    return this.http.get<{ estado: EFileStatus }>(
      this.apiUrl + '/informecompleto/' + fileName
    );
  }

  public verificarArchivo(url: string): Promise<boolean> {
    return this.http
      .head(url, { observe: 'response' })
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }
}
