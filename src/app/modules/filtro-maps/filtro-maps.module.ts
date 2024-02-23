import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './components/map/map/map.component';
import { FiltroMapsRoutingModule } from './filtro-maps-routing.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    FiltroMapsRoutingModule,
    GoogleMapsModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class FiltroMapsModule {}
