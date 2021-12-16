[![view on npm](http://img.shields.io/npm/v/@thesoulfresh/interactors)](https://www.npmjs.com/package/@thesoulfresh/interactors)

# interactors
Interactors and matchers for use with [@interactors](https://www.npmjs.com/package/@interactors/html) (aka bigtest)

## API

- interactors
  - <a href="#htmlpageobject">HTMLPageObject</a>
- matchers
  - <a href="#any">any</a>
  - <a href="#anything">anything</a>
  - <a href="#containingarray">containingArray</a>
  - <a href="#containingobject">containingObject</a>
  - <a href="#equal">equal</a>
  - <a href="#equals">equals</a>
  - <a href="#greaterthan">greaterThan</a>
  - <a href="#greaterthanorequal">greaterThanOrEqual</a>
  - <a href="#greaterthanorequalto">greaterThanOrEqualTo</a>
  - <a href="#is">is</a>
  - <a href="#lessthan">lessThan</a>
  - <a href="#lessthanorequal">lessThanOrEqual</a>
  - <a href="#lessthanorequalto">lessThanOrEqualTo</a>
  - <a href="#matchingarray">matchingArray</a>
  - <a href="#matchingobject">matchingObject</a>
- util
  - <a href="#elementcontent">elementContent</a>
  - <a href="#elementtext">elementText</a>

## HTMLPageObject

An element interactor that extends the HTML interactor
from @interactors/html but also adds:

### Filters
- testId : '[data-testid]'
- label : '[aria-label]'
- text : better text matching
- role : '[role]'




`Function`

#### Defined in
- *[interactors/html.js:23](https://github.com/soulfresh/interactors/tree/main/src/src/interactors/html.js#L23)*

<br/>
## any

  ▸ **any**(`expected`) => `void`

Match any type constructor in the same
manner as Jest `expect.any`.

For example:
```js
TextField().has({placeholder: any(String)});
Foo().has({thing: any(Number)});
```




#### Parameters
| Name | Type | Default Value |
| :--- | :--- | :------------ |
| expected | `Function` | *-* |


#### Returns
`void` 


#### Defined in
- *[matchers/matchers.js:277](https://github.com/soulfresh/interactors/tree/main/src/src/matchers/matchers.js#L277)*

<br/>
## anything

  ▸ **anything**() => `void`

Match any value in the same manner as Jest `expect.anything()`






#### Returns
`void` 


#### Defined in
- *[matchers/matchers.js:294](https://github.com/soulfresh/interactors/tree/main/src/src/matchers/matchers.js#L294)*

<br/>
## containingArray

  ▸ **containingArray**(`expected`) => `void`

Check that an array includes the given items
in any order. Nested matchers are taken into account.
Similar to Jest `expect.arrayContaining`.

Example:
```js
// The `value` filter of Foo must be an array that includes
// the strings 'Foo' and 'Bar' in any order.
Foo().has({value: containingArray(['Foo', 'Bar']);
```




#### Parameters
| Name | Type | Default Value |
| :--- | :--- | :------------ |
| expected | `any` | *-* |


#### Returns
`void` 


#### Defined in
- *[matchers/matchers.js:192](https://github.com/soulfresh/interactors/tree/main/src/src/matchers/matchers.js#L192)*

<br/>
## containingObject

  ▸ **containingObject**(`expected`) => `void`

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




#### Parameters
| Name | Type | Default Value |
| :--- | :--- | :------------ |
| expected | `any` | *-* |


#### Returns
`void` 


#### Defined in
- *[matchers/matchers.js:252](https://github.com/soulfresh/interactors/tree/main/src/src/matchers/matchers.js#L252)*

<br/>
## equal

  ▸ **equal**(`expected`) => `void`

Lose equality check using lodash isEqual.

Note: This currently does not handle
sub-matching.



#### Parameters
| Name | Type | Default Value |
| :--- | :--- | :------------ |
| expected | `any` | *-* |


#### Returns
`void` 


#### Defined in
- *[matchers/matchers.js:325](https://github.com/soulfresh/interactors/tree/main/src/src/matchers/matchers.js#L325)*

<br/>
## equals

  ▸ **equals**(`expected`) => `void`



#### Parameters
| Name | Type | Default Value |
| :--- | :--- | :------------ |
| expected | `any` | *-* |


#### Returns
`void` 


#### Defined in
- *[matchers/matchers.js:339](https://github.com/soulfresh/interactors/tree/main/src/src/matchers/matchers.js#L339)*

<br/>
## greaterThan

  ▸ **greaterThan**(`expected`) => `void`

Match any number greater than the given value.




#### Parameters
| Name | Type | Default Value |
| :--- | :--- | :------------ |
| expected | `number` | *-* |


#### Returns
`void` 


#### Defined in
- *[matchers/matchers.js:345](https://github.com/soulfresh/interactors/tree/main/src/src/matchers/matchers.js#L345)*

<br/>
## greaterThanOrEqual

  ▸ **greaterThanOrEqual**(`expected`) => `void`



#### Parameters
| Name | Type | Default Value |
| :--- | :--- | :------------ |
| expected | `number` | *-* |


#### Returns
`void` 


#### Defined in
- *[matchers/matchers.js:375](https://github.com/soulfresh/interactors/tree/main/src/src/matchers/matchers.js#L375)*

<br/>
## greaterThanOrEqualTo

  ▸ **greaterThanOrEqualTo**(`expected`) => `void`

Match any number greater than or equal to the given value.




#### Parameters
| Name | Type | Default Value |
| :--- | :--- | :------------ |
| expected | `number` | *-* |


#### Returns
`void` 


#### Defined in
- *[matchers/matchers.js:362](https://github.com/soulfresh/interactors/tree/main/src/src/matchers/matchers.js#L362)*

<br/>
## is

  ▸ **is**(`expected`) => `void`

Strict equality check (ie ===).




#### Parameters
| Name | Type | Default Value |
| :--- | :--- | :------------ |
| expected | `any` | *-* |


#### Returns
`void` 


#### Defined in
- *[matchers/matchers.js:306](https://github.com/soulfresh/interactors/tree/main/src/src/matchers/matchers.js#L306)*

<br/>
## lessThan

  ▸ **lessThan**(`expected`) => `void`

Match any number less than the given value.




#### Parameters
| Name | Type | Default Value |
| :--- | :--- | :------------ |
| expected | `number` | *-* |


#### Returns
`void` 


#### Defined in
- *[matchers/matchers.js:381](https://github.com/soulfresh/interactors/tree/main/src/src/matchers/matchers.js#L381)*

<br/>
## lessThanOrEqual

  ▸ **lessThanOrEqual**(`expected`) => `void`



#### Parameters
| Name | Type | Default Value |
| :--- | :--- | :------------ |
| expected | `number` | *-* |


#### Returns
`void` 


#### Defined in
- *[matchers/matchers.js:411](https://github.com/soulfresh/interactors/tree/main/src/src/matchers/matchers.js#L411)*

<br/>
## lessThanOrEqualTo

  ▸ **lessThanOrEqualTo**(`expected`) => `void`

Match any number less than or equal to the given value.




#### Parameters
| Name | Type | Default Value |
| :--- | :--- | :------------ |
| expected | `number` | *-* |


#### Returns
`void` 


#### Defined in
- *[matchers/matchers.js:398](https://github.com/soulfresh/interactors/tree/main/src/src/matchers/matchers.js#L398)*

<br/>
## matchingArray

  ▸ **matchingArray**(`expected`) => `void`

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




#### Parameters
| Name | Type | Default Value |
| :--- | :--- | :------------ |
| expected | `any` | *-* |


#### Returns
`void` 


#### Defined in
- *[matchers/matchers.js:162](https://github.com/soulfresh/interactors/tree/main/src/src/matchers/matchers.js#L162)*

<br/>
## matchingObject

  ▸ **matchingObject**(`expected`) => `void`

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




#### Parameters
| Name | Type | Default Value |
| :--- | :--- | :------------ |
| expected | `any` | *-* |


#### Returns
`void` 


#### Defined in
- *[matchers/matchers.js:225](https://github.com/soulfresh/interactors/tree/main/src/src/matchers/matchers.js#L225)*

<br/>
## elementContent

  ▸ **elementContent**(`el`, `checks`, `collect`) => `string`

Get the "user readable" value from an element. This can
include its text, aria-label, input values, etc.

This function is most useful if don't know the type of
element you are reading and it could be one of multiple
different types (ex. input or div). For example, given
an array of table cells containing plain text and inputs,
you could get the readable text for all of them using
`elements.map(el => elementContent(el, ['text', 'value'])`.

You can customize the order that values are retrieved
and which types of content are searched for using the `checks`
parameter. If the element includes multiple children with the
same type of content, you can either recieve just the first
value or collect them into a comma separated string using
the `collect` parameter.

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




#### Parameters
| Name | Type | Default Value |
| :--- | :--- | :------------ |
| el | `HTMLElement` | *-* |
| checks |  | `...` |
| collect | `boolean` | `false` |


#### Returns
`string` 



#### Defined in
- *[util/text-matching.js:132](https://github.com/soulfresh/interactors/tree/main/src/src/util/text-matching.js#L132)*

<br/>
## elementText

  ▸ **elementText**(`element`) => `string`

Get the text inside of an element. This is similar to the
`innerText` function from `@interactors/core` but will also
trim the text.




#### Parameters
| Name | Type | Default Value |
| :--- | :--- | :------------ |
| element | `HTMLElement` | *-* |


#### Returns
`string` 



#### Defined in
- *[util/text-matching.js:41](https://github.com/soulfresh/interactors/tree/main/src/src/util/text-matching.js#L41)*

<br/>
