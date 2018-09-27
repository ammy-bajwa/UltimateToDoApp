const grpc = require("grpc");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/grpc");
const proto = grpc.load("../proto/todo.proto");
const server = new grpc.Server();
const todoServices = require("../db/todo");

server.addService(proto.myTodos.TodosService.service, {
  List(call, callback) {
    todoServices.list(callback);
  },
  Insert(call, callback) {
    let todo = new todoServices({
      id: call.request.id,
      title: call.request.title,
      description: call.request.description,
      done: call.request.done,
    });
    todo.add(callback);
  },
  remove(callback) {
    const criteria = {
      id: callback.request.id
    };
    let todo = new todoServices(criteria);
    todo.remove(criteria, callback);
  },
  update(call,callback) {
    const criteria = {
      id: call.request.id,
      title: call.request.title,
      description: call.request.description,
      done: call.request.done,      
    };
    let todo = new todoServices(criteria);
    todo.updateTodo(criteria, callback);
  }
});

server.bind("0.0.0.0:50051", grpc.ServerCredentials.createInsecure());
console.log("Server running at http://0.0.0.0:50051");
server.start();
