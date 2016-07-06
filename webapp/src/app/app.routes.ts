import { provideRouter, RouterConfig } from '@angular/router';
import { ListComponent } from './list';

export const routes: RouterConfig = [
  { path: '' , redirectTo: '/list'},
  { path: 'list', component: ListComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];