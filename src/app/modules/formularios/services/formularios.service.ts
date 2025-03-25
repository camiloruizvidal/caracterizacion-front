import { IVersiones } from './../../../helpers/interface/interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'enviroment/enviroment';
import { Observable, map } from 'rxjs';
import {
  EFileStatus,
  IFichaFmiliar,
  IPagination,
  IResultadoGenerarArchivoExcel
} from 'src/app/helpers/interface/interface';
import { IRespuesta } from 'src/app/core/interfaces/global.interface';
import {
  IFiltrosBusqueda,
  ITarjetaRespondidas
} from '../../generador/interfaces/interface';
import { IExcelMappingTemplate as IFormatoMapeoExcel } from 'src/app/interfaces/excel-mapping-template.interface';

@Injectable({
  providedIn: 'root'
})
export class FormulariosService {
  private apiUrl = `${environment.apiUrl}/v1/ficha`;

  constructor(private http: HttpClient) {}

  public obtenerFormularios(
    page: number = 1,
    pageSize: number = 10,
    version: string = ''
  ): Observable<IPagination<any>> {
    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('pageSize', pageSize.toString());

    if (version !== '') {
      params = params.set('version', version);
    }
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

  public obtenerVersiones(isFinish: boolean = false): Observable<IVersiones[]> {
    const params = new HttpParams().set('isFinish', isFinish.toString());
    return this.http.get<IVersiones[]>(`${this.apiUrl}/versiones`, { params });
  }

  public crearNuevaVersionFicha(version: {
    nombre: string;
    grupalNombre: string;
    individualNombre: string;
  }): Observable<IVersiones> {
    return this.http.post<IVersiones>(`${this.apiUrl}/nueva_version`, {
      nombre: version.nombre,
      nombre_grupal: version.grupalNombre,
      nombre_individual: version.individualNombre
    });
  }

  public crearNuevoGrupo(data: {
    nombre: string;
    tipoFicha: string;
    version: number;
    alerta?: {
      genera_alerta: boolean;
      clasificaciones: Array<{
        nombre: string;
        rango_minimo: number;
        rango_maximo: number;
        color: string;
      }>;
    };
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/tipo`, {
      titulo: data.nombre,
      tipo: data.tipoFicha,
      version_ficha: Number(data.version),
      alerta: data.alerta
    });
  }

  public obtenerInformes(filtros: IFiltrosBusqueda[]): Observable<any[]> {
    let params = new HttpParams();

    filtros.forEach((filtro, index) => {
      params = params
        .set(`filtros[${index}][tipoTarjeta]`, filtro.tipoTarjeta)
        .set(`filtros[${index}][grupo]`, filtro.grupo)
        .set(`filtros[${index}][pregunta]`, filtro.pregunta)
        .set(`filtros[${index}][condicion]`, filtro.condicion)
        .set(`filtros[${index}][valor]`, filtro.valor);
    });

    return this.http.get<ITarjetaRespondidas[]>(
      this.apiUrl + '/busqueda_dinamica',
      { params }
    );
  }

  public guardarMapeoExcel(mapeo: IFormatoMapeoExcel): Observable<void> {
    return this.http.post<void>(this.apiUrl + '/mapeo-excel', mapeo);
  }

  public obtenerMapeoExcel(
    fichaJsonId: number
  ): Observable<IFormatoMapeoExcel> {
    return this.http
      .get<IRespuesta<IFormatoMapeoExcel>>(
        `${this.apiUrl}/encabezados-excel/${fichaJsonId}`
      )
      .pipe(map(response => response.data));
  }
}
