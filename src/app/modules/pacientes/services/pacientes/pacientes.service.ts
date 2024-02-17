import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPacienteId } from '../../interface/pacientes';
import { IPagination } from 'src/app/helpers/interface/interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PacientesService {
  private apiUrl = 'http://localhost:3000/api/v1/pacientes';
  constructor(private http: HttpClient) {}

  public getPatients(
    page: number = 1,
    pageSize: number = 10
  ): Observable<IPagination<IPacienteId>> {
    const params = { page: page.toString(), pageSize: pageSize.toString() };
    return this.http.get<IPagination<IPacienteId>>(this.apiUrl, { params });
  }

  public sendFile(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/carga`, formData);
  }
}
