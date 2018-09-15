import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const ContactSchema = new Schema({
  todo: {
    type: String,
    required: "Please write a todo"
  },
  checked: {
    type: Boolean
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});
