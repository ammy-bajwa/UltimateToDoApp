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
    var db;
    var request = window.indexedDB.open("todoDB", 1);
    let todos = [];
    request.onerror = function(event) {
      console.log("error: ");
    };
    let self = this;
    request.onsuccess = function(event) {
      db = request.result;
      var objectStore = db.transaction("todo").objectStore("todo");
      objectStore.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
          console.log(cursor.value);
          todos.push(cursor.value);
          cursor.continue();
        } else {
          self.props.dispatch(getTodos(todos));
          console.log("todo loaded!");
        }
      };
      console.log("success: " + db);
    };

    request.onupgradeneeded = function(event) {
      var db = event.target.result;
      var objectStore = db.createObjectStore("todo", { keyPath: "id" });
    };
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
