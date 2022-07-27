import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Intern } from './Intern_Fromat';

@Injectable({
  providedIn: 'root'
})
export class InternService {
  InternUrl = 'https://localhost:44388/api/';

  constructor(private http: HttpClient) { }

  getIntern(): Observable<Intern[]>{
    /*const Interns = of(INTERNS);
    return Interns;*/
    const Interns = this.http.get<Intern[]>(`${this.InternUrl}Intern`)
    return Interns;
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      console.error(error);
      return of(result as T);
    };
  }
}