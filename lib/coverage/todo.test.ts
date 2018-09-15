import * as request from "supertest";
import * as mongoose from "mongoose";
import { TodoSchema } from "../models/todoModel";

const Todo = mongoose.model("todo", TodoSchema);
let server;
let todoId;
let todo;
let todoItem;
describe("api/todos", () => {
  beforeEach(async () => {
    server = require("../server");
    todoId = mongoose.Types.ObjectId();
    todoItem = {
      id: todoId,
      title: "Buy Some Milk",
      description: "Some Description: buy from Hassan dairy",
      done: true
    };
    todo = new Todo(todoItem);
    await todo.save();
  });

  // GET endpoint tests
  describe("GET api/todos", () => {
    it("Should return 200 OK", async () => {
      let result = await request(server).get("/api/todos");
      expect(result.status).toBe(200);
    });
  });

  //TEST DB tests
  describe("DB test", () => {
    it("Should match the returned value", async () => {
      let result = await Todo.findById(todo._id);
      expect(result._id).toEqual(todo._id);
      expect(result.title).toEqual(todo.title);
      expect(result.description).toEqual(todo.description);
      expect(result.done).toEqual(todo.done);
    });
  });

  //POST endpoint tests
  describe("POST api/todos", () => {
    it("Should return 200 OK", async () => {
      let result = await request(server)
        .post("/api/todos")
        .send(todoItem);
      expect(result.status).toBe(200);
    });
    it("Should return the body", async () => {
      let result = await request(server)
        .post("/api/todos")
        .send(todoItem);
      expect(result.body.title).toBe("Buy Some Milk");
    });
  });

  //PUT endpoint tests

  //DELETE endpoint tests
  afterEach(async () => {
    await server.close();
    await Todo.remove({});
  });
});
