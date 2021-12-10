import { including } from '@interactors/core';
import {
  matchingObject,
  anything,
} from './matchers';

describe('matchers', () => {
  let foo, bar;
  beforeEach(() => {
    foo = {name: 'foo'};
    bar = {name: 'bar'};
  });

  describe('matchingObject', () => {
    it('should be able to partially match object contents.', () => {
      expect(
        matchingObject(foo).match(foo)
      ).toBe(true);
      expect(
        matchingObject(foo).match(bar)
      ).toBe(false);

      expect(
        matchingObject(foo).match({name: 'foo', type: 'bar'})
      ).toBe(false);
      expect(
        // All expected props should exist in actual
        matchingObject({name: 'foo', type: 'bar'}).match(foo)
      ).toBe(false);

      expect(
        matchingObject({name: false}).match({name: false})
      ).toBe(true);

      expect(
        matchingObject(foo).match(true)
      ).toBe(false);
      expect(
        matchingObject(null).match(null)
      ).toBe(false);
      expect(
        matchingObject(NaN).match(NaN)
      ).toBe(false);

      // eslint-disable-next-line
      const list = new Array();
      // @ts-ignore
      list.name = 'foo';

      expect(
        // Any object with the name foo should work.
        matchingObject(foo).match(list)
      ).toBe(true);
      expect(
        matchingObject(foo).match([foo])
      ).toBe(false);
    });

    it('should handle null and undefined properties.', () => {
      expect(
        matchingObject(foo).match(undefined)
      ).toBe(false);
      expect(
        matchingObject(foo).match(null)
      ).toBe(false);
      expect(
        matchingObject(undefined).match(foo)
      ).toBe(false);
      expect(
        matchingObject(null).match(foo)
      ).toBe(false);
      expect(
        matchingObject({name: null}).match({name: null})
      ).toBe(true);
      expect(
        matchingObject({name: null}).match({name: false})
      ).toBe(false);
      expect(
        matchingObject({name: false}).match({name: null})
      ).toBe(false);
      expect(
        matchingObject({name: undefined}).match({name: undefined})
      ).toBe(true);
      expect(
        matchingObject({name: null}).match({name: undefined})
      ).toBe(false);
      expect(
        matchingObject({name: undefined}).match({name: null})
      ).toBe(false);
      expect(
        matchingObject({name: undefined}).match({})
      ).toBe(false);
    });

    it('should only match empty objects when passing {}.', () => {
      expect(
        matchingObject({}).match({})
      ).toBe(true);
      expect(
        matchingObject({}).match({name: undefined})
      ).toBe(false);
      expect(
        // This would work too
        matchingObject({}).match([])
      ).toBe(true);
      expect(
        matchingObject({}).match('object')
      ).toBe(false);
      expect(
        // eslint-disable-next-line
        matchingObject({}).match(new String('object'))
      ).toBe(false);
    });

    it('should be able to handle matchers inside the expected object.', () => {
      expect(
        matchingObject({name: anything()}).match(foo)
      ).toBe(true);
      expect(
        matchingObject({name: including('fo')}).match(foo)
      ).toBe(true);
      expect(
        matchingObject({name: including('fo')}).match(bar)
      ).toBe(false);
      expect(
        matchingObject({name: 'foo', type: anything()}).match(foo)
      ).toBe(false);
    });
  });
});
