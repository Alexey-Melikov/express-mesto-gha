/* eslint-disable no-unused-vars */
const {
  ERROR_CODE_DEFAULT,
  ERROR_CODE_INCORRECT_DATA,
  ERROR_CODE_NOT_FOUND,
} = require("../utils/constants");

const userSchema = require("../models/user");

module.exports.getUsers = (req, res) => {
  userSchema
    .find({})
    .then((users) => res.send(users))
    .catch((err) => {
      res.status(ERROR_CODE_DEFAULT.code).send(ERROR_CODE_DEFAULT.message);
    });
};

module.exports.getUser = (req, res) => {
  userSchema
    .findById(req.params.userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(ERROR_CODE_NOT_FOUND.code)
          .send(ERROR_CODE_NOT_FOUND.message);
      }
      return res
        .status(ERROR_CODE_DEFAULT.code)
        .send(ERROR_CODE_DEFAULT.message);
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  userSchema
    .create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(ERROR_CODE_INCORRECT_DATA.code)
          .send(ERROR_CODE_INCORRECT_DATA.message);
      }
      return res
        .status(ERROR_CODE_DEFAULT.code)
        .send(ERROR_CODE_DEFAULT.message);
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  userSchema
    .findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(ERROR_CODE_NOT_FOUND.code)
          .send(ERROR_CODE_NOT_FOUND.message);
      }
      return res
        .status(ERROR_CODE_DEFAULT.code)
        .send(ERROR_CODE_DEFAULT.message);
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  userSchema
    .findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(ERROR_CODE_NOT_FOUND.code)
          .send(ERROR_CODE_NOT_FOUND.message);
      }
      return res
        .status(ERROR_CODE_DEFAULT.code)
        .send(ERROR_CODE_DEFAULT.message);
    });
};
/* eslint-enable no-unused-vars */
