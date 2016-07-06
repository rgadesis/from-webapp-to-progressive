/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { FilterByPipe } from './filter-by.pipe';

describe('Pipe: FilterBy', () => {
  it('create an instance', () => {
    let pipe = new FilterByPipe();
    expect(pipe).toBeTruthy();
  });
});
