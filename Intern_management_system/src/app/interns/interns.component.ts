import { Component, OnInit } from '@angular/core';
import { Intern } from '../Intern_Fromat';

import { InternService } from '../intern.service';

@Component({
  selector: 'app-interns',
  templateUrl: './interns.component.html',
  styleUrls: ['./interns.component.scss']
})
export class InternsComponent implements OnInit {

  Interns : Intern[]= [];
  selectedintern?: Intern;

  constructor(private internService : InternService) { }

  ngOnInit(): void {
    this.getIntern();
  }

  getIntern(): void {
    this.Interns = this.internService.getIntern();
  }

  onSelect(intern: Intern): void {
  this.selectedintern = intern;
  }
}
