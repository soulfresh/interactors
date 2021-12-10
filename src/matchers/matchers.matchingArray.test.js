import {
  matchingArray,
  containingArray,
  anything,
} from './matchers';

describe('matchers', () => {
  let foo, bar;
  beforeEach(() => {
    foo = {name: 'foo'};
    bar = {name: 'bar'};
  });

  describe('matchingArray', () => {
    it('should be able to partially match array contents.', () => {
      expect(
        matchingArray(['Bar', 'Foo']).match(['Bar', 'Foo'])
      ).toBe(true);
      expect(
        // Order matters
        matchingArray(['Foo', 'Bar']).match(['Bar', 'Foo'])
      ).toBe(false);
      expect(
        matchingArray(['Foo']).match(['Bar', 'Foo'])
      ).toBe(false);

      expect(
        matchingArray(['Foo', 'Bar']).match(['Foo'])
      ).toBe(false);
      expect(
        matchingArray(['Foo', 'Bar']).match(['Foo', 'Baz'])
      ).toBe(false);
      expect(
        matchingArray(['Foo', 'Bar']).match([])
      ).toBe(false);
    });

    it('should handle multidimensional arrays.', () => {
      const actual = [['Foo', 'Bar'], [0, 1]];
      expect(
        matchingArray([['Foo', 'Bar'], [0, 1]]).match(actual)
      ).toBe(true);
      expect(
        matchingArray([[0, 1], ['Foo', 'Bar']]).match(actual)
      ).toBe(false);
      expect(
        matchingArray([['Foo', 'Bar']]).match(actual)
      ).toBe(false);
      expect(
        // Each inner array must match all of the elements in
        // one of the actual inner elements.
        matchingArray([['Foo'], [0]]).match(actual)
      ).toBe(false);
      expect(
        matchingArray([['Foo', 'Bar'], [0]]).match(actual)
      ).toBe(false);

      expect(
        matchingArray([anything(), anything()]).match(actual)
      ).toBe(true);
      expect(
        matchingArray([anything()]).match(actual)
      ).toBe(false);

      expect(
        matchingArray([containingArray(['Foo']), containingArray([1])]).match(actual)
      ).toBe(true);
      expect(
        matchingArray([containingArray(['Foo']), anything()]).match(actual)
      ).toBe(true);
    });

    it('should be able to match objects inside the arrays.', () => {
      expect(
        matchingArray([bar, foo]).match([bar, foo])
      ).toBe(true);
      expect(
        matchingArray([foo, bar]).match([bar, foo])
      ).toBe(false);
      expect(
        matchingArray([foo, bar]).match([bar])
      ).toBe(false);

      expect(
        // Objects must be strictly equal.
        matchingArray([{name: 'foo'}]).match([foo])
      ).toBe(false);
    });

    it('should be able to match array like objects.', () => {
      // Array like objects
      const list = new Set(['Foo', 'Bar', 'Baz']);
      expect(
        // Check if the actual Set includes, the given list of items.
        matchingArray(['Foo', 'Bar', 'Baz']).match(list)
      ).toBe(true);
      expect(
        // Check if the actual Set includes, the given list of items.
        matchingArray(['Bar', 'Foo', 'Baz']).match(list)
      ).toBe(false);
      expect(
        // If expected is a Set, then actual must also be a Set.
        matchingArray(list).match(['Foo', 'Bar', 'Baz'])
      ).toBe(false);
      expect(
        // Check if the expected Set is a subset of actual.
        matchingArray(new Set(['Foo', 'Bar', 'Baz'])).match(list)
      ).toBe(false);
    });

    // TODO Not sure about this one.
    xit('should match iterables?', () => {});

    it('should not match if either side is not an array like object.', () => {
      expect(
        matchingArray(['Foo', 'Bar']).match(undefined)
      ).toBe(false);
      expect(
        matchingArray(['Foo', 'Bar']).match(null)
      ).toBe(false);
      expect(
        matchingArray(['Foo', 'Bar']).match(true)
      ).toBe(false);
      expect(
        matchingArray([]).match(['Foo', 'Bar'])
      ).toBe(false);
      expect(
        matchingArray(undefined).match(['Foo', 'Bar'])
      ).toBe(false);
      expect(
        matchingArray(true).match(['Foo', 'Bar'])
      ).toBe(false);
    });
  });
});
