import {CanActivateFn, Router} from '@angular/router';
import {map} from 'rxjs';
import {inject} from '@angular/core';
import {AuthService} from '../auth.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user$.pipe(
    map(user => {
      if (user) {
        return router.createUrlTree(['/home']); // já logado → redireciona
      } else {
        return true; // não logado → permite acesso à rota (login, register, etc)
      }
    })
  );
};
