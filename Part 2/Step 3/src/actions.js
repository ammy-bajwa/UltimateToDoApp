import {
  //   IS_LOADING,
  GET_TODOS,
  POST_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  GET_ERRORS
} from "./types";
import { add, remove, update, get } from "./indexdb";
import uuid from "uuid";
export const getTodos = () => dispatch => {
  get(dispatch);
};

export const postTodo = formData => dispatch => {
  let todo = {
    ...formData,
    _id: uuid(),
    done: false
  };
  add(todo, dispatch);
};
export const deleteTodos = _id => dispatch => {
  remove(_id, dispatch);
};

export const updateTodos = (payload, _id) => dispatch => {
  update(_id, dispatch);
};
