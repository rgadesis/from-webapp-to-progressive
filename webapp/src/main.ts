import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { provideForms } from '@angular/forms';
import { AppComponent, APP_ROUTER_PROVIDERS, environment } from './app/';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  HTTP_PROVIDERS,
  provideForms(),
  APP_ROUTER_PROVIDERS
]);