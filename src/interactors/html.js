import { HTML as BigTestHTML } from '@interactors/html';
import { elementText } from '../util';

/**
 * @param {HTMLElement} el
 */
function testId(el) {
  return el.getAttribute('data-testid');
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
 * @type {function}
 */
export const HTML = BigTestHTML.extend('element')
  .filters({
    testId,
    testID: testId,
    // TODO Look for a surrounding label or the aria-label
    label: el => el.getAttribute('aria-label'),
    text: el => elementText(el),
    role: el => el.getAttribute('role'),
  });

