const router = require('express').Router();
const auth = require('../middlewares/auth');

const {
  getUser, getUsers, setProfile, setAvatar, getMe,
} = require('../controllers/users');

router.use(auth);

router.get('/', getUsers);
router.get('/me', getMe);
router.get('/:userId', getUser);
router.patch('/me', setProfile);
router.patch('/me/avatar', setAvatar);

module.exports = router;
