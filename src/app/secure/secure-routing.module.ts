import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard', label: ''},
  { path: 'dashboard', component: DashboardComponent, label: 'Dashboard' },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecureRoutingModule { }
