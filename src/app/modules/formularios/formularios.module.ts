import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormulariosRoutingModule } from './formularios-routing.module';
import { ListadoMasivoComponent } from './components/formularios/listado-masivo/listado-masivo.component';


@NgModule({
  declarations: [
    ListadoMasivoComponent
  ],
  imports: [
    CommonModule,
    FormulariosRoutingModule
  ]
})
export class FormulariosModule { }
