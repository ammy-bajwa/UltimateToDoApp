import { Request, Response } from "express";
import * as mongoose from "mongoose";
import { TodoSchema } from "../models/todoModel";

const Todo = mongoose.model("todo", TodoSchema);

export class Routes {
  public routes(app): void {
    app.route("/").get((req: Request, res: Response) => {
      res.send({ Success: "API is working" });
    });
    app
      .route("/api/todos")
      .get((req: Request, res: Response) => {
        Todo.find({})
          .then(result => {
            res.status(200).send(result);
          })
          .catch(err => {
            res.status(404).send(err);
          });
      })
      .post((req: Request, res: Response) => {
        if (!req.body.title) {
          res.status(400).send({ error: "Please Enter a title" });
        } else if (!req.body.description) {
          res.status(400).send({ error: "Please Enter a title" });
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
      });

    app
      .route("/api/todos/:id")
      .put((req: Request, res: Response) => {
        Todo.findOneAndUpdate(
          { _id: req.params.id },
          req.body,
          { new: true },
          (err, todo) => {
            if (err) {
              res.send(err);
            }
            res.status(400).json(todo);
          }
        );
      })
      .delete((req: Request, res: Response) => {
        Todo.remove({ _id: req.params.adId })
          .then(result => {
            res.status(200).send(result);
          })
          .catch(err => {
            res.status(400).send(err);
          });
      });
  }
}
