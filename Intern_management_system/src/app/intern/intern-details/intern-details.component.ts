import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Intern } from '../Intern_Fromat';
import { InternService } from '../intern.service';
import { InternsTableComponent } from '../interns-table/interns-table.component';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ReturnStatement } from '@angular/compiler';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-intern-details',
  templateUrl: './intern-details.component.html',
  styleUrls: ['./intern-details.component.scss','./button.scss','./details-layouts.scss']
})
export class InternDetailsComponent implements OnInit {

  @Input() intern? : Intern;
  @Input() internLength? : number;
  @Input() showCode? : number;

  @Output() sexChange =  new EventEmitter();
  @Output() backPage = new EventEmitter();
  @Output() goDelete = new EventEmitter();
  @Output() goSort = new EventEmitter();
  @Output() refreshPage = new EventEmitter();
  @Output() changeCode = new EventEmitter();

  //與表單欄位綁定
  name = '';
  borndate = '';
  lineId = '';
  phonenumber = '';
  eMail = '';

  //錯誤訊息
  nameError = '';
  bornError = '';
  lineIdError = '';
  phonenumberError = '';
  eMailError = '';

  //該輸入的資料有空白或是錯誤時使用
  noName : Boolean = false;
  noEmail : Boolean = false;
  errorPost: Boolean = false;
  //捕捉今年的時間
  dateNow : number = new Date().getFullYear();
  //年月日陣列
  year : number[] = [];
  month : number[] = [1,2,3,4,5,6,7,8,9,10,11,12];
  day : number[] = [];
  //選擇的年月日
  selectYear = 0;
  selectMonth = 0;
  selectDay = 0;
  //將選擇的年月日變成輸出用的個式
  showDate = "";
  //當有錯誤發生時暫時紀錄原來使用的功能代號
  originakCode : number = 0;

  constructor(private route: ActivatedRoute,
    private internService: InternService,
    private location: Location,
    private internstablecomponent: InternsTableComponent) { }

  

  ngOnInit(): void {
    this.setYYMM();
  }
  
  setCode(num: number): void{
    this.changeCode.emit(num);
  }

  //表格辨識
  insuredNameChange(name : string, errors: ValidationErrors| null): void{
    this.name = name;
    this.nameError = this.getNameErrorMessage(errors);
  }

  private getNameErrorMessage(errors: ValidationErrors| null): string{
    let errorMessage = '';
    var nameFromat = /^[\u4e00-\u9fa5]{2,4}$/;
    if(errors?.['required']){
      errorMessage = '必填' 
    }
    else if(errors?.['minlength'] || errors?.['miaxlength']||!nameFromat.test(this.name)){
      errorMessage = '請輸入正確的姓名'
    }
    return errorMessage;
  }

  put(): void{
    if(this.intern){
      this.setCode(1);
      this.selectYear = this.intern.borndate.getFullYear();
      this.selectMonth = this.intern.borndate.getMonth()+1;
      this.selectDay = this.intern.borndate.getDate();
      this.setDD();
    }
  }

  save(name : string): void {
    if (this.intern)
    {
      name = name.trim();
      if (!name || !this.intern.eMail){
        this.showCode = 5;
        this.errorPost = true;
      }
      
      this.intern.name = name;
      this.originakCode = 1;

      this.fromatTest(this.intern.name,this.intern.eMail)

      if (this.showCode == 5){return;}

      if (this.showCode == 1){
        this.setDate();
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
    if (this.internLength! > 1){
      this.goDelete.emit(intern);
      this.backPage.emit();
    }
    else{
      this.showCode = 6;
    }

  }


  fromatTest(name: string,eMail: string): void{   
    //E-Mail和姓名格式的檢測
    var eMailFromat = /[_a-zA-Z\d\-\.]+@[_a-zA-Z\d\-]+(\.[_a-zA-Z\d\-]+)+$/;
    var nameFromat = /^[\u4e00-\u9fa5]{2,4}$/;
    if (!nameFromat.test(name)) { 
      this.noName = true;
      this.showCode = 5;
    }

    if (!eMailFromat.test(eMail)) { 
      this.noEmail = true;
      this.showCode = 5;
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

  setYYMM(): void{
    if (this.year.length < 1){
      for(var i = 0; i < 100 ; i++)
        this.year[i] = this.dateNow - i;
      }
    else if (this.showCode == 3){
      this.day = [];
      this.showDate = "";
    }
  }

  setDD(): void{
    var days = 0;
    switch(this.selectMonth){
      case 1: case 3: case 5: case 7: case 8: case 10: case 12:
        days = 31; 
        break;
      case 4:case 6:case 9:case 11:
        days = 30; 
        break;
      case 2:
        if (this.selectYear/4 == 0)
          days = 29;
        else
          days = 28;
        break;
    }
    this.day = [];
    for(var i = 0; i < days; i++)
      this.day[i] = i+1
  }


  setDate(){
    if (this.selectDay > 0)
      this.showDate = this.selectYear+"-"+this.selectMonth+"-"+this.selectDay;
    if (this.showCode == 1){
      var reDate = new Date(this.showDate);
      this.intern!.borndate = reDate;
    }
  }
}
