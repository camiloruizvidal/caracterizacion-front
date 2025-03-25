import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacientesListComponent } from './components/pacientes-list/pacientes-list.component';
import { MapeoExcelComponent } from './components/mapeo-excel/mapeo-excel.component';

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
  },
  {
    path: 'mapeo-excel',
    component: MapeoExcelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacientesRoutingModule {}
