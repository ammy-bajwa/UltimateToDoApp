"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const todoModel_1 = require("../models/todoModel");
const todoController_1 = require("../controller/todoController");
const Todo = mongoose.model("todo", todoModel_1.TodoSchema);
class Routes {
    constructor() {
        /**
         * name
         */
        this.todoController = new todoController_1.todoController();
    }
    routes(app) {
        app
            .route("/api/todos")
            .get(this.todoController.getTodo)
            .post(this.todoController.postTodo);
        app
            .route("/api/todos/:id")
            .get(this.todoController.getSingleTodo)
            .put(this.todoController.updateTodo)
            .delete(this.todoController.deleteTodo);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=todoRoutes.js.map