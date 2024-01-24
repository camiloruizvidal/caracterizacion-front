import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacientesRoutingModule } from './pacientes-routing.module';
import { PacientesComponent } from './components/pacientes/pacientes.component';


@NgModule({
  declarations: [
    PacientesComponent
  ],
  imports: [
    CommonModule,
    PacientesRoutingModule
  ]
})
export class PacientesModule { }
