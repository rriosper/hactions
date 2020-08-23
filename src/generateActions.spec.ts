import generateActions from "./generateActions";

describe("Generate actions", () => {
  test("Without prefix", () => {
    const modifier2Fn = jest.fn((x) => !x);
    const modifier3Fn = jest.fn(({ id }) => ({ id }));
    const { creators, types } = generateActions({
      actions: [
        "action_1",
        ["action_2", modifier2Fn],
        ["action_3", modifier3Fn],
      ],
    });

    // Types
    expect(types).toEqual({
      action1: "ACTION_1",
      action2: "ACTION_2",
      action3: "ACTION_3",
    });

    // Creators
    expect(creators.action1("payload")).toEqual({
      type: types.action1,
      payload: "payload",
    });

    expect(creators.action2(true)).toEqual({
      type: types.action2,
      payload: false,
    });

    expect(
      creators.action3({
        id: "bee4ee68-dfd8-43f1-8c86-22a2179d9854",
        title: "The book of RA",
      })
    ).toEqual({
      type: types.action3,
      payload: { id: "bee4ee68-dfd8-43f1-8c86-22a2179d9854" },
    });
  });

  test("With prefix", () => {
    const modifier2Fn = jest.fn((x) => !x);
    const modifier3Fn = jest.fn(({ id }) => ({ id }));
    const { types, creators } = generateActions({
      prefix: "prefix",
      actions: [
        "action_1",
        ["action_2", modifier2Fn],
        ["action_3", modifier3Fn],
      ],
    });

    // Types
    expect(types).toEqual({
      action1: "PREFIX/ACTION_1",
      action2: "PREFIX/ACTION_2",
      action3: "PREFIX/ACTION_3",
    });

    // Creators
    expect(creators.action1("payload")).toEqual({
      type: types.action1,
      payload: "payload",
    });

    expect(creators.action2(true)).toEqual({
      type: types.action2,
      payload: false,
    });

    expect(
      creators.action3({
        id: "bee4ee68-dfd8-43f1-8c86-22a2179d9854",
        title: "The book of RA",
      })
    ).toEqual({
      type: types.action3,
      payload: { id: "bee4ee68-dfd8-43f1-8c86-22a2179d9854" },
    });
  });

  test("With prefix and large actions", () => {
    const modifier2Fn = jest.fn((x) => !x);
    const modifier3Fn = jest.fn(({ id }) => ({ id }));
    const { types, creators } = generateActions({
      prefix: "prefix_large",
      actions: [
        "action_large_1",
        ["action_large_2", modifier2Fn],
        ["action_large_3", modifier3Fn],
      ],
    });

    // Types
    expect(types).toEqual({
      actionLarge1: "PREFIX_LARGE/ACTION_LARGE_1",
      actionLarge2: "PREFIX_LARGE/ACTION_LARGE_2",
      actionLarge3: "PREFIX_LARGE/ACTION_LARGE_3",
    });

    // Creators
    expect(creators.actionLarge1("payload")).toEqual({
      type: types.actionLarge1,
      payload: "payload",
    });

    expect(creators.actionLarge2(true)).toEqual({
      type: types.actionLarge2,
      payload: false,
    });

    expect(
      creators.actionLarge3({
        id: "bee4ee68-dfd8-43f1-8c86-22a2179d9854",
        title: "The book of RA",
      })
    ).toEqual({
      type: types.actionLarge3,
      payload: { id: "bee4ee68-dfd8-43f1-8c86-22a2179d9854" },
    });
  });

  test("With prefix and large actions", () => {
    const modifier2Fn = jest.fn((x) => !x);
    const modifier3Fn = jest.fn(({ id }) => ({ id }));
    const { types, creators } = generateActions({
      prefix: "prefix large",
      actions: [
        "action large 1",
        ["action large 2", modifier2Fn],
        ["action large 3", modifier3Fn],
      ],
    });

    // Types
    expect(types).toEqual({
      actionLarge1: "PREFIX_LARGE/ACTION_LARGE_1",
      actionLarge2: "PREFIX_LARGE/ACTION_LARGE_2",
      actionLarge3: "PREFIX_LARGE/ACTION_LARGE_3",
    });

    // Creators
    expect(creators.actionLarge1("payload")).toEqual({
      type: types.actionLarge1,
      payload: "payload",
    });

    expect(creators.actionLarge2(true)).toEqual({
      type: types.actionLarge2,
      payload: false,
    });

    expect(
      creators.actionLarge3({
        id: "bee4ee68-dfd8-43f1-8c86-22a2179d9854",
        title: "The book of RA",
      })
    ).toEqual({
      type: types.actionLarge3,
      payload: { id: "bee4ee68-dfd8-43f1-8c86-22a2179d9854" },
    });
  });
});
