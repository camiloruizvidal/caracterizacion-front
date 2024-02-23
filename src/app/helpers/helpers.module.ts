import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotonesPaginacionComponent } from './components/botones-paginacion/botones-paginacion.component';
import { LoadingComponent } from './components/loading/loading.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [BotonesPaginacionComponent, LoadingComponent],
  imports: [CommonModule, FormsModule],
  exports: [BotonesPaginacionComponent, LoadingComponent],
})
export class HelpersModule {}
