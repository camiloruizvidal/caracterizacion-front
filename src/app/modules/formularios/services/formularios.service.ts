import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormulariosService {
  private apiUrl = 'http://localhost:3000/api/v1/usuarios';

  constructor(private http: HttpClient) {}
}
