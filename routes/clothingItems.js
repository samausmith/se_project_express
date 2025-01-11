const clothingItemRouter = require("express").Router();
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

clothingItemRouter.post("/", createClothingItem);

clothingItemRouter.delete("/:itemId", deleteClothingItem);

clothingItemRouter.put("/:itemId/likes", likeItem);

clothingItemRouter.delete("/:itemId/likes", dislikeItem);

module.exports = clothingItemRouter;
