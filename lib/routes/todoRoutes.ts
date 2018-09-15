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
        if (req.body.title) {
          res.status(200).json({ message: "POST" });
        }
      });
  }
}
