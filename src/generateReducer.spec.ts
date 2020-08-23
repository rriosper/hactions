import { createStore, combineReducers } from "redux";

import generateActions from "./generateActions";
import generateReducer from "./generateReducer";

describe("Generate reducers", () => {
  const { types: types1, creators: creators1 } = generateActions({
    prefix: "actions1",
    actions: ["inverse_test_value", "change_foo_text"],
  });

  const { types: types2, creators: creators2 } = generateActions({
    prefix: "prefix",
    actions: ["inverse_test_value", "change_foo_text"],
  });
  const initialState = {
    test: true,
    foo: "foo",
  };
  const reducer1 = generateReducer({
    initialState,
    reducers: {
      [types1.inverseTestValue]: (state) => ({ ...state, test: !state.test }),
      [types1.changeFooText]: (state, { payload }) => ({
        ...state,
        foo: payload,
      }),
    },
  });

  const reducer2 = generateReducer({
    initialState,
    reducers: {
      [types2.inverseTestValue]: (state) => ({
        ...state,
        test: !state.test,
      }),
      [types2.changeFooText]: (state, { payload }) => ({
        ...state,
        foo: payload,
      }),
    },
  });

  const reducers = combineReducers({
    reducer1,
    reducer2,
  });

  const store = createStore(reducers);

  test("Inverse value", () => {
    store.dispatch(creators1.inverseTestValue());
    expect(store.getState()).toEqual({
      reducer1: {
        test: false,
        foo: "foo",
      },
      reducer2: {
        test: true,
        foo: "foo",
      },
    });

    store.dispatch(creators2.inverseTestValue());
    expect(store.getState()).toEqual({
      reducer1: {
        test: false,
        foo: "foo",
      },
      reducer2: {
        test: false,
        foo: "foo",
      },
    });
  });

  test("Modify value", () => {
    store.dispatch(creators1.changeFooText("Modified text"));
    expect(store.getState()).toEqual({
      reducer1: {
        test: false,
        foo: "Modified text",
      },
      reducer2: {
        test: false,
        foo: "foo",
      },
    });

    store.dispatch(creators2.changeFooText("Modified text 2"));
    expect(store.getState()).toEqual({
      reducer1: {
        test: false,
        foo: "Modified text",
      },
      reducer2: {
        test: false,
        foo: "Modified text 2",
      },
    });
  });
});
