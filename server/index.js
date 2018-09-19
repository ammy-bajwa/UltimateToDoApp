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
    todo.add(call.request);
  },
  get(call, callback) {
    let payload = {
      criteria: {
        id: call.request.id
      },
      projections: {
        _id: 0,
        __v: 0
      },
      options: {
        lean: true
      }
    };
    let todo = new todoServices(payload);
    todo.fetch(callback);
  },
  remove(callback) {
    const criteria = {
      id: callback.request.id
    };
    let todo = new todoServices(criteria);
    todo.remove(criteria, callback);
  },
  update(callback) {
    const criteria = {
      id: callback.request.id,
      title: callback.request.title,
      description: callback.request.description,
      done: callback.request.done,      
    };
    let todo = new todoServices(criteria);
    todo.updateTodo(criteria, callback);
  }
});

server.bind("0.0.0.0:50051", grpc.ServerCredentials.createInsecure());
console.log("Server running at http://0.0.0.0:50051");
server.start();
