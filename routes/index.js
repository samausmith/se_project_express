const router = require("express").Router();
const userRouters = require("./users");
const clothingItemRouters = require("./clothingItems");
const { NOT_FOUND } = require("../utils/errors");
const { loginUser, createUser } = require("../controllers/users");
const auth = require("../middlewares/auth");

router.use("/users", auth, userRouters);
router.use("/items", clothingItemRouters);
router.post("/signin", loginUser);
router.post("/signup", createUser);

router.use((req, res) => {
  res.status(NOT_FOUND).send({
    message: "The requested resource was not found",
  });
});

module.exports = router;
