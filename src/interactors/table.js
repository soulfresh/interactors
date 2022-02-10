import { prettyDOM } from '@testing-library/dom';
import { HTML } from './html';
import { elementContent } from '../util';

const dataRows = el =>
  Array.from(el.querySelectorAll('tr'))
    .filter(row =>
      !!row.querySelector('td')
    );

const rowCellValues = rows => rows.map(row => {
  const cells = Array.from(row.querySelectorAll('th')).concat(
    Array.from(row.querySelectorAll('td'))
  )
  return cells.map(cell => elementContent(cell, ['text', 'value']))
});

/**
 * Interact with `<table>` elements.
 *
 * __Selector__: `table`
 *
 * __Locator__: The `aria-label` or the text from the `aria-labelled` by of the table.
 *
 * __Extends__: {@link HTML}
 *
 * __Filters__:
 *
 * - `columnCount` *{number}* The number of columns in the table.
 * - `rowCount` *{number}* The number of rows including header rows.
 * - `dataCount` *{number}* The number of rows **excluding** header rows.
 * - `headers` *{string[]}* The text from each of the header columns.
 * - `cellValues` *{string[]}* The text or input value of each table cell.
 *     This will be a multidimensional array of row and cells
 *     (ex. `[['cell value', 'cell value', 'cell value'], ['cell value', ...]...]`)
 * - `dataValues` *{string[]}* The same as `cellValues` but excluding the header cells.
 *
 * __Actions__:
 *
 * - `debugDOM` Print the interactor DOM
 *
 * Example Usage:
 * ```js
 * // Given the HTML
 * <table aria-label="Monthly Views">
 *   <thead>
 *     <tr>
 *       <th>Month</th>
 *       <th>Views</th>
 *     </tr>
 *     <tbody>
 *       <tr>
 *         <td>January</td>
 *         <td>10</td>
 *       </tr>
 *       <tr>
 *         <td>February</td>
 *         <td>8</td>
 *       </tr>
 *     </tbody>
 *   </thead>
 * </table>
 *
 *
 * it('should have the correct cell data.', await () => {
 *   const table = Table('Monthly Views');
 *   await table.has({columnCount: 2});
 *   await table.has({rowCount: 3});
 *   await table.has({dataCount: 2});
 *   await table.has({cellValues: [
 *     ['Month'   , 'Views'],
 *     ['January' ,    '10'],
 *     ['February',     '8']
 *   ]);
 * });
 * ```
 */
export const Table = HTML.extend('table')
  .locator(el => {
    // TODO Just use el.labels instead
    let label = el.getAttribute('aria-label');
    const id = el.getAttribute('aria-labelledby');

    if (label && id)
      console.warn(`[TablePageObject] A table on the page has both aria-label="${label}" and aria-labelledby="${id}". Using aria-label.`);

    if (!label) {
      if (id) {
        const title = document.querySelector(`#${id}`);
        label = elementContent(title, ['text']);
      }
    }
    return label;
  })
  .selector('table')
  .filters({
    columnCount: el => {
      let rows = el.querySelectorAll('tr');
      if (rows.length === 0) return 0;
      else {
        const headers = rows[0].querySelectorAll('th');
        if (headers.length > 0) return headers.length;
        else return rows[0].querySelectorAll('td').length;
      }
    },
    rowCount: el => el.querySelectorAll('tr').length,
    dataCount: el => dataRows(el).length,
    headers: el => Array.from(el.querySelectorAll('th')).map(h => elementContent(h, 'text')),
    cellValues: el => {
      const rows = Array.from(el.querySelectorAll('tr'));
      return rowCellValues(rows);
    },
    dataValues: el => rowCellValues(dataRows(el)),
  })
  //
  // Actions are used to perform actions on the selected element
  // like `click` or `fillIn`.
  // https://frontside.com/bigtest/docs/interactors/locators-filters-actions#actions
  .actions({
    debugDOM: async (interactor) => interactor.perform(el => console.log(prettyDOM(el))),
  })

