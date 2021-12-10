import { including } from '@interactors/core';
import {
  containingObject,
  anything,
} from './matchers';

describe('matchers', () => {
  let foo, bar;
  beforeEach(() => {
    foo = {name: 'foo'};
    bar = {name: 'bar'};
  });

  describe('containingObject', () => {
    it('should be able to partially match object contents.', () => {
      expect(
        containingObject(foo).match(foo)
      ).toBe(true);
      expect(
        containingObject(foo).match(bar)
      ).toBe(false);

      expect(
        containingObject(foo).match({name: 'foo', type: 'bar'})
      ).toBe(true);
      expect(
        // All expected props should exist in actual
        containingObject({name: 'foo', type: 'bar'}).match(foo)
      ).toBe(false);

      expect(
        containingObject({name: false}).match({name: false})
      ).toBe(true);

      expect(
        containingObject(foo).match(true)
      ).toBe(false);
      expect(
        containingObject(null).match(null)
      ).toBe(false);
      expect(
        containingObject(NaN).match(NaN)
      ).toBe(false);

      // eslint-disable-next-line
      const list = new Array();
      // @ts-ignore
      list.name = 'foo';

      expect(
        // Any object with the name foo should work.
        containingObject(foo).match(list)
      ).toBe(true);
      expect(
        containingObject(foo).match([foo])
      ).toBe(false);
    });

    it('should handle null and undefined properties.', () => {
      expect(
        containingObject(foo).match(undefined)
      ).toBe(false);
      expect(
        containingObject(foo).match(null)
      ).toBe(false);
      expect(
        containingObject(undefined).match(foo)
      ).toBe(false);
      expect(
        containingObject(null).match(foo)
      ).toBe(false);
      expect(
        containingObject({name: null}).match({name: null})
      ).toBe(true);
      expect(
        containingObject({name: null}).match({name: false})
      ).toBe(false);
      expect(
        containingObject({name: false}).match({name: null})
      ).toBe(false);
      expect(
        containingObject({name: undefined}).match({name: undefined})
      ).toBe(true);
      expect(
        containingObject({name: null}).match({name: undefined})
      ).toBe(false);
      expect(
        containingObject({name: undefined}).match({name: null})
      ).toBe(false);
      expect(
        containingObject({name: undefined}).match({})
      ).toBe(false);
    });

    it('should be able to match any object when passing {}.', () => {
      expect(
        // In this case, any object will work
        containingObject({}).match({name: undefined})
      ).toBe(true);
      expect(
        // In this case, any object will work
        containingObject({}).match({})
      ).toBe(true);
      expect(
        // In this case, any object will work
        containingObject({}).match([])
      ).toBe(true);
      expect(
        // In this case, any object will work
        containingObject({}).match('object')
      ).toBe(false);
      expect(
        // In this case, any object will work
        containingObject({}).match(new String('object'))
      ).toBe(true);
    });

    it('should be able to handle matchers inside the expected object.', () => {
      expect(
        containingObject({name: anything()}).match(foo)
      ).toBe(true);
      expect(
        containingObject({name: including('fo')}).match(foo)
      ).toBe(true);
      expect(
        containingObject({name: including('fo')}).match(bar)
      ).toBe(false);
      expect(
        containingObject({name: 'foo', type: anything()}).match(foo)
      ).toBe(false);
    });
  });
});
