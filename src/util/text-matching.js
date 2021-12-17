import { innerText } from '@interactors/html';

/**
 * @private
 * A configurable text normalizer.
 *
 * @param {object} options
 * @param {boolean} [options.trim] - Trim whitespace around element text content.
 * @param {boolean} [options.collapseWhitespace] - Remove extra whitespaces within
 *   element text content.
 * @return {function}
 */
export function getDefaultNormalizer({
  trim = true,
  collapseWhitespace = true,
} = {}) {
  return text => {
    let normalizedText = text
    normalizedText = trim ? normalizedText.trim() : normalizedText
    normalizedText = collapseWhitespace
      ? normalizedText.replace(/\s+/g, ' ')
      : normalizedText
    return normalizedText
  }
};

/**
 * @private
 * The default text noralize function that will remove
 * whitespace around and within element text content.
 */
export const normalizeText = getDefaultNormalizer();

/**
 * Get the text inside of an element. This is similar to the
 * `innerText` function from `@interactors/core` but will also
 * trim the text.
 * @param {HTMLElement} element
 * @return {string}
 */
export function elementText(element) {
  return normalizeText(innerText(element));
}

/**
 * @private
 * Get the trimmed text content from an elment.
 *
 * @param {HTMLElement} el
 * @return {string}
 */
export const elementTextValue = el => elementText(el);

/**
 * @private
 * Get the input element values from inside an element.
 * If the element contains more than one child input,
 * their values are combined with commans.
 *
 * @param {HTMLElement} el
 * @return {string}
 */
export const elementValue = el => Array.from(el?.querySelectorAll('input'))
  .map(input => input.value)
  .join(', ');

/**
 * @private
 * Get the aria-label values from inside an element.
 * If the element contains more than one child with an
 * aria-label, those labels are combined with commas.
 *
 * @param {HTMLElement} el
 * @return {string}
 */
export const elementLabelValue = el => {
  if (el?.hasAttribute('aria-label'))
    return el.getAttribute('aria-label');

  return Array.from(el?.querySelectorAll('aria-label'))
    .map(el => el.getAttribute('aria-label'))
    .join(', ');
};

/**
 * Get the "user readable" value from an element. This can
 * include its text, aria-label, input values, etc.
 *
 * This function is most useful if don't know the type of
 * element you are reading and it could be one of multiple
 * different types (ex. input or div). For example, given
 * an array of table cells containing plain text and inputs,
 * you could get the readable text for all of them using
 * `elements.map(el => elementContent(el, ['text', 'value'])`.
 *
 * You can customize the order that values are retrieved
 * and which types of content are searched for using the `checks`
 * parameter. If the element includes multiple children with the
 * same type of content, you can either recieve just the first
 * value or collect them into a comma separated string using
 * the `collect` parameter.
 *
 * ```js
 * // Given the following HTML
 * <div>
 *   <span>Hello World</span>
 *   <input value="foo" />
 *   <input value="bar" />
 * </div>
 *
 * // Get the text content only...
 * const text = elementContent(el);
 * // -> 'Hello World'
 *
 * // Get the input values...
 * const values = elementContent(el, ['value']);
 * // -> 'foo, bar'
 *
 * // Get the input values and then the text...
 * const combined = elementContent(el, ['value', 'text'], true);
 * // -> 'foo, bar, Hello World'
 * ```
 *
 * @param {HTMLElement} el
 * @param {string[]} checks - The list of content
 *   types to retrieve. Your options are 'text', 'value'
 *   for inputs, 'label' for aria-label.
 * @param {boolean} collect - false = return the value
 *   of the first matching content type. true = use
 *   all matching values.
 * @return {string}
 */
export const elementContent = (el, checks = ['text', 'value', 'label'], collect = false) => {
  let out = '';
  if (el) {
    let v;
    for(let i = 0; i < checks.length; i++) {
      const type = checks[i];
      switch( type ) {
        case 'text':
          v = elementTextValue(el);
          if (v && !collect) return v;
          else out += v;
          break;
        case 'value':
          v = elementValue(el);
          if (v && !collect) return v;
          else out += v;
          break;
        case 'label':
          v = elementLabelValue(el);
          if (v && !collect) return v;
          else out += v;
          break;
        // TODO Add the following tests
        // - aria-label
        // - aria-labelledby
        // - aria-describedby
        // - label (and associated input/textareas)
        // - textarea
      }
    }
  }
  // Don't return null or undefined.
  return out;
};

