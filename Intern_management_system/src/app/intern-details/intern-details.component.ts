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
  showUpdata = false;


  constructor(private route: ActivatedRoute,
    private internService: InternService,
    private location: Location,
    private internstablecomponent: InternsTableComponent) { }

  

  ngOnInit(): void {
    const internTable = this.internstablecomponent;
    if (internTable.Show == true)
      {
        if (internTable.ShowUpdate == true != this.showUpdata)
          this.showUpdata = true;
        if (internTable.ShowDelete == true != this.showDelete)
          this.showDelete = true;
      }
  }

  
  save(): void {
    if (this.intern) {
      this.internService.putIntern(this.intern).subscribe();
      this.internstablecomponent.showUpdate(false);
      this.showUpdata = false;
    }
  }

  Delete(intern:Intern): void{
    this.internstablecomponent.Delete(intern);
    this.internstablecomponent.showDelete(false);
    this.showDelete = false;
  }
}
