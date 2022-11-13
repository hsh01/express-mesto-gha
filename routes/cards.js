const router = require('express').Router();
const { celebrate } = require('celebrate');
const auth = require('../middlewares/auth');

const {
  createCard, deleteCard, getCards, likeCard, dislikeCard,
} = require('../controllers/cards');
const { CardInSchema, CardDeleteSchema } = require('../schemas/card');

router.use(auth);
router.get('/', getCards);
router.delete('/:cardId', celebrate(CardDeleteSchema), deleteCard);
router.post('/', celebrate(CardInSchema), createCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
