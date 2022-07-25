import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InternsComponent } from './interns/interns.component';

import { HttpClientModule } from '@angular/common/http';
import { InternDetailsComponent } from './intern-details/intern-details.component';

@NgModule({
  declarations: [
    AppComponent,
    InternsComponent,
    InternDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
