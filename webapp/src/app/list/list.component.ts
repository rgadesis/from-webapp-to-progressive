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