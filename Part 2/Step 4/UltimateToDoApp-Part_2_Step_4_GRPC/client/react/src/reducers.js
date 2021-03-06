import {
  IS_LOADING,
  GET_TODOS,
  POST_TODO,
  DELETE_TODO,
  UPDATE_TODO
} from "./types";

// Todos Reducer
const initialState = {
  todos: [],
  isLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_LOADING:
      return { ...state, isLoading: true };
    case GET_TODOS:
      return { ...state, todos: action.payload, isLoading: false };

    case POST_TODO:
      const todo = {
        id: action.payload.id,
        title: action.payload.title,
        description: action.payload.description,
        done: action.payload.done
      };
      return { ...state, todos: [todo, ...state.todos] };
    case UPDATE_TODO:
      let todosMap = state.todos.map(todo => {
        if (todo.id === action.payload.id) {
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
      let todos = state.todos.filter(({ id }) => id !== action.id);
      return { ...state, todos };
    default:
      return state;
  }
};
