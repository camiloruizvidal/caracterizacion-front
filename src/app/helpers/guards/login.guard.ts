import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = new Router();
  const user = localStorage.getItem('user');
  if (user) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
