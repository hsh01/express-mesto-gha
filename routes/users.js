const router = require('express').Router();
const { celebrate } = require('celebrate');
const auth = require('../middlewares/auth');

const {
  getUser, getUsers, setProfile, setAvatar, getMe,
} = require('../controllers/users');
const { UserProfileSchema, UserAvatarSchema } = require('../schemas/user');

router.use(auth);

router.get('/', getUsers);
router.get('/me', getMe);
router.get('/:userId', getUser);
router.patch('/me', celebrate(UserProfileSchema), setProfile);
router.patch('/me/avatar', celebrate(UserAvatarSchema), setAvatar);

module.exports = router;
