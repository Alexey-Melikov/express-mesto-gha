/* eslint-disable no-unused-vars */
const {
  ERROR_CODE_DEFAULT,
  ERROR_CODE_INCORRECT_DATA,
  ERROR_CODE_NOT_FOUND,
} = require("../utils/constants");

const cardSchema = require("../models/card");

module.exports.getCards = (req, res) => {
  cardSchema
    .find({})
    .then((cards) => res.send(cards))
    .catch((err) => {
      res.status(ERROR_CODE_DEFAULT.code).send(ERROR_CODE_DEFAULT.message);
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  cardSchema
    .create({ name, link, owner: req.user._id })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(ERROR_CODE_INCORRECT_DATA.code)
          .send(ERROR_CODE_INCORRECT_DATA.message);
      }
      return res.status(ERROR_CODE_DEFAULT.code).send(ERROR_CODE_DEFAULT.message);
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
      if (err.name === "DocumentNotFoundError") {
        return res.status(ERROR_CODE_NOT_FOUND.code).send(ERROR_CODE_NOT_FOUND.message);
      }
      return res.status(ERROR_CODE_DEFAULT.code).send(ERROR_CODE_DEFAULT.message);
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
      if (err.name === "DocumentNotFoundError") {
        return res.status(ERROR_CODE_NOT_FOUND.code).send(ERROR_CODE_NOT_FOUND.code);
      }
      return res.status(ERROR_CODE_DEFAULT.code).send(ERROR_CODE_DEFAULT.message);
    });
};

module.exports.dislikeCard = (req, res) => {
  cardSchema
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    )
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(ERROR_CODE_NOT_FOUND.code).send(ERROR_CODE_NOT_FOUND.message);
      }
      return res.status(ERROR_CODE_DEFAULT.code).send(ERROR_CODE_DEFAULT.message);
    });
};

/* eslint-enable no-unused-vars */
