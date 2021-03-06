import { TextField as TextFieldBT } from '@interactors/html';
import { GlobalFilters, GlobalActions } from './html';

/**
 * Extends the `@interactors/html:TextField` with
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
export const TextField = TextFieldBT.extend('textfield')
  .filters({
    ...GlobalFilters
  })
  .actions({
    ...GlobalActions
  });

