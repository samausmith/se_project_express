const userRouter = require("express").Router();
const { getCurrentUser, updateUserProfile } = require("../controllers/users");
const { validateGetUser } = require("../middlewares/validation");

userRouter.get("/me", getCurrentUser);
userRouter.patch("/me", validateGetUser, updateUserProfile);

module.exports = userRouter;
