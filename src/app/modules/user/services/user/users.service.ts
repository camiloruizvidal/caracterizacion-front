import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDocumentType, IRols, IUserDetail } from '../../interface/user';
import { Observable } from 'rxjs';
import { IPagination } from 'src/app/helpers/interface/interface';
import { environment } from 'enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = `${environment.apiUrl}/v1/usuarios`;

  constructor(private http: HttpClient) {}

  getUsers(
    page: number = 1,
    pageSize: number = 10
  ): Observable<IPagination<IUserDetail>> {
    const params = { page: page.toString(), pageSize: pageSize.toString() };
    return this.http.get<IPagination<IUserDetail>>(this.apiUrl, { params });
  }

  getUser(idUser: number): Observable<IUserDetail> {
    return this.http.get<IUserDetail>(`${this.apiUrl}/detail/${idUser}`);
  }

  createUser(newUser: IUserDetail): Observable<IUserDetail> {
    return this.http.post<IUserDetail>(this.apiUrl, newUser);
  }

  updateUser(id: number, updatedUser: IUserDetail): Observable<IUserDetail> {
    return this.http.put<IUserDetail>(`${this.apiUrl}/${id}`, updatedUser);
  }

  getRols(): Observable<IRols[]> {
    return this.http.get<IRols[]>(`${this.apiUrl}/roles`);
  }

  getDocumentsTypes(): Observable<IDocumentType[]> {
    return this.http.get<IDocumentType[]>(`${this.apiUrl}/documentoTipo`);
  }

  reinciarContrasennaAdmin(id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/cambiarPass`, { id });
  }
}
