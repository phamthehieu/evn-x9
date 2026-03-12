import { Routes } from '@angular/router';
import { AppLayout } from '../layout/component/app-layout/app.layout';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    loadComponent: () =>
      import('../features/auth/login/login_screen').then((m) => m.LoginScreen)
  },
  {
    path: '',
    component: AppLayout,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('../features/dashboard/dashboard_screen').then((m) => m.Dashboard),
        data: { showMenu: true }
      }
    ]
  }
];
