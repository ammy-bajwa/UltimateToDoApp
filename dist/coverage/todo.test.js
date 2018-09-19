"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("supertest");
const mongoose = require("mongoose");
const todoModel_1 = require("../models/todoModel");
const Todo = mongoose.model("todo", todoModel_1.TodoSchema);
let server;
let todoId;
let todo;
let todoItem;
describe("api/todos", () => {
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        server = require("../server");
        todoId = mongoose.Types.ObjectId();
        todoItem = {
            id: todoId,
            title: "Buy Some Milk",
            description: "Some Description: buy from Hassan dairy",
            done: true
        };
        todo = new Todo(todoItem);
        yield todo.save();
    }));
    // GET endpoint tests
    describe("GET api/todos", () => {
        it("Should return 200 OK", () => __awaiter(this, void 0, void 0, function* () {
            let result = yield request(server).get("/api/todos");
            expect(result.status).toBe(200);
        }));
    });
    //TEST DB tests
    describe("DB test", () => {
        it("Should match the returned value", () => __awaiter(this, void 0, void 0, function* () {
            let result = yield Todo.findById(todo._id);
            expect(result._id).toEqual(todo._id);
            expect(result.title).toEqual(todo.title);
            expect(result.description).toEqual(todo.description);
            expect(result.done).toEqual(todo.done);
        }));
    });
    //POST endpoint tests
    describe("POST api/todos", () => {
        it("Should return 400 error", () => __awaiter(this, void 0, void 0, function* () {
            let result = yield request(server)
                .post("/api/todos")
                .send({
                id: todoId,
                description: "Some Description: buy from Hassan dairy",
                done: true
            });
            expect(result.status).toBe(400);
        }));
        it("Should return 400 error", () => __awaiter(this, void 0, void 0, function* () {
            let result = yield request(server)
                .post("/api/todos")
                .send({
                id: todoId,
                title: "some title",
                done: true
            });
            expect(result.status).toBe(400);
        }));
        it("Should return the body", () => __awaiter(this, void 0, void 0, function* () {
            let result = yield request(server)
                .post("/api/todos")
                .send(todoItem);
            expect(result.body.title).toBe("Buy Some Milk");
            expect(result.body.description).toBe("Some Description: buy from Hassan dairy");
        }));
        it("Should return 200 OK", () => __awaiter(this, void 0, void 0, function* () {
            let result = yield request(server)
                .post("/api/todos")
                .send(todoItem);
            expect(result.status).toBe(200);
        }));
    });
    //PUT endpoint tests
    describe("PUT api/todos/:id", () => {
        it("Should return 200 OK on Update", () => __awaiter(this, void 0, void 0, function* () {
            let result = yield request(server)
                .put(`/api/todos/todo._id`)
                .send({ done: true });
            expect(result.status).toBe(200);
        }));
    });
    //DELETE endpoint tests
    describe("DELETE api/todos/:id", () => {
        it("Should return 200 OK on Delete", () => __awaiter(this, void 0, void 0, function* () {
            let result = yield request(server).delete(`/api/todos/todo._id`);
            expect(result.status).toBe(200);
        }));
    });
    afterEach(() => __awaiter(this, void 0, void 0, function* () {
        yield server.close();
        yield Todo.remove({});
    }));
});
//# sourceMappingURL=todo.test.js.map