import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternNoteEditComponent } from './intern-note-edit.component';

describe('InternNoteEditComponent', () => {
  let component: InternNoteEditComponent;
  let fixture: ComponentFixture<InternNoteEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternNoteEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternNoteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
