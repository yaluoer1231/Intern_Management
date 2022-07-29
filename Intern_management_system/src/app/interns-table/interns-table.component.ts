import { Component, Input, OnInit } from '@angular/core';
import { Intern } from '../Intern_Fromat';
import { InternDetailsComponent } from '../intern-details/intern-details.component';

import { InternService } from '../intern.service';

@Component({
  selector: 'app-interns-table',
  templateUrl: './interns-table.component.html',
  styleUrls: ['./interns-table.component.scss','./button-table.scss']
})
export class InternsTableComponent implements OnInit {

  Interns : Intern[] = [];
  selectedintern? : Intern;
  showCode = 0; //以代號顯示功能，0:關閉，1:PUT，2:DELETE，3:POST
  isShow = false;

  constructor(private internService : InternService) { }

  ngOnInit(): void {
    this.getIntern();
  }

  getIntern(): void{
    this.internService.getIntern()
      .subscribe(Interns => {
        for (var i = 0;i <= Interns.length-1;i++) //迴圈找陣列，Interns.length-1為陣列長度，檢索從0開始
          this.SexChange(Interns[i]);
        this.Interns = Interns;
      })
  }

  onSelect(intern: Intern,ShowCode : number): void {
      this.isShow = true;
      this.selectedintern = intern;
      this.showCode = ShowCode;
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
  
  Post(intern: Intern): void{
    for (var i = 1; i <= this.Interns.length-1; i++){
      if (this.Interns[i].name == null){
        intern.id = this.Interns[i].id;
      }
    }
    this.internService.postIntern(intern)
      .subscribe();
  }

  Delete(intern: Intern): void{
    this.Interns = this.Interns.filter(h => h !== intern);
    this.internService.deleteIntern(intern.id)
      .subscribe();
  }

  Back(): void{
    this.isShow = false;
    this.showCode = 0;
  }
}
