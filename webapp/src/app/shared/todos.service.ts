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