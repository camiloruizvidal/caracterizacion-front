import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loginGuard } from './helpers/guards/login.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('../app/modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'usuarios',
    loadChildren: () =>
      import('../app/modules/user/user.module').then(m => m.UserModule),
    canActivate: [loginGuard]
  },
  {
    path: 'formularios',
    loadChildren: () =>
      import('../app/modules/formularios/formularios.module').then(
        m => m.FormulariosModule
      ),
    canActivate: [loginGuard]
  },
  {
    path: 'cargas',
    loadChildren: () =>
      import('../app/modules/pacientes/pacientes.module').then(
        m => m.PacientesModule
      ),
    canActivate: [loginGuard]
  },
  {
    path: 'fichasmap',
    loadChildren: () =>
      import('../app/modules/filtro-maps/filtro-maps.module').then(
        m => m.FiltroMapsModule
      ),
    canActivate: [loginGuard]
  },
  {
    path: 'ficha',
    loadChildren: () =>
      import('../app/modules/ficha/ficha.module').then(m => m.FichaModule),
    canActivate: [loginGuard]
  },
  {
    path: 'generador',
    loadChildren: () =>
      import('../app/modules/generador/generador.module').then(
        m => m.GeneradorModule
      ),
    canActivate: [loginGuard]
  },
  {
    path: '',
    redirectTo: '/formularios',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/formularios'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
