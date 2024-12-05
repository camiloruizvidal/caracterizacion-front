import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacientesRoutingModule } from './pacientes-routing.module';
import { PacientesListComponent } from './components/pacientes-list/pacientes-list.component';
import { HelpersModule } from 'src/app/helpers/helpers.module';
import { NgbModalContent } from '../helpers/modal.component/ngb-modal-content.component';

@NgModule({
  declarations: [PacientesListComponent, NgbModalContent],
  imports: [CommonModule, HelpersModule, PacientesRoutingModule]
})
export class PacientesModule {}
