import { Request, Response } from "express";
import { DB } from "../database/db";

export class Controller {
    //DB
    public DB: DB = new DB();
   //getTodo
   public get = async (req: Request, res: Response) => {
    const todos = await this.DB.getAll();
    res.json(todos);
  };

  
  //postTodo 
  public post = async (req: Request, res: Response) => {
    if (!req.body.title) {
      res.status(400).send({ error: "Please Enter a title" });
    } else if (!req.body.description) {
      res.status(400).send({ error: "Please Enter a description" });
    } else {
      let result = await this.DB.save(req.body);

      res.send(result);
    }
  };
   //updateTodo
  public update = async (req: Request, res: Response) => {
    let result = await this.DB.update(req.body, req.params.id);
    res.send(result);
  };

//delete
  public delete = async (req: Request, res: Response) => {
    let result = await this.DB.remove(req.params.id);
    res.send(result);
  };
}
