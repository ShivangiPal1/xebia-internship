import express from "express";
import {
  createItem,
  deleteItem,
  getItemById,
  getItems,
  updateItem
} from "../controllers/itemController.js";

const router = express.Router();

router.route("/").get(getItems).post(createItem);
router.route("/:id").get(getItemById).put(updateItem).delete(deleteItem);

export default router;
