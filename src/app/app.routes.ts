import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'users',
    loadComponent: () => import('./pages/users/users.page').then(m => m.UsersPage),
    canActivate: [authGuard]
  },
  {
    path: 'users/form',
    loadComponent: () => import('./pages/user-form/user-form.page').then(m => m.UserFormPage),
    canActivate: [authGuard]
  },
  {
    path: 'users/form/:id',
    loadComponent: () => import('./pages/user-form/user-form.page').then(m => m.UserFormPage),
    canActivate: [authGuard]
  }
];