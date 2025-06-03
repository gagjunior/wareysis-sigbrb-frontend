import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {Auth, user} from '@angular/fire/auth';
import {map} from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = inject(Auth);

  return user(auth).pipe(
    map(currentUser => {
      if (currentUser) {
        return true; // Usuário autenticado
      } else {
        return router.createUrlTree(['/login']); // Redireciona para login
      }
    })
  );
};
