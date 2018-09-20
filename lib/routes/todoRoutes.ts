import { Request, Response } from "express";
import * as uuid from 'uuid/v4'
import { Controller } from "../controller/Controller";

export class Routes {
    public todoController: Controller = new Controller();
    public routes(app): void {
      app
        .route("/api/todos")
        .get(this.todoController.get)
        .post(this.todoController.post);
  
      app
        .route("/api/todos/:id")
        .put(this.todoController.update)
        .delete(this.todoController.delete);
    }
  }