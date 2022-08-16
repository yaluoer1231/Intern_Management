import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Note } from '../Note_Fromat';
import { InternNoteComponent } from '../intern-note/intern-note.component';
import { NotesService } from '../notes.service';


import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-intern-note-edit',
  templateUrl: './intern-note-edit.component.html',
  styleUrls: ['./intern-note-edit.component.scss']
})
export class InternNoteEditComponent implements OnInit {

  @Input() Notes? : Note;
  @Input() Add? : Boolean;
  @Input() Showcode? : number;


  @Output() DateSwitch = new EventEmitter();
  @Output() DeleteNote = new EventEmitter();
  @Output() GoBack = new EventEmitter();

  Update = false;

  constructor(private route: ActivatedRoute,
    private notesService: NotesService,
    private location: Location,
    private internNotecomponent: InternNoteComponent) { }

  ngOnInit(): void {
  }

  save(): void {
    if (this.Notes && this.Notes.noteTitle) {
      var EditDate = new Date();//產生新的日期與時間，以紀錄修改時間
      this.Notes.dateModifited = EditDate;
      this.DateSwitch.emit(this.Notes)
      this.notesService.putNote(this.Notes)
        .subscribe();
    }
    this.Update = false;
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
        this.notesService.postNote(Notes);
      });
    this.Add = false;
  }

  Delete(Note:Note): void{
    this.DeleteNote.emit(Note);
    this.GoBack.emit();
  }

  Back(): void{
    this.Update = false;
    this.Showcode = 5;
  }
}
