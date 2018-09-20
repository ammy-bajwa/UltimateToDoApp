import { getTodos, postTodo, updateTodos, deleteTodos } from "../actions";

describe("Todos Actions", () => {
  it("Should Remove the Todo", () => {
    const result = deleteTodos("123");
    expect(result).toEqual({
      type: "DELETE_TODO",
      id: "123"
    });
  });

  it("Should Update the Todo", () => {
    const result = updateTodos({ payload: {}, type: "UPDATE_TODO" });
    expect(result).toEqual({
      payload: { payload: {}, type: "UPDATE_TODO" },
      type: "UPDATE_TODO"
    });
  });

  it("Should Add a new Todo", () => {
    const result = postTodo({
      id: "123",
      title: "hello",
      description: "some description",
      done: true
    });
    expect(result).toEqual({
      type: "POST_TODO",
      payload: {
        id: "123",
        title: "hello",
        description: "some description",
        done: true
      }
    });
  });
});
