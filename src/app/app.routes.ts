import {Routes} from '@angular/router';
import {authGuard} from './core/auth/guard/auth.guard';
import {loginGuard} from './core/auth/guard/login.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    canActivate: [loginGuard],
    loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'registro',
    loadComponent: () => import('./features/registro/registro.component').then(m => m.RegistroComponent)
  },
  {
    path: 'onde-estamos',
    loadComponent: () => import('./features/onde-estamos/onde-estamos.component').then(m => m.OndeEstamosComponent)
  },
  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  }
];
