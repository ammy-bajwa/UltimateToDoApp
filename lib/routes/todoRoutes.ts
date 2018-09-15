import { Request, Response } from "express";
import * as mongoose from "mongoose";
import { TodoSchema } from "../models/todoModel";

const Todo = mongoose.model("todo", TodoSchema);

export class Routes {
  public routes(app): void {
    app
      .route("/api/todos")
      .get((req: Request, res: Response) => {
        res.status(200).send("Hello from the API");
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
  }
}
