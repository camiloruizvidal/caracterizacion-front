import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDocumentType, IRols, IUser, IUserDetail } from '../../interface/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = 'http://localhost:3000/api/v1/usuarios';

  constructor(private http: HttpClient) {}

  getUsers(page: number = 1, pageSize: number = 10): Observable<any> {
    const params = { page: page.toString(), pageSize: pageSize.toString() };
    return this.http.get<IUserDetail[]>(this.apiUrl, { params });
  }

  createUser(newUser: IUser): Observable<IUserDetail> {
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
}
