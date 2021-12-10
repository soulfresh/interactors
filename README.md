[![view on npm](http://img.shields.io/npm/v/example.svg)](https://www.npmjs.org/package/example)

# interactors
Interactors and matchers for use with [@interactors](https://www.npmjs.com/package/@interactors/html) (aka bigtest)

## API

## Constants

* [HTMLPageObject](#HTMLPageObject)
* [normalizeText](#normalizeText)
* [elementTextValue](#elementTextValue) ⇒ <code>string</code>
* [elementValue](#elementValue) ⇒ <code>string</code>
* [elementLabelValue](#elementLabelValue) ⇒ <code>string</code>
* [elementContent](#elementContent) ⇒ <code>string</code>

## Functions

* [testId(el)](#testId)
* [isUndefined(obj)](#isUndefined)
* [isArrayLike(expected)](#isArrayLike)
* [matchingArray(expected)](#matchingArray)
* [match(actual)](#match)
* [containingArray(expected)](#containingArray)
* [match(actual)](#match)
* [matchingObject(expected)](#matchingObject)
* [match(actual)](#match)
* [containingObject(expected)](#containingObject)
* [match(actual)](#match)
* [any(expected)](#any)
* [match(actual)](#match)
* [anything()](#anything)
* [match(actual)](#match)
* [is(expected)](#is)
* [match(actual)](#match)
* [equal(expected)](#equal)
* [match(actual)](#match)
* [greaterThan(expected)](#greaterThan)
* [match(actual)](#match)
* [greaterThanOrEqualTo(expected)](#greaterThanOrEqualTo)
* [match(actual)](#match)
* [lessThan(expected)](#lessThan)
* [match(actual)](#match)
* [lessThanOrEqualTo(expected)](#lessThanOrEqualTo)
* [match(actual)](#match)
* [getDefaultNormalizer(options)](#getDefaultNormalizer) ⇒ <code>function</code>
* [elementText(element)](#elementText) ⇒ <code>string</code>

<a name="HTMLPageObject"></a>

## HTMLPageObject
An element interactor that extends the HTML interactor
from @interactors/html but also adds:

### Filters
- testId : '[data-testid]'
- label : '[aria-label]'
- text : better text matching
- role : '[role]'

**Kind**: global constant  
<a name="normalizeText"></a>

## normalizeText
The default text noralize function that will remove
whitespace around and within element text content.

**Kind**: global constant  
<a name="elementTextValue"></a>

## elementTextValue ⇒ <code>string</code>
Get the trimmed text content from an elment.

**Kind**: global constant  

| Param | Type |
| --- | --- |
| el | <code>HTMLElement</code> | 

<a name="elementValue"></a>

## elementValue ⇒ <code>string</code>
Get the input element values from inside an element.
If the element contains more than one child input,
their values are combined with commans.

**Kind**: global constant  

| Param | Type |
| --- | --- |
| el | <code>HTMLElement</code> | 

<a name="elementLabelValue"></a>

## elementLabelValue ⇒ <code>string</code>
Get the aria-label values from inside an element.
If the element contains more than one child with an
aria-label, those labels are combined with commas.

**Kind**: global constant  

| Param | Type |
| --- | --- |
| el | <code>HTMLElement</code> | 

<a name="elementContent"></a>

## elementContent ⇒ <code>string</code>
Get the readable value from an element. This can
include its text, aria-label, input values, etc.
You can customize the order that values are retrieved
and which types of content are searched for. If
the element includes multiple children with the
same type of content, those values are combined
with commas.

```js
// Given the following HTML
<div>
  <span>Hello World</span>
  <input value="foo" />
  <input value="bar" />
</div>

// Get the text content only...
const text = elementContent(el);
// -> 'Hello World'

// Get the input values...
const values = elementContent(el, ['value']);
// -> 'foo, bar'

// Get the input values and then the text...
const combined = elementContent(el, ['value', 'text'], true);
// -> 'foo, bar, Hello World'
```

**Kind**: global constant  

| Param | Type | Description |
| --- | --- | --- |
| el | <code>HTMLElement</code> |  |
| checks | <code>Array.&lt;string&gt;</code> | The list of content   types to retrieve. |
| collect | <code>boolean</code> | false = return the value   of the first matching content type. true = use   all matching values. |

<a name="testId"></a>

## testId(el)
**Kind**: global function  

| Param | Type |
| --- | --- |
| el | <code>HTMLElement</code> | 

<a name="isUndefined"></a>

## isUndefined(obj)
**Kind**: global function  

| Param | Type |
| --- | --- |
| obj | [<code>any</code>](#any) | 

<a name="isArrayLike"></a>

## isArrayLike(expected)
**Kind**: global function  

| Param | Type |
| --- | --- |
| expected | [<code>any</code>](#any) | 

<a name="matchingArray"></a>

## matchingArray(expected)
Check that the contents of a list
match the given list (including order).
Order is important and all values must match.
Nested matchers are taken into account.
Similar to Jest `expect(actual).toEqual(['Foo', bar, 0])`.

Example:
```js
// The `value` filter of Foo must be an array with two
// elements 'Foo' and anything else, in that order.
Foo().has({value: matchingArray(['Foo', any(Number)])});
```

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| expected | [<code>any</code>](#any) | The list to   match against which may include   sub-matchers. |

<a name="match"></a>

## match(actual)
**Kind**: global function  

| Param | Type |
| --- | --- |
| actual | [<code>any</code>](#any) | 

<a name="containingArray"></a>

## containingArray(expected)
Check that an array includes the given items
in any order. Nested matchers are taken into account.
Similar to Jest `expect.arrayContaining`.

Example:
```js
// The `value` filter of Foo must be an array that includes
// the strings 'Foo' and 'Bar' in any order.
Foo().has({value: containingArray(['Foo', 'Bar']);
```

**Kind**: global function  

| Param | Type |
| --- | --- |
| expected | [<code>any</code>](#any) | 

<a name="match"></a>

## match(actual)
**Kind**: global function  

| Param | Type |
| --- | --- |
| actual | [<code>any</code>](#any) | 

<a name="matchingObject"></a>

## matchingObject(expected)
Check that the expect object has all of
the same properties of the actual object.
This is most useful as a sub-matcher inside
of `containingArray` or `matchingArray`.
Nested matchers are taken into account.
Similar to Jest `expect(thing).toEqual({name: 'foo'})`

```js
// The `value` filter of Foo must be an object with
// only one property. The property must be 'name'
// and its value must be the string 'foo'.
Foo().has({value: matchingObject({name: 'foo'})});
```

**Kind**: global function  

| Param | Type |
| --- | --- |
| expected | [<code>any</code>](#any) | 

<a name="match"></a>

## match(actual)
**Kind**: global function  

| Param | Type |
| --- | --- |
| actual | [<code>any</code>](#any) | 

<a name="containingObject"></a>

## containingObject(expected)
Check that the expect object is a subset of
the properties of the actual object.
Nested matchers are taken into account.
Similar to Jest `expect.objectContaining`

```js
// The `value` filter of Foo must be an object with
// only one property. The property must be 'name'
// and its value must be the string 'foo'.
Foo().has({value: {name: 'foo'}});
```

**Kind**: global function  

| Param | Type |
| --- | --- |
| expected | [<code>any</code>](#any) | 

<a name="match"></a>

## match(actual)
**Kind**: global function  

| Param | Type |
| --- | --- |
| actual | [<code>any</code>](#any) | 

<a name="any"></a>

## any(expected)
Match any type constructor in the same
manner as Jest `expect.any`.

For example:
```js
TextField().has({placeholder: any(String)});
Foo().has({thing: any(Number)});
```

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| expected | <code>function</code> | A type constructor   that you expect the actual value to be. |

<a name="match"></a>

## match(actual)
**Kind**: global function  

| Param | Type |
| --- | --- |
| actual | [<code>any</code>](#any) | 

<a name="anything"></a>

## anything()
Match any value in the same manner as Jest `expect.anything()`

**Kind**: global function  
<a name="match"></a>

## match(actual)
**Kind**: global function  

| Param | Type |
| --- | --- |
| actual | [<code>any</code>](#any) | 

<a name="is"></a>

## is(expected)
Strict equality check (ie ===).

**Kind**: global function  

| Param | Type |
| --- | --- |
| expected | [<code>any</code>](#any) | 

<a name="match"></a>

## match(actual)
**Kind**: global function  

| Param | Type |
| --- | --- |
| actual | [<code>any</code>](#any) | 

<a name="equal"></a>

## equal(expected)
Lose equality check using lodash isEqual.

Note: This currently does not handle
sub-matching.

**Kind**: global function  

| Param | Type |
| --- | --- |
| expected | [<code>any</code>](#any) | 

<a name="match"></a>

## match(actual)
**Kind**: global function  

| Param | Type |
| --- | --- |
| actual | [<code>any</code>](#any) | 

<a name="greaterThan"></a>

## greaterThan(expected)
Match any number greater than the given value.

**Kind**: global function  

| Param | Type |
| --- | --- |
| expected | <code>number</code> | 

<a name="match"></a>

## match(actual)
**Kind**: global function  

| Param | Type |
| --- | --- |
| actual | [<code>any</code>](#any) | 

<a name="greaterThanOrEqualTo"></a>

## greaterThanOrEqualTo(expected)
Match any number greater than or equal to the given value.

**Kind**: global function  

| Param | Type |
| --- | --- |
| expected | <code>number</code> | 

<a name="match"></a>

## match(actual)
**Kind**: global function  

| Param | Type |
| --- | --- |
| actual | [<code>any</code>](#any) | 

<a name="lessThan"></a>

## lessThan(expected)
Match any number less than the given value.

**Kind**: global function  

| Param | Type |
| --- | --- |
| expected | <code>number</code> | 

<a name="match"></a>

## match(actual)
**Kind**: global function  

| Param | Type |
| --- | --- |
| actual | [<code>any</code>](#any) | 

<a name="lessThanOrEqualTo"></a>

## lessThanOrEqualTo(expected)
Match any number less than or equal to the given value.

**Kind**: global function  

| Param | Type |
| --- | --- |
| expected | <code>number</code> | 

<a name="match"></a>

## match(actual)
**Kind**: global function  

| Param | Type |
| --- | --- |
| actual | [<code>any</code>](#any) | 

<a name="getDefaultNormalizer"></a>

## getDefaultNormalizer(options) ⇒ <code>function</code>
A configurable text normalizer.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> |  |
| [options.trim] | <code>boolean</code> | Trim whitespace around element text content. |
| [options.collapseWhitespace] | <code>boolean</code> | Remove extra whitespaces within   element text content. |

<a name="elementText"></a>

## elementText(element) ⇒ <code>string</code>
Get the text inside of an element using the default
text normalizer.

**Kind**: global function  

| Param | Type |
| --- | --- |
| element | <code>HTMLElement</code> | 

