import { Component, OnInit } from '@angular/core';
import { Intern } from '../Intern_Fromat';
import { INTERNS } from '../Intern_Data';

@Component({
  selector: 'app-interns',
  templateUrl: './interns.component.html',
  styleUrls: ['./interns.component.scss']
})
export class InternsComponent implements OnInit {

  Interns = INTERNS;
  selectedintern?: Intern;

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(intern: Intern): void {
  this.selectedintern = intern;
}

}
