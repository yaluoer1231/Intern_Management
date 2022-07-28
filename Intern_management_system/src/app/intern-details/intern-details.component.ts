import { Component, Input, OnInit } from '@angular/core';
import { Intern } from '../Intern_Fromat';
import { InternService } from '../intern.service';
import { InternsTableComponent } from '../interns-table/interns-table.component';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';



@Component({
  selector: 'app-intern-details',
  templateUrl: './intern-details.component.html',
  styleUrls: ['./intern-details.component.scss']
})
export class InternDetailsComponent implements OnInit {

  @Input() intern? : Intern;
  showDelete = false;
  showUpdate = false;


  constructor(private route: ActivatedRoute,
    private internService: InternService,
    private location: Location,
    private internstablecomponent: InternsTableComponent) { }

  

  ngOnInit(): void {
    const internTable = this.internstablecomponent;
    console.log("ShoW:"+internTable.Show);
    console.log("ShoWTableUp:"+internTable.ShowUpdate);
    console.log("ShoWTableDe:"+internTable.ShowDelete);
    console.log("ShowUpdate:"+this.showUpdate);
    console.log("ShowDelete:"+this.showDelete);
    if (internTable.Show == true)
      {
        if (internTable.ShowUpdate == true && this.showUpdate == false)
          this.showUpdate = true;
        if (internTable.ShowDelete == true && this.showDelete == false)
          this.showDelete = true;
      }
    console.log("轉換後ShowUpdate:"+this.showUpdate);
    console.log("轉換後ShowDelete:"+this.showDelete)
  }

  
  save(): void {
    if (this.intern) {
      this.internService.putIntern(this.intern).subscribe();
      this.internstablecomponent.showUpdate(false);
      this.showUpdate = false;
    }
  }

  Delete(intern:Intern): void{
    this.internstablecomponent.Delete(intern);
    this.internstablecomponent.showDelete(false);
    this.showDelete = false;
  }

  Back(): void{
    this.internstablecomponent.Back();
    if (this.showDelete == true)
      this.showDelete = false;
    if (this.showUpdate == true)
      this.showUpdate = false;
  }
}
