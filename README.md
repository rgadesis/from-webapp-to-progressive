#Previously
In the previous step we created our first and main route alongside with the component that will be displayed with it.

#Setting up our ListComponent
Now we are going to set up our main component. 
This component is going to list our TODOs.
We like clean code and good practices so first of all let's begin by creating a Todo interface.

    cd webapp
    ng generate interface todo

Since angular-cli does not support relative interfaces yet, let's move our new created interface inside our `src/app/list` folder.

Now we can specify our interface. Our `src/app/list/todo.ts` file shoul be like this

```javascript
export interface Todo {
    title?: string;
    description?: string;
    completed?: boolean;
}
```

Now lets create a new file called `src/app/list/defaults.ts` where we are going to set up any default values for our `ListComponent`.

```javascript
import { Todo } from './todo';

export const todos: Todo[] = [
    {
        title: 'My first todo',
        description: 'This is placeholder TODO.',
        completed: false
    }, 
    {
        title: 'Develop AppComponent',
        description: 'Complete the development of the layout of our Web App',
        completed: true
    }
];
```

Let's import the interface and our default `todos` and create a `todos` property in our `ListComponent`.

```javascript
import { Component, OnInit } from '@angular/core';
import { Todo } from './todo';
import { todos } from './defaults';

@Component({
  moduleId: module.id,
  selector: 'app-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css']
})
export class ListComponent implements OnInit {
  todos: Todo[] = todos;
  constructor() {}

  ngOnInit() {}

}
```

And let's finish by adding the `md-card` material2 component to display our tasks.

##Import MD_CARD_DIRECTIVES
Import and include `MD_CARD_DIRECTIVES` in our `ListComponent`.

```javascript
import { Component, OnInit } from '@angular/core';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { Todo } from './todo';
import { todos } from './defaults';

@Component({
  moduleId: module.id,
  selector: 'app-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css'],
  directives: [
    MD_CARD_DIRECTIVES
  ]
})
export class ListComponent implements OnInit {
  todos: Todo[] = todos;
  constructor() {}

  ngOnInit() {}

}
```

##Add md-card component to our template
Iterate over our `todos` to display a card for every task.

```html
<div class="card-container">
  <md-card *ngFor="let todo of todos" [ngClass]="{completed: todo.completed}">
    <img md-card-image [alt]="todo.title" src="http://lorempixel.com/g/400/150/abstract/">
    <md-card-title>{{todo.title}}</md-card-title>
    <md-card-content class="secondary">{{todo.description}}</md-card-content>
  </md-card>
</div>
```

We can now see how our `todos` are showing properly in our Web App but let's make it prettier.

##Add some styles
Copy & paste these styles in `list.component.css`.

```css
.completed {
    opacity: 0.5;
}

.secondary {
    color: rgba(0, 0, 0, 0.54);
}

md-card {
    width: 400px;
    box-sizing: boder-box;
    margin: 16px;
}

.card-container {
    display: flex;
    flex-flow: row wrap;
}
```

*Voilá!*

##Next step
    cd ..
    git checkout step7