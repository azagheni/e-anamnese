import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Anamnese } from '../model/anamnese';

@Injectable({
  providedIn: 'root'
})
export class AnamneseService {

  private hash: string = '?lg=gz';
  private apiUrl = 'https://api.e-anamnese.com.br/anamneses';
  // Definição dos headers
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8'
    })
  };

  constructor(private http: HttpClient) {}

  getAnamneses(): Observable<Anamnese[]> {
    return this.http.get<Anamnese[]>(`${this.apiUrl}${this.hash}`, this.httpOptions);
  }

  getAnamnese(id: number): Observable<Anamnese> {
    return this.http.get<Anamnese>(`${this.apiUrl}/${id}`, this.httpOptions);
  }

  addAnamnese(anamnese: Anamnese): Observable<Anamnese> {
    return this.http.post<Anamnese>(`${this.apiUrl}${this.hash}`, anamnese, this.httpOptions);
  }

  updateAnamnese(id: number, anamnese: Anamnese): Observable<Anamnese> {
    return this.http.put<Anamnese>(`${this.apiUrl}/${id}${this.hash}`, anamnese, this.httpOptions);
  }

  deleteAnamnese(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}${this.hash}`);
  }
}
