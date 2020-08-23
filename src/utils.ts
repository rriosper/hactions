import {
  ActionInput,
  ActionKey,
  ActionType,
  InputNormalize,
  Prefix,
  PrefixInput,
  ReducerFn,
} from "./types";

/**
 * Identity function test
 *
 * @param x - Test prop
 */
export const identity = <T>(x: T): T => x;

export const formatUnderscore = (prefix?: PrefixInput): Prefix =>
  prefix ? `${prefix.toUpperCase().replace(/\s/g, "_")}` : null;

export const normalizeInput = (actionInput: ActionInput): InputNormalize => {
  return Array.isArray(actionInput) ? actionInput : [actionInput, identity];
};

export const getActionType = (prefix: Prefix, type: ActionType): ActionKey => {
  const formatedType = formatUnderscore(type);
  if (prefix) {
    return `${prefix}/${formatedType}`;
  }

  return `${formatedType}`;
};

export const getActionKey = (type: ActionType): ActionKey =>
  type
    .toLocaleLowerCase()
    .replace(/[_|\s]([a-z|0-9])/g, (x) => x.toUpperCase())
    .replace(/[_|\s]/g, "");

export const getProperReducerFn = (
  type: ActionType,
  fns: Record<string, ReducerFn> | Record<ActionKey, ReducerFn>[]
): ReducerFn | undefined => {
  const key = Object.keys(fns).find(
    (actionKey: ActionKey) => actionKey === type
  );
  return key ? fns[key] : null;
};
