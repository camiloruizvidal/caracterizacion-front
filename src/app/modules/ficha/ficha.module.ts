import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FichaRoutingModule } from './ficha-routing.module';
import { DetalleComponent } from './components/detalle/detalle.component';
import { InformeDinamicoComponent } from './components/informe-dinamico/informe-dinamico.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFiltersComponent } from './components/dynamic-filters/dynamic-filters.component';
import { MomentPipe } from 'src/app/pipes/moment.pipe';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { HelpersModule } from 'src/app/helpers/helpers.module';

@NgModule({
  declarations: [
    DetalleComponent,
    InformeDinamicoComponent,
    DynamicFiltersComponent,
    MomentPipe
  ],
  imports: [
    CommonModule,
    FichaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    HttpClientModule,
    HelpersModule
  ]
})
export class FichaModule {}
