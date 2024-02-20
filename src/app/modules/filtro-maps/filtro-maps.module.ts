import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './components/map/map/map.component';
import { FiltroMapsRoutingModule } from './filtro-maps-routing.module';

@NgModule({
  declarations: [MapComponent],
  imports: [CommonModule, FiltroMapsRoutingModule],
})
export class FiltroMapsModule {}
