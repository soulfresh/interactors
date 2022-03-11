import { prettyDOM } from '@testing-library/dom';
import { HTML as BigTestHTML } from '@interactors/html';
import { elementText, getLabel } from '../util';

/**
 * @param {HTMLElement} el
 */
function testId(el) {
  return el.getAttribute('data-testid');
}

/**
 * Print an element DOM to the console.
 * @param {HTMLElement|HTMLElement[]|NodeList} el
 */
export function printElements(el) {
  if (el?.length !== undefined) {
    el.forEach(e => console.log(prettyDOM(e)));
  } else {
    console.log(prettyDOM(el));
  }
}

const debugDOM = async interactor => interactor.perform(printElements);

/**
 * Provides actions you can merge into any interactor.
 * Gives you the following actions:
 *
 * - debugDOM
 */
export const GlobalActions = {
  debugDOM,
  debug: debugDOM,
}

/**
 * Filters you can merge into any interactor.
 * Gives you the following filters:
 *
 * - testId
 * - testID
 * - label
 * - text
 * - role
 */
export const GlobalFilters = {
  testId,
  testID: testId,
  label: getLabel,
  text: el => elementText(el),
  role: el => el.getAttribute('role'),
}

/**
 * An element interactor that extends the HTML interactor
 * from @interactors/html but also adds:
 *
 * ### Filters
 * - testId : `'[data-testid]'` Get an element by its test id.
 * - label : `'[aria-label]'` Get an element by its accessibility label.
 * - text : Get by trimmed text content.
 * - role : `'[role]'` Get by accessibility role.
 *
 * ### Actions
 * - debugDOM : Print the DOM of the interactor
 *
 * @type {function}
 */
export const HTML = BigTestHTML.extend('element')
  .filters({
    ...GlobalFilters
  })
  .actions({
    ...GlobalActions,
  });

