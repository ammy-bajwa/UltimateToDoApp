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
const mongoose = require("mongoose");
const todoModel_1 = require("../models/todoModel");
const db_1 = require("../database/db");
const Todo = mongoose.model("todo", todoModel_1.TodoSchema);
class todoController {
    constructor() {
        /**
         * todoDB
         */
        this.todoDB = new db_1.todoDB();
        /**
         * getTodo
         */
        this.getTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const todos = yield this.todoDB.getAll();
            res.json(todos);
        });
        /**
         * postTodo
         */
        this.postTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!req.body.title) {
                res.status(400).send({ error: "Please Enter a title" });
            }
            else if (!req.body.description) {
                res.status(400).send({ error: "Please Enter a description" });
            }
            else {
                let result = yield this.todoDB.saveTodo(req.body);
                res.send(result);
            }
        });
        /**
         * getSingleTodo
         */
        this.getSingleTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let result = yield this.todoDB.findSingleTodo(req.params.id);
            res.send(result);
        });
        /**
         * updateTodo
         */
        this.updateTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let result = yield this.todoDB.FindAndUpdateTodo(req.body, req.params.id);
            res.send(result);
        });
        /**
         * deleteTodo
         */
        this.deleteTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let result = yield this.todoDB.removeTodo(req.params.id);
            res.send(result);
        });
    }
}
exports.todoController = todoController;
//# sourceMappingURL=todoController.js.map