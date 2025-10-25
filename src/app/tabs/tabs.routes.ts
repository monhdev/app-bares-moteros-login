import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['public/login']);

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadComponent: () =>
          import('../tab1/tab1.page').then((m) => m.Tab1Page),
        ...canActivate(redirectUnauthorizedToLogin),
      },
      {
        path: 'tab2',
        loadComponent: () =>
          import('../tab2/tab2.page').then((m) => m.Tab2Page),
      },
      {
        path: 'ForumPage',
        loadComponent: () =>
          import('../tab3/forum.page').then((m) => m.ForumPage),
      },
      {
        path: 'tab5',
        loadComponent: () =>
          // import('../public/login/login.page').then((m) => m.LoginPage),
          import('../tab5/tab5.page').then((m) => m.Tab5Page),
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full',
  },


];
