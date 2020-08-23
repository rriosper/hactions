import { AnyAction, GenerateReducerProps, ReducerFn, State } from "./types";
import { getProperReducerFn } from "./utils";

/**
 * Util to generate a reducer ease.
 *
 * @param props - General props to create a reducer set that allows us to handle actions ease
 * @param props.initialState - Initial data to assign to the root reducer
 * @param props.reducers - An reducer functions array that are executed by the root reducer
 *
 * @returns - An root reducer that handle us our state
 *
 * # Basic reducer
 * ```typescript
 * const { types, creators } = generateActions(
 *  {
 *    actions: ['toggle', 'set'],
 *  }
 * )
 *
 *
 *  const toggleFn = (state) => !state;
 *  const setFn = (_, { payload }) => payload;
 *
 * const reducer = generateReducer(
 *   {
 *     initialState: { test : true },
 *     reducers:
 *        {
 *          [types.toggle]: toggleFn,
 *          [types.set]: setFn,
 *        }
 *   }
 * );
 *
 * // <--- External library --->
 * const [state, dispatch] = store(reducer);
 * //state === { test: true };
 *
 * dispatch(creators.toggle());
 * //state === { test: false };
 *
 * dispatch(creators.set(true));
 * // state === { test: true };
 *
 * dispatch(creators.set(true));
 * // state === { test: true };
 *  ```
 */
function generateReducer(props: GenerateReducerProps): ReducerFn {
  const reducer: ReducerFn = (state: State, action: AnyAction): State => {
    const reducerFn = getProperReducerFn(action.type, props.reducers);

    if (reducerFn) {
      return reducerFn(state, action);
    }

    return state || props.initialState;
  };

  return reducer;
}

export default generateReducer;
