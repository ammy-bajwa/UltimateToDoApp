import { getTodos, postTodo, updateTodos, deleteTodos } from "../actions";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {database} from "../actions";
import uuid from "uuid";

const createMockStore = configureMockStore([thunk]);



describe("Todos Actions", () => {

  const toDoID = uuid();
  let toDo;
  
    toDo = {
      title: "sample",
      description: "sample",
      done: false,
      _id: toDoID
    }
  

  it("Should Update the Todo", () => {
    // const result = updateTodos(true, "123");
    const store = createMockStore({});

    store.dispatch(updateTodos(true, toDoID)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "UPDATE_TODO",
        payload: true,
        _id: toDoID
      })
      done();
    })
    // expect(result).toEqual({ type: "UPDATE_TODO", id: "123", payload: true });
  });

  it("Should Add a new Todo", () => {
    // const toDo = {
    //   title: "hello",
    //   description: "some description",
    //   done: true
    // }

    const store = createMockStore({});

    store.dispatch(postTodo(toDo)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "POST_TODO", 
        payload: {
          _id: toDoID,
          ...toDo

        }
      });
      console.log(actions[0]);
      done();
    })

    // expect(result).toEqual({
    //   type: "POST_TODO",
    //   payload: {
    //     id: "123",
    //     title: "hello",
    //     description: "some description",
    //     done: true
    //   }
    // });
  });

  it("Should Remove the Todo from database", (done) => {
    const store = createMockStore({});

    store.dispatch(deleteTodos(`${toDoID}`)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "DELETE_TODO",
        _id: toDoID
      });
      done();
    })


    // const result = deleteTodos("123");
    // expect(result).toEqual({
    //   type: "DELETE_TODO",
    //   id: "123"
    // });
  });
});
