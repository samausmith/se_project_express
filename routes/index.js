const { BAD_REQUEST, NOT_FOUND, DEFAULT } = require("../utils/errors");

const router = require("express").Router();
const userRouters = require("./users");
const clothingItemRouters = require("./clothingItems");

router.use("/users", userRouters);
router.use("/items", clothingItemRouters);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ error: "The requested resource was not found" });
});

module.exports = router;
