import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = `${environment.apiUrl}/v1/usuarios`;

  constructor(private httpClient: HttpClient) {}

  public loguearse(credenciales: { username: string; password: string }) {
    const url = `${this.apiUrl}/login`;

    return this.httpClient.post(url, credenciales);
  }
}
