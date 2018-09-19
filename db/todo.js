let todoModel = require("../models/todo");
let Todo = class {
  constructor(payload) {
    this.payload = payload;
  }
  add(cb) {
    new todoModel(this.payload).save(cb);
  }
};
module.exports = Todo;
