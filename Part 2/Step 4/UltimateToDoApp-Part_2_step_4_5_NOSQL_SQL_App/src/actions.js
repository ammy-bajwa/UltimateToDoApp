import {
  //   IS_LOADING,
  GET_TODOS,
  POST_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  GET_ERRORS
} from "./types";

export const getTodos = () => dispatch => {
  fetch("http://localhost:3001/api/todos")
    .then(res => res.json())
    .then(payload => {
      dispatch({ type: GET_TODOS, payload });
    })
    .catch(error => {
      if (error) {
        dispatch({ type: GET_ERRORS, payload: error });
      }
    });
};

export const postTodo = (formData, history) => dispatch => {
  fetch("http://localhost:3001/api/todos", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  })
    .then(res => res.json())
    .then(payload => {
      dispatch({ type: POST_TODO, payload });
    })
    .catch(error => {
      if (error) {
        dispatch({ type: GET_ERRORS, payload: error });
      }
    });
};
export const deleteTodos = _id => dispatch => {
  fetch(`http://localhost:3001/api/todos/${_id}`, {
    method: "DELETE"
  })
    .then(res => res.json())
    .then(payload => {
      dispatch({
        type: DELETE_TODO,
        _id: payload._id
      });
    })
    .catch(error => {
      if (error) {
        dispatch({ type: GET_ERRORS, payload: error });
      }
    });
};

export const updateTodos = (payload, _id) => dispatch => {
  let data = {
    done: payload
  };
  console.log(data);

  fetch(`http://localhost:3001/api/todos/${_id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  })
    .then(res => res.json())
    .then(payload => {
      dispatch({
        type: UPDATE_TODO,
        payload,
        _id
      });
      console.log(payload);
    })
    .catch(error => {
      if (error) {
        dispatch({ type: GET_ERRORS, payload: error });
      }
    });
};
