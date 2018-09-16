import todoReducer from "../reducers";

describe("Todo Reducer", () => {
  it("Should set default sate", () => {
    const result = todoReducer(undefined, { type: "@@INIT" });
    expect(result).toEqual({
      todos: [],
      isLoading: false
    });
  });
});
