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

  constructor(private route: ActivatedRoute,
    private internService: InternService,
    private location: Location,
    private internstablecomponent: InternsTableComponent) { }

  ngOnInit(): void {
  }

  Update(Display : boolean): void{
    this.internstablecomponent.Update(Display);
  }

  save(): void {
    if (this.intern) {
      this.internService.putIntern(this.intern)
        .subscribe(() => this.Update(false));
      this.internstablecomponent.Update(false);
    }
  }

  Delete(intern:Intern): void{
    this.internstablecomponent.Delete(intern);
  }
}
