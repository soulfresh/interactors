import {
  any,
  anything,
  is,
  equal,
  greaterThan,
  greaterThanOrEqualTo,
  lessThan,
  lessThanOrEqualTo,
} from './matchers';

describe('matchers', () => {
  describe('any', () => {
    it('should be able to match any instance.', () => {
      // eslint-disable-next-line
      expect(any(Object).match(new Object())).toBe(true);
      expect(any(Object).match({})).toBe(true);
      expect(any(Object).match([])).toBe(true);
      expect(any(Array).match([])).toBe(true);
      expect(any(Array).match({})).toBe(false);
      // eslint-disable-next-line
      expect(any(String).match(new String())).toBe(true);
      expect(any(String).match('foo')).toBe(true);
      expect(any(Boolean).match(true)).toBe(true);
      expect(any(Boolean).match(false)).toBe(true);
      expect(any(Object).match(null)).toBe(true);
      expect(any(Object).match(NaN)).toBe(false);
      expect(any(Object).match(undefined)).toBe(false);
      expect(any(Function).match(() => {})).toBe(true);
      expect(any(Set).match(new Set())).toBe(true);
      // eslint-disable-next-line
      expect(any(Set).match(new Object())).toBe(false);
      expect(any(undefined).match(undefined)).toBe(true);
      expect(any(null).match(null)).toBe(true);
    });
  });

  describe('anything', () => {
    it('should match anything except null or undefined.', () => {
      expect(anything().match(true)).toBe(true);
      expect(anything().match(false)).toBe(true);
      expect(anything().match({})).toBe(true);
      expect(anything().match([])).toBe(true);
      expect(anything().match(0)).toBe(true);
      expect(anything().match(1)).toBe(true);
      expect(anything().match('foo')).toBe(true);
      expect(anything().match('')).toBe(true);

      expect(anything().match(null)).toBe(false);
      expect(anything().match(undefined)).toBe(false);
    });
  });

  describe('is', () => {
    it('should verify strict equality.', () => {
      const foo = {};
      expect(is(foo).match(foo)).toBe(true);
      expect(is(foo).match({})).toBe(false);
      expect(is({}).match({})).toBe(false);
      expect(is(true).match(true)).toBe(true);
      expect(is(true).match(false)).toBe(false);
      expect(is(false).match(false)).toBe(true);
      expect(is(0).match(0)).toBe(true);
      expect(is(String).match(String)).toBe(true);

      expect(is(null).match(null)).toBe(true);
      expect(is(undefined).match(undefined)).toBe(true);
      expect(is(null).match(undefined)).toBe(false);
      expect(is(undefined).match(null)).toBe(false);
      expect(is(NaN).match(NaN)).toBe(false);
    });
  });

  describe('equal', () => {
    it('should verify using ==.', () => {
      const foo = {};
      expect(equal(foo).match(foo)).toBe(true);
      expect(equal(foo).match({})).toBe(true);
      expect(equal({}).match({})).toBe(true);
      // eslint-disable-next-line
      expect(equal({}).match(new Object())).toBe(true);
      expect(equal(true).match(true)).toBe(true);
      expect(equal(true).match(false)).toBe(false);
      expect(equal(false).match(false)).toBe(true);
      expect(equal(0).match(0)).toBe(true);
      expect(equal(String).match(String)).toBe(true);

      expect(equal(null).match(null)).toBe(true);
      expect(equal(undefined).match(undefined)).toBe(true);
      expect(equal(null).match(undefined)).toBe(false);
      expect(equal(undefined).match(null)).toBe(false);

      // Not sure why _.isEqual returns true but keeping
      // it for consistency with lodash
      expect(equal(NaN).match(NaN)).toBe(true);
    });
  });

  describe('greaterThan', () => {
    it('should be able to tell if something is larger.', () => {
      expect(greaterThan(0).match(1)).toBe(true);
      expect(greaterThan(1).match(0)).toBe(false);
      expect(greaterThan(0).match(0)).toBe(false);
      expect(greaterThan(-1).match(0)).toBe(true);
      expect(greaterThan(0).match(-1)).toBe(false);

      expect(greaterThan(0).match(true)).toBe(false);
      expect(greaterThan(0).match(false)).toBe(false);
      // @ts-ignore
      expect(greaterThan(false).match(0)).toBe(false);
      // @ts-ignore
      expect(greaterThan(false).match(1)).toBe(false);

      expect(greaterThan(0).match(undefined)).toBe(false);
      expect(greaterThan(0).match(null)).toBe(false);
      expect(greaterThan(0).match({})).toBe(false);
      expect(greaterThan(0).match([])).toBe(false);
    });
  });

  describe('greaterThanOrEqualTo', () => {
    it('should be able to tell if something is larger or equal to.', () => {
      expect(greaterThanOrEqualTo(0).match(1)).toBe(true);
      expect(greaterThanOrEqualTo(1).match(0)).toBe(false);
      expect(greaterThanOrEqualTo(0).match(0)).toBe(true);
      expect(greaterThanOrEqualTo(-1).match(0)).toBe(true);
      expect(greaterThanOrEqualTo(-1).match(-1)).toBe(true);
      expect(greaterThanOrEqualTo(0).match(-1)).toBe(false);

      expect(greaterThanOrEqualTo(0).match(true)).toBe(false);
      expect(greaterThanOrEqualTo(0).match(false)).toBe(false);
      // @ts-ignore
      expect(greaterThanOrEqualTo(false).match(0)).toBe(false);
      // @ts-ignore
      expect(greaterThanOrEqualTo(false).match(1)).toBe(false);

      expect(greaterThanOrEqualTo(0).match(undefined)).toBe(false);
      expect(greaterThanOrEqualTo(0).match(null)).toBe(false);
      expect(greaterThanOrEqualTo(0).match({})).toBe(false);
      expect(greaterThanOrEqualTo(0).match([])).toBe(false);
    });
  });

  describe('lessThan', () => {
    it('should be able to tell if a number is smaller.', () => {
      expect(lessThan(1).match(0)).toBe(true);
      expect(lessThan(0).match(1)).toBe(false);
      expect(lessThan(0).match(0)).toBe(false);
      expect(lessThan(-1).match(0)).toBe(false);
      expect(lessThan(0).match(-1)).toBe(true);

      expect(lessThan(0).match(true)).toBe(false);
      expect(lessThan(0).match(false)).toBe(false);
      // @ts-ignore
      expect(lessThan(false).match(0)).toBe(false);
      // @ts-ignore
      expect(lessThan(false).match(1)).toBe(false);

      expect(lessThan(0).match(undefined)).toBe(false);
      expect(lessThan(0).match(null)).toBe(false);
      expect(lessThan(0).match({})).toBe(false);
      expect(lessThan(0).match([])).toBe(false);
    });
  });

  describe('lessThanOrEqualTo', () => {
    it('should able to tell if a number is less than or equal.', () => {
      expect(lessThanOrEqualTo(1).match(0)).toBe(true);
      expect(lessThanOrEqualTo(0).match(1)).toBe(false);
      expect(lessThanOrEqualTo(0).match(0)).toBe(true);
      expect(lessThanOrEqualTo(-1).match(0)).toBe(false);
      expect(lessThanOrEqualTo(-1).match(-1)).toBe(true);
      expect(lessThanOrEqualTo(0).match(-1)).toBe(true);

      expect(lessThanOrEqualTo(0).match(true)).toBe(false);
      expect(lessThanOrEqualTo(0).match(false)).toBe(false);
      // @ts-less
      expect(lessThanOrEqualTo(false).match(0)).toBe(false);
      // @ts-less
      expect(lessThanOrEqualTo(false).match(1)).toBe(false);

      expect(lessThanOrEqualTo(0).match(undefined)).toBe(false);
      expect(lessThanOrEqualTo(0).match(null)).toBe(false);
      expect(lessThanOrEqualTo(0).match({})).toBe(false);
      expect(lessThanOrEqualTo(0).match([])).toBe(false);

    });
  });
})
