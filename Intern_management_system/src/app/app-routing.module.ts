import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InternsTableComponent } from './interns-table/interns-table.component';
import { InternDetailsComponent } from './intern-details/intern-details.component';
import { InternNoteComponent } from './intern-note/intern-note.component';

const routes: Routes = [
  { path: '', redirectTo: '/interns-table', pathMatch: 'full' },
  { path: 'interns-table', component: InternsTableComponent  },
  { path: 'intern-note', component: InternNoteComponent  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
