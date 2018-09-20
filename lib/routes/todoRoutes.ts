import { Request, Response } from "express";
import * as mongoose from "mongoose";
import { TodoSchema } from "../models/todoModel";
import { todoController } from "../controller/todoController";

const Todo = mongoose.model("todo", TodoSchema);

export class Routes {
  /**
   * name
   */
  public todoController: todoController = new todoController();
  public routes(app): void {
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
