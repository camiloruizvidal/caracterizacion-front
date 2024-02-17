import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormulariosRoutingModule } from './formularios-routing.module';
import { ListadoMasivoComponent } from './components/formularios/listado-masivo/listado-masivo.component';
import { HelpersModule } from 'src/app/helpers/helpers.module';


@NgModule({
  declarations: [
    ListadoMasivoComponent
  ],
  imports: [
    CommonModule,
    FormulariosRoutingModule,
    HelpersModule,
    HelpersModule
  ]
})
export class FormulariosModule { }
