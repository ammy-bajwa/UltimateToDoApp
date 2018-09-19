import {
  //   IS_LOADING,
  GET_TODOS,
  POST_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  GET_ERRORS
} from "./types";

export const getTodos = () => dispatch => {
  let todos = [];
  dispatch({ type: GET_TODOS, todos });
};

export const postTodo = (formData, history) => dispatch => {
  let todo = {
    ...formData,
    done: false
  };
  dispatch({ type: POST_TODO, payload: todo });
};
export const deleteTodos = _id => dispatch => {
  dispatch({
    type: DELETE_TODO,
    _id
  });
};

export const updateTodos = (payload, _id) => dispatch => {
  dispatch({
    type: UPDATE_TODO,
    payload,
    _id
  });
};
