let todoModel = require("../models/todo");
let Todo =
 class {
  constructor(payload) {
    this.payload = payload;
  }
  add(callback) {
    new todoModel(this.payload).save(callback);
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
    todoModel.find(criteria, projections, options, callback);
  }
  updateTodo(object, callback) {
    const criteria = { $set: this.payload };
    console.log(this.payload.done + " from update");
    return todoModel.findOneAndUpdate(
      { todo_id: this.payload.todo_id },
      {
        $set: {
          done: this.payload.done
        }
      },
      callback
    );
  }
  remove(object,callback) {
    const criteria = this.payload;
    // console.log("in remove method cb", cb, " criteria ", criteria);
    todoModel.findOneAndRemove(criteria,callback)
  }
};
module.exports = Todo;
