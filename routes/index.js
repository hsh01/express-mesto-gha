const router = require('express').Router();
const NotFoundError = require('../errors/not-found-err');

const authRouter = require('./auth');
const userRouter = require('./users');
const cardRouter = require('./cards');

router.use('/', authRouter);
router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.all('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
