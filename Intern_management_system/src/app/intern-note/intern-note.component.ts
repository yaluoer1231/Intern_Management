import { Component, OnInit } from '@angular/core';
import { Note } from '../Note_Fromat';

import { InternService } from '../intern.service';
import { NotesService } from '../notes.service';
import { noop } from 'rxjs';


@Component({
  selector: 'app-intern-note',
  templateUrl: './intern-note.component.html',
  styleUrls: ['./intern-note.component.scss']
})
export class InternNoteComponent implements OnInit {

  constructor(private notesService : NotesService) {}

  Notes : Note[] = [];
  SelectNotes? : Note;

  PostShow = true;

  ngOnInit(): void {
    this.getNotes();
  }

  onSelect(Note: Note): void {
    this.SelectNotes = Note;
  }

  getNotes(): void{
    this.notesService.getIntern()
    .subscribe(Note => {
      for (var i = 0; i < Note.length; i++){
        this.DateSwitch(Note[i]);
      }
      this.Notes = Note;
    })
  }

  DateSwitch(Note: Note): void{
    this.CreateDateSwitch(Note);
    this.ModifitedDateSwitch(Note);
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

}
