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
const Todo = mongoose.model("todo", todoModel_1.TodoSchema);
class todoDB {
    constructor() {
        /**
         * getTodo
         */
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            let result = yield Todo.find({})
                .then(result => {
                return result;
            })
                .catch(err => {
                return err;
            });
            return result;
        });
        /**
         * postTodo
         */
        this.saveTodo = (body) => __awaiter(this, void 0, void 0, function* () {
            let todo = new Todo({
                title: body.title,
                description: body.description,
                done: body.done
            });
            let result = yield todo
                .save()
                .then(result => {
                return result;
            })
                .catch(err => {
                return err;
            });
            return result;
        });
        /**
         * getSingleTodo
         */
        this.findSingleTodo = (_id) => __awaiter(this, void 0, void 0, function* () {
            let result = yield Todo.find({ _id })
                .then(result => {
                return result;
            })
                .catch(err => {
                return err;
            });
            return result;
        });
        /**
         * updateTodo
         */
        this.FindAndUpdateTodo = (body, _id) => __awaiter(this, void 0, void 0, function* () {
            let result = yield Todo.findOneAndUpdate({ _id }, body, { new: true }, (err, todo) => {
                if (err) {
                    return err;
                }
                return todo;
            });
            return result;
        });
        /**
         * deleteTodo
         */
        this.removeTodo = (_id) => __awaiter(this, void 0, void 0, function* () {
            let result = yield Todo.remove({ _id })
                .then(result => {
                return { message: "Item delete with Id", result };
            })
                .catch(err => {
                return err;
            });
            return result;
        });
    }
}
exports.todoDB = todoDB;
//# sourceMappingURL=db.js.map