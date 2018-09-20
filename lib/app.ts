import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import { Routes } from "./routes/todoRoutes";
const config = require("./config/config");

class App {
  public app: express.Application;
  public todoRoute: Routes = new Routes();

  public mongoUrl: string = config.dbUrl;

  constructor() {
    this.app = express();
    this.config();
    this.todoRoute.routes(this.app);
    this.mongoSetup();
  }

  private config(): void {
    this.app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST,PUT, DELETE, OPTIONS"
      );
      next();
    });
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private mongoSetup(): void {
    mongoose.Promise = global.Promise;
    mongoose
      .connect(process.env.MONGODB_URI || this.mongoUrl)
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export default new App().app;
