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
