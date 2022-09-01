import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Intern } from '../Intern_Fromat';
import { InternService } from '../intern.service';
import { InternsTableComponent } from '../interns-table/interns-table.component';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ReturnStatement } from '@angular/compiler';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-intern-details',
  templateUrl: './intern-details.component.html',
  styleUrls: ['./intern-details.component.scss','./button.scss','./details-layouts.scss']
})
export class InternDetailsComponent implements OnInit {

  @Input() intern? : Intern;
  @Input() internLength? : number;
  @Input() showCode? : number;

  @Output() sexChange =  new EventEmitter();
  @Output() backPage = new EventEmitter();
  @Output() goDelete = new EventEmitter();
  @Output() goSort = new EventEmitter();
  @Output() refreshPage = new EventEmitter();
  @Output() changeCode = new EventEmitter();

  //當有錯誤發生時暫時紀錄原來使用的功能代號
  constructor(private route: ActivatedRoute,
    private internService: InternService,
    private location: Location,
    private internstablecomponent: InternsTableComponent) { }

  

  ngOnInit(): void {
  }
  
  setCode(num: number): void{
    this.changeCode.emit(num);
  }

  delete(intern:Intern): void{
    if (this.internLength! > 1){
      this.goDelete.emit(intern);
      this.backPage.emit();
    }
    else
      this.showCode = 6;
  }

  back(): void{
    this.refreshPage.emit();
    this.backPage.emit();
    this.showCode = 0;
  }
}
