const mongoose = require('mongoose');
const {
  ERROR_CODE_DEFAULT,
  ERROR_CODE_INCORRECT_DATA,
  ERROR_CODE_NOT_FOUND,
} = require('../utils/constants');

const userSchema = require('../models/user');

module.exports.getUsers = (req, res) => {
  userSchema
    .find({})
    .then((users) => res.send(users))
    .catch(() => {
      res
        .status(ERROR_CODE_DEFAULT)
        .send({ message: 'An error has occurred on the server' });
    });
};

module.exports.getUser = (req, res) => {
  userSchema
    .findById(req.params.userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return res
          .status(ERROR_CODE_INCORRECT_DATA)
          .send({ message: 'Incorrect data was passed.' });
      }
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        console.log(mongoose.Error);
        return res
          .status(ERROR_CODE_NOT_FOUND)
          .send({ message: 'User with specified id was not found.' });
      }
      return res
        .status(ERROR_CODE_DEFAULT)
        .send({ message: 'An error has occurred on the server.' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  userSchema
    .create({ name, about, avatar })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res
          .status(ERROR_CODE_INCORRECT_DATA)
          .send({ message: 'Incorrect data was passed during user creation.' });
      }
      return res
        .status(ERROR_CODE_DEFAULT)
        .send({ message: 'An error has occurred on the server' });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  userSchema
    .findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(ERROR_CODE_INCORRECT_DATA).send({
          message: 'Incorrect data was sent when updating the profile.',
        });
      }
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return res
          .status(ERROR_CODE_NOT_FOUND)
          .send({ message: 'User with specified id was not found.' });
      }
      return res
        .status(ERROR_CODE_DEFAULT)
        .send({ message: 'An error has occurred on the server' });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  userSchema
    .findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return res.status(ERROR_CODE_INCORRECT_DATA).send({
          message: 'Incorrect data was sent when updating the avatar.',
        });
      }
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return res
          .status(ERROR_CODE_NOT_FOUND)
          .send({ message: 'User with specified id was not found.' });
      }
      return res
        .status(ERROR_CODE_DEFAULT)
        .send({ message: 'An error has occurred on the server' });
    });
};
