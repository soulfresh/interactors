import {
  containingArray,
  anything,
  any,
  lessThan,
} from './matchers';

describe('matchers', () => {
  let foo, bar;
  beforeEach(() => {
    foo = {name: 'foo'};
    bar = {name: 'bar'};
  });

  describe('containingArray', () => {
    it('should be able to partially match array contents.', () => {
      expect(
        containingArray(['Foo']).match(['Bar', 'Foo', true, false, 0, 1, 2])
      ).toBe(true);

      expect(
        containingArray(['Foo']).match(['Bar', 'Baz', false, {}])
      ).toBe(false);

      expect(
        containingArray(['Foo', 'Bar']).match(['Bar', 'Foo'])
      ).toBe(true);

      expect(
        containingArray(['Foo', 'Bar']).match(['Foo'])
      ).toBe(false);
      expect(
        containingArray(['Foo', 'Bar']).match(['Foo', 'Baz'])
      ).toBe(false);
      expect(
        containingArray(['Foo', 'Bar']).match([])
      ).toBe(false);
    });

    it('should handle multidimensional arrays.', () => {
      const actual = [['Foo', 'Bar'], [0, 1], ['Baz']];
      expect(
        containingArray([['Foo', 'Bar']]).match(actual)
      ).toBe(true);
      expect(
        // Each inner array must match all of the elements in
        // one of the actual inner elements.
        containingArray([['Foo'], ['Bar']]).match(actual)
      ).toBe(false);
      expect(
        containingArray([containingArray(['Foo'])]).match(actual)
      ).toBe(true);
      expect(
        containingArray([containingArray(['Foo', 'Bar'])]).match(actual)
      ).toBe(true);
      expect(
        containingArray([
          containingArray(['Foo']),
          containingArray(['Bar'])
        ]).match(actual)
      ).toBe(true);
      expect(
        // One of the actual inner arrays must contain both items in the
        // expected inner array.
        containingArray([containingArray(['Foo', 'Baz'])]).match(actual)
      ).toBe(false);
    });

    it('should be able to match objects inside the arrays.', () => {
      expect(
        containingArray([foo]).match([bar, foo])
      ).toBe(true);
      expect(
        containingArray([foo, bar]).match([bar, foo])
      ).toBe(true);
      expect(
        containingArray([foo, bar]).match([bar])
      ).toBe(false);

      expect(
        // Objects must be strictly equal.
        containingArray([{name: 'foo'}]).match([foo, bar])
      ).toBe(false);
    });

    it('should be able to handle matchers inside the expected array.', () => {
      expect(
        containingArray([anything()]).match([foo, bar])
      ).toBe(true);
      expect(
        containingArray([foo, anything()]).match([foo, bar])
      ).toBe(true);
      expect(
        containingArray([any(Object)]).match([foo, bar])
      ).toBe(true);
      expect(
        containingArray([lessThan(5)]).match([3, 5])
      ).toBe(true);
      expect(
        containingArray([lessThan(5)]).match([3, 5, bar])
      ).toBe(true);
      expect(
        containingArray([lessThan(5)]).match([foo, bar])
      ).toBe(false);
    });

    it('should be able to match array like objects.', () => {
      // Array like objects
      const list = new Set(['Foo', 'Bar', 'Baz']);
      expect(
        // Check if the actual Set includes, the given list of items.
        containingArray(['Foo', 'Bar']).match(list)
      ).toBe(true);
      expect(
        // If expected is a Set, then actual must also be a Set.
        containingArray(list).match(['Foo', 'Baz'])
      ).toBe(false);
      expect(
        // Check if the expected Set is a subset of actual.
        containingArray(new Set(['Foo', 'Bar'])).match(list)
      ).toBe(false);
    });

    // TODO Not sure about this one.
    xit('should match iterables?', () => {});

    it('should not match if either side is not an array like object.', () => {
      expect(
        containingArray(['Foo', 'Bar']).match(undefined)
      ).toBe(false);
      expect(
        containingArray(['Foo', 'Bar']).match(null)
      ).toBe(false);
      expect(
        containingArray(['Foo', 'Bar']).match(true)
      ).toBe(false);
      expect(
        containingArray([]).match(['Foo', 'Bar'])
      ).toBe(false);
      expect(
        containingArray(undefined).match(['Foo', 'Bar'])
      ).toBe(false);
      expect(
        // @ts-ignore
        containingArray(true).match(['Foo', 'Bar'])
      ).toBe(false);
    });
  });
});
