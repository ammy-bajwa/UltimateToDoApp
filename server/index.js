const grpc = require("grpc");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/grpc");
const proto = grpc.load("../proto/todo.proto");
const server = new grpc.Server();
const todoServices = require("../db/todo");

server.addService(proto.myTodos.TodosService.service, {
  Insert(call, callback) {
    let todo = new todoServices({
      todo_id: call.request.todo_id,
      title: call.request.title,
      description: call.request.description,
      done: call.request.done
    });
    todo.add(call.request);
  }
});

server.bind("0.0.0.0:50051", grpc.ServerCredentials.createInsecure());
console.log("Server running at http://0.0.0.0:50051");
server.start();
