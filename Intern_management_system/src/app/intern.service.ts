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


  getIntern(): Observable<Intern[]>{
    const Interns = of(INTERNS);
    return Interns;
  }
  
  getHero(id: number): Observable<Intern> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const hero = INTERNS.find(h => h.id === id)!;
    return of(hero);
  }

  /*getIntern(): Observable<Intern[]>{
    //const Interns = of(INTERNS);
    return this.http.get<Intern[]>(`${this.InternUrl}Intern`);
  }*/
}