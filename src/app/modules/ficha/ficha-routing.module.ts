import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleComponent } from './components/detalle/detalle.component';
import { InformeDinamicoComponent } from './components/informe-dinamico/informe-dinamico.component';

const routes: Routes = [
  {
    path: ':id/detalle',
    component: DetalleComponent
  },
  {
    path: 'informe',
    component: InformeDinamicoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FichaRoutingModule {}
