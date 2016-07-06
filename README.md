#Previously
In the previous step we set up our layout.

#Routing
We are going to create the routes of our application.

This will be done in the near future by typing `git generate route my-route`. But due to changes in the Angular 2 router 
it is temporarily disabled.

So we are going to create our routes following the current specification described in the [docs](https://angular.io/docs/ts/latest/guide/router.html).

First of all we are going to create the component that our route is going to display.

    ng generate component list

Once the new `ListComponent` is created we are going to create new file with the routes of our Web App. Let's create a new 
`app.routes.ts` under the `app/` folder with the following content.

```javascript
import { provideRouter, RouterConfig } from '@angular/router';
import { ListComponent } from './list';

export const routes: RouterConfig = [
  { path: 'list', component: ListComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
```

Next we need to register oir router providers in the `bootstrap` method (inside `main.ts`).

But first we are going to include our router in `app/index.ts` so we can import our `APP_ROUTER_PROVIDERS` in `main.ts` 
following the best practices.

```javascript
export * from './environment';
export * from './app.component';
export * from './app.routes';
```

Now we can register por `APP_ROUTER_PROVIDERS` in `main.ts`.

```javascript
import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, APP_ROUTER_PROVIDERS, environment } from './app/';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  APP_ROUTER_PROVIDERS
]);

```

Next we are going to place the [*Router Outlet*](https://angular.io/docs/ts/latest/guide/router.html#!#router-outlet) in `app.component.html`.

```html
<md-toolbar color="primary">{{title}}</md-toolbar>
<router-outlet></router-outlet>
```

Our new route has been created and our Web App is ready to navigate to it.

Let's import the router directives needed into `AppComponent` so we can add 
a navigation link to our brand new route `/list`.

```javascript
import { Component } from '@angular/core';
import { MdToolbar } from '@angular2-material/toolbar';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [
    ROUTER_DIRECTIVES,
    MdToolbar
  ]
})
export class AppComponent {
  title = 'TODO List';
}
```

Now we can use the `RouterLink` directive in our `app.component.html`.

```html
<md-toolbar color="primary">
    <a [routerLink]="['/list']">{{title}}</a>
</md-toolbar>
<router-outlet></router-outlet>
```

If we try this new link we can see that it is working!

But it is pretty ugly so let's replace the anchor with a `md-button`. First we are going to import 
the directive from material2 and create a metho to `AppComponent` that let us navigate to `/list` from the button.

```javascript
import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { MdToolbar } from '@angular2-material/toolbar';
import { MdButton } from '@angular2-material/button';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [
    ROUTER_DIRECTIVES,
    MdToolbar,
    MdButton
  ]
})
export class AppComponent {
  title = 'TODO List';
  constructor(
    private router: Router
  ) {}
  gotToList() {
    this.router.navigate(['/list']);
  }
}

```

And finally change our `app.component.html` to use `md-button` instead of an anchor.

```html
<md-toolbar color="primary">
    <button md-button (click)="goToList()">{{title}}</button>
</md-toolbar>
<router-outlet></router-outlet>
```

If we try our application at this point we will see an error telling us that there are not
any route matching `''` path. So let's create a new route that redirects our Web App to our main view.

Add to `app.routes.ts` the new route.

```javascript
import { provideRouter, RouterConfig } from '@angular/router';
import { ListComponent } from './list';

export const routes: RouterConfig = [
  { path: '' , redirectTo: '/list'},
  { path: 'list', component: ListComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
```

#Next step
    cd ..
    git checkout step6