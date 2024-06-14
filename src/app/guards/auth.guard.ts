import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  let auth = authService.isAuth();

  if(!auth){
    router.navigate(['login']);
  }
  return auth ?true:false;
};
