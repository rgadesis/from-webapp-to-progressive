import { provideRouter, RouterConfig } from '@angular/router';
import { Type } from '@angular/core';
import { ListComponent } from './list';
import { CreateComponent } from './create';

export interface View {
  path: string;
  component: Type;
  icon?: string;
  name?: string;
  description?: string;
}

export const views: View[] = [
  { path: '', component: ListComponent, name: 'Home', description: 'Home',  icon: 'home' },
  { path: 'list', component: ListComponent, name: 'List', description: 'List all your tasks',  icon: 'list' },
  { path: 'create', component: CreateComponent, name: 'Add', description: 'Add a new task',  icon: 'playlist_add' }
];

export const routes: RouterConfig = views.map(view => {
  return {
    path: view.path,
    component: view.component
  };
});

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];