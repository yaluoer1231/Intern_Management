import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Intern } from './Intern_Fromat';
import { INTERNS } from './Intern_Data';

@Injectable({
  providedIn: 'root'
})
export class InternService {
  InternUrl = 'https://localhost:44388/api/';

  constructor(private http: HttpClient) { }


  /*getIntern(): Observable<Intern[]>{
    const Interns = of(INTERNS);
    return Interns;
  }*/
  
  getIntern(): Observable<Intern[]>{
    //const Interns = of(INTERNS);
    return this.http.get<Intern[]>(`${this.InternUrl}Intern`);
  }
}