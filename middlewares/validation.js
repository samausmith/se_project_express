const { Joi, celebrate } = require("celebrate");
const validator = require("validator");
const router = require("../routes");
const {
  getClothingItems,
  getClothingItem,
  createClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItemController");

const {
  createUser,
  loginUser,
  getCurrentUser,
} = require("../controllers/users");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateEmail = (value, helpers) => {
  if (validator.isEmail(value)) {
    return value;
  }
  return helpers.error("string.email");
};

router.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30).messages({
        "string.min": 'The minimum length of the "name" field is 2',
        "string.max": 'The maximum length of the "name" field is 30',
        "string.empty": 'The "name" field must be filled in',
      }),
      imageUrl: Joi.string().required().custom(validateURL).messages({
        "string.empty": 'The "imageUrl" field must be filled in',
        "string.uri": 'the "imageUrl" field must be a valid url',
      }),
    }),
  }),
  createClothingItem
);

router.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30).messages({
        "string.min": 'The minimum length of the "name" field is 2',
        "string.max": 'The maximum length of the "name" field is 30',
        "string.empty": 'The "name" field must be filled in',
      }),
      avatar: Joi.string().required().custom(validateURL).messages({
        "string.empty": 'The "avatar" field must be filled in',
        "string.uri": 'the "avatar" field must be a valid url',
      }),
      email: Joi.string()
        .required()
        .custom(validateEmail)
        .min(2)
        .max(30)
        .messages({
          "string.min": 'The minimum length of the "name" field is 2',
          "string.max": 'The maximum length of the "name" field is 30',
          "string.empty": 'The "name" field must be filled in',
          "string.email": 'The "name" field must be a valid email',
        }),
      password: Joi.string().required().min(2).max(30).messages({
        "string.min": 'The minimum length of the "password" field is 2',
        "string.max": 'The maximum length of the "password" field is 30',
        "string.empty": 'The "password" field must be filled in',
      }),
    }),
  }),
  createUser
);

router.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string()
        .required()
        .custom(validateEmail)
        .min(2)
        .max(30)
        .messages({
          "string.min": 'The minimum length of the "name" field is 2',
          "string.max": 'The maximum length of the "name" field is 30',
          "string.empty": 'The "name" field must be filled in',
          "string.email": 'The "name" field must be a valid email',
        }),
      password: Joi.string().required().min(2).max(30).messages({
        "string.min": 'The minimum length of the "password" field is 2',
        "string.max": 'The maximum length of the "password" field is 30',
        "string.empty": 'The "password" field must be filled in',
      }),
    }),
  }),
  loginUser
);

router.get(
  "/items",
  celebrate({
    params: Joi.object().keys({
      itemdId: Joi.string().required(),
    }),
  }),
  getClothingItem
);

router.get(
  "/users",
  celebrate({
    params: Joi.object().keys({
      _id: Joi.string().required(),
    }),
  }),
  getCurrentUser
);
