"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const todoModel_1 = require("../models/todoModel");
const Todo = mongoose.model("todo", todoModel_1.TodoSchema);
class Routes {
    routes(app) {
        app.route("/").get((req, res) => {
            res.send({ Success: "API is working" });
        });
        app
            .route("/api/todos")
            .get((req, res) => {
            Todo.find({})
                .then(result => {
                res.status(200).send(result);
            })
                .catch(err => {
                res.status(404).send(err);
            });
        })
            .post((req, res) => {
            if (!req.body.title) {
                res.status(400).send({ error: "Please Enter a title" });
            }
            else if (!req.body.description) {
                res.status(400).send({ error: "Please Enter a title" });
            }
            else {
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
            .put((req, res) => {
            Todo.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, todo) => {
                if (err) {
                    res.send(err);
                }
                res.status(400).json(todo);
            });
        })
            .delete((req, res) => {
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
exports.Routes = Routes;
//# sourceMappingURL=todoRoutes.js.map