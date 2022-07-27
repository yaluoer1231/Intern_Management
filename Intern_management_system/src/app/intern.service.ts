import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Intern } from './Intern_Fromat';

@Injectable({
  providedIn: 'root'
})
export class InternService {
  InternUrl = 'https://localhost:44388/api/';

  constructor(private http: HttpClient) { }

  //GET全部
  getIntern(): Observable<Intern[]>{
    /*const Interns = of(INTERNS);
    return Interns;*/
    return this.http.get<Intern[]>(`${this.InternUrl}Intern`);
  }
  
  //PUT修改
  putIntern(intern:Intern): Observable<any>{
    if (intern.sex == "男")
      intern.sexCode = 1;
    if (intern.sex == "女")
      intern.sexCode = 2;
    return this.http.put(`${this.InternUrl}Intern/${intern.id}`, intern);
  }

  //DELETE刪除
  deleteHero(id: number): Observable<Intern> {
    const url = `${this.InternUrl}${id}`;
    return this.http.delete<Intern>(url);

  }
}