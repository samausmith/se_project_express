const clothingItem = require("../models/clothingItem");

const errorHandler = require("../utils/errorHandler");

const getClothingItems = (req, res) => {
  clothingItem
    .find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      errorHandler({ err, res });
    });
};

const getClothingItem = (req, res) => {
  const { itemId } = req.params;
  clothingItem
    .findById(itemId)
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      errorHandler({ err, res });
    });
};

const createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user;

  clothingItem
    .create({ name, weather, imageUrl, owner })
    .then((data) => res.status(201).send(data))
    .catch((err) => {
      console.log();
      errorHandler({ err, res });
    });
};

const deleteClothingItem = (req, res) => {
  const { itemId } = req.params;

  clothingItem
    .findById(itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        const error = new Error(
          "User does not have permission to delete this item"
        );
        error.name = "ForbiddenError";
        return Promise.reject(error);
      }
      return clothingItem.findByIdAndDelete(itemId);
    })
    .then(() => res.send({ message: "successfully deleted item" }))
    .catch((err) => {
      errorHandler({ err, res });
    });
};

const likeItem = (req, res) => {
  clothingItem
    .findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
      { new: true }
    )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      errorHandler({ err, res });
    });
};

const dislikeItem = (req, res) => {
  clothingItem
    .findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } }, // remove _id from the array
      { new: true }
    )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      errorHandler({ err, res });
    });
};

module.exports = {
  getClothingItems,
  getClothingItem,
  createClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
};
