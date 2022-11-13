const router = require('express').Router();
const { celebrate } = require('celebrate');
const auth = require('../middlewares/auth');

const {
  createCard, deleteCard, getCards, likeCard, dislikeCard,
} = require('../controllers/cards');
const { CardInSchema, CardIdParamSchema } = require('../schemas/card');

router.use(auth);
router.get('/', getCards);
router.delete('/:cardId', celebrate(CardIdParamSchema), deleteCard);
router.post('/', celebrate(CardInSchema), createCard);
router.put('/:cardId/likes', celebrate(CardIdParamSchema), likeCard);
router.delete('/:cardId/likes', celebrate(CardIdParamSchema), dislikeCard);

module.exports = router;
