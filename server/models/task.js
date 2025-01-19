import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, default: Date.now },
    priority: {
      type: String,
      default: "normal",
      enum: ["high", "medium", "normal", "low"], // client priorities
    },
    stage: {
      type: String,
      default: "todo",
      enum: ["todo", "in progress", "completed"], // client stages
    },
    isTrashed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
