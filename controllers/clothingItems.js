// const mongoose = require("mongoose");

const clothingItem = require("../models/clothingItem");

const errorHandler = require("../utils/errors");

const getClothingItems = (req, res) => {
  clothingItem
    .find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      errorHandler({ err, id: null, res });
    });
};

const getClothingItem = (req, res) => {
  const { itemId } = req.params;
  clothingItem
    .findById(itemId)
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      errorHandler({ err, id: null, res });
    });
  // .catch((err) => {
  //   if (!mongoose.Types.ObjectId.isValid(itemId)) {
  //     res.status(400).send({ message: "Invalid item ID" });
  //   } else {
  //     res.status(404).send({ message: "Item ID not found" });
  //   }
  //   res.status(500).send({ message: err.message });
  // });
};

const createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  clothingItem
    .create({ name, weather, imageUrl, owner: req.user._id })
    .then((data) => res.status(201).send(data))
    .catch((err) => {
      errorHandler({ err, id: null, res });
    });
  // .catch((err) => {
  //   console.error(err);
  //   if (err.name === "ValidationError") {
  //     res.status(400).send({ message: err.message });
  //   }
  //   res.status(500).send({ message: err.message });
  // });
};

const likeItem = (req, res) => {
  clothingItem
    .findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
      { new: true }
    )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      errorHandler({ err, id: null, res });
    });
  // .catch((err) => {
  //   if (!mongoose.Types.ObjectId.isValid(req.params.itemId)) {
  //     res.status(400).send({ message: "Invalid item ID" });
  //   } else {
  //     res.status(404).send({ message: "Item ID not found" });
  //   }
  //   res.status(500).send({ message: err.message });
  // });
};

const dislikeItem = (req, res) => {
  clothingItem
    .findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } }, // remove _id from the array
      { new: true }
    )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      errorHandler({ err, id: null, res });
    });
  // .catch((err) => {
  //   if (!mongoose.Types.ObjectId.isValid(req.params.itemId)) {
  //     res.status(400).send({ message: "Invalid item ID" });
  //   } else {
  //     res.status(404).send({ message: "Item ID not found" });
  //   }
  //   res.status(500).send({ message: err.message });
  // });
};

module.exports = {
  getClothingItems,
  getClothingItem,
  createClothingItem,
  likeItem,
  dislikeItem,
};
