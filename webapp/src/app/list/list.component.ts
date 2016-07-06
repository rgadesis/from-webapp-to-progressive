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
