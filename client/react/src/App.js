import React, { Component } from "react";
import { connect } from "react-redux";
import Input from "./Components/TodoInput";
import List from "./Components/TodosList";
import Header from "./Components/Header";
import TodoItem from "./Components/TodoItem";
import axios from "axios";
import { getTodos, postTodo, updateTodos, deleteTodos } from "./actions";
// import logo from './logo.svg';
import "./App.css";
import Axios from "axios";

class App extends Component {
  componentDidMount() {
    axios
      .get("http://localhost:3000/")
      .then(response => {
        this.props.dispatch(getTodos(response.data.todo));
      })
      .catch(err => console.log(err));
  }
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
