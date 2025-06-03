import {inject} from '@angular/core';
import {HttpInterceptorFn} from '@angular/common/http';
import {Auth} from '@angular/fire/auth';
import {from, switchMap} from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(Auth);

  return from(Promise.resolve(auth.currentUser)).pipe(
    switchMap(user => {
      if (!user) {
        return next(req); // não logado, segue requisição
      }

      return from(user.getIdToken()).pipe(
        switchMap(token => {
          const authReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
          return next(authReq);
        })
      );
    })
  );
};
