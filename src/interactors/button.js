import { Button as ButtonBase } from '@interactors/html';
import { GlobalFilters, GlobalActions } from './html';

/**
 * Extends the `@interactors/html:Button` with
 * the standard interactors and actions from the
 * `HTML` interactor from this package.
 *
 * __Additional Filters__:
 *
 * - `testId`
 * - `testID`
 * - `label`
 * - `text`
 * - `role`
 *
 * __Additional Actions__:
 *
 * - `debugDOM` Pretty print the current DOM.
 */
export const Button = ButtonBase.extend('button')
  .filters({
    ...GlobalFilters
  })
  .actions({
    ...GlobalActions
  });
