import { Component, Input, OnInit } from '@angular/core';
import { Intern } from '../Intern_Fromat';

import { InternService } from '../intern.service';

@Component({
  selector: 'app-intern-details',
  templateUrl: './intern-details.component.html',
  styleUrls: ['./intern-details.component.scss']
})
export class InternDetailsComponent implements OnInit {

  @Input() intern? : Intern;

  constructor() { }

  ngOnInit(): void {
  }

}
