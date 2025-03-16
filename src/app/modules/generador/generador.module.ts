import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputsGeneratorComponent } from './components/inputs-generator/inputs-generator.component';
import { GeneradorRoutingModule } from './generador-routing.module';
import { HelpersModule } from 'src/app/helpers/helpers.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IsVisibleComponent } from './components/is-visible/is-visible.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [InputsGeneratorComponent, IsVisibleComponent],
  imports: [
    CommonModule,
    NgbModule,
    GeneradorRoutingModule,
    HelpersModule,
    ReactiveFormsModule
  ]
})
export class GeneradorModule {}
