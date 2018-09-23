import * as mongoose from "mongoose";

import { TodoSchema } from "../models/todoModel";

const Todo = mongoose.model("todo", TodoSchema);

export class todoDB {
  /**
   * getTodo
   */
  public getAll = async () => {
    let result = await Todo.find({})
      .then(result => {
        return result;
      })
      .catch(err => {
        return err;
      });
    return result;
  };

  /**
   * postTodo
   */
  public saveTodo = async body => {
    let todo = new Todo({
      title: body.title,
      description: body.description,
      done: body.done
    });
    let result = await todo
      .save()
      .then(result => {
        return result;
      })
      .catch(err => {
        return err;
      });
    return result;
  };

  /**
   * getSingleTodo
   */
  public findSingleTodo = async _id => {
    let result = await Todo.find({ _id })
      .then(result => {
        return result;
      })
      .catch(err => {
        return err;
      });
    return result;
  };

  /**
   * updateTodo
   */
  public FindAndUpdateTodo = async (body, _id) => {
    let result = await Todo.findOneAndUpdate(
      { _id },
      body,
      { new: true },
      (err, todo) => {
        if (err) {
          return err;
        }
        return todo;
      }
    );
    return result;
  };

  /**
   * deleteTodo
   */
  public removeTodo = async _id => {
    let result = await Todo.remove({ _id })
      .then(result => {
        return { message: "Item delete with Id", result };
      })
      .catch(err => {
        return err;
      });
    return result;
  };
}
