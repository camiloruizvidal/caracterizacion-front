import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputsGeneratorComponent } from './components/inputs-generator/inputs-generator.component';

const routes: Routes = [
  {
    path: '',
    component: InputsGeneratorComponent
  },
  {
    path: 'test',
    component: InputsGeneratorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneradorRoutingModule {}
