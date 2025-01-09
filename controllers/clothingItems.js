const clothingItem = require("../models/clothingItem");

const getClothingItems = (req, res) => {
  clothingItem
    .find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: err.message });
    });
};

const getClothingItem = (req, res) => {
  clothingItem
    .orFail(() => {
      const error = new Error("Item ID not found");
      error.statusCode = 404;
      throw error;
    })
    .findById(req.params.id)
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: err.message });
    });
};

const createClothingItem = (req, res) => {
  console.log(req.user._id);
  const { name, weather, imageUrl, owner } = req.body;

  clothingItem
    .create({ name, weather, imageUrl, owner })
    .then((data) => res.status(201).send(data))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        res.status(400).send({ message: err.message });
      }
      res.status(500).send({ message: err.message });
    });
};

const likeItem = (req, res) =>
  clothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true }
  );
//...

const dislikeItem = (req, res) =>
  clothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true }
  );

module.exports = {
  getClothingItems,
  getClothingItem,
  createClothingItem,
  likeItem,
  dislikeItem,
};
