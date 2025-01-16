const clothingItemRouter = require("express").Router();
const auth = require("../middlewares/auth");

const {
  getClothingItems,
  getClothingItem,
  createClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

clothingItemRouter.get("/", getClothingItems);

clothingItemRouter.get("/", getClothingItem);

clothingItemRouter.post("/", auth, createClothingItem);

clothingItemRouter.delete("/:itemId", auth, deleteClothingItem);

clothingItemRouter.put("/:itemId/likes", auth, likeItem);

clothingItemRouter.delete("/:itemId/likes", auth, dislikeItem);

module.exports = clothingItemRouter;
