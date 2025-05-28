import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
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
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  }
];
