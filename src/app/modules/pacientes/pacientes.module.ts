import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PacientesRoutingModule } from './pacientes-routing.module';
import { PacientesListComponent } from './components/pacientes-list/pacientes-list.component';
import { HelpersModule } from 'src/app/helpers/helpers.module';
import { MapeoExcelComponent } from './components/mapeo-excel/mapeo-excel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalContent } from '../helpers/modal.component/ngb-modal-content.component';

@NgModule({
  declarations: [PacientesListComponent, NgbModalContent, MapeoExcelComponent],
  imports: [
    CommonModule,
    HelpersModule,
    PacientesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class PacientesModule {}
