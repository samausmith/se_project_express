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

const {
  validateCreateClothingItem,
  validateGetClothingItem,
} = require("../middlewares/validation");

clothingItemRouter.get("/", getClothingItems);

clothingItemRouter.get("/:itemId", validateGetClothingItem, getClothingItem);

clothingItemRouter.post(
  "/",
  auth,
  validateCreateClothingItem,
  createClothingItem
);

clothingItemRouter.delete(
  "/:itemId",
  auth,
  validateGetClothingItem,
  deleteClothingItem
);

clothingItemRouter.put(
  "/:itemId/likes",
  auth,
  validateGetClothingItem,
  likeItem
);

clothingItemRouter.delete(
  "/:itemId/likes",
  auth,
  validateGetClothingItem,
  dislikeItem
);

module.exports = clothingItemRouter;
