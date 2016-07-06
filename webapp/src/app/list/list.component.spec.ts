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
