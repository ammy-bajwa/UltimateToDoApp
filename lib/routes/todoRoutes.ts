import { Request, Response } from "express";

export class Routes {
  public routes(app): void {
    app.route("/api/todos").get((req: Request, res: Response) => {
      res.status(200).send("Hello from the API");
    });
  }
}
