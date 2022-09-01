import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Intern } from '../../Intern_Fromat';
import { InsureIntern } from '../../Insure-intern';
import { InternService } from '../../intern.service';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-put',
  templateUrl: './put.component.html',
  styleUrls: ['./put.component.scss','../button.scss']
})
export class PutComponent implements OnInit {
  
  @Input() intern? : Intern;

  @Output() refreshPage = new EventEmitter();
  @Output() backPage = new EventEmitter();

  originalIntern? : Intern;

  nameError = "";
  borndateError = "";
  lineIdError = "";
  phonenumberError = "";
  eMailError = "";

  //捕捉今年的時間
  dateNow : number = new Date().getFullYear();
  //年月日陣列
  year : number[] = [];
  month : number[] = [1,2,3,4,5,6,7,8,9,10,11,12];
  day : number[] = [];
  //選擇的生日年月日
  selectYear = 0;
  selectMonth = 0;
  selectDay = 0;
  //原本的生日年月日
  originalYear = 0;
  originalMonth = 0;
  originalDay = 0;
  
  constructor(private internService : InternService) { }

  ngOnInit(): void {
    if (this.intern){
      this.originalIntern = this.intern;
      this.originalYear = this.originalIntern.borndate.getFullYear();
      this.originalMonth = this.originalIntern.borndate.getMonth()+1;
      this.originalDay = this.originalIntern.borndate.getDate();
      this.setDate(this.originalMonth)
      this.selectYear = this.originalYear;
      this.selectDay = this.originalDay;
    }
    for (var i = 0; i < 100 ; i++)
      this.year[i] = this.dateNow-i;
    console.log(typeof this.originalYear)
  }
  
  back(): void{
    this.backPage.emit();
  }

  update():void{
    if (this.intern)
      this.internService.putIntern(this.intern)
        .subscribe(intern => this.refreshPage.emit());
    this.back();
  }


  setDate(num : number): void{
    this.selectMonth = Number(num);
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

  //姓名驗證
  insuredNameChange(name : string, error : ValidationErrors| null): void{
    this.intern!.name = name.trim();

    this.nameError = '';
    if(error?.['required'])
      this.nameError = '必填';
    else if(error?.['minlength'] || error?.['miaxlength']|| error?.['pattern'])
      this.nameError = '請輸入正確的姓名';
  }

  //LineID驗證
  insuredLineChange(lineId : string, error : ValidationErrors| null): void{
    this.intern!.lineId = lineId.trim();

    this.lineIdError = '';
    if(error?.['minlength'] || error?.['miaxlength'] || error?.['pattern'])
      this.lineIdError = '輸入錯誤'
  }

  //電話驗證
  insuredPhoneChange(phone : string, error : ValidationErrors| null): void{
    this.intern!.phonenumber = phone.trim();

    this.phonenumberError = '';
    if (error?.['minlength'] || error?.['miaxlength'] || error?.['pattern'])
      this.phonenumberError = '輸入錯誤'
  }

  //E-Mail驗證
  insuredEMailChange(eMail : string, error : ValidationErrors| null): void{
    this.intern!.eMail = eMail.trim();

    this.eMailError = '';
    if(error?.['required'])
      this.eMailError = '必填' 
    else if(error?.['minlength'] || error?.['miaxlength']|| error?.['pattern'])
      this.eMailError = '請輸入正確的電子信箱'
  }
}
