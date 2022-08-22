import { Component, OnInit ,EventEmitter, Input, Output} from '@angular/core';
import { Note } from '../Note_Fromat';
import { Intern } from '../Intern_Fromat';

import { InternService } from '../intern.service';
import { NotesService } from '../notes.service';
import { noop } from 'rxjs';
import { SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-intern-note',
  templateUrl: './intern-note.component.html',
  styleUrls: ['./intern-note.component.scss','./button-table.scss']
})
export class InternNoteComponent implements OnInit {

  constructor(private notesService : NotesService,
    private internService : InternService) {}

  UnLockInterns : Intern[] = [];
  LockInterns : Intern[] = [];
  ShowInterns : Intern [] = [];

  Notes : Note[] = [];
  ShowNote : Note[] = [];
  SelectNotes? : Note;
  
  SelectShowCode : number = 0; //以代號顯示功能，0:依創建日期，1:依修改日期，2:找同名字並依照創建日期

  showCode? : number;//以代號顯示功能，0:READ，1:PUT，2:DELETE，3:POST，4:CLOSE
 

  ngOnInit(): void {
    this.getIntern();
    this.getNotes();
  }

  onSelect(Note: Note, Showcode : number): void {
    this.SelectNotes = Note;
    this.showCode = Showcode;
  }

  getNotes(): void{
    this.SelectShowCode = 0;
    this.notesService.getNote()
    .subscribe(Note => {
      this.Notes = Note;
    })
  }

  getIntern(): void{
    this.ShowInterns = [];
    this.internService.getIntern()
      .subscribe(Interns => {
        this.UnLockInterns = Interns.filter(h => h.lock == false);
        this.LockInterns = Interns.filter(h => h.lock == true);
      })
  }

  PutShow(): void{
    this.showCode = 1;
  }

  SearchNotes(): void{
    this.SelectShowCode = 1;
    this.notesService.getInternNote(0)
    .subscribe(Note => this.Notes = Note)
  }

  SearchInternNote(intern : string): void {
    this.SelectShowCode = 2;
    var Sort =  parseInt(intern);
    this.notesService.getInternNote(Sort)
    .subscribe(Note => this.Notes = Note)
  }


  Delete(Note: Note): void{
    if (this.Notes.length > 1){
      this.Notes = this.Notes.filter(h => h !== Note); //將與Note不同的資料都過濾出來
      this.notesService.deleteNote(Note.id)
        .subscribe(Notes => this.getNotes());
    }
  }


  Back(): void{
    this.showCode = 5;
  }
}
