import React, { Component } from "react";
import { connect } from "react-redux";
import Input from "./Components/TodoInput";
import List from "./Components/TodosList";
import Header from "./Components/Header";
import CircularProgress from "@material-ui/core/CircularProgress";

import { postTodo, getTodos } from "./actions";
// import logo from './logo.svg';
import "./App.css";

class App extends Component {
  componentDidMount = () => {
    this.props.dispatch(getTodos());
  };
  render() {
    let content = this.props.loading ? (
      <CircularProgress />
    ) : (
      <List todos={this.props.todos} />
    );
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
            {content}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    todos: state.todos,
    loading: state.isLoading
  };
};

export default connect(mapStateToProps)(App);
