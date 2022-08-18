import { Component, OnInit ,EventEmitter, Input, Output} from '@angular/core';
import { Note } from '../Note_Fromat';

import { InternService } from '../intern.service';
import { NotesService } from '../notes.service';
import { noop } from 'rxjs';


@Component({
  selector: 'app-intern-note',
  templateUrl: './intern-note.component.html',
  styleUrls: ['./intern-note.component.scss','./button-table.scss']
})
export class InternNoteComponent implements OnInit {

  constructor(private notesService : NotesService) {}

  Notes : Note[] = [];
  ShowNote : Note[] = [];
  SearchNote : Note[] = [];
  SelectNotes? : Note;

  TestShow : boolean = false;

  showCode? : number;//以代號顯示功能，0:READ，1:PUT，2:DELETE，3:POST，4:CLOSE
 

  ngOnInit(): void {
    this.getNotes();
  }

  onSelect(Note: Note, Showcode : number): void {
    this.SelectNotes = Note;
    this.showCode = Showcode;
  }

  getNotes(): void{
    this.notesService.getNote()
    .subscribe(Note => {
      for (var i = 0; i < Note.length; i++){
        this.CreateDateSwitch(Note[i]);
        this.ModifitedDateSwitch(Note[i]);
      }
      this.Notes = Note;
      this.GetShowNotes();
      this.SearchNotes();
    })
  }

  PutShow(): void{
    this.showCode = 1;
  }

  CheckCode(): void{
    console.log(this.showCode);
  }


  GetShowNotes(): void{
    for(var i = 0; i < this.Notes.length; i++){
      if (i != this.Notes.length-1)
        this.ShowNote[i] = this.Notes[i+1]
    }
  }

  SearchNotes(): void{
    var Test : number[]= [];
    for (var i = 1; i < this.Notes.length; i++){
      var NoteMain = new Date(this.Notes[i].dateModifited).getTime();
      Test[i-1] = 0;
      for (var j = 1; j < this.Notes.length; j++){
        var NoteSon = new Date(this.Notes[j].dateModifited).getTime();
          if (NoteMain < NoteSon)
            Test[i-1] += 1;
      }
      this.SearchNote[Test[i-1]] = this.Notes[i];
    }
  }


  Delete(Note: Note): void{
    if (this.Notes.length > 1){
      this.Notes = this.Notes.filter(h => h !== Note); //將與Note不同的資料都過濾出來
      this.ShowNote = this.ShowNote.filter(h => h !== Note);
      this.notesService.deleteNote(Note.id)
        .subscribe(Notes => {
          this.getNotes()});
    }
    this.GetShowNotes();
  }


  CreateDateSwitch(Note: Note): void{
    var CreatDate = new Date(Note.dateCreate);
    var year = CreatDate.getFullYear();
    var month = CreatDate.getMonth()+1;
    var date = CreatDate.getDate();
    var time = CreatDate.toLocaleTimeString();
    
    Note.CreatDateShow = year+"/"+month+"/"+date+""+"　"+time;
    return ;
  }

  ModifitedDateSwitch(Note: Note): void{
    var ModifitedDate = new Date(Note.dateModifited);
    var year = ModifitedDate.getFullYear();
    var month = ModifitedDate.getMonth()+1;
    var date = ModifitedDate.getDate();
    var time = ModifitedDate.toLocaleTimeString();

    Note.ModifitedDateShow = year+"/"+month+"/"+date+""+"　"+time;
    return ;
  }


  Back(): void{
    this.showCode = 5;
  }
}
