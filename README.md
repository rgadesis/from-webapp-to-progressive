#Previously
In the previous step we created a `TodosService` to hanlde our `todos`.
We also created the logic of `CreateComponent` and refactor some code to clean the code.

##Progressive Web App
We are going to take advantage of what angular-cli provide to us in order to build a progressive web application.
angular-cli supports the `--mobile` flag when creating or serving our application.

This flag will set up a few extra things to get our Progressive Web App started on the right foot:

- A Web Application Manifest to give browsers information to properly install your app to the home screen.
- A build step to generate an App Shell from your app's root component.
- A Service Worker script to automatically cache your app for fast loading, with or without an internet connection.
Note: the Service Worker is only installed in production mode, i.e. via `ng serve --prod` or `ng build --prod`.

In this step we are going to make the extra configuration manually to understand what s happening.

##Creating our Progressive Web App
Navigate to the root folder of this project and execute the following command.
    ng new progressive --mobile --skip-npm

This is going to create a directory tree simmilar to `webapp` but with some minor changes.

The flag `--skip-npm` skips the dependency installation since there is some version issues. We are going to fix them.
    
Next we are going check `progressive/package.json` `devDepencies` to solve the issue. Change these dependencies.

```json
    "angular2-broccoli-prerender": "0.11.3",
    "angular2-universal": "0.104.4",
```
And add these.

```json
    "child-process-promise": "^2.0.2",
    "optimist": "^0.6.1"
```

The `progressive/package.json` file should finally be like this.

```json
{
  "name": "remove",
  "version": "0.0.0",
  "license": "MIT",
  "angular-cli": {},
  "scripts": {
    "start": "ng serve",
    "postinstall": "typings install",
    "lint": "tslint \"src/**/*.ts\"",
    "test": "ng test",
    "pree2e": "webdriver-manager update",
    "e2e": "protractor"
  },
  "private": true,
  "dependencies": {
    "@angular/common": "2.0.0-rc.3",
    "@angular/compiler": "2.0.0-rc.3",
    "@angular/core": "2.0.0-rc.3",
    "@angular/forms": "0.2.0",
    "@angular/http": "2.0.0-rc.3",
    "@angular/platform-browser": "2.0.0-rc.3",
    "@angular/platform-browser-dynamic": "2.0.0-rc.3",
    "@angular/router": "3.0.0-alpha.8",
    "es6-shim": "0.35.1",
    "reflect-metadata": "0.1.3",
    "rxjs": "5.0.0-beta.6",
    "systemjs": "0.19.26",
    "zone.js": "0.6.12"
  },
  "devDependencies": {
    "@angular/platform-server": "2.0.0-rc.3",
    "@angular/service-worker": "0.2.0",
    "@angular/app-shell": "0.0.0",
    "angular2-broccoli-prerender": "0.11.3",
    "angular2-universal": "0.104.4",
    "child-process-promise": "^2.0.2",
    "optimist": "^0.6.1",
    "angular2-universal-polyfills": "0.4.1",
    "preboot": "2.0.10",
    "angular-cli": "1.0.0-beta.9",
    "codelyzer": "0.0.20",
    "ember-cli-inject-live-reload": "1.4.0",
    "jasmine-core": "2.4.1",
    "jasmine-spec-reporter": "2.5.0",
    "karma": "0.13.22",
    "karma-chrome-launcher": "0.2.3",
    "karma-jasmine": "0.3.8",
    "protractor": "3.3.0",
    "ts-node": "0.5.5",
    "tslint": "3.11.0",
    "typescript": "1.8.10",
    "typings": "0.8.1"
  }
}
```

Now we can install the dependencies.

    npm i

And serve our mobile application.

    ng serve

The purpose of this step was to migrate our `webapp` code into this mobile project. But due tu some dynamic Routing, angular-universal, and other dependency issues
is not going to be possible.

Still we are able to test the main features of a Progressive Web App and taht is what we are going to cover in this step.

##webapp.manifest
This file is now available and because of it we can take advantage of some features such as adding our application to the homescreen of our mobile (Chrome 39+ on Android: from Chrome's menu).

##Changes in AppComponent template (using APP_SHELL_DIRECTIVES)
Lets change the `template` property of our `AppComponent` to this.

```javascript
import { Component } from '@angular/core';
import { APP_SHELL_DIRECTIVES } from '@angular/app-shell';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  template: `
  <h1>{{title}}</h1>
  <h2 *shellRender>APP SHELL RENDERING...</h2>
  <h2 *shellNoRender>APP SHELL RENDERED</h2>
  `,
  styles: [],
  directives: [APP_SHELL_DIRECTIVES]
})
export class AppComponent {
  title = 'app works!';
}
```
Our application now has an App Shell. The goal of an Application Shell is to achieve an extremely fast first rendering.

In collaboration with ServiceWorkers cache every painting since the first one is going to be instantaneous and can be loaded offline.

##ServiceWorker
First of all we are going to enable ServiceWorkers in our browser.

- Firefox Nightly: Go to about:config and set `dom.serviceWorkers.enabled` to `true`; restart browser.
- Chrome Canary: Go to `chrome://flags` and turn on `experimental-web-platform-features`; restart browser (note that some features are now enabled by default in Chrome.)
- Opera: Go to `opera://flags` and enable `Support for ServiceWorker`; restart browser.

Once they are enabled we can build our Progressive Application by adding `--prod` flag to `ng serve` or `ng build` commands.

We can open the dev tools and check under `resources` tab, in `Service Workers` section (with `Show all` option checked) and
check the Service Workers currently running.

Now we can see that that our App Shell loads instantaneously and even offline.

#NextStep
    cd ..
    git checkout step11