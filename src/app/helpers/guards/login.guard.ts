import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = new Router();
  const ls = localStorage.getItem('token');
  console.log({ ls });
  //TODO falta
  if (true) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
