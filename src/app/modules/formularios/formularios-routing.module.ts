import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoMasivoComponent } from './components/formularios/listado-masivo/listado-masivo.component';

const routes: Routes = [
  {
    path: '',
    component: ListadoMasivoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormulariosRoutingModule {}
