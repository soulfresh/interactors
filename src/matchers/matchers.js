import isEqual from 'lodash.isequal';

// Taken from Jest
function isSameType(sample, other) {
  // eslint-disable-next-line eqeqeq
  if (sample == String) {
    return typeof other == 'string' || other instanceof String;
  }

  // eslint-disable-next-line eqeqeq
  if (sample == Number) {
    return typeof other == 'number' || other instanceof Number;
  }

  // eslint-disable-next-line eqeqeq
  if (sample == Function) {
    return typeof other == 'function' || other instanceof Function;
  }

  // eslint-disable-next-line eqeqeq
  if (sample == Object) {
    return typeof other == 'object';
  }

  // eslint-disable-next-line eqeqeq
  if (sample == Boolean) {
    return typeof other == 'boolean';
  }

  /* global BigInt */
  // eslint-disable-next-line eqeqeq
  if (sample == BigInt) {
    return typeof other == 'bigint';
  }

  // eslint-disable-next-line eqeqeq
  if (sample == Symbol) {
    return typeof other == 'symbol';
  }

  return other instanceof sample;
}

/** @param {any} obj */
function isUndefined(obj) {
  return obj === void 0;
}

const isMatcher = test => typeof(test?.match) === 'function' &&
  typeof(test?.description) === 'function';

const applyMatcher = (expected, actual) => {
  if (isMatcher(expected)) {
    return expected.match(actual);
  } else if (Array.isArray(expected) && Array.isArray(actual)) {
    return applyArrayMatcher(expected, actual);
  } else {
    return expected === actual;
  }
}

const applyArrayMatcher = (expected, actual) => {
  return Array.from(actual).every((entry, i) => {
    return applyMatcher(expected[i], entry);
  });
}

function applyObjectMatcher(expected, actual) {
  // Both sides must be defined.
  if (!expected || !actual) return false;
  // Both sides must be objects.
  if (typeof(expected) !== 'object' || typeof(actual) !== 'object') return false;

  const expectedKeys = Object.keys(expected);
  const actualKeys = Object.keys(actual);
  // Both sides must have the same number of properties
  if (expectedKeys.length !== actualKeys.length) return false;

  // Actual must include all of the properties from expected.
  if (!expectedKeys.every(key => actualKeys.includes(key))) return false;

  // All properties of expected must match those of actual.
  return actualKeys.every((prop) => {
    return applyMatcher(expected[prop], actual[prop]);
  });
}

function applyObjectPartialMatcher(expected, actual) {
  // Both sides must be defined.
  if (!expected || !actual) return false;
  // Both sides must be objects.
  if (typeof(expected) !== 'object' || typeof(actual) !== 'object') return false;

  const expectedKeys = Object.keys(expected);
  const actualKeys = Object.keys(actual);

  // Actual must include all of the properties from expected.
  if (!expectedKeys.every(key => actualKeys.includes(key))) return false;

  // All property values of actual must match those of expected.
  return Object.keys(expected).every((prop) => {
    return applyMatcher(expected[prop], actual[prop]);
  });
}

const applyArrayPartialMatcher = (expected, actual) => {
  // If expected is not an array like object, treat it as
  // an element we are searching for inside of actual.
  if (typeof expected === 'string' || expected?.length === undefined)
    expected = [expected];

  const actualList = Array.from(actual);
  return Array.from(expected).every((entry, i) => {
    return actualList.findIndex(a => applyMatcher(entry, a)) > -1;
  });
}

function getDescription(expected) {
  if (Array.isArray(expected))
    return `[${expected.map(e => isMatcher(e) ? e.description() : e)}]`;
  else if (isMatcher(expected))
    return expected.description();
  else
    return JSON.stringify(expected);
}

/** @param {any} expected */
function isArrayLike(expected) {
  return expected &&
    // is not a string
    (typeof(expected) !== 'string' && !(expected instanceof String)) &&
    (
      // is an array
      Array.isArray(expected) ||
      Array.isArray(Array.from(expected))
      // TODO Do we want to support custom iterable objects?
      // // is Map, Set, etc
      // Array.isArray(Array.from(expected)) ||
      // // is an iterable object
      // (expected.next && typeof(expected.next) === 'function')
    )
}

/**
 * Check that the contents of a list
 * match the given list (including order).
 * Order is important and all values must match.
 * Nested matchers are taken into account.
 * Similar to Jest `expect(actual).toEqual(['Foo', bar, 0])`.
 *
 * Example:
 * ```js
 * // The `value` filter of Foo must be an array with two
 * // elements 'Foo' and anything else, in that order.
 * Foo().has({value: matchingArray(['Foo', any(Number)])});
 * ```
 *
 * @param {any} expected - The list to
 *   match against which may include
 *   sub-matchers.
 */
export function matchingArray(expected) {
  return {
    /** @param {any} actual */
    match(actual) {
      // Both sides must be array like.
      if (!isArrayLike(expected) || !isArrayLike(actual)) return false;
      // The lengths must be the same.
      if (Array.from(expected).length !== Array.from(actual).length) return false;
      return applyArrayMatcher(expected, actual);
    },
    description() {
      return `matching array ${getDescription(expected)}`;
    }
  }
}

/**
 * Check that an array includes the given items
 * in any order. Nested matchers are taken into account.
 * Similar to Jest `expect.arrayContaining`.
 *
 * Example:
 * ```js
 * // The `value` filter of Foo must be an array that includes
 * // the strings 'Foo' and 'Bar' in any order.
 * Foo().has({value: containingArray(['Foo', 'Bar']);
 * ```
 *
 * @param {any} expected
 */
export function containingArray(expected) {
  return {
    /** @param {any} actual */
    match(actual) {
      // Both sides must be arrays.
      if (!isArrayLike(expected) || !isArrayLike(actual)) return false;
      // Expected has to include something to look for in the actual list.
      if (Array.from(expected).length < 1) return false;
      return applyArrayPartialMatcher(expected, actual);
    },
    description() {
      return `containingArray ${getDescription(expected)}`;
    }
  }
}

/**
 * Check that the expect object has all of
 * the same properties of the actual object.
 * This is most useful as a sub-matcher inside
 * of `containingArray` or `matchingArray`.
 * Nested matchers are taken into account.
 * Similar to Jest `expect(thing).toEqual({name: 'foo'})`
 *
 * ```js
 * // The `value` filter of Foo must be an object with
 * // only one property. The property must be 'name'
 * // and its value must be the string 'foo'.
 * Foo().has({value: matchingObject({name: 'foo'})});
 * ```
 *
 * @param {any} expected
 */
export function matchingObject(expected) {
  return {
    /** @param {any} actual */
    match(actual) {
      return applyObjectMatcher(expected, actual);
    },
    description() {
      return `containingArray ${getDescription(expected)}`;
    }
  }
}

/**
 * Check that the expect object is a subset of
 * the properties of the actual object.
 * Nested matchers are taken into account.
 * Similar to Jest `expect.objectContaining`
 *
 * ```js
 * // The `value` filter of Foo must be an object with
 * // only one property. The property must be 'name'
 * // and its value must be the string 'foo'.
 * Foo().has({value: {name: 'foo'}});
 * ```
 *
 * @param {any} expected
 */
export function containingObject(expected) {
  return {
    /** @param {any} actual */
    match(actual) {
      return applyObjectPartialMatcher(expected, actual);
    },
    description() {
      return `containingArray ${getDescription(expected)}`;
    }
  }
}

/**
 * Match any type constructor in the same
 * manner as Jest `expect.any`.
 *
 * For example:
 * ```js
 * TextField().has({placeholder: any(String)});
 * Foo().has({thing: any(Number)});
 * ```
 *
 * @param {function} expected - A type constructor
 *   that you expect the actual value to be.
 */
export function any(expected) {
  return {
    /** @param {any} actual */
    match(actual) {
      if (expected === null && actual === null) return true;
      if (expected === undefined && actual === undefined) return true;
      return isSameType(expected, actual);
    },
    description() {
      return `instanceof ${expected.name}`;
    }
  };
};

/**
 * Match any value in the same manner as Jest `expect.anything()`
 */
export function anything() {
  return {
    /** @param {any} actual */
    match: (actual) => !isUndefined(actual) && actual !== null,
    description: () => '*'
  }
}

/**
 * Strict equality check (ie ===).
 * @param {any} expected
 */
export function is(expected) {
  return {
    /** @param {any} actual */
    match(actual) {
      return actual === expected
    },
    description() {
      return `is ${expected}`
    }
  };
};

/**
 * @private
 * Private until sub-matching is implemented.
 *
 * Lose equality check using lodash isEqual.
 *
 * Note: This currently does not handle
 * sub-matching.
 * @param {any} expected
 */
export function equal(expected) {
  return {
    /** @param {any} actual */
    match(actual) {
      // TODO This won't handle sub-matchers
      // eslint-disable-next-line eqeqeq
      return isEqual(expected, actual);
    },
    description() {
      return `equal to ${expected}`
    }
  };
};

/**
 * @private
 * Alias for `equal`
 */
export const equals = equal;

/**
 * Match any number greater than the given value.
 * @param {number} expected
 */
export function greaterThan(expected) {
  return {
    /** @param {any} actual */
    match(actual) {
      if (typeof(actual) !== 'number' || typeof(expected) !== 'number') return false;
      return actual > expected
    },
    description() {
      return `greater than ${expected}`
    }
  };
};

/**
 * Match any number greater than or equal to the given value.
 * @param {number} expected
 */
export function greaterThanOrEqualTo(expected) {
  return {
    /** @param {any} actual */
    match(actual) {
      if (typeof(actual) !== 'number' || typeof(expected) !== 'number') return false;
      return actual >= expected
    },
    description() {
      return `greater than or equal to ${expected}`
    }
  };
};

/** alias for `greaterThanOrEqualTo` */
export const greaterThanOrEqual = greaterThanOrEqualTo;

/**
 * Match any number less than the given value.
 * @param {number} expected
 */
export function lessThan(expected) {
  return {
    /** @param {any} actual */
    match(actual) {
      if (typeof(actual) !== 'number' || typeof(expected) !== 'number') return false;
      return actual < expected
    },
    description() {
      return `less than ${expected}`
    }
  };
}

/**
 * Match any number less than or equal to the given value.
 * @param {number} expected
 */
export function lessThanOrEqualTo(expected) {
  return {
    /** @param {any} actual */
    match(actual) {
      if (typeof(actual) !== 'number' || typeof(expected) !== 'number') return false;
      return actual <= expected
    },
    description() {
      return `less than or equal to ${expected}`
    }
  };
}

/** Alias for `lessThanOrEqualTo` */
export const lessThanOrEqual = lessThanOrEqualTo;
