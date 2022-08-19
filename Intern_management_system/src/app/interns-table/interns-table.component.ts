import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  ShowInterns : Intern[] = [];

  IsUser : boolean = true;

  selectedintern? : Intern;
  showCode = 0; //以代號顯示功能，0:關閉，1:PUT，2:DELETE，3:POST
  idShow = 0;


  constructor(private internService : InternService) { }

  ngOnInit(): void {
    this.getIntern();
  }

  getIntern(): void{
    this.IsUser = false;
    this.idShow = 0;
    this.internService.getIntern()
      .subscribe(Interns => {
        for (var i = 0;i <= Interns.length-1;i++){ //迴圈找陣列，Interns.length-1為陣列長度，檢索從0開始
          this.SexChange(Interns[i]);
          this.IdChange(Interns[i]);
        }
        this.Interns = Interns;
        this.ShowInterns = Interns;
      })
  }

  getUnLockIntern(): void{
    this.IsUser = true;
    this.ShowInterns = this.Interns.filter(h => h.lock != true);
  }

  onSelect(intern: Intern,ShowCode : number): void {
      this.selectedintern = intern;
      this.showCode = ShowCode;
      if (this.showCode == 2 && this.Interns.length <= 1)
        this.showCode = 2.5;
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

  IdChange(intern: Intern){
    this.idShow = this.idShow+1
    intern.sort = this.idShow;
  }

  Delete(intern: Intern): void{
    if (this.Interns.length > 1){
      this.Interns = this.Interns.filter(h => h !== intern);
      this.internService.deleteIntern(intern.id)
        .subscribe();
    }
  }

  IsLock(intern: Intern): void{
    if (intern.lock == true)
      intern.lock = false;
    else
      intern.lock = true;
    this.internService.putIntern(intern)
        .subscribe();
  }
  

  Back(): void{
    this.showCode = 0;
  }
}
