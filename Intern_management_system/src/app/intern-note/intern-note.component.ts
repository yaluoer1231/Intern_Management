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
    this.notesService.getNote()
    .subscribe(Note => {
      for (var i = 0; i < Note.length; i++){
        //this.SwitchDate(Note[i].dateCreate,Note[i].CreatDateShow);
        this.CreateDateSwitch(Note[i]);
        this.ModifitedDateSwitch(Note[i]);
      }
      this.Notes = Note;
      this.GetShowNotes();
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


  GetShowNotes(): void{
    this.SelectShowCode = 0;
    this.ShowNote = this.Notes.filter(h => h.id != 1);
    for(var i = 0; i < this.LockInterns.length; i++){
      this.ShowNote = this.ShowNote.filter(h => h.name !== this.LockInterns[i].name)
    }
  }

  CatchNote(): void{
    
  }

  SearchNotes(): void{
    this.GetShowNotes();
    var SaveNote : Note[] = [];
    this.SelectShowCode = 1;
    for (var i = 0; i < this.ShowNote.length; i++){
      var NoteMain = new Date(this.ShowNote[i].dateModifited).getTime();
      var Test = 0;
      for (var j = 0; j < this.ShowNote.length; j++){
        var NoteSon = new Date(this.ShowNote[j].dateModifited).getTime();
          if (NoteMain < NoteSon)
            Test += 1;
      }
      SaveNote[Test] = this.ShowNote[i];
    }
    this.ShowNote = SaveNote;
  }

  SearchInternNote(intern : string): void {
    this.SelectShowCode = 2;
    var Sort = 0;
    this.ShowNote = []; // 每次查詢前必須先重製陣列
    for (var i = 1; i < this.Notes.length; i++){
      console.log(this.Notes[i].name);
      if (this.Notes[i].name == intern)
        {
          this.ShowNote[Sort] = this.Notes[i];
          Sort += 1;
        }
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

  SwitchDate(SetDate : Date, ShowDate: string): void{ //無法理解的內容
    var CreatDate = new Date(SetDate);
    var year = CreatDate.getFullYear();
    var month = CreatDate.getMonth()+1;
    var date = CreatDate.getDate();
    var time = CreatDate.toLocaleTimeString();
    
    ShowDate = year+"/"+month+"/"+date+""+"　"+time;
    return ;
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
