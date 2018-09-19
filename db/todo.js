let todoModel = require("../models/todo");
let Todo = class {
  constructor(payload) {
    this.payload = payload;
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

  add(cb) {
    new todoModel(this.payload).save(cb);
  }

  fetch(cb) {
    const criteria = this.payload.criteria;
    const projections = this.payload.projections;
    const options = this.payload.options;
    todoModel.find(criteria, projections, options, cb);
  }

  remove(cb) {
    const criteria = this.payload;
    // console.log("in remove method cb", cb, " criteria ", criteria);
    todoModel
      .findOneAndRemove(cb)
      .then(res => {
        // console.log("findOneAndRemove ", res);
      })
      .catch(err => console.log("findOneAndDelete err ", err));
  }
  updateTodo(cb) {
    const criteria = this.payload;
    console.log('update Todo ',cb);
    todoModel
      .findOneAndUpdate({id:cb.id},cb)
      .then(res => {
        console.log("findOneAndRemove ", res);
      })
      .catch(err => console.log("findOneAndDelete err ", err));
  }
};
module.exports = Todo;
