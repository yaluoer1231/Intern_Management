import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Intern } from '../Intern_Fromat';
import { InternService } from '../intern.service';
import { InternsTableComponent } from '../interns-table/interns-table.component';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ReturnStatement } from '@angular/compiler';

@Component({
  selector: 'app-intern-details',
  templateUrl: './intern-details.component.html',
  styleUrls: ['./intern-details.component.scss']
})
export class InternDetailsComponent implements OnInit {

  @Input() intern? : Intern;
  @Input() showCode? : number;

  @Output() sexChange =  new EventEmitter();
  @Output() backPage = new EventEmitter();
  @Output() goDelete = new EventEmitter();
  @Output() goSort = new EventEmitter();
  @Output() refreshPage = new EventEmitter();

  eMailFromat =  /[_a-zA-Z\d\-\.]+@[_a-zA-Z\d\-]+(\.[_a-zA-Z\d\-]+)+$/;
  nameFromat =/^[\u4e00-\u9fa5]{2,4}$/;

  noName : Boolean = false;
  noEmail : Boolean = false;
  errorPost: Boolean = false;

  originakCode : number = 0;

  constructor(private route: ActivatedRoute,
    private internService: InternService,
    private location: Location,
    private internstablecomponent: InternsTableComponent) { }

  

  ngOnInit(): void {
    
  }

  
  save(): void {
    if (this.intern)
    {
      this.originakCode = 1;

      if (!this.intern.name || !this.intern.eMail){
        this.showCode = 1.5
        this.errorPost = true;
      }
      if (this.nameFromat.test(this.intern.name)){
        this.showCode = 1.5
        this.noName = true;
      }
      if (this.eMailFromat.test(this.intern.eMail)){
        this.noEmail = true;
        this.showCode = 1.5;
      }

      if (this.showCode == 1){
        this.sexChange.emit(this.intern);
        this.internService.putIntern(this.intern)
          .subscribe();
        this.backPage.emit();
      }
      else{
        return;
      }
    }
  }

  delete(intern:Intern): void{
    this.goDelete.emit(intern);
    this.backPage.emit();
  }

  post(name : string,SexCode : string, eMail : string): void{
    name = name.trim();
    const sexCode = Number(SexCode); 
    eMail = eMail.trim();

    this.originakCode = 3;

    if (!name || !eMail){
      this.showCode = 3.5;
      this.errorPost = true;
      return;
    }

    if (!this.nameFromat.test(name)) { 
      this.noName = true;
      this.showCode = 3.5;
      return;
    }

    if (!this.eMailFromat.test(eMail)) { 
      this.noEmail = true;
      this.showCode = 3.5;
      return;
    }

    if (this.showCode = 3){
    this.internService.postIntern({name,sexCode,eMail} as Intern)
      .subscribe(intern => {
        this.sexChange.emit(intern);
        this.refreshPage.emit();
      });
      this.backPage.emit();
    }
    else{
      return;
    }
  }

  back(): void{
    this.refreshPage.emit();
    this.backPage.emit();
    this.showCode = 0;
  }

  upPage(): void{
    this.errorPost = false;
    this.noName = false;
    this.noEmail = false;
    this.showCode = this.originakCode;
  }
}
