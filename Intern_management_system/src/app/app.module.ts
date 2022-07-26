import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InternsComponent } from './interns/interns.component';

import { HttpClientModule } from '@angular/common/http';
import { InternDetailsComponent } from './intern-details/intern-details.component';4
import { FormsModule } from '@angular/forms';
import { InternsTableComponent } from './interns-table/interns-table.component';

@NgModule({
  declarations: [
    AppComponent,
    InternsComponent,
    InternDetailsComponent,
    InternsTableComponent
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
