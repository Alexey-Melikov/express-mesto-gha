const mongoose = require('mongoose');

const {
  ERROR_CODE_DEFAULT,
  ERROR_CODE_INCORRECT_DATA,
  ERROR_CODE_NOT_FOUND,
} = require('../utils/constants');

const cardSchema = require('../models/card');

module.exports.getCards = (req, res) => {
  cardSchema
    .find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(() => {
      res
        .status(ERROR_CODE_DEFAULT)
        .send({ message: 'An error has occurred on the server.' });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  cardSchema
    .create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res
          .status(ERROR_CODE_INCORRECT_DATA)
          .send({ message: 'Incorrect data was passed during card creation.' });
      }
      return res
        .status(ERROR_CODE_DEFAULT)
        .send({ message: 'An error has occurred on the server.' });
    });
};

module.exports.deleteCard = (req, res) => {
  cardSchema
    .findByIdAndRemove(req.params.cardId)
    .orFail()
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return res
          .status(ERROR_CODE_INCORRECT_DATA)
          .send({ message: 'Incorrect data was passed.' });
      }
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return res
          .status(ERROR_CODE_NOT_FOUND)
          .send({ message: 'Incorrect data was sent when deleting the card.' });
      }
      return res
        .status(ERROR_CODE_DEFAULT)
        .send({ message: 'An error has occurred on the server.' });
    });
};

module.exports.likeCard = (req, res) => {
  cardSchema
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return res
          .status(ERROR_CODE_INCORRECT_DATA)
          .send({ message: 'Incorrect data was sent to set/unlike.' });
      }
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return res
          .status(ERROR_CODE_NOT_FOUND)
          .send({ message: 'A non-existent id of the card was passed.' });
      }
      return res
        .status(ERROR_CODE_DEFAULT)
        .send({ message: 'An error has occurred on the server.' });
    });
};

module.exports.dislikeCard = (req, res) => {
  cardSchema
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return res
          .status(ERROR_CODE_INCORRECT_DATA)
          .send({ message: 'Incorrect data was sent to set/unlike.' });
      }
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return res
          .status(ERROR_CODE_NOT_FOUND)
          .send({ message: 'A non-existent id of the card was passed.' });
      }
      return res
        .status(ERROR_CODE_DEFAULT)
        .send({ message: 'An error has occurred on the server.' });
    });
};
