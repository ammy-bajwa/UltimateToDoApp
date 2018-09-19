import {
  //   IS_LOADING,
  GET_TODOS,
  POST_TODO,
  DELETE_TODO,
  UPDATE_TODO
} from "./types";
import axios from "axios";
export const getTodos = payload => {
  return {
    type: GET_TODOS,
    payload
  };
};

export const postTodo = payload => {
  axios
    .post("http://localhost:3000/add", {
      todo: payload
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
  return {
    type: POST_TODO,
    payload
  };
};

export const deleteTodos = id => {
  console.log("id del todo", id);
  axios
    .delete("http://localhost:3000/delete", {
      data: {
        id: id
      }
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
  return {
    type: DELETE_TODO,
    id
  };
};

export const updateTodos = payload => {
  axios
    .put("http://localhost:3000/update", {
      payload
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
  return {
    type: UPDATE_TODO,
    payload
  };
};
