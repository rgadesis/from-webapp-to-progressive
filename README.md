#Previously
In the previous step we set up our `ListComponent` to display our default `todos`.
We also included `<md-card>` material2 component.

#Adding behavior
We are now going to implement the possibility to complete and remove tasks.

##Import MD_BUTTON_DIRECTIVES and include complete and remove methods
Now we need to import `MD_BUTTON_DIRECTIVES` and include them into our components directives. 
And finally we create the methods to comlete and remove tasks.


```javascript
import { Component, OnInit } from '@angular/core';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { Todo } from './todo';
import { todos } from './defaults';

@Component({
  moduleId: module.id,
  selector: 'app-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css'],
  directives: [
    MD_CARD_DIRECTIVES,
    MD_BUTTON_DIRECTIVES
  ]
})
export class ListComponent implements OnInit {
  todos: Todo[] = todos;
  constructor() {}
  complete(todo: Todo) {
    todo.completed = true;
  }
  remove(todo: Todo) {
    this.todos.splice(this.todos.indexOf(todo), 1);
  }
  ngOnInit() {}

}
```

##Include <md-button> and onClicks
With `MD_BUTTON_DIRECTIVES` included and `complete` and `remove` methods available 
we now add som html into `list.component.html` to add de desired new behaviour.

```html
<div class="card-container">
  <md-card *ngFor="let todo of todos" [ngClass]="{completed: todo.completed}">
    <img md-card-image [alt]="todo.title" src="http://lorempixel.com/g/400/150/abstract/">
    <md-card-title>{{todo.title}}</md-card-title>
    <md-card-content class="secondary">{{todo.description}}</md-card-content>
    <md-card-actions align="end">
      <button md-button color="primary" (click)="complete(todo)" *ngIf="!todo.completed">COMPLETE</button>
      <button md-button color="accent" (click)="remove(todo)">REMOVE</button>
    </md-card-actions>
  </md-card>
</div>
```

##Add a pipe to filter tasks
We will use angular-cli to scaffold a new *Pipe*.

    ng generate pipe filter-by

Once created we only need to implement its logic following the [official documentation instructions](https://angular.io/docs/ts/latest/guide/pipes.html).

```javascript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {

  transform(objs: Array<any>, prop: string, value: any): any {
    return objs.filter(obj => value === null || obj[prop] === value);
  }

}
```

Next we import our brand new *Pipe* into our `ListComponent`.

```javascript
import { Component, OnInit } from '@angular/core';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { FilterByPipe } from '../filter-by.pipe';
import { Todo } from './todo';
import { todos } from './defaults';

@Component({
  moduleId: module.id,
  selector: 'app-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css'],
  directives: [
    MD_CARD_DIRECTIVES,
    MD_BUTTON_DIRECTIVES
  ],
  pipes: [
    FilterByPipe
  ]
})
export class ListComponent implements OnInit {
  todos: Todo[] = todos;
  constructor() {}
  complete(todo: Todo) {
    todo.completed = true;
  }
  remove(todo: Todo) {
    this.todos.splice(this.todos.indexOf(todo), 1);
  }
  ngOnInit() {}

}

```

We can now use our `filterBy` *Pipe* in `list.component.html`.

```html
<div class="card-container">
  <md-card *ngFor="let todo of (todos | filterBy: 'completed')" [ngClass]="{completed: todo.completed}">
    <img md-card-image [alt]="todo.title" src="http://lorempixel.com/g/400/150/abstract/">
    <md-card-title>{{todo.title}}</md-card-title>
    <md-card-content class="secondary">{{todo.description}}</md-card-content>
    <md-card-actions align="end">
      <button md-button color="primary" (click)="complete(todo)" *ngIf="!todo.completed">COMPLETE</button>
      <button md-button color="accent" (click)="remove(todo)">REMOVE</button>
    </md-card-actions>
  </md-card>
</div>
```

Now we need to manage the third argument of the `filterBy` *Pipe* in order to display/hide our tasks. 
Let's implement some `<md-radio-buttons>`.
We import the directives and the providers needed. 

```javascript
import { Component, OnInit } from '@angular/core';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_RADIO_DIRECTIVES, MdUniqueSelectionDispatcher } from '@angular2-material/radio';
import { FilterByPipe } from '../filter-by.pipe';
import { Todo } from './todo';
import { todos } from './defaults';

@Component({
  moduleId: module.id,
  selector: 'app-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css'],
  directives: [
    MD_CARD_DIRECTIVES,
    MD_BUTTON_DIRECTIVES,
    MD_RADIO_DIRECTIVES
  ],
  pipes: [
    FilterByPipe
  ],
  providers: [
    MdUniqueSelectionDispatcher
  ]
})
export class ListComponent implements OnInit {
  todos: Todo[] = todos;
  constructor() {}
  complete(todo: Todo) {
    todo.completed = true;
  }
  remove(todo: Todo) {
    this.todos.splice(this.todos.indexOf(todo), 1);
  }
  ngOnInit() {}

}
````

Now add some `<md-radio-button>`, some properties and event handling and include the third argument in the `filterBy` *Pipe*.

```html
<md-card class="secondary">
  <md-radio-group value="" #completed>
    <md-radio-button value="" (change)="completed.value = undefined">All</md-radio-button>
    <md-radio-button value="true" (change)="completed.value = true">Completed</md-radio-button>
    <md-radio-button value="false" (change)="completed.value = false">Uncompleted</md-radio-button>
  </md-radio-group>
</md-card>
<div class="card-container">
  <md-card *ngFor="let todo of (todos | filterBy: 'completed': completed.value)" [ngClass]="{completed: todo.completed}">
    <img md-card-image [alt]="todo.title" src="http://lorempixel.com/g/400/150/abstract/">
    <md-card-title>{{todo.title}}</md-card-title>
    <md-card-content class="secondary">{{todo.description}}</md-card-content>
    <md-card-actions align="end">
      <button md-button color="primary" (click)="complete(todo)" *ngIf="!todo.completed">COMPLETE</button>
      <button md-button color="accent" (click)="remove(todo)">REMOVE</button>
    </md-card-actions>
  </md-card>
</div>#Previously
In the previous step we added some behaviour to `ListComponent` and created our first *Pipe*.

#Add a new MdSidenav
We are going to review the layout of our application in order to include navigation between the ifferent routes of our application.
First of all we are going to refactor our `app.routes.ts` to implement a new custom concept of *Views*.

```javascript
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
```

The exported `views` are a custom extension of Angular2 *Route*s.
Now we are ready to implement a fancy `MdSidenav` in our `AppComponent`.
Lets import the material2 components that we are going to need and review 
our `AppComponent` properties. 

```javascript
import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';
import { MdToolbar } from '@angular2-material/toolbar';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { View, views } from './app.routes';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [
    ROUTER_DIRECTIVES,
    MD_SIDENAV_DIRECTIVES,
    MD_LIST_DIRECTIVES,
    MdIcon,
    MdToolbar,
    MD_BUTTON_DIRECTIVES
  ],
  providers: [
    MdIconRegistry
  ]
})
export class AppComponent {
  title:string = 'TODO List';
  views:View[] = views;
}
```

The imported `MdIcon` directive requires that we add `HTTP_PROVIDERS` to be included in the bootstrap.
We will also need `provideForms()` *Provider* at this stage to implement *Forms* properly.

```javascript
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
```

The `MdIcon` directive also needs the material icons to display the icons.
So we need to retrieve them in the `<head>` of our `index.html`.

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Webapp</title>
  <base href="/">

  {{#unless environment.production}}
  <script src="/ember-cli-live-reload.js" type="text/javascript"></script>
  {{/unless}}
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root>Loading...</app-root>

  

    {{#each scripts.polyfills}}
    <script src="{{.}}"></script>
    {{/each}}
    <script>
      System.import('system-config.js').then(function () {
        System.import('main');
      }).catch(console.error.bind(console));
    </script>

  

</body>
</html>
```

We are now prepared to modify the `app.component.html` file to add our fancy `MdSidenav` and some `MdIcon`.

```html
<md-sidenav-layout fullscreen>
    <md-sidenav #sidenav>
        <md-nav-list>
            <a md-list-item *ngFor="let view of views" [routerLink]="[view.path]" (click)="sidenav.close()">
                <md-icon md-list-icon>{{view.icon}}</md-icon>
                <span md-line>{{view.name}}</span>
                <span md-line>{{view.description}}</span>
            </a>
        </md-nav-list>
    </md-sidenav>
    <md-toolbar color="primary">
        <md-icon fontIcon="menu"></md-icon>
        <button md-icon-button (click)="sidenav.open()">
            <md-icon>menu</md-icon>
        </button>
        {{title}}
    </md-toolbar>
    <router-outlet></router-outlet>
</md-sidenav-layout>
```

We are now able to navigate in our application via our fancy `MdSidenav`

*Voilá!*

#New shared TodosService
We are going to create a new `TodosService` that is going to be responsible of managing the *Todos* of our Web App.
    cd webapp
    ng generate service todos
  
This `TodosService` is located under `src/app` but we are going to relocate it to a more suitable folder.
Alongside with the service we are going to move other sources that are now shared.

    src/app/list/todo.ts > src/app/shared/todo.ts
    src/app/list/defaults.ts > src/app/shared/defaults.ts
    src/app/todos.service.ts > src/app/shared/todos.service.ts
    src/app/todos.service.spec.ts > src/app/shared/todos.service.spec.ts

Once relocated we can now set our *Service* code.

```javascript
import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { todos } from './defaults';

@Injectable()
export class TodosService {
  todos: Todo[] = todos;
  constructor() {}
  get() {
    return this.todos;
  }
  add(todo: Todo) {
    this.todos.push(todo);
  }
  remove(todo: Todo) {
    this.todos.splice(this.todos.indexOf(todo), 1);
  }
  complete(todo: Todo) {
    todo.completed = true;
  }
}
```

Due to the new `TodosService` *Service* and the relocation of some sources we need to refactor `ListComponent`.

```javascript
import { Component, OnInit } from '@angular/core';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_RADIO_DIRECTIVES, MdUniqueSelectionDispatcher } from '@angular2-material/radio';
import { FilterByPipe } from '../filter-by.pipe';
import { TodosService } from '../shared/todos.service';
import { Todo } from '../shared/todo';

@Component({
  moduleId: module.id,
  selector: 'app-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css'],
  directives: [
    MD_CARD_DIRECTIVES,
    MD_BUTTON_DIRECTIVES,
    MD_RADIO_DIRECTIVES
  ],
  pipes: [
    FilterByPipe
  ],
  providers: [
    MdUniqueSelectionDispatcher,
    TodosService
  ]
})
export class ListComponent implements OnInit {
  constructor(
    private todos: TodosService
  ) {}
  complete(todo: Todo) {
    this.todos.complete(todo);
  }
  remove(todo: Todo) {
    this.todos.remove(todo);
  }
  ngOnInit() {}
}

```

... its template...

```html
<md-card class="secondary">
  <md-radio-group value="" #completed>
    <md-radio-button value="" (change)="completed.value = undefined">All</md-radio-button>
    <md-radio-button value="true" (change)="completed.value = true">Completed</md-radio-button>
    <md-radio-button value="false" (change)="completed.value = false">Uncompleted</md-radio-button>
  </md-radio-group>
</md-card>
<div class="card-container">
  <md-card *ngFor="let todo of (todos.get() | filterBy: 'completed': completed.value)" [ngClass]="{completed: todo.completed}">
    <img md-card-image [alt]="todo.title" src="http://lorempixel.com/g/400/150/abstract/">
    <md-card-title>{{todo.title}}</md-card-title>
    <md-card-content class="secondary">{{todo.description}}</md-card-content>
    <md-card-actions align="end">
      <button md-button color="primary" (click)="complete(todo)" *ngIf="!todo.completed">COMPLETE</button>
      <button md-button color="accent" (click)="remove(todo)">REMOVE</button>
    </md-card-actions>
  </md-card>
</div>
```

... and its `spec`.

```javascript
/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { ListComponent } from './list.component';
import { TodosService } from '../shared/todos.service';

describe('Component: List', () => {
  it('should create an instance', () => {
    let component = new ListComponent(new TodosService());
    expect(component).toBeTruthy();
  });
});
```

Now our Web App manages its *todos* via `TodosService`.

#New CreateComponent

Let's code some magic in `src/app/create/create.component.ts`.

```javascript
import { Component, OnInit } from '@angular/core';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';
import { MD_CHECKBOX_DIRECTIVES } from '@angular2-material/checkbox'
import { TodosService } from '../shared/todos.service';
import { Todo } from '../shared/todo';

@Component({
  moduleId: module.id,
  selector: 'app-create',
  templateUrl: 'create.component.html',
  styleUrls: ['create.component.css'],
  directives: [
    MD_CARD_DIRECTIVES,
    MD_BUTTON_DIRECTIVES,
    MD_INPUT_DIRECTIVES,
    MD_CHECKBOX_DIRECTIVES
  ],
  providers: [
    TodosService
  ]
})
export class CreateComponent implements OnInit {
  todo: Todo = {
    title: '',
    description: '',
    completed: false
  };
  constructor(
    private todos: TodosService
  ) {}
  add(todo: Todo) {
    this.todos.add(todo);
  }
  ngOnInit() {}

}
```

... and its `spec`.

```javascript
/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { CreateComponent } from './create.component';
import { TodosService } from '../shared/todos.service';

describe('Component: Create', () => {
  it('should create an instance', () => {
    let component = new CreateComponent(new TodosService());
    expect(component).toBeTruthy();
  });
});

```

Now let's put in action this logic modifying `src/app/create/create.component.html`.

```html
<div class="form">
  <md-card>
    <md-card-title>What else would you like to do today?</md-card-title>
    <md-card-content>
      <form>
        <md-input placeholder="Title" #title></md-input>
        <md-input placeholder="Description" #description></md-input>
        <div>
          <md-checkbox indeterminate="true" #completed>Completed</md-checkbox>
        </div>
      </form>
    </md-card-content>
    <md-card-actions align="end">
      <button md-raised-button color="accent" (click)="add({title: title.value, description: description.value, completed: completed.checked}); title.value = undefined; description.value = undefined; completed.checked = false;">ADD</button>
    </md-card-actions>
  </md-card>
</div>
```

Finally some styling in `src/app/create/create.component.css`.

```css
md-card {
    margin: 16px;
}

md-input {
    width: 100%;
}
```

*Voilá!*

#Last minute fix
Our pipe is not working as intended. To fix it we only need to convert our `filterBy` *Pipe* into an *inpute* one.

```javascript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy',
  pure: false
})
export class FilterByPipe implements PipeTransform {

  transform(objs: Array<any>, prop: string, value: any): any {
    return objs.filter(obj => value === null || obj[prop] === value);
  }

}
```

Finally some final styling.

```css
.completed {
    opacity: 0.5;
}

.secondary {
    color: rgba(0, 0, 0, 0.54);
}

md-card {
    margin: 16px;
}

.card-container md-card {
    width: 400px;
    box-sizing: boder-box;
}

.card-container {
    display: flex;
    flex-flow: row wrap;
}

md-radio-button {
    margin: 16px 8px;
}
```

*Voilá!*

#NextStep
    cd ..
    git checkout step10