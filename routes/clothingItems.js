const clothingItemRouter = require("express").Router();
const {
  getClothingItems,
  getClothingItem,
  createClothingItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

clothingItemRouter.get("/", getClothingItems);

clothingItemRouter.post("/", createClothingItem);

clothingItemRouter.delete("/:itemId", getClothingItem);

clothingItemRouter.put("/:itemId/likes", likeItem);

clothingItemRouter.delete("/:itemId/likes", dislikeItem);

module.exports = clothingItemRouter;
