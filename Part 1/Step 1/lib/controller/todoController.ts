import * as mongoose from "mongoose";
import { Request, Response } from "express";

import { TodoSchema } from "../models/todoModel";
import { todoDB } from "../database/db";

const Todo = mongoose.model("todo", TodoSchema);

export class todoController {
  /**
   * todoDB
   */
  public todoDB: todoDB = new todoDB();
  /**
   * getTodo
   */
  public getTodo = async (req: Request, res: Response) => {
    const todos = await this.todoDB.getAll();
    res.json(todos);
  };

  /**
   * postTodo
   */
  public postTodo = async (req: Request, res: Response) => {
    if (!req.body.title) {
      res.status(400).send({ error: "Please Enter a title" });
    } else if (!req.body.description) {
      res.status(400).send({ error: "Please Enter a description" });
    } else {
      let result = await this.todoDB.saveTodo(req.body);

      res.send(result);
    }
  };

  /**
   * getSingleTodo
   */
  public getSingleTodo = async (req: Request, res: Response) => {
    let result = await this.todoDB.findSingleTodo(req.params.id);
    res.send(result);
  };

  /**
   * updateTodo
   */
  public updateTodo = async (req: Request, res: Response) => {
    let result = await this.todoDB.FindAndUpdateTodo(req.body, req.params.id);
    res.send(result);
  };

  /**
   * deleteTodo
   */
  public deleteTodo = async (req: Request, res: Response) => {
    let result = await this.todoDB.removeTodo(req.params.id);
    res.send(result);
  };
}
