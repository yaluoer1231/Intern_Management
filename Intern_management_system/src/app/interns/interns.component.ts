import { Component, OnInit } from '@angular/core';
import { Intern } from '../Intern_Fromat';

import { InternService } from '../intern.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-interns',
  templateUrl: './interns.component.html',
  styleUrls: ['./interns.component.scss']
})
export class InternsComponent implements OnInit {

  Interns : Intern[]= [];
  selectedintern?: Intern;

  constructor(private internService : InternService) { }

  ngOnInit(): void {
    //this.getIntern();
    this.getList();
  }

  /*getIntern(): void {
    //this.internService.getIntern().subscribe(Interns => this.Interns = Interns); 
    this.internService.getIntern().subscribe(
      (data: any) => {this.Interns = data},
    //接收回傳值
      (error: HttpErrorResponse) => {console.log('ERROR')}
      )
  }*/

  onSelect(intern: Intern): void {
    this.selectedintern = intern;
  }

  getList() {
    this.internService.getIntern().subscribe(
      (data: any) => {this.Interns = data},
    //接收回傳值
      (error: HttpErrorResponse) => {console.log('ERROR')}
      );
    }  
}
