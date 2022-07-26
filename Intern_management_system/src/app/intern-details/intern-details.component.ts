import { Component, Input, OnInit } from '@angular/core';
import { Intern } from '../Intern_Fromat';
import { InternService } from '../intern.service';

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
    private location: Location) { }

  ngOnInit(): void {
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.internService.getHero(id)
      .subscribe(intern => this.intern = intern);
  }

}
