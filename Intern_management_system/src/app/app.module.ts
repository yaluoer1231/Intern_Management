import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { InternDetailsComponent } from './intern-details/intern-details.component';4
import { FormsModule } from '@angular/forms';
import { InternsTableComponent } from './interns-table/interns-table.component';
import { SexPipe } from './sex.pipe';
import { InternNoteComponent } from './intern-note/intern-note.component';
import { InternNoteEditComponent } from './intern-note-edit/intern-note-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    InternDetailsComponent,
    InternsTableComponent,
    SexPipe,
    InternNoteComponent,
    InternNoteEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
