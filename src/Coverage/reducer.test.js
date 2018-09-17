import todoReducer from "../reducers";
import todos from "./todos";
let state = {
  isLoading: false,
  todos
};
describe("Todo Reducer", () => {
  it("Should set default state", () => {
    const result = todoReducer(undefined, { type: "@@INIT" });
    expect(result).toEqual({
      todos: [],
      isLoading: false
    });
  });

  it("Should Remove the expense with id", () => {
    const result = todoReducer(state, {
      type: "DELETE_TODO",
      id: state.todos[1].id
    });
    expect(result).toEqual({
      todos: [todos[0], todos[2]],
      isLoading: false
    });
  });

  it("Should not Remove the expense if id is Invalid", () => {
    const result = todoReducer(state, {
      type: "DELETE_TODO",
      id: "5"
    });
    expect(result).toEqual(state);
  });

  // it("Should add the todo", () => {
  //   let todoItem = {
  //     id: "4",
  //     title: "some new title",
  //     description: "some description",
  //     done: true
  //   };
  //   const result = todoReducer(state, {
  //     type: "POST_TODO",
  //     payload: todoItem
  //   });
  //   expect(result).toEqual({
  //     ...state,
  //     todos: [todoItem, ...state.todos]
  //   });
  // });

  it("Should Update the todo by id", () => {
    let done = true;
    const result = todoReducer(state, {
      type: "UPDATE_TODO",
      id: todos[0].id
    });
    expect(result.todos[0].done).toEqual(!state.todos[0].done);
  });

  it("Should not Update the todo", () => {
    let done = true;
    const result = todoReducer(state, {
      type: "UPDATE_TODO",
      id: "7"
    });
    expect(result).toEqual(state);
  });
});
