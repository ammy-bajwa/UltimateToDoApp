import {
  //   IS_LOADING,
  GET_TODOS,
  POST_TODO,
  DELETE_TODO,
  UPDATE_TODO
} from "./types";

export const getTodos = () => {
  return {
    type: GET_TODOS
  };
};

export const postTodo = payload => {
  return {
    type: POST_TODO,
    payload
  };
};

export const deleteTodos = id => {
  return {
    type: DELETE_TODO,
    id
  };
};

export const updateTodos = (payload, id) => {
  return {
    type: UPDATE_TODO,
    payload,
    id
  };
};
