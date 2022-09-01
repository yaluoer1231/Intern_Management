import { Component, Input, OnInit } from '@angular/core';
import { Intern } from '../../Intern_Fromat';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Input() intern? : Intern;

  constructor() { }

  ngOnInit(): void {
  }

}
