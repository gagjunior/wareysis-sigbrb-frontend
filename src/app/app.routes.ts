import {Routes} from '@angular/router';
import {authGuard} from './core/auth/guard/auth.guard';
import {loginGuard} from './core/auth/guard/login.guard';

export const routes: Routes = [
  // ROTAS PÚBLICAS
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
    canActivate: [loginGuard],
    loadComponent: () => import('./features/criar-conta/criar-conta.component').then(m => m.CriarContaComponent)
  },
  {
    path: 'onde-estamos',
    loadComponent: () => import('./features/onde-estamos/onde-estamos.component').then(m => m.OndeEstamosComponent)
  },

  // ROTAS PROTEGIDAS DENTRO DE `home` (layout + conteúdo)
  {
    path: 'app',
    canActivate: [authGuard],
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    children: [
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
      },
      {
        path: 'inicio',
        canActivate: [authGuard],
        loadComponent: () => import('./features/home/home-content/home-content.component').then(c => c.HomeContentComponent)
      },
      {
        path: 'cadastros',
        canActivate: [authGuard],
        loadComponent: () => import('./features/cadastros/cadastros.component').then(c => c.CadastrosComponent)
      },
      {
        path: 'configuracoes',
        canActivate: [authGuard],
        loadComponent: () => import('./features/configuracoes/configuracoes.component').then(c => c.ConfiguracoesComponent)
      },
      {
        path: 'relatorios',
        canActivate: [authGuard],
        loadComponent: () => import('./features/relatorios/relatorios.component').then(c => c.RelatoriosComponent)
      }
    ]
  },
  
];
