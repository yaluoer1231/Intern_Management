import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InternsTableComponent } from './interns-table/interns-table.component';
import { InternDetailsComponent } from './intern-details/intern-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/interns-table', pathMatch: 'full' },
  { path: 'interns-table', component: InternsTableComponent  },
  { path: 'interns-details', component: InternDetailsComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
