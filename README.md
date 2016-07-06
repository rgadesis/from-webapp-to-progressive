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
</div>
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

#Next step
    cd ..
    git checkout step8