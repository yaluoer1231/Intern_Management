import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Intern } from '../../Intern_Fromat';
import { InsureIntern } from '../../Insure-intern';
import { InternService } from '../../intern.service';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-intern-form-edit',
  templateUrl: './intern-form-edit.component.html',
  styleUrls: ['./intern-form-edit.component.scss','../button.scss']
})
export class InternFormEditComponent implements OnInit {

  @Input() intern? : Intern;
  @Input() isPost : Boolean = false;
  @Input() isPut : Boolean = false;

  @Output() refreshPage = new EventEmitter();
  @Output() backPage = new EventEmitter();

  nameError = "";
  borndateError = "";
  lineIdError = "";
  phonenumberError = "";
  eMailError = "";

  areaCode = [2,3,37,4,49,5,6,7,8,89,82,826,836];
  selectArea = 0;

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
  
  constructor(private internService : InternService) { }

  ngOnInit(): void {
    if (this.intern && this.isPut){
      this.selectYear = this.intern.borndate.getFullYear();
      this.setDate(this.intern.borndate.getMonth()+1);
      this.selectDay = this.intern.borndate.getDate();
      this.month = this.month.filter(h => h != this.selectMonth)
      //去除電話中的特殊符號，留下數字在切割
      this.intern.phonenumber = this.intern.phonenumber.replace(/[^0-9]/ig,"");
      this.selectArea = Number(this.intern.phonenumber.replace(/[^0-9]/ig,"").slice(0,2));
      if (this.selectArea != 9)
        this.intern.phonenumber = this.intern.phonenumber.slice(2,10);
    }
    for (var i = 0; i < 100 ; i++)
      this.year[i] = this.dateNow-i;
  }
  
  editDate(): string {
    return (this.selectYear+"-"+this.selectMonth+"-"+this.selectDay)
  }

  back(): void{
    this.selectYear = 0;
    this.selectMonth = 0;
    this.selectDay = 0;

    if (!this.isPost && !this.isPut) 
      this.backPage.emit();
    this.isPost = false;
    this.isPut = false;
  }

  isPostOrPut(): void{
    this.intern!.borndate = new Date(this.editDate());
    this.isCellOrTell();
    if (this.isPost){
      this.internService.postIntern(this.intern!)
      .subscribe(intern =>
        this.refreshPage.emit());
    }
    if (this.isPut){
      this.internService.putIntern(this.intern!)
        .subscribe(intern => this.refreshPage.emit()); 
    }
    this.back();
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
    if (error?.['minlength'] || error?.['miaxlength'] || error?.['validatePhoneNumber'])
      this.phonenumberError = '輸入錯誤'
  }

  isCellOrTell(): void{
    if (this.selectArea == 9)
      return;
    else
      this.intern!.phonenumber="0" + this.selectArea + this.intern!.phonenumber.replace(/[^0-9]/ig,"");
  }


  //E-Mail驗證
  insuredEMailChange(eMail : string, error : ValidationErrors| null): void{
    this.intern!.eMail = eMail.trim();

    this.eMailError = '';
    if(error?.['required'])
      this.eMailError = '必填' 
    else if(error?.['minlength'] || error?.['miaxlength']|| error?.['email'])
      this.eMailError = '請輸入正確的電子信箱'
  }

}
