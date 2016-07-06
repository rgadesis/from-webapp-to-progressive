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