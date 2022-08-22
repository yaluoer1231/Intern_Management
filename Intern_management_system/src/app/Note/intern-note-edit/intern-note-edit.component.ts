import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Note } from '../Note_Fromat';
import { Intern } from '../../intern/Intern_Fromat'
import { InternNoteComponent } from '../intern-note/intern-note.component';

import { NotesService } from '../notes.service';
import { InternService } from '../../intern/intern.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-intern-note-edit',
  templateUrl: './intern-note-edit.component.html',
  styleUrls: ['./intern-note-edit.component.scss']
})
export class InternNoteEditComponent implements OnInit {

  @Input() notes? : Note;
  @Input() showcode? : number;


  @Output() deleteNote = new EventEmitter();
  @Output() backPage = new EventEmitter();
  @Output() refreshPage = new EventEmitter();
  @Output() putShow = new EventEmitter();

  interns : Intern[] = [];
  selectInterns : Intern[] = [];

  nameError : boolean = false;
  titleEmpty : boolean = false;
  titlelimit : boolean = false;

  originakCode : number = 0;


  constructor(private route: ActivatedRoute,
    private notesService: NotesService,
    private internService: InternService,
    private location: Location,
    private internNotecomponent: InternNoteComponent) { }

  ngOnInit(): void {
    this.checkInterns();
  }

  checkInterns(): void {
    this.internService.getIntern()
      .subscribe(Interns => this.interns = Interns.filter(h => !h.lock))
  }


  save(): void {
    if (this.notes) {
      this.originakCode = 1

      if (!this.notes.noteTitle) { 
          this.showcode = 1.5
          this.titleEmpty = true;
          return;
        }
      if (this.notes.noteTitle.length > 15){
          this.showcode = 1.5
          this.titlelimit = true;
          return;
        }

      this.notesService.putNote(this.notes)
        .subscribe(Notes => this.refreshPage.emit());
    }
    this.backPage.emit();
  }

  post(nameid : string,noteTitle: string, note : string): void{
    var nameId = parseInt(nameid);
    noteTitle = noteTitle.trim();
    note = note.trim();

    this.originakCode = 3

    if (nameid == "請選擇實習生"){
      this.showcode = 1.5
      this.nameError = true;
    }
    if (!noteTitle) { 
      this.showcode = 1.5
      this.titleEmpty = true;
    }
    if (noteTitle.length > 15){
      this.showcode = 1.5
      this.titlelimit = true;
    }


    if (this.showcode == 3){
      this.notesService.postNote({nameId,noteTitle,note} as Note)
        .subscribe(Notes => this.refreshPage.emit());
      this.backPage.emit();
    }
    else 
      return;
  }

  selectList(): void{
    this.putShow.emit();
    this.interns = this.interns
      .filter(h => h.name !== this.notes?.name);
  }
  

  delete(Note:Note): void{
    this.deleteNote.emit(Note);
    this.backPage.emit();
  }

  back(): void{
    this.backPage.emit();
    this.refreshPage.emit()
    this.showcode = 5;
  }

  upPage(): void{
    this.showcode = this.originakCode;
    this.titleEmpty = false;
    this.titlelimit = false;
    this.nameError = false;
    this.refreshPage.emit()
  }
}
