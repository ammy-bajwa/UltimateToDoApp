import React, { Component } from "react";
import { connect } from "react-redux";
import Input from "./Components/TodoInput";
import List from "./Components/TodosList";

import { postTodo, updateTodos, deleteTodos } from "./actions";
// import logo from './logo.svg';
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Todo List</h1>
        </header>
        <div className="App-Body">
          <div>
            <Input
              onSubmit={todo => {
                this.props.dispatch(postTodo(todo));
                console.log(todo);
              }}
            />
            <List
              todos={this.props.todos}
              handleCheck={(checked, id) => {
                this.props.dispatch(updateTodos(checked, id));
              }}
              handleDelete={id => {
                this.props.dispatch(deleteTodos(id));
              }}
            />
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
