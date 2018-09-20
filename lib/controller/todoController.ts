import * as mongoose from "mongoose";
import { Request, Response } from "express";

import { TodoSchema } from "../models/todoModel";

const Todo = mongoose.model("todo", TodoSchema);

export class todoController {
  /**
   * getTodo
   */
  public getTodo = (req: Request, res: Response) => {
    Todo.find({})
      .then(result => {
        res.status(200).send(result);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  };

  /**
   * postTodo
   */
  public postTodo = (req: Request, res: Response) => {
    if (!req.body.title) {
      res.status(400).send({ error: "Please Enter a title" });
    } else if (!req.body.description) {
      res.status(400).send({ error: "Please Enter a description" });
    } else {
      let todo = new Todo({
        title: req.body.title,
        description: req.body.description,
        done: req.body.done
      });
      todo
        .save()
        .then(result => {
          res.send(result);
        })
        .catch(err => {
          res.status(400).send({ err });
        });
    }
  };

  /**
   * getSingleTodo
   */
  public getSingleTodo = (req: Request, res: Response) => {
    Todo.find({ _id: req.params.id })
      .then(result => {
        res.status(200).send(result);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  };

  /**
   * updateTodo
   */
  public updateTodo = (req: Request, res: Response) => {
    Todo.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
      (err, todo) => {
        if (err) {
          res.send(err);
        }
        res.status(200).json(todo);
      }
    );
  };

  /**
   * deleteTodo
   */
  public deleteTodo(req: Request, res: Response) {
    Todo.remove({ _id: req.params.id })
      .then(result => {
        res.status(200).send({
          message: "Item delete with Id",
          _id: req.params.id
        });
      })
      .catch(err => {
        res.status(400).send(err);
      });
  }
}
