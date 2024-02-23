import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'enviroment/enviroment';
import { Observable } from 'rxjs';
import { ISelect } from 'src/app/helpers/interface/interface';
import { IUser } from 'src/app/modules/user/interface/user';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = `${environment.apiUrl}/v1/data`;

  constructor(private httpClient: HttpClient) {}

  public getMunicipalities(): Observable<ISelect[]> {
    return this.httpClient.get<ISelect[]>(`${this.apiUrl}/municipios`);
  }

  public getUsers(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(`${this.apiUrl}/caracterizadores`);
  }
}
