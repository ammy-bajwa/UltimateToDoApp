import React, { Component } from "react";
import { connect } from "react-redux";
import Input from "./Components/TodoInput";
import List from "./Components/TodosList";
import Header from "./Components/Header";
import TodoItem from "./Components/TodoItem";

import { postTodo, updateTodos, deleteTodos } from "./actions";
// import logo from './logo.svg';
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-Body">
          <div>
            <Header />
            <Input
              onSubmit={todo => {
                this.props.dispatch(postTodo(todo));
              }}
            />
            <List todos={this.props.todos} />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    todos: state.todos
  };
};

export default connect(mapStateToProps)(App);
