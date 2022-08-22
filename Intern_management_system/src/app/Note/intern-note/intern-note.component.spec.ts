import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternNoteComponent } from './intern-note.component';

describe('InternNoteComponent', () => {
  let component: InternNoteComponent;
  let fixture: ComponentFixture<InternNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternNoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
