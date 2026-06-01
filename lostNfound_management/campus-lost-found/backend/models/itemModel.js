import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    minlength: [3, "Title must be at least 3 characters long"],
    maxlength: [100, "Title cannot be more than 100 characters long"]
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
    minlength: [10, "Description must be at least 10 characters long"],
    maxlength: [1000, "Description cannot be more than 1000 characters long"]
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    trim: true
  },
  location: {
    type: String,
    required: [true, "Location is required"],
    trim: true
  },
  status: {
    type: String,
    required: [true, "Status is required"],
    enum: {
      values: ["lost", "found", "resolved"],
      message: "Status must be lost, found, or resolved"
    },
    default: "lost"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Item = mongoose.model("Item", itemSchema);

export default Item;
