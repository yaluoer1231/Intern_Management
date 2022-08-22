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


  @Output() DeleteNote = new EventEmitter();
  @Output() GoBack = new EventEmitter();
  @Output() Get = new EventEmitter();
  @Output() PutShow = new EventEmitter();

  Interns : Intern[] = [];
  SelectInterns : Intern[] = [];

  nameError : boolean = false;
  titleEmpty : boolean = false;
  titlelimit : boolean = false;

  OriginakCode : number = 0;


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
      .subscribe(Interns => this.Interns = Interns)
  }


  save(): void {
    if (this.Notes) {
      this.OriginakCode = 1
      if (!this.Notes.noteTitle) { 
          this.Showcode = 1.5
          this.titleEmpty = true;
          return;}
      if (this.Notes.noteTitle.length > 15){
          this.Showcode = 1.5
          this.titlelimit = true;
          return;}

      this.notesService.putNote(this.Notes)
        .subscribe(Notes => this.Get.emit());
    }
    this.GoBack.emit();
  }

  Post(nameid : string,noteTitle: string, note : string): void{
    var nameId = parseInt(nameid);
    noteTitle = noteTitle.trim();
    note = note.trim();

    this.OriginakCode = 3

    if (nameid == "請選擇實習生")
    {
      this.Showcode = 1.5
      this.nameError = true;
      return; }
    if (!noteTitle) { 
      this.Showcode = 1.5
      this.titleEmpty = true;
      return; }
    if (noteTitle.length > 15){
      this.Showcode = 1.5
      this.titlelimit = true;
      return;}

    this.notesService.postNote({nameId,noteTitle,note} as Note)
      .subscribe(Notes => this.Get.emit());
    this.GoBack.emit();
  }

  SelectList(): void{
    this.PutShow.emit();
    this.SelectInterns = this.Interns.filter(h => h.name !== this.Notes?.name);
    this.SelectInterns = this.SelectInterns
  }
  

  Delete(Note:Note): void{
    this.DeleteNote.emit(Note);
    this.GoBack.emit();
  }

  Back(): void{
    this.GoBack.emit();
    this.Get.emit()
    this.Showcode = 5;
  }

  UpPage(): void{
    this.Showcode = this.OriginakCode;
    this.titleEmpty = false;
    this.titlelimit = false;
    this.nameError = false;
    this.Get.emit()
  }
}
