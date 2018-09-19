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
  updateTodo(cb) {
    const criteria = this.payload;
    console.log("update Todo ", cb);
    todoModel
      .findOneAndUpdate({ todo_id: cb.todo_id }, cb)
      .then(res => {
        console.log("findOneAndRemove ", res);
      })
      .catch(err => console.log("findOneAndDelete err ", err));
  }
};
module.exports = Todo;
