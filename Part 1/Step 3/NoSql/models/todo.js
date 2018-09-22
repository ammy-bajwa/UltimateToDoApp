const Mongoose = require("mongoose");
/**
 * Created by soc-mba-32 on 03/03/18.
 */
const Schema = Mongoose.Schema;
let todo = new Schema({
  todo_id: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    required: true
  }
});

module.exports = Mongoose.model("todo", todo);
