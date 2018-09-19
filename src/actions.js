import {
  //   IS_LOADING,
  GET_TODOS,
  POST_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  GET_ERRORS
} from "./types";
import * as firebase from "firebase";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBT76zvy4lpAQLMRStOrvfMgU1Elv3I5Zo",
  authDomain: "ultimate-todo-app-4c6f6.firebaseapp.com",
  databaseURL: "https://ultimate-todo-app-4c6f6.firebaseio.com",
  projectId: "ultimate-todo-app-4c6f6",
  storageBucket: "ultimate-todo-app-4c6f6.appspot.com",
  messagingSenderId: "113954197207"
};
firebase.initializeApp(config);
const database = firebase.database();

export const getTodos = () => dispatch => {
  let todos = [];
  database
    .ref("/")
    .once("value")
    .then(snapShot => {
      snapShot.forEach(ss => {
        todos.push(ss.val());
      });
      dispatch({ type: GET_TODOS, todos });
    })
    .catch(error => {
      if (error) {
        dispatch({ type: GET_ERRORS, payload: error });
      }
    });
};

export const postTodo = (formData, history) => dispatch => {
  let todo = {
    ...formData,
    done: false
  };
  return database
    .ref(`/${todo._id}`)
    .set(todo)
    .then(() => {
      dispatch({ type: POST_TODO, payload: todo });
    })
    .catch(error => {
      if (error) {
        dispatch({ type: GET_ERRORS, payload: error });
      }
    });
};
export const deleteTodos = _id => dispatch => {
  return database
    .ref(`/${_id}`)
    .remove()
    .then(payload => {
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
  dispatch({
    type: UPDATE_TODO,
    payload,
    _id
  });
};
