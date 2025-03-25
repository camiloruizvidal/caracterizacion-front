import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PacientesRoutingModule } from './pacientes-routing.module';
import { PacientesListComponent } from './components/pacientes-list/pacientes-list.component';
import { HelpersModule } from 'src/app/helpers/helpers.module';
import { NgbModalContent } from '../helpers/modal.component/ngb-modal-content.component';
import { ExcelMappingComponent } from './components/excel-mapping/excel-mapping.component';

@NgModule({
  declarations: [
    PacientesListComponent,
    NgbModalContent,
    ExcelMappingComponent
  ],
  imports: [
    CommonModule,
    HelpersModule,
    PacientesRoutingModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class PacientesModule {}
