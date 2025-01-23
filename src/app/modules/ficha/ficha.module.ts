import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FichaRoutingModule } from './ficha-routing.module';
import { DetalleComponent } from './components/detalle/detalle.component';
import { InformeDinamicoComponent } from './components/informe-dinamico/informe-dinamico.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFiltersComponent } from './components/dynamic-filters/dynamic-filters.component';

@NgModule({
  declarations: [
    DetalleComponent,
    InformeDinamicoComponent,
    DynamicFiltersComponent
  ],
  imports: [CommonModule, FichaRoutingModule, FormsModule, ReactiveFormsModule]
})
export class FichaModule {}
