import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternFormEditComponent } from './intern-form-edit.component';

describe('InternFormEditComponent', () => {
  let component: InternFormEditComponent;
  let fixture: ComponentFixture<InternFormEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternFormEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternFormEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
