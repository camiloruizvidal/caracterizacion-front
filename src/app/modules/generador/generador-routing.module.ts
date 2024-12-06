import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputsGeneratorComponent } from './components/inputs-generator/inputs-generator.component';
import { ValueDinamicComponent } from './components/value-dinamic/value-dinamic.component';

const routes: Routes = [
  {
    path: '',
    component: InputsGeneratorComponent
  },
  {
    path: 'test',
    component: ValueDinamicComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneradorRoutingModule {}
