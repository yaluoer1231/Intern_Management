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
    if (internTable.Show == true)
      {
        if (internTable.showCode == 1)
          this.showUpdate = true;
        if (internTable.showCode == 2)
          this.showDelete = true;
      }
  }

  
  save(): void {
    if (this.intern) {
      this.internstablecomponent.SexChange(this.intern);
      this.internService.putIntern(this.intern).subscribe();
      this.internstablecomponent.Back();
      this.showUpdate = false;
    }
  }

  Delete(intern:Intern): void{
    this.internstablecomponent.Delete(intern);
    this.internstablecomponent.Back();
    this.showDelete = false;
  }

  Back(): void{
    this.internstablecomponent.Back();
    this.showDelete = false;
    this.showUpdate = false;
  }
}
