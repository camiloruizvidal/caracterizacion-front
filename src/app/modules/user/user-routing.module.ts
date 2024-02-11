import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { ListComponent } from './components/list/list.component';

const routes: Routes = [{
  path: '',
  component: ListComponent
},{
  path: 'new',
  component: UserComponent
},{
  path: 'update/:id',
  component: UserComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
