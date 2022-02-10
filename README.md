[![view on npm](http://img.shields.io/npm/v/@thesoulfresh/interactors)](https://www.npmjs.com/package/@thesoulfresh/interactors)

# @thesoulfresh/interactors
Interactors and matchers for use with [@interactors](https://www.npmjs.com/package/@interactors/html) (a.k.a. **bigtest**).

All interactors provided by this package work against ARIA semantics so
if your tests are passing, your accessibility is also decent (though that's
no replacement for actual accessibility testing).

## API

- interactors
  - <a href="#html">HTML</a>
  - <a href="#table">Table</a>
  - <a href="#textfield">TextField</a>
- matchers
  - <a href="#matchingarray">matchingArray</a>
  - <a href="#containingarray">containingArray</a>
  - <a href="#matchingobject">matchingObject</a>
  - <a href="#containingobject">containingObject</a>
  - <a href="#any">any</a>
  - <a href="#anything">anything</a>
  - <a href="#is">is</a>
  - <a href="#greaterthan">greaterThan</a>
  - <a href="#greaterthanorequalto">greaterThanOrEqualTo</a>
  - <a href="#greaterthanorequal">greaterThanOrEqual</a>
  - <a href="#lessthan">lessThan</a>
  - <a href="#lessthanorequalto">lessThanOrEqualTo</a>
  - <a href="#lessthanorequal">lessThanOrEqual</a>
- util
  - <a href="#elementtext">elementText</a>
  - <a href="#elementcontent">elementContent</a>
  - <a href="#getlabel">getLabel</a>

# interactors

## HTML

An element interactor that extends the HTML interactor
from @interactors/html but also adds:

### Filters
- testId : `'[data-testid]'` Get an element by its test id.
- label : `'[aria-label]'` Get an element by its accessibility label.
- text : Get by trimmed text content.
- role : `'[role]'` Get by accessibility role.




`Function`

#### Defined in
- *[interactors/html.js:24](https://github.com/soulfresh/interactors/tree/main/src/interactors/html.js#L24)*

## Table

Interact with `<table>` elements.

__Selector__: `table`

__Locator__: The `aria-label` or the text from the `aria-labelled` by of the table.

__Extends__: {@link HTML}

__Filters__:

- `columnCount` *{number}* The number of columns in the table.
- `rowCount` *{number}* The number of rows including header rows.
- `dataCount` *{number}* The number of rows **excluding** header rows.
- `headers` *{string[]}* The text from each of the header columns.
- `cellValues` *{string[]}* The text or input value of each table cell.
    This will be a multidimensional array of row and cells
    (ex. `[['cell value', 'cell value', 'cell value'], ['cell value', ...]...]`)
- `dataValues` *{string[]}* The same as `cellValues` but excluding the header cells.

__Actions__:

- `debugDOM` Print the interactor DOM

Example Usage:
```js
// Given the HTML
<table aria-label="Monthly Views">
  <thead>
    <tr>
      <th>Month</th>
      <th>Views</th>
    </tr>
    <tbody>
      <tr>
        <td>January</td>
        <td>10</td>
      </tr>
      <tr>
        <td>February</td>
        <td>8</td>
      </tr>
    </tbody>
  </thead>
</table>


it('should have the correct cell data.', await () => {
  const table = Table('Monthly Views');
  await table.has({columnCount: 2});
  await table.has({rowCount: 3});
  await table.has({dataCount: 2});
  await table.has({cellValues: [
    ['Month'   , 'Views'],
    ['January' ,    '10'],
    ['February',     '8']
  ]);
});
```




`any`

#### Defined in
- *[interactors/table.js:78](https://github.com/soulfresh/interactors/tree/main/src/interactors/table.js#L78)*

## TextField



`any`

#### Defined in
- *[interactors/textfield.js:3](https://github.com/soulfresh/interactors/tree/main/src/interactors/textfield.js#L3)*

# matchers

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
| Name | Type | Default Value | Description |
| :--- | :--- | :------------ | :---------- |
  | expected | `any` | *-* | The list to  match against which may include  sub-matchers. |


#### Returns
`void` 


#### Defined in
- *[matchers/matchers.js:162](https://github.com/soulfresh/interactors/tree/main/src/matchers/matchers.js#L162)*

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
| Name | Type | Default Value | Description |
| :--- | :--- | :------------ | :---------- |
  | expected | `any` | *-* | *-* |


#### Returns
`void` 


#### Defined in
- *[matchers/matchers.js:192](https://github.com/soulfresh/interactors/tree/main/src/matchers/matchers.js#L192)*

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
| Name | Type | Default Value | Description |
| :--- | :--- | :------------ | :---------- |
  | expected | `any` | *-* | *-* |


#### Returns
`void` 


#### Defined in
- *[matchers/matchers.js:225](https://github.com/soulfresh/interactors/tree/main/src/matchers/matchers.js#L225)*

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
| Name | Type | Default Value | Description |
| :--- | :--- | :------------ | :---------- |
  | expected | `any` | *-* | *-* |


#### Returns
`void` 


#### Defined in
- *[matchers/matchers.js:252](https://github.com/soulfresh/interactors/tree/main/src/matchers/matchers.js#L252)*

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
| Name | Type | Default Value | Description |
| :--- | :--- | :------------ | :---------- |
  | expected | `Function` | *-* | A type constructor  that you expect the actual value to be. |


#### Returns
`void` 


#### Defined in
- *[matchers/matchers.js:277](https://github.com/soulfresh/interactors/tree/main/src/matchers/matchers.js#L277)*

## anything

  ▸ **anything**() => `void`

Match any value in the same manner as Jest `expect.anything()`






#### Returns
`void` 


#### Defined in
- *[matchers/matchers.js:294](https://github.com/soulfresh/interactors/tree/main/src/matchers/matchers.js#L294)*

## is

  ▸ **is**(`expected`) => `void`

Strict equality check (ie ===).




#### Parameters
| Name | Type | Default Value | Description |
| :--- | :--- | :------------ | :---------- |
  | expected | `any` | *-* | *-* |


#### Returns
`void` 


#### Defined in
- *[matchers/matchers.js:306](https://github.com/soulfresh/interactors/tree/main/src/matchers/matchers.js#L306)*

## greaterThan

  ▸ **greaterThan**(`expected`) => `void`

Match any number greater than the given value.




#### Parameters
| Name | Type | Default Value | Description |
| :--- | :--- | :------------ | :---------- |
  | expected | `number` | *-* | *-* |


#### Returns
`void` 


#### Defined in
- *[matchers/matchers.js:353](https://github.com/soulfresh/interactors/tree/main/src/matchers/matchers.js#L353)*

## greaterThanOrEqualTo

  ▸ **greaterThanOrEqualTo**(`expected`) => `void`

Match any number greater than or equal to the given value.




#### Parameters
| Name | Type | Default Value | Description |
| :--- | :--- | :------------ | :---------- |
  | expected | `number` | *-* | *-* |


#### Returns
`void` 


#### Defined in
- *[matchers/matchers.js:370](https://github.com/soulfresh/interactors/tree/main/src/matchers/matchers.js#L370)*

## greaterThanOrEqual

  ▸ **greaterThanOrEqual**(`expected`) => `void`

alias for `greaterThanOrEqualTo`




#### Parameters
| Name | Type | Default Value | Description |
| :--- | :--- | :------------ | :---------- |
  | expected | `number` | *-* | *-* |


#### Returns
`void` 


#### Defined in
- *[matchers/matchers.js:384](https://github.com/soulfresh/interactors/tree/main/src/matchers/matchers.js#L384)*

## lessThan

  ▸ **lessThan**(`expected`) => `void`

Match any number less than the given value.




#### Parameters
| Name | Type | Default Value | Description |
| :--- | :--- | :------------ | :---------- |
  | expected | `number` | *-* | *-* |


#### Returns
`void` 


#### Defined in
- *[matchers/matchers.js:390](https://github.com/soulfresh/interactors/tree/main/src/matchers/matchers.js#L390)*

## lessThanOrEqualTo

  ▸ **lessThanOrEqualTo**(`expected`) => `void`

Match any number less than or equal to the given value.




#### Parameters
| Name | Type | Default Value | Description |
| :--- | :--- | :------------ | :---------- |
  | expected | `number` | *-* | *-* |


#### Returns
`void` 


#### Defined in
- *[matchers/matchers.js:407](https://github.com/soulfresh/interactors/tree/main/src/matchers/matchers.js#L407)*

## lessThanOrEqual

  ▸ **lessThanOrEqual**(`expected`) => `void`

Alias for `lessThanOrEqualTo`




#### Parameters
| Name | Type | Default Value | Description |
| :--- | :--- | :------------ | :---------- |
  | expected | `number` | *-* | *-* |


#### Returns
`void` 


#### Defined in
- *[matchers/matchers.js:421](https://github.com/soulfresh/interactors/tree/main/src/matchers/matchers.js#L421)*

# util

## elementText

  ▸ **elementText**(`element`) => `string`

Get the text inside of an element. This is similar to the
`innerText` function from `@interactors/core` but will also
trim the text.




#### Parameters
| Name | Type | Default Value | Description |
| :--- | :--- | :------------ | :---------- |
  | element | `HTMLElement` | *-* | *-* |


#### Returns
`string` 



#### Defined in
- *[util/text-matching.js:41](https://github.com/soulfresh/interactors/tree/main/src/util/text-matching.js#L41)*

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
| Name | Type | Default Value | Description |
| :--- | :--- | :------------ | :---------- |
  | el | `HTMLElement` | *-* | *-* |
  | checks |  | `...` | The list of content  types to retrieve. Your options are &#x27;text&#x27;, &#x27;value&#x27;  for inputs, &#x27;label&#x27; for aria-label. |
  | collect | `boolean` | `false` | false &#x3D; return the value  of the first matching content type. true &#x3D; use  all matching values. |


#### Returns
`string` 



#### Defined in
- *[util/text-matching.js:133](https://github.com/soulfresh/interactors/tree/main/src/util/text-matching.js#L133)*

## getLabel

  ▸ **getLabel**(`el`) => `string`

Get the label text associated with an element.
If the element has multiple objects that define its
label, they will be combined with a space.




#### Parameters
| Name | Type | Default Value | Description |
| :--- | :--- | :------------ | :---------- |
  | el | `any` | *-* | *-* |


#### Returns
`string` 


#### Defined in
- *[util/text-matching.js:173](https://github.com/soulfresh/interactors/tree/main/src/util/text-matching.js#L173)*

