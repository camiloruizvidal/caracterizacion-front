import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacientesListComponent } from './components/pacientes-list/pacientes-list.component';

const routes: Routes = [
  {
    path: '',
    component: PacientesListComponent
  },
  {
    path: ':id/update',
    component: PacientesListComponent
  },
  {
    path: 'create',
    component: PacientesListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacientesRoutingModule {}
