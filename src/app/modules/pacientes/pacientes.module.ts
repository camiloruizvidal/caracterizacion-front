import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PacientesRoutingModule } from './pacientes-routing.module';
import { PacientesListComponent } from './components/pacientes-list/pacientes-list.component';
import { MapeoExcelComponent } from './components/mapeo-excel/mapeo-excel.component';
import { VerCargaMasivaComponent } from './components/ver-carga-masiva/ver-carga-masiva.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InputsService } from '../generador/services/inputs.service';

import { HttpClientModule } from '@angular/common/http';
import { NgbModalContent } from '../helpers/modal.component/ngb-modal-content.component';
import { HelpersModule } from 'src/app/helpers/helpers.module';
import { FormulariosService } from '../formularios/services/formularios.service';

@NgModule({
  declarations: [
    PacientesListComponent,
    NgbModalContent,
    MapeoExcelComponent,
    VerCargaMasivaComponent
  ],
  imports: [
    CommonModule,
    HelpersModule,
    PacientesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [InputsService, FormulariosService]
})
export class PacientesModule {}
