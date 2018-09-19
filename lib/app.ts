import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/todoRoutes";
let morgan = require('morgan');
let cors = require('cors');
let pg = require('pg');


class App {
  public app: express.Application;
  public todoRoute: Routes = new Routes();

  constructor() {
    this.app = express();
    this.config();
    this.todoRoute.routes(this.app);
  }

  private config(): void {
    this.app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(morgan('div'));
  }
}

export default new App().app;
