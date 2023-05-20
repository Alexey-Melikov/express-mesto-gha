const userRouter = require('express').Router();

const {
  getUsers,
  getUser,
  updateUser,
  updateUserAvatar,
  getUserInfo,
} = require('../controllers/users');

const {
  updateUserJoi,
  updateUserAvatarJoi,
} = require('../middlewares/joi');

userRouter.get('/', getUsers);
userRouter.get('/users/me', getUserInfo);
userRouter.get('/:userId', getUser);
userRouter.patch('/me', updateUserJoi, updateUser);
userRouter.patch('/me/avatar', updateUserAvatarJoi, updateUserAvatar);

module.exports = userRouter;
