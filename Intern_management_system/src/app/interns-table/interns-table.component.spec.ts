import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternsTableComponent } from './interns-table.component';

describe('InternsTableComponent', () => {
  let component: InternsTableComponent;
  let fixture: ComponentFixture<InternsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
