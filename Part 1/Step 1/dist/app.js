"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const todoRoutes_1 = require("./routes/todoRoutes");
const config = require("./config/config");
class App {
    constructor() {
        this.todoRoute = new todoRoutes_1.Routes();
        this.mongoUrl = config.dbUrl;
        this.app = express();
        this.config();
        this.todoRoute.routes(this.app);
        this.mongoSetup();
    }
    config() {
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization");
            res.header("Access-Control-Allow-Methods", "GET, POST,PUT, DELETE, OPTIONS");
            next();
        });
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }
    mongoSetup() {
        mongoose.Promise = global.Promise;
        mongoose.connect(process.env.MONGODB_URI || this.mongoUrl);
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map