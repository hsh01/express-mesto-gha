const router = require('express').Router();
const {
  createUser, getUser, getUsers, setProfile, setAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUser);
router.post('/', createUser);
router.patch('/me', setProfile);
router.patch('/me/avatar', setAvatar);

module.exports = router;
