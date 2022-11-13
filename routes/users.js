const auth = require('../middlewares/auth');
const router = require('express').Router();

const {
  createUser, getUser, getUsers, setProfile, setAvatar, login, getMe
} = require('../controllers/users');


router.post('/signin', login);
router.post('/signup', createUser);

router.use(auth);

router.get('/', getUsers);
router.get('/me', getMe);
router.get('/:userId', getUser);
router.patch('/me', setProfile);
router.patch('/me/avatar', setAvatar);

module.exports = router;
