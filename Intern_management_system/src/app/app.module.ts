import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { InternDetailsComponent } from './intern/intern-details/intern-details.component';
import { InternsTableComponent } from './intern/interns-table/interns-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InternNoteComponent } from './Note/intern-note/intern-note.component';
import { InternNoteEditComponent } from './Note/intern-note-edit/intern-note-edit.component';
import { SearchComponent } from './intern/intern-details/search/search.component';
import { InternFormEditComponent } from './intern/intern-details/intern-form-edit/intern-form-edit.component';
import { InputDirectiveDirective } from './input-directive.directive';

@NgModule({
  declarations: [
    AppComponent,
    InternDetailsComponent,
    InternsTableComponent,
    InternNoteComponent,
    InternNoteEditComponent,
    SearchComponent,
    InternFormEditComponent,
    InputDirectiveDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
