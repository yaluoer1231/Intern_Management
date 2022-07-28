import { Component, Input, OnInit } from '@angular/core';
import { Intern } from '../Intern_Fromat';
import { InternDetailsComponent } from '../intern-details/intern-details.component';

import { InternService } from '../intern.service';

@Component({
  selector: 'app-interns-table',
  templateUrl: './interns-table.component.html',
  styleUrls: ['./interns-table.component.scss']
})
export class InternsTableComponent implements OnInit {

  Interns : Intern[] = [];
  selectedintern? : Intern;
  ShowUpdate = false;
  ShowDelete = false;
  Show = false;

  constructor(private internService : InternService) { }

  ngOnInit(): void {
    this.getIntern();
  }

  getIntern(): void{
    this.internService.getIntern().subscribe(Interns => {
      for (var i = 0;i <= Interns.length-1;i++) //迴圈找陣列，Interns.length-1為陣列長度，檢索從0開始
        {
          if(Interns[i].sexCode == 1)  //Interns[i].sex_code：含物件的資料表，後面需要加上鍵值，也就是要找的欄位
            Interns[i].sex = "男";
          else if (Interns[i].sexCode == 2)
            Interns[i].sex = "女";
          else 
            Interns[i].sex = "錯誤";
        }
      this.Interns = Interns;
    });
  }
  
  onSelect(intern: Intern): void {
    if (this.Show == false)
    { 
      this.Show = true;
      this.selectedintern = intern;
    }
  }

  showUpdate(display : boolean): void{
    if (this.ShowUpdate == false)
        this.ShowUpdate = true;
    else if (this.ShowUpdate == true && display == false)
      {
        this.ShowUpdate = display;
        this.Show = false;
      }
    else
      return ; 
  }

  showDelete(display : boolean) : void{
    if (this.ShowDelete == false)
        this.ShowDelete = true;
    else if (this.ShowDelete == true && display == false)
      {
        this.ShowDelete = display;
        this.Show = false;
      }
    else
      return ; 
  }
  
  Post(name : string,SexCode : string, eMail : string): void{
    name = name.trim();
    const sexCode = Number(SexCode); 
    eMail = eMail.trim();
    if (!name) { return; }
    this.internService.postIntern({name,sexCode,eMail} as Intern)
      .subscribe(intern => {
        if (intern.sexCode == 1) //Interns[i].sex_code：含物件的資料表，後面需要加上鍵值，也就是要找的欄位
            intern.sex = "男";
          else if (intern.sexCode == 2)
            intern.sex = "女";
        this.Interns.push(intern)
      });
  }


  Delete(intern: Intern): void{
    this.Interns = this.Interns.filter(h => h !== intern);
    this.internService.deleteIntern(intern.id).subscribe();
  }

  Back(): void{
    this.Show = false;
    this.ShowUpdate = false;
    this.ShowDelete = false;
  }
}
