import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotonesPaginacionComponent } from './components/botones-paginacion/botones-paginacion.component';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [BotonesPaginacionComponent, LoadingComponent],
  imports: [CommonModule],
  exports: [BotonesPaginacionComponent, LoadingComponent],
})
export class HelpersModule {}
