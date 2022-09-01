import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Intern } from '../../Intern_Fromat';
import { InsureIntern } from '../../Insure-intern';
import { InternService } from '../../intern.service';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss','../button.scss']
})
export class PostComponent implements OnInit {

  @Input() transIntern? : Intern;

  @Output() refreshPage = new EventEmitter();
  @Output() backPage = new EventEmitter();

  name = '';
  date = '';
  sexCode = 0;
  lineId = '';
  phonenumber = '';
  eMail = '';

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
  //選擇的年月日
  selectYear = 0;
  selectMonth : number = 0;
  selectDay = 0;

  @Output() outIntern? = new EventEmitter();
  constructor(private internService : InternService) { }

  ngOnInit(): void {
    for (var i = 0; i < 100 ; i++)
      this.year[i] = this.dateNow-i;
  }

  post(): void{
    var name = this.name;
    var eMail = this.eMail.trim();
    var lineId = this.lineId.trim();
    var phonenumber = this.phonenumber.trim();
    const sexCode = Number(this.sexCode);
    this.date = this.selectYear+"-"+this.selectMonth+"-"+this.selectDay;
    var borndate = new Date(this.date)

    this.internService.postIntern({name,sexCode,eMail,borndate,lineId,phonenumber} as Intern)
      .subscribe(intern =>
        this.refreshPage.emit()
      );
  }

  back(): void{
    this.backPage.emit();
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
    this.name = name.trim();

    this.nameError = '';
    if(error?.['required'])
      this.nameError = '必填';
    else if(error?.['minlength'] || error?.['miaxlength']|| error?.['pattern'])
      this.nameError = '請輸入正確的姓名'
  }

  //生日驗證
  insuredBornDateChange(Date : number, error: ValidationErrors| null): void{
  }

  //LineID驗證
  insuredLineChange(lineId : string, error : ValidationErrors| null): void{
    this.lineId = lineId.trim();

    this.lineIdError = '';
    if(error?.['minlength'] || error?.['miaxlength'] || error?.['pattern'])
      this.lineIdError = '輸入錯誤'
  }

  //電話驗證
  insuredPhoneChange(phone : string, error : ValidationErrors| null): void{
    this.phonenumber = phone.trim();

    this.phonenumberError = '';
    if (error?.['minlength'] || error?.['miaxlength'] || error?.['pattern'])
    this.phonenumberError = '輸入錯誤'
  }

  //E-Mail驗證
  insuredEMailChange(eMail : string, error : ValidationErrors| null): void{
    this.eMail = eMail.trim();

    this.eMailError = '';
    if(error?.['required'])
      this.eMailError = '必填' 
    else if(error?.['minlength'] || error?.['miaxlength']|| error?.['pattern'])
      this.eMailError = '請輸入正確的電子信箱'
  }
}
