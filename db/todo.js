let todoModel = require("../models/todo");
let Todo = class {
  constructor(payload) {
    this.payload = payload;
  }
  add(cb) {
    new todoModel(this.payload).save(cb);
  }
  fetch(cb) {
    const criteria = this.payload.criteria;
    const projections = this.payload.projections;
    const options = this.payload.options;
    todoModel.find(criteria, projections, options, cb);
  }
};
module.exports = Todo;
