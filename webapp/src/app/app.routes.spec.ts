/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import {routes} from './app.routes';

describe('routes', () => {
  it('should be an array of routes', () => {
    expect(typeof routes).toBe('array');
  });
});
