import { Injectable } from '@angular/core';

import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Note } from './Note_Fromat';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  InternUrl = 'https://localhost:44388/api/';

  constructor(private http: HttpClient) { }

  //GET全部
  getIntern(): Observable<Note[]>{
    /*const Interns = of(INTERNS);
    return Interns;*/
    return this.http.get<Note[]>(`${this.InternUrl}InternNote`);
  }

  //PUT
  putIntern(Note: Note): Observable<any>{
    return this.http.put(`${this.InternUrl}Intern/${Note.id}`, Note);
  }
}
