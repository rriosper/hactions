export type PrefixInput = string;
export type Prefix = string | null;
export type Payload = unknown;
export type Modifier = (payload: Payload) => Payload;

export type ActionInput = string | [string, Modifier];

export type ActionType = string;
export type Action = {
  type: ActionType;
};
export type AnyAction = Action & {
  [key: string]: unknown;
};
export type ActionCreator = (payload?: Payload) => AnyAction;

export type ActionKey = string;

export type ActionTypes = Record<ActionKey, ActionType>;
export type ActionCreators = Record<ActionKey, ActionCreator>;

export type GenerateActionsProps = {
  prefix?: PrefixInput;
  actions: ActionInput[];
};

export type Actions = {
  types: ActionTypes;
  creators: ActionCreators;
};

export type InputNormalize = [ActionType, Modifier];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type State = any;

export type ReducerFn = (
  state: State,
  action: AnyAction
) => State | Partial<State>;

export type GenerateReducerProps = {
  initialState?: State;
  reducers: Record<ActionKey, ReducerFn>;
};
