import {
  //   IS_LOADING,
  GET_TODOS,
  POST_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  GET_ERRORS
} from "./types";
import { firestore } from "./config";

export const getTodos = () => dispatch => {
  let todos = [];
  firestore
    .collection("todoApp")
    .get()
    .then(snapShot => {
      snapShot.forEach(ss => {
        todos.push(ss.data());
      });
      dispatch({ type: GET_TODOS, todos });
    })
    .catch(error => {
      if (error) {
        dispatch({ type: GET_ERRORS, payload: error });
      }
    });
};

export const postTodo = formData => dispatch => {
  console.log(formData);
  let todo = {
    ...formData,
    done: false
  };
  return firestore
    .collection("todoApp")
    .doc(`${todo._id}`)
    .set(todo)
    .then(() => {
      dispatch({ type: POST_TODO, payload: todo });
    })
    .catch(error => {
      if (error) {
        dispatch({ type: GET_ERRORS, payload: error });
      }
    });
  // return database
  //   .ref(`/${todo._id}`)
  //   .set(todo)
  // .then(() => {
  //   dispatch({ type: POST_TODO, payload: todo });
  // })
  // .catch(error => {
  //   if (error) {
  //     dispatch({ type: GET_ERRORS, payload: error });
  //   }
  // });
};
export const deleteTodos = _id => dispatch => {
  return firestore
    .collection(`todoApp`)
    .doc(`${_id}`)
    .delete()
    .then(() => {
      dispatch({
        type: DELETE_TODO,
        _id
      });
    })
    .catch(error => {
      if (error) {
        dispatch({ type: GET_ERRORS, payload: error });
      }
    });
};

export const updateTodos = (payload, _id) => dispatch => {
  return firestore
    .collection("todoApp")
    .doc(`${_id}`)
    .update({ done: payload })
    .then(() => {
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
