const router = require("express").Router();
const userRouters = require("./users");
const clothingItemRouters = require("./clothingItems");

router.use("/users", userRouters);
router.use("/items", clothingItemRouters);

module.exports = router;
