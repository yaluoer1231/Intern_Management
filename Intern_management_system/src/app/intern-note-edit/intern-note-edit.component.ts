import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Note } from '../Note_Fromat';
import { Intern } from '../Intern_Fromat'
import { InternNoteComponent } from '../intern-note/intern-note.component';

import { NotesService } from '../notes.service';
import { InternService } from '../intern.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-intern-note-edit',
  templateUrl: './intern-note-edit.component.html',
  styleUrls: ['./intern-note-edit.component.scss']
})
export class InternNoteEditComponent implements OnInit {

  @Input() Notes? : Note;
  @Input() Showcode? : number;


  @Output() DateSwitch = new EventEmitter();
  @Output() DeleteNote = new EventEmitter();
  @Output() GoBack = new EventEmitter();
  @Output() Get = new EventEmitter();

  Interns : Intern[] = [];
  SelectInterns : Intern[] = [];

  constructor(private route: ActivatedRoute,
    private notesService: NotesService,
    private internService: InternService,
    private location: Location,
    private internNotecomponent: InternNoteComponent) { }

  ngOnInit(): void {
    this.CheckInterns();
  }

  CheckInterns(): void {
    this.internService.getIntern()
      .subscribe(Interns => {
        this.Interns = Interns})
  }


  save(): void {
    if (this.Notes && this.Notes.noteTitle) {
      var EditDate = new Date();//產生新的日期與時間，以紀錄修改時間
      this.Notes.dateModifited = EditDate;
      this.DateSwitch.emit(this.Notes)
      this.notesService.putNote(this.Notes)
        .subscribe();
    }
    this.GoBack.emit();
  }

  Post(name : string,noteTitle: string, note : string): void{
    var EditDate = new Date();//產生新的日期與時間，以紀錄修改時間
    var dateCreate = EditDate;
    var dateModifited = EditDate;
    name = name.trim();
    noteTitle = noteTitle.trim();
    note = note.trim();
    if (!name || !noteTitle) { return; }
    this.notesService.postNote({name,noteTitle,note,dateCreate,dateModifited} as Note)
      .subscribe(Notes => {
        this.DateSwitch.emit(Notes);
        this.Get.emit();
      })
    this.GoBack.emit();
  }

  SelectList(): void{
    this.SelectInterns = this.Interns;
    this.SelectInterns = this.SelectInterns.filter(h => h.name !== this.Notes?.name)
  }
  

  Delete(Note:Note): void{
    this.DeleteNote.emit(Note);
    this.GoBack.emit();
  }

  Back(): void{
    this.GoBack.emit();
    this.Showcode = 5;
  }
}
