import { Component, OnInit ,EventEmitter, Input, Output} from '@angular/core';
import { Note } from '../Note_Fromat';
import { Intern } from '../../intern/Intern_Fromat';

import { InternService } from '../../intern/intern.service';
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

  unLockInterns : Intern[] = [];
  notes : Note[] = [];

  selectShowCode : number = 0; //以代號顯示功能，0:依修改日期，1:找同名字並依照創建日期
  showCode? : number;//以代號顯示功能，0:READ，1:PUT，2:DELETE，3:POST，4:CLOSE

  selectNotes? : Note;

  ngOnInit(): void {
    this.getIntern();
    this.getNotes();
  }

  getNotes(): void{
    this.selectShowCode = 0;
    this.notesService.getNote()
    .subscribe(Note => {
      this.notes = Note;
    })
    
    console.log("TE");
  }

  getIntern(): void{
    this.internService.getIntern()
      .subscribe(Interns => {
        this.unLockInterns = Interns.filter(h => h.lock == false);
      })
  }

  onSelect(Note: Note, Showcode : number): void {
    this.selectNotes = Note;
    this.showCode = Showcode;
  }

  searchInternNote(intern : string): void {
    var Sort =  parseInt(intern);
    this.selectShowCode = 1;
    this.notesService.getInternNote(Sort)
      .subscribe(Note => this.notes = Note)
    
  }

  delete(Note: Note): void{
    if (this.notes.length > 1){
      this.notes = this.notes.filter(h => h !== Note); //將與Note不同的資料都過濾出來
      this.notesService.deleteNote(Note.id)
        .subscribe(Notes => this.getNotes());
    }
  }

  putShow(): void{
    this.showCode = 1;
  }

  back(): void{
    this.showCode = 5;
  }
}
