const mongoose = require('mongoose');
const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.deleteCard = (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.cardId)) {
    res.status(400).send({
      message: 'Ошибка валидации cardId',
    });
    return;
  }

  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({
          message: 'Запрашиваемая карточка не найдена',
        });
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      let status = 500;
      if (err.name === 'ValidationError') status = 400;
      res.status(status).send({ message: `${err.name}: ${err.message}` });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      let status = 500;
      if (err.name === 'ValidationError') status = 400;
      return res.status(status).send({ message: `${err.name}: ${err.message}` });
    });
};

module.exports.likeCard = (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.cardId)) {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
      .then((card) => {
        if (!card) {
          res.status(404).send({
            message: 'Запрашиваемая карточка не найдена',
          });
          return;
        }
        res.send(card);
      })
      .catch((err) => {
        let status = 500;
        if (err.name === 'ValidationError') status = 400;
        res.status(status).send({ message: `${err.name}: ${err.message}` });
      });
  } else {
    res.status(400).send({
      message: 'Ошибка валидации cardId',
    });
  }
};

module.exports.dislikeCard = (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.cardId)) {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
      .then((card) => {
        if (!card) {
          res.status(404).send({
            message: 'Запрашиваемая карточка не найдена',
          });
        }
        res.send(card);
      })
      .catch((err) => {
        let status = 500;
        if (err.name === 'ValidationError') status = 400;
        res.status(status).send({ message: `${err.name}: ${err.message}` });
      });
  } else {
    res.status(400).send({
      message: 'Ошибка валидации cardId',
    });
  }
};
