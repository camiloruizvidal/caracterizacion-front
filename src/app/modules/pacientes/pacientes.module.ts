import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacientesRoutingModule } from './pacientes-routing.module';
import { PacientesListComponent } from './components/pacientes-list/pacientes-list.component';
import { HelpersModule } from 'src/app/helpers/helpers.module';

@NgModule({
  declarations: [PacientesListComponent],
  imports: [CommonModule, HelpersModule, PacientesRoutingModule],
})
export class PacientesModule {}
