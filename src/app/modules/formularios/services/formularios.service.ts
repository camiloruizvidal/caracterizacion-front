import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPagination } from 'src/app/helpers/interface/interface';

@Injectable({
  providedIn: 'root',
})
export class FormulariosService {
  private apiUrl = 'http://localhost:3000/api/v1/ficha';

  constructor(private http: HttpClient) {}

  public obtenerFormularios(
    page: number = 1,
    pageSize: number = 10
  ): Observable<IPagination<any>> {
    const params = { page: page.toString(), pageSize: pageSize.toString() };
    return this.http.get<IPagination<any>>(this.apiUrl + '/backup', { params });
  }
}
