import { ActionInput, Actions, GenerateActionsProps, Payload } from "./types";
import {
  formatUnderscore,
  getActionKey,
  getActionType,
  normalizeInput,
} from "./utils";

/**
 * Util to generate actions, that includes the creators functions and action types.
 *
 * - Creator: Util that allows us to dispatch an action ease
 * - Type: Action type in string type
 *
 * @param props - General props to create actions set that allows us to handle our state ease
 * @param props.prefix - Prefix to add to all generated actions types
 * @param props.actions - An actions array that includes all simple type actions that you need to generate
 *
 * @returns - An object that contains all types and creators generated with the params that you provided it
 *
 * # With prefix
 * ```typescript
 * const { types, creators } = generateActions(
 *   {
 *     prefix: 'custom prefix',
 *     actions: ['action one', 'action two']
 *   }
 * );
 *
 * // Output
 * types.actionOne === 'CUSTOM_PREFIX/ACTION_ONE',
 * types.actionTwo === 'CUSTOM_PREFIX/ACTION_TWO',
 *
 * creators.actionOne === (payload) => (
 *  {
 *    type: 'CUSTOM_PREFIX/ACTION_ONE',
 *    payload,
 *  }
 * )
 *
 * creators.actionTwo === (payload) => (
 *  {
 *    type: 'CUSTOM_PREFIX/ACTION_TWO',
 *    payload,
 *  }
 * )
 *  ```
 * # Without prefix
 *  ```typescript
 * const { types, creators } = generateActions(
 *   {
 *     actions: ['action one', 'action two']
 *   }
 * );
 *
 * // Output
 * types.actionOne === 'ACTION_ONE',
 * types.actionTwo === 'ACTION_TWO',
 *
 * creators.actionOne === (payload) => (
 *  {
 *    type: 'ACTION_ONE',
 *    payload,
 *  }
 * )
 *
 * creators.actionTwo === (payload) => (
 *  {
 *    type: 'ACTION_TWO',
 *    payload,
 *  }
 * )
 *  ```
 * # With modifier
 *  ```typescript
 * const { types, creators } = generateActions(
 *   {
 *     actions:
 *      [
 *        ['action one', x => !x],
 *        'action two'
 *      ]
 *   }
 * );
 *
 * // Output
 * types.actionOne === 'ACTION_ONE',
 * types.actionTwo === 'ACTION_TWO',
 *
 * creators.actionOne === (payload) => (
 *  {
 *    type: 'ACTION_ONE',
 *    payload: modifierFn(payload), // Negate boolean payload.
 *  }
 * )
 *
 * creators.actionTwo === (payload) => (
 *  {
 *    type: 'ACTION_TWO',
 *    payload,
 *  }
 * )
 *  ```
 */
function generateActions(props: GenerateActionsProps): Actions {
  const prefix = formatUnderscore(props.prefix);
  const output: Actions = props.actions.reduce(
    (acc: Actions, actionInput: ActionInput) => {
      const [type, modifier] = normalizeInput(actionInput);

      const actionType = getActionType(prefix, type);
      const actionKey = getActionKey(type);

      acc.types[actionKey] = actionType;

      acc.creators[actionKey] = (payload: Payload) => ({
        type: actionType,
        payload: modifier(payload),
      });

      return acc;
    },
    {
      types: {},
      creators: {},
    }
  );

  return output;
}

export default generateActions;
