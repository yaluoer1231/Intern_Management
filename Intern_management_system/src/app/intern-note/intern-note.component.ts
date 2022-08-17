import { Component, OnInit } from '@angular/core';
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
  SelectNotes? : Note;

  showCode? : number;//以代號顯示功能，0:READ，1:PUT，2:DELETE，3:POST，4:CLOSE
  PostShow = true;

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
    })
    
  }

  GetShowNotes(): void{
    for(var i = 0; i < this.Notes.length; i++){
      if (i != this.Notes.length-1)
        this.ShowNote[i] = this.Notes[i+1]
    }
  }

  Delete(Note: Note): void{
    if (this.Notes.length > 2){
      this.Notes = this.Notes.filter(h => h !== Note); //將與Note不同的資料都過濾出來
      this.ShowNote = this.ShowNote.filter(h => h !== Note);
      this.notesService.deleteNote(Note.id)
        .subscribe();
    }
    this.GetShowNotes();
  }


  CreateDateSwitch(Note: Note): void{
    var CreatDate = new Date(Note.dateCreate);
    var year = CreatDate.getFullYear();
    var month = CreatDate.getMonth()+1;
    var date = CreatDate.getDate();
    var time = CreatDate.toLocaleTimeString();
    
    Note.CreatDateShow = year+"年"+month+"月"+date+"日"+"　"+time;
    return ;
  }

  ModifitedDateSwitch(Note: Note): void{
    var ModifitedDate = new Date(Note.dateModifited);
    var year = ModifitedDate.getFullYear();
    var month = ModifitedDate.getMonth()+1;
    var date = ModifitedDate.getDate();
    var time = ModifitedDate.toLocaleTimeString();

    Note.ModifitedDateShow = year+"年"+month+"月"+date+"日"+"　"+time;
    return ;
  }


  Back(): void{
    this.showCode = 5;
  }
}
