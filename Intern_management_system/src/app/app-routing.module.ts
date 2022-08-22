import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InternsTableComponent } from './intern/interns-table/interns-table.component';
import { InternDetailsComponent } from './intern/intern-details/intern-details.component';
import { InternNoteComponent } from './Note/intern-note/intern-note.component';

const routes: Routes = [
  { path: '', redirectTo: '/intern/interns-table', pathMatch: 'full' },
  { path: 'intern/interns-table', component: InternsTableComponent  },
  { path: 'Note/intern-note', component: InternNoteComponent  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
