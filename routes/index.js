const router = require('express').Router();
const { errors } = require('celebrate');
const userRouter = require('./users');
const cardRouter = require('./cards');
const { ERROR_CODE_NOT_FOUND } = require('../utils/constants');
const { login, createUser } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const { createUserJoi, loginJoi } = require('../middlewares/joi');

router.post('/signup', createUserJoi, createUser);
router.post('/signin', loginJoi, login);

// авторизация
router.use(auth);

router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('/*', (req, res) => {
  res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Wrong way!' });
});
router.use(errors({ message: 'Validation error!' }));
module.exports = router;
