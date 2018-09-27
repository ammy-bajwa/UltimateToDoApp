const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/grpc");
const Todo = require("../db/todo");
let todoTestId = parseInt(Math.random() * 1000000);

test("testing add todo", async done => {
  let myTodo = {
    todo_id: todoTestId,
    title: "Testing",
    description: "testing todo",
    done: "false"
  };
  let newTodo = new Todo(myTodo);
  await newTodo.add((err, todo) => {
    if (err) console.log(err);
    done();
  });
});
test("testing get todos", async done => {
  await Todo.list((err, todo) => {
    if (err) console.log(err);
    done();
  });
});
test("testing update todos", async done => {
  let myUpdateTodo = {
    todo_id: todoTestId,
    title: "Testing",
    description: "testing update todo",
    done: true
  };
  let newTodo = new Todo(myUpdateTodo);
  await newTodo.updateTodo(myUpdateTodo, (err, todo) => {
    if (err) console.log(err);
    done();
  });
});

test("testing update todos with id not found", async () => {
  let myUpdateTodo = {
    todo_id: 2,
    title: "Testing",
    description: "testing update todo",
    done: true
  };
  let newTodo = new Todo(myUpdateTodo);
  await newTodo.updateTodo(myUpdateTodo, (err, todo) => {
    if (err) console.log(err);
    expect(todo).toBeNull();
  });
});
test("testing remove todos", async done => {
  const delTodo = {
    todo_id: todoTestId
  };
  let todo = new Todo(delTodo);
  await todo.remove(delTodo, (err, todo) => {
    if (err) console.log(err);
    done();
  });
});

test("testing remove todos with not found id", async () => {
  const delTodo = {
    todo_id: 2
  };
  let todo = new Todo(delTodo);
  await todo.remove(delTodo, (err, todo) => {
    if (err) console.log(err);
    expect(todo).toBeNull();
  });
});
