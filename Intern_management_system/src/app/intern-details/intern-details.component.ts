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

  @Output() SexChange =  new EventEmitter();
  @Output() GoBack = new EventEmitter();
  @Output() GoDelete = new EventEmitter();
  @Output() GoSort = new EventEmitter();
  @Output() Get = new EventEmitter();

  eMailFromat =  /[_a-zA-Z\d\-\.]+@[_a-zA-Z\d\-]+(\.[_a-zA-Z\d\-]+)+$/;
  NameFromat =/^[\u4e00-\u9fa5]{2,4}$/;

  NoName : Boolean = false;
  NoEmail : Boolean = false;
  ErrorPost: Boolean = false;

  OriginakCode : number = 0;

  constructor(private route: ActivatedRoute,
    private internService: InternService,
    private location: Location,
    private internstablecomponent: InternsTableComponent) { }

  

  ngOnInit(): void {
    
  }

  
  save(): void {
    if (this.intern)
    {
      this.OriginakCode = 1;
      if (!this.intern.name || !this.intern.eMail){
        this.showCode = 1.5
        this.ErrorPost = true;
        return;
      }
      if (this.NameFromat.test(this.intern.name)){
        this.showCode = 1.5
        this.NoName = true;
        return;
      }
      if (this.eMailFromat.test(this.intern.eMail))
      {
        this.NoEmail = true;
        this.showCode = 1.5;
        return;
      }
        this.SexChange.emit(this.intern);
        this.internService.putIntern(this.intern)
          .subscribe();
        this.GoBack.emit();
    }
  }

  Delete(intern:Intern): void{
    this.GoDelete.emit(intern);
    this.GoBack.emit();
  }

  Post(name : string,SexCode : string, eMail : string): void{
    name = name.trim();
    const sexCode = Number(SexCode); 
    eMail = eMail.trim();

    this.OriginakCode = 3;

    if (!name || !eMail){
      this.showCode = 3.5;
      this.ErrorPost = true;
      return;
    }

    if (!this.NameFromat.test(name)) { 
      this.NoName = true;
      this.showCode = 3.5;
      return;
    }

    if (!this.eMailFromat.test(eMail)) { 
      this.NoEmail = true;
      this.showCode = 3.5;
      return;
    }

    this.internService.postIntern({name,sexCode,eMail} as Intern)
      .subscribe(intern => {
        this.SexChange.emit(intern);
        this.Get.emit();
      });
      this.GoBack.emit();
  }

  Back(): void{
    this.Get.emit();
    this.GoBack.emit();
    this.showCode = 0;
  }

  UpPage(): void{
    this.ErrorPost = false;
    this.NoName = false;
    this.NoEmail = false;
    this.showCode = this.OriginakCode;
  }
}
