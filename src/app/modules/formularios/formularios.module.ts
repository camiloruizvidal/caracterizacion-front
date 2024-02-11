import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormulariosRoutingModule } from './formularios-routing.module';
import { ListadoMasivoComponent } from './components/formularios/listado-masivo/listado-masivo.component';
import { BotonesPaginacionComponent } from 'src/app/helpers/components/botones-paginacion/botones-paginacion.component';


@NgModule({
  declarations: [
    ListadoMasivoComponent,
    BotonesPaginacionComponent
  ],
  imports: [
    CommonModule,
    FormulariosRoutingModule
  ]
})
export class FormulariosModule { }
