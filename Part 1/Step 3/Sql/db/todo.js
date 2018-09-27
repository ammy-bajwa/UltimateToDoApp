//let todoModel = require("../models/todo");
let uuid = require("uuid/v4");
let pg = require("pg");

let pool = new pg.Pool({
  port: 5432,
  user: "postgres",
  password: "root",
  host: "localhost",
  database: "react_postgresql_todo",
  max: 10
});

let Todo = class {
  constructor(payload) {
    this.payload = payload;
  }
  add(callback) {
    pool.connect((err, db, done) => {
      if (err) {
        console.log(err);
      } else {
        db.query(
          "INSERT INTO grpc_todo(todo_id,title,description,done) VALUES($1,$2,$3,$4)",
          [
            this.payload.todo_id,
            this.payload.title,
            this.payload.description,
            this.payload.done
          ],
          callback
        );
      }
    });
  }
  static list(callback) {
    const criteria = {};
    const projections = {
      _id: 0,
      __v: 0
    };
    const options = {
      lean: true
    };

    pool.connect((err, db, done) => {
      if (err) {
        console.log(err);
      } else {
        db.query("select* from grpc_todo", callback);
      }
    });
  }
  updateTodo(object, callback) {
    const criteria = this.payload;

    pool.connect((err, db, done) => {
      if (err) {
        console.log(err);
      } else {
        db.query(
          "UPDATE grpc_todo SET title=($2),description=($3),done=($4) WHERE todo_id=($1)",
          [object.todo_id, object.title, object.description, object.done],
          callback
        );
      }
    });
  }
  remove(object,callback) {
    pool.connect((err, db) => {
      if (err) {
        console.log(err);
      } else {
        db.query(
          "DELETE FROM grpc_todo WHERE todo_id=$1",
          [object.todo_id],callback
        );
      }
    });
  }
};
module.exports = Todo;
