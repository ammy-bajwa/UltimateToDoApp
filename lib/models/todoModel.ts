import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const TodoSchema = new Schema({
  title: {
    type: String,
    required: "Please write a title"
  },
  description: {
    type: String,
    required: "Please write a description"
  },
  done: {
    type: Boolean
  }
});
