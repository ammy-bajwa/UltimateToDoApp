import {
  IS_LOADING,
  GET_TODOS,
  POST_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  GET_ERRORS
} from "./types";

// Todos Reducer
const initialState = {
  todos: [],
  isLoading: false,
  error: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_LOADING:
      return { ...state, isLoading: true };
    case GET_TODOS:
      return { ...state, todos: action.todos };

    case POST_TODO:
      return { ...state, todos: [action.payload, ...state.todos] };
    case UPDATE_TODO:
      let todosMap = state.todos.map(todo => {
        if (todo._id === action._id) {
          return {
            ...todo,
            done: !todo.done
          };
        } else {
          return todo;
        }
      });
      return { ...state, todos: [...todosMap] };
    case DELETE_TODO:
      let todos = state.todos.filter(({ _id }) => _id !== action._id);
      return { ...state, todos };
    case GET_ERRORS:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
