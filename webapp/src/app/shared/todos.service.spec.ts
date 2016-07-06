/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { TodosService } from './todos.service';

describe('Todos Service', () => {
  beforeEachProviders(() => [TodosService]);

  it('should ...',
      inject([TodosService], (service: TodosService) => {
    expect(service).toBeTruthy();
  }));
});