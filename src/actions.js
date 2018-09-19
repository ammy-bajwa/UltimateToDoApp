import {
  //   IS_LOADING,
  GET_TODOS,
  POST_TODO,
  DELETE_TODO,
  UPDATE_TODO
} from "./types";
import { add, remove, update } from "./indexdb";

export const getTodos = payload => {
  return {
    type: GET_TODOS,
    payload
  };
};

export const postTodo = payload => {
  add(payload);
  return {
    type: POST_TODO,
    payload
  };
};

export const deleteTodos = id => {
  remove(id);
  return {
    type: DELETE_TODO,
    id
  };
};

export const updateTodos = payload => {
  update(payload);
  return {
    type: UPDATE_TODO,
    payload
  };
};
