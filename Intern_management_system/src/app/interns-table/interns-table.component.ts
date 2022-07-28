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
  showCode = 0;
  ShowUpdate = false;
  ShowDelete = false;
  ShowPost = false;
  Show = false;

  constructor(private internService : InternService) { }

  ngOnInit(): void {
    this.getIntern();
  }

  getIntern(): void{
    this.internService.getIntern().subscribe(Interns => {
      for (var i = 0;i <= Interns.length-1;i++) //迴圈找陣列，Interns.length-1為陣列長度，檢索從0開始
        this.SexChange(Interns[i]);
      this.Interns = Interns;
    });
  }

  onSelect(intern: Intern,ShowCode : number): void {
    if (this.Show == false)
    {
      this.Show = true;
      this.selectedintern = intern;
      this.showCode = ShowCode; //以代號顯示功能，0:關閉，1:PUT，2:DELETE，3:POST
    }
  }

  //將資料庫的性別代號轉換成文字
  SexChange(intern: Intern): void{
    if (intern.sexCode == 1)
      intern.sex = "男";
    else if (intern.sexCode == 2)
      intern.sex = "女";
    else
      intern.sex = "錯誤";
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
