import { Component, OnInit } from '@angular/core';
import { Note } from '../Note_Fromat';

import { InternService } from '../intern.service';
import { NotesService } from '../notes.service';


@Component({
  selector: 'app-intern-note',
  templateUrl: './intern-note.component.html',
  styleUrls: ['./intern-note.component.scss']
})
export class InternNoteComponent implements OnInit {

  constructor(private notesService : NotesService) {}

  Notes : Note[] = [];

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(): void{
    this.notesService.getIntern()
    .subscribe(Notes => {
      for (var i = 0; i < Notes.length; i++){
        this.CreateDateSwitch(Notes[i]);
        this.ModifitedDateSwitch(Notes[i]);
      }
      this.Notes = Notes;
    })
  }

  CreateDateSwitch(Note: Note): void{
    var CreatDate = new Date(Note.dateCreate) 
    var year = CreatDate.getFullYear();
    var month = CreatDate.getMonth();
    var date = CreatDate.getDate();
    var time = CreatDate.toLocaleTimeString();

    Note.CreatDateShow = year+"年"+month+"月"+date+"日"+"　"+time;
    return ;
  }

  ModifitedDateSwitch(Note: Note): void{
    var CreatDate = new Date(Note.dateModifited) 
    var year = CreatDate.getFullYear();
    var month = CreatDate.getMonth();
    var date = CreatDate.getDate();
    var time = CreatDate.toLocaleTimeString();

    Note.ModifitedDateShow = year+"年"+month+"月"+date+"日"+"　"+time;
    return ;
  }

}
