import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() showCode? : number;

  @Output() SexChange =  new EventEmitter();
  @Output() GoBack = new EventEmitter();
  @Output() GoDelete = new EventEmitter();
  @Output() GoSort = new EventEmitter();
  
  showDelete = false;
  showUpdate = false;
  showPost = false;


  constructor(private route: ActivatedRoute,
    private internService: InternService,
    private location: Location,
    private internstablecomponent: InternsTableComponent) { }

  

  ngOnInit(): void {
  }

  
  save(): void {
    if (this.intern && this.intern.name && this.intern.sex) {
      this.SexChange.emit(this.intern);
      this.internService.putIntern(this.intern)
        .subscribe();
      this.GoBack.emit();
    }
    else
      this.showCode = 1.5;
  }

  Delete(intern:Intern): void{
    this.GoDelete.emit(intern);
    this.GoBack.emit();
  }

  Post(name : string,SexCode : string, eMail : string): void{
    name = name.trim();
    const sexCode = Number(SexCode); 
    eMail = eMail.trim();
    if (!name) { return; }
    this.internService.postIntern({name,sexCode,eMail} as Intern)
      .subscribe(intern => {
        this.SexChange.emit(this.intern);
        this.internService.postIntern(intern);
      });
      this.GoBack.emit();
  }

  Back(): void{
    this.GoBack.emit();
    this.showCode = 0;
  }

  UpPage(): void{
    if (this.showCode == 1.5)
      this.showCode =1;
  }
}
