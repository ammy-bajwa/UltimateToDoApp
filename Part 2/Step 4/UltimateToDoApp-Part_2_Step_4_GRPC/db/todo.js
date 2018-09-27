let todoModel = require("../models/todo");
let Todo = class {
  constructor(payload) {
    this.payload = payload;
  }

  static list(callBack) {
    const criteria = {};
    const projections = {
      _id: 0,
      __v: 0
    };
    const options = {
      lean: true
    };
    todoModel.find(criteria, projections, options, callBack);
  }

  add(callBack) {
    new todoModel(this.payload).save(callBack);
  }
  remove(object, callBack) {
    const criteria = this.payload;
    // console.log("in remove method cb", cb, " criteria ", criteria);
    todoModel.findOneAndRemove(cb, callBack);
  }
  updateTodo(object, callBack) {
    const criteria = this.payload;
    todoModel.findOneAndUpdate({ id: object.id }, { $set: object }, callBack);
  }
};
module.exports = Todo;
