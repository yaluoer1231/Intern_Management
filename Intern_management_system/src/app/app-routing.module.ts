import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InternsComponent } from './interns/interns.component';
import { InternsTableComponent } from './interns-table/interns-table.component';

const routes: Routes = [
  { path: '', redirectTo: '/interns-table', pathMatch: 'full' },
  { path: 'interns', component: InternsComponent  },
  { path: 'interns-table', component: InternsTableComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
