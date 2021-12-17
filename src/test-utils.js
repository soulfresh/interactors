
/**
 * Simple render function for use in tests.
 * Pass a string that will be used as the innerHtml
 * of a test specific DOM element.
 *
 * !!IMPORTANT!!
 * Don't forget to remove the element in your tests:
 *
 * ```js
 * afterEach(() => {
 *   if (el) el.remove();
 * });
 * ```
 */
export function render(component) {
  const el = document.createElement('div');
  el.innerHTML = component;
  document.body.appendChild(el);
  return el;
}
