import { Injectable } from '@angular/core';

import { Intern } from './Intern_Fromat';
import { INTERNS } from './Intern_Data';

@Injectable({
  providedIn: 'root'
})
export class InternService {

  constructor() { }

  getIntern(): Intern[]{
    return INTERNS;
  }
  /*getIntern():Observable<Intern[]>{
    const Interns = of(INTERNS);
    return Interns;
  }*/

}
