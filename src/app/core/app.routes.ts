import { Routes } from '@angular/router';
import { Dashboard } from '../features/dashboard/dashboard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    loadComponent: () =>
      import('../features/auth/login/login_screen').then((m) => m.LoginScreen)
  },
  {
    path: '',
    component: Dashboard,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('../features/dashboard/dashboard').then((m) => m.Dashboard),
        data: { showMenu: true }
      }
    ]
  }
];
