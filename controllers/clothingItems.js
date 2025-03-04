const clothingItem = require("../models/clothingItem");

const { BadRequestError } = require("../utils/errors/BadRequestError");
const { ForbiddenError } = require("../utils/errors/ForbiddenError");
const { NotFoundError } = require("../utils/errors/NotFoundError");

const getClothingItems = (req, res, next) => {
  clothingItem
    .find({})
    .orFail(() => new NotFoundError("Clothing items not find"))
    .then((items) => res.status(200).send(items))
    .catch(next);
};

const getClothingItem = (req, res, next) => {
  const { itemId } = req.params;
  clothingItem
    .findById(itemId)
    .orFail(() => new NotFoundError("Clothing item not found"))
    .then((item) => res.status(200).send(item))
    .catch(next);
};

const createClothingItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user;

  clothingItem
    .create({ name, weather, imageUrl, owner })
    .then((data) => res.status(201).send(data))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(
          new BadRequestError("Invalid data for creating a clothing item")
        );
      }
      return next(err);
    });
};

const deleteClothingItem = (req, res, next) => {
  const { itemId } = req.params;

  clothingItem
    .findById(itemId)
    .orFail(() => new NotFoundError("Clothing item not found"))
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        return next(
          new ForbiddenError("You do not have permission to delete this item")
        );
      }
      return clothingItem.findByIdAndDelete(itemId);
    })
    .then(() => res.send({ message: "successfully deleted item" }))
    .catch(next);
};

const likeItem = (req, res, next) => {
  clothingItem
    .findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
      { new: true }
    )
    .orFail(() => new NotFoundError("Clothing item not found"))
    .then((item) => res.send(item))
    .catch(next);
};

const dislikeItem = (req, res, next) => {
  clothingItem
    .findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } }, // remove _id from the array
      { new: true }
    )
    .orFail(() => new NotFoundError("Clothing item not found"))
    .then((item) => res.send(item))
    .catch(next);
};

module.exports = {
  getClothingItems,
  getClothingItem,
  createClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
};
