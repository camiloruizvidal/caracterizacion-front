import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'users',
    loadChildren: () =>
      import('../app/modules/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'forms',
    loadChildren: () =>
      import('../app/modules/formularios/formularios.module').then((m) => m.FormulariosModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
