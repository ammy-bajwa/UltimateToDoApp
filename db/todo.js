let todoModel = require("../models/todo");
let Todo = class {
  constructor(payload) {
    this.payload = payload;
  }
  add(cb) {
    new todoModel(this.payload).save(cb);
  }
  static list(cb) {
    const criteria = {};
    const projections = {
      _id: 0,
      __v: 0
    };
    const options = {
      lean: true
    };
    todoModel.find(criteria, projections, options, cb);
  }
};
module.exports = Todo;
