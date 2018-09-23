"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.TodoSchema = new Schema({
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
//# sourceMappingURL=todoModel.js.map