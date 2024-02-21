import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FichaRoutingModule } from './ficha-routing.module';
import { DetalleComponent } from './components/detalle/detalle.component';


@NgModule({
  declarations: [
    DetalleComponent
  ],
  imports: [
    CommonModule,
    FichaRoutingModule
  ]
})
export class FichaModule { }
